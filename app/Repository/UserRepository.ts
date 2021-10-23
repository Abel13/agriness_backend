import User from 'App/Models/User'

interface CreateUserDTOInterface {
  email: string
  password: string
}

class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }

  public async createUser({ email, password }: CreateUserDTOInterface): Promise<User> {
    return User.create({ email, password })
  }
}

export default UserRepository
