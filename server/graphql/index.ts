import type { NonEmptyArray } from 'type-graphql'
import hello from './hello/resolver'
import login from './login/resolver'
const resolvers: NonEmptyArray<Function> = [
  hello,
  login,
]
export default resolvers
