import { db } from '@/src/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { Tag } from '@prisma/client'

type ResponseData = {
  tagList: Tag[] | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const existingTags = await db.tag.findMany()

    if (existingTags) {
      res.status(200).json({ tagList: existingTags, message: 'Success' })
    } else {
      res.status(404).json({ tagList: null, message: 'Tags not found' })
    }
  } catch (error) {
    res.status(500).json({ tagList: null, message: 'Something went wrong' })
  }
}
