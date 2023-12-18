import { db } from '@/src/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { Creator } from '@prisma/client'

type ResponseData = {
  profile: Creator | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query

  try {
    const existingProfileById = await db.creator.findUnique({
      include: {
        tags: {
          select: {
            tag: true
          }
        },
        works: true
      },
      where: { id: Number(id) }
    })
    if (existingProfileById) {
      res.status(200).json({ profile: existingProfileById, message: 'Success' })
    } else {
      res
        .status(404)
        .json({ profile: null, message: 'Profile with this ID not found' })
    }
  } catch (error) {
    res.status(500).json({ profile: null, message: 'Something went wrong' })
  }
}
