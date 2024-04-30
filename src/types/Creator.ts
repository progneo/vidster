import Work from '@/src/types/Work'
import Review from '@/src/types/Review'
import TagInCreator from '@/src/types/TagInCreator'

export default interface Creator {
  id: number
  userId: number
  username: string
  avatar: string
  thumbnail: string
  description: string
  address: string
  works: Work[]
  reviews: Review[]
  tagsInCreator: TagInCreator[]
}
