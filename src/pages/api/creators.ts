import { db } from '@/src/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { Creator } from '@prisma/client'

type ResponseData = {
  profileList: Creator[] | null
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const existingProfiles = await db.creator.findMany({
      include: {
        tags: {
          select: {
            tag: true
          }
        }
      }
    })

    if (existingProfiles) {
      res
        .status(200)
        .json({ profileList: existingProfiles, message: 'Success' })
    } else {
      res.status(404).json({ profileList: null, message: 'Profiles not found' })
    }
  } catch (error) {
    res.status(500).json({ profileList: null, message: 'Something went wrong' })
  }
}
