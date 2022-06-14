import type { IncomingMessage, ServerResponse } from 'http'
import { useBody, useQuery } from 'h3'
import type { GraphQLOptions } from 'apollo-server-core'
import { ApolloServerBase, convertNodeHttpToRequest, runHttpQuery } from 'apollo-server-core'
export class ApolloServer extends ApolloServerBase {
  async createGraphQLServerOptions(request?: IncomingMessage, reply?: ServerResponse): Promise<GraphQLOptions> {
    return this.graphQLServerOptions({ request, reply })
  }

  createHandler() {
    return async function(event) {
      const { req, res } = event
      const options = await this.createGraphQLServerOptions(req, res)
      try {
        const { graphqlResponse, responseInit } = await runHttpQuery([], {
          method: req.method || 'GET',
          options,
          query: req.method === 'POST' ? await useBody(req) : await useQuery(req),
          request: convertNodeHttpToRequest(req),
        })
        if (responseInit.headers) {
          for (const [name, value] of Object.entries<string>(responseInit.headers))
            res.setHeader(name, value)
        }
        res.end(graphqlResponse)
      }
      catch (error) {
        if (error.headers) {
          for (const [name, value] of Object.entries<string>(error.headers))
            res.setHeader(name, value)
        }
        res.statusCode = error.statusCode
        res.end(error.message)
      }
    }.bind(this)
  }
}

export default ApolloServer
