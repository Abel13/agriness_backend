import User from 'App/Models/User'
import UserRepository from 'App/Repository/userRepository'
import { CreateUserInterface } from './interfaces'

class CreateUserService {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async execute({ email, password }: CreateUserInterface): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = await this.userRepository.createUser({ email, password })

    return user
  }
}

export default CreateUserService
