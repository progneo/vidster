const addWork = async (url: string) => {
  const response = await fetch(`/api/works`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url
    })
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.status
}

const removeWork = async (id: number) => {
  const response = await fetch(`/api/works/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.status
}

export { addWork, removeWork }
