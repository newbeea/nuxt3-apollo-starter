import type { NonEmptyArray } from 'type-graphql'
import hello from './hello/resolver'
const resolvers: NonEmptyArray<Function> = [
  hello,
]
export default resolvers
