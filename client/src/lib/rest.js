export function post(uri, body){
  return fetch(`${process.env.API_URL}/${uri}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
}

export function del(uri){
  return fetch(`${process.env.API_URL}/${uri}`, { method: 'DELETE', credentials: 'include' })
}

export function get(uri, params){
  let url = `${process.env.API_URL}/${uri}`
  if (params) {
    const linkChar = uri.indexOf('?') > -1 ? '&' : '?'
    const queryString = Object.keys(params).map(name => `${encodeURIComponent(name)}=${encodeURIComponent(params[name])}`).join('&')
    url = url + linkChar + queryString
  }
  return fetch(url, { method: 'GET', credentials: 'include' }).then(response => response.json())
}



