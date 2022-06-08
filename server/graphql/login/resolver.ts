
import {
  Resolver, Arg, Mutation,
} from 'type-graphql'

import { User } from './schema'

@Resolver()
export default class LoginResolver {
  @Mutation(
    () => User,
  )
  login(
  ) {
    return { token: 'YOUR TOKEN' }
  }
}
