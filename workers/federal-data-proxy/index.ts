/**
 * Cloudflare Worker — Federal Data Proxy
 *
 * Proxies requests from the Essential Goods Ledger client to
 * BLS, EIA, and USDA APIs, injecting real API keys server-side
 * so they never reach the browser.
 *
 * Secrets (set via `wrangler secret put`):
 *   BLS_API_KEY   — api.bls.gov registration key
 *   EIA_API_KEY   — api.eia.gov v2 key
 *   USDA_API_KEY  — quickstats.nass.usda.gov key
 */

export interface Env {
  BLS_API_KEY: string
  EIA_API_KEY: string
  USDA_API_KEY: string
  ALLOWED_ORIGIN: string
}

/* ------------------------------------------------------------------ */
/*  Request body shapes accepted from the client                      */
/* ------------------------------------------------------------------ */

interface BLSProxyBody {
  seriesid: string[]
  startyear: string
  endyear: string
}

interface EIAProxyBody {
  route: string // e.g. "/petroleum"
  params: Record<string, string>
}

interface USDAProxyBody {
  params: Record<string, string>
}

/* ------------------------------------------------------------------ */
/*  CORS helpers                                                      */
/* ------------------------------------------------------------------ */

function corsHeaders(origin: string, allowedOrigin: string): Record<string, string> {
  const allowed = allowedOrigin || 'https://ledger.xtx396.com'
  const origins = allowed.split(',').map(o => o.trim())
  const isAllowed = origins.includes(origin) || origins.includes('*')
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : origins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function optionsResponse(origin: string, allowedOrigin: string): Response {
  return new Response(null, { status: 204, headers: corsHeaders(origin, allowedOrigin) })
}

function jsonResponse(
  body: unknown,
  status: number,
  origin: string,
  allowedOrigin: string
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin, allowedOrigin),
    },
  })
}

/* ------------------------------------------------------------------ */
/*  Agency handlers                                                   */
/* ------------------------------------------------------------------ */

async function handleBLS(body: BLSProxyBody, apiKey: string): Promise<Response> {
  const url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/'
  const payload = {
    seriesid: body.seriesid,
    startyear: body.startyear,
    endyear: body.endyear,
    registrationkey: apiKey,
  }

  const upstream = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleEIA(body: EIAProxyBody, apiKey: string): Promise<Response> {
  const allowedRoutes = ['/petroleum', '/natural-gas', '/electricity']
  if (!allowedRoutes.includes(body.route)) {
    return new Response(JSON.stringify({ error: 'Invalid EIA route' }), { status: 400 })
  }

  const params = new URLSearchParams(body.params)
  params.set('api_key', apiKey)

  const url = `https://api.eia.gov/v2${body.route}/data/?${params}`

  const upstream = await fetch(url)

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function handleUSDA(body: USDAProxyBody, apiKey: string): Promise<Response> {
  const params = new URLSearchParams(body.params)
  params.set('key', apiKey)

  const url = `https://quickstats.nass.usda.gov/api/api_GET/?${params}`

  const upstream = await fetch(url)

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/* ------------------------------------------------------------------ */
/*  Router                                                            */
/* ------------------------------------------------------------------ */

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get('Origin') || ''

    // Preflight
    if (request.method === 'OPTIONS') {
      return optionsResponse(origin, env.ALLOWED_ORIGIN)
    }

    // Only POST allowed
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin, env.ALLOWED_ORIGIN)
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400, origin, env.ALLOWED_ORIGIN)
    }

    try {
      let upstream: Response

      switch (url.pathname) {
        case '/api/bls':
          upstream = await handleBLS(body as BLSProxyBody, env.BLS_API_KEY)
          break
        case '/api/eia':
          upstream = await handleEIA(body as EIAProxyBody, env.EIA_API_KEY)
          break
        case '/api/usda':
          upstream = await handleUSDA(body as USDAProxyBody, env.USDA_API_KEY)
          break
        default:
          return jsonResponse({ error: 'Not found' }, 404, origin, env.ALLOWED_ORIGIN)
      }

      // Re-wrap upstream response with CORS headers
      const responseBody = await upstream.text()
      return new Response(responseBody, {
        status: upstream.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin, env.ALLOWED_ORIGIN),
        },
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Internal proxy error'
      return jsonResponse({ error: message }, 502, origin, env.ALLOWED_ORIGIN)
    }
  },
}
