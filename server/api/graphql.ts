
import * as Reflect from 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'
import resolvers from '../graphql'
import ApolloServer from '../graphql/apollo-server'
let schema
if (Reflect) { // in case of reflect-metadata removed when build
  schema = buildSchemaSync({
    resolvers,
  })
}
else {
  throw new Error('No reflect-metadata polyfill')
}

const apolloServer = new ApolloServer({
  schema,
})
apolloServer.start()
const handler = apolloServer.createHandler()

export default defineEventHandler(handler)
