export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (initObject) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(initObject)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error;
    }
  })
  .catch(_error => 'error')
}

export const deleteUrl = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error;
      }
    })
    .catch(_err => 'error');
}