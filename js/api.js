// ── API CLIENT ────────────────────────────────────────────────────────────────
const api = {
  async request(method, path, body = null, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = localStorage.getItem('mt_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);
    try {
      const res = await fetch(`${API_URL}${path}`, opts);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.errors?.[0]?.msg || 'Request failed');
      return data;
    } catch(e) {
      if (e.name === 'TypeError') throw new Error('Cannot connect to server. Please try again.');
      throw e;
    }
  },
  get:    (path, auth=false)       => api.request('GET',    path, null, auth),
  post:   (path, body, auth=false) => api.request('POST',   path, body, auth),
  patch:  (path, body, auth=true)  => api.request('PATCH',  path, body, auth),
  delete: (path, auth=true)        => api.request('DELETE', path, null, auth),
};
