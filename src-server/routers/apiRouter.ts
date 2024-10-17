import express from 'express'

import { getData } from '../controllers'

const router = express.Router()

router.get('/data', getData)

export { router }
