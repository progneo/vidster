import { db } from '@/src/lib/db'
import { hash } from 'bcrypt'
import * as z from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'next-auth'

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters')
})

type ResponseData = {
  user: User | null
  message: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { email, firstName, lastName, password } = userSchema.parse(req.body)

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    })

    if (existingUserByEmail) {
      res
        .status(409)
        .json({ user: null, message: 'User with this email already exists' })
    } else {
      const hashedPassword = await hash(password, 10)
      const newUser = await db.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword
        }
      })

      res
        .status(201)
        .json({ user: newUser, message: 'User created successfully' })
    }
  } catch (error) {
    res.status(500).json({ user: null, message: 'Something went wrong' })
  }
}
