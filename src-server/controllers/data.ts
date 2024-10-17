import type { Request, Response } from 'express'
import { data } from '@base/constants'

export const getData = (req: Request, res: Response) => res.status(200).send(data)
