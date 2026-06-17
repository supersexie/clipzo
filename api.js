const BASE = 'https://vibrant-patience-production-a7f0.up.railway.app'

function getToken() { return localStorage.getItem('clipzo_token') }
function setSession(session) {
  localStorage.setItem('clipzo_token', session.access_token)
  localStorage.setItem('clipzo_refresh', session.refresh_token)
}
function clearSession() {
  localStorage.removeItem('clipzo_token')
  localStorage.removeItem('clipzo_refresh')
}

async function req(method, path, body, isFormData = false) {
  const token = getToken()
  const headers = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (!isFormData) headers['Content-Type'] = 'application/json'
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  auth: {
    signup: (email, password, name) => req('POST', '/api/auth/signup', { email, password, name }),
    login:  (email, password)       => req('POST', '/api/auth/login',  { email, password }),
    logout: ()                      => req('POST', '/api/auth/logout'),
  },
  user: {
    me:    () => req('GET', '/api/user/me'),
    usage: () => req('GET', '/api/user/usage'),
  },
  upload: {
    file: (formData) => req('POST', '/api/upload', formData, true),
    list: ()         => req('GET',  '/api/upload'),
    del:  (id)       => req('DELETE', `/api/upload/${id}`),
  },
  tts: {
    voices:   ()      => req('GET',  '/api/tts/voices'),
    generate: (body)  => req('POST', '/api/tts/generate', body),
  },
  generate: {
    image: (body) => req('POST', '/api/generate/image', body),
  },
  transcribe: {
    start: (file_url) => req('POST', '/api/transcribe', { file_url }),
    poll:  (jobId)    => req('GET',  `/api/transcribe/${jobId}`),
  },
  download: {
    info:      (url) => req('POST', '/api/download/info', { url }),
    analyze:   (url) => req('POST', '/api/download/analyze', { url }),
    streamUrl: (url) => `${BASE}/api/download/stream?url=${encodeURIComponent(url)}&token=${encodeURIComponent(getToken())}`,
    clipUrl:   (url, start, end) => `${BASE}/api/download/clip?url=${encodeURIComponent(url)}&start=${start}&end=${end}&token=${encodeURIComponent(getToken())}`,
  },
  autoclip: {
    start: (file_url) => req('POST', '/api/autoclip', { file_url }),
    poll:  (jobId, count) => req('GET',  `/api/autoclip/${jobId}?count=${count || 5}`),
  },
}

export { getToken, setSession, clearSession }
