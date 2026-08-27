import express from 'express'

import { messageStream } from '../Controllers/messageStream.js'

export const apiRouter = express.Router()

apiRouter.get('/gen-gift', messageStream)