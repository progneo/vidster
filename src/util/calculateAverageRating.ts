import Review from '@/src/types/Review'

export default function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
  return totalRating / reviews.length
}
