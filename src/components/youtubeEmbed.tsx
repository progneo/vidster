import { Box } from '@chakra-ui/react'

interface YoutubeEmbedProps {
  embedId: string
}

const YoutubeEmbed = ({ embedId }: YoutubeEmbedProps) => (
  <Box
    width="100%"
    rounded={'2xl'}
    as={'iframe'}
    src={`https://www.youtube.com/embed/${embedId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
    sx={{
      aspectRatio: '16/9'
    }}
  />
)

export default YoutubeEmbed
