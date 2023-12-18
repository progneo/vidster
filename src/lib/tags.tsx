const getTags = async () => {
  const response = await fetch(`/api/tags`)
  if (!response.ok) {
    throw new Error('Error fetching tags')
  }
  return response.json()
}

export { getTags }
