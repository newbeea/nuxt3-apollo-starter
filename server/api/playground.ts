import {
  renderPlaygroundPage,
} from 'graphql-playground-html'
import type { IncomingMessage, ServerResponse } from 'http'

const handler = async function(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await renderPlaygroundPage({
      endpoint: '/api/graphql'
    })
    res.end(body)
  } catch (err) {
    res.end({ message: err.message })
  }
  
}
export default handler
