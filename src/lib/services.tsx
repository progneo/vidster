import NewService from '@/src/types/NewService'

const getServices = async () => {
  const response = await fetch(`/api/services`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}

const postServices = async (services: Array<NewService>) => {
  const response = await fetch(`/api/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      services
    })
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.status
}

export { getServices, postServices }
