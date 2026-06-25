import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'
import { env } from './config/env'

const app = express()

app.use(helmet())

app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}))

// Better Auth handles its own body parsing internally
app.all('/api/auth/*path', toNodeHandler(auth))

app.use(express.json())

export default app
