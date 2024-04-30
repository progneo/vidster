const getServices = async () => {
  const response = await fetch(`/api/services`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

export { getServices }
