import Creator from '@/src/types/Creator'
import NewCreator from '@/src/types/NewCreator'

const getCreators = async (name?: string, sortBy?: string, tags?: string[]) => {
  let queryString = ''
  let queryParams: string[] = []
  if (tags?.length) {
    tags.map(tag => queryParams.push(`Tags=${encodeURIComponent(tag)}`))
  }
  if (name?.length) {
    queryParams.push(`name=${name}`)
  }
  if (sortBy?.length) {
    queryParams.push(`sortBy=${sortBy}`)
  }
  if (queryParams.length !== 0) {
    queryString = `?${queryParams.join('&')}`
  }
  const response = await fetch(`/api/Creators${queryString}`)
  if (!response.ok) {
    throw new Error('Error fetching creators')
  }
  return response.json()
}

const getTopCreators = async (): Promise<Creator[]> => {
  const response = await fetch(`/api/creators/top`)
  if (!response.ok) {
    throw new Error('Error fetching creators')
  }
  return response.json()
}

const getCreatorById = async (id: number) => {
  const response = await fetch(`/api/creators/${id}`)
  if (!response.ok) {
    throw new Error(`Error fetching creator with id: ${id}`)
  }
  return response.json()
}

const getCreatorByUserId = async (id: number) => {
  const response = await fetch(`/api/creators/user/${id}`)
  if (!response.ok) {
    return null
  }
  return response.json()
}

const createCreator = async (newCreator: NewCreator) => {
  const response = await fetch(`/api/creators/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: newCreator.username,
      address: newCreator.address,
      description: newCreator.description,
      avatar: newCreator.avatar,
      thumbnail: newCreator.thumbnail,
      tags: newCreator.tags
    })
  })
  if (!response.ok) {
    throw new Error('Wrong data')
  }
  return response.status
}

const editCreator = async (newCreator: NewCreator) => {
  const response = await fetch(`/api/creators/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: newCreator.username,
      address: newCreator.address,
      description: newCreator.description,
      avatar: newCreator.avatar,
      thumbnail: newCreator.thumbnail,
      tags: newCreator.tags
    })
  })
  if (!response.ok) {
    throw new Error('Wrong data')
  }
  return response.status
}

export {
  getCreators,
  getTopCreators,
  getCreatorById,
  getCreatorByUserId,
  createCreator,
  editCreator
}
