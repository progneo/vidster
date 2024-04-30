export default function getYoutubeVideoId(url: string): string | null {
  const urlObj = new URL(url)
  return urlObj.searchParams.get('v')
}
