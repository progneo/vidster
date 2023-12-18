const getCreators = async () => {
  const response = await fetch(`/api/creators`)
  if (!response.ok) {
    throw new Error('Error fetching creators')
  }
  return response.json()
}

const getTopCreators = async () => {
  const response = await fetch(`/api/creators/top`)
  if (!response.ok) {
    throw new Error('Error fetching creators')
  }
  return response.json()
}

const getCreatorById = async (id: number) => {
  const response = await fetch(`/api/profile/${id}`)
  if (!response.ok) {
    throw new Error(`Error fetching creator with id: ${id}`)
  }
  return response.json()
}

export { getCreators, getTopCreators, getCreatorById }
