import { config } from 'dotenv'
config()
export default {
  baseUrl: `${process.env.API_URL}`,
  env: process.env.NODE_ENV
}
