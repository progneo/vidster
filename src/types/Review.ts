import Creator from '@/src/types/Creator'

export default interface Review {
  id: number
  rating: number
  creatorId: number
  creator: Creator | undefined
}
