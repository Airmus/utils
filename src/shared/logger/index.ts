import { Logger } from '@airmus/logger'

export const logger = new Logger({
  logLevel: process.env.node_env === 'development' ? 'INFO' : 'WARN',
  logPrefix: '@airmus/utils'
})

export default logger
