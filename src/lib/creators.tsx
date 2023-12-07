const baseUrl = 'http://localhost:3001'

const getCreators = async () => {
  const response = await fetch(`${baseUrl}/api/creators`)
  if (!response.ok) {
    throw new Error('Error fetching creators')
  }
  return response.json()
}

const getTopCreators = async () => {
  const response = await fetch(`${baseUrl}/api/creators/top`)
  if (!response.ok) {
    throw new Error('Error fetching creators')
  }
  return response.json()
}

const getCreatorById = async (id: string) => {
  const response = await fetch(`${baseUrl}/api/creator/${id}`)
  if (!response.ok) {
    throw new Error(`Error fetching creator with id: ${id}`)
  }
  return response.json()
}

export { getCreators, getTopCreators, getCreatorById }
