import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRepository from 'App/Repository/userRepository'
import CreateUserService from 'App/Services/CreateUserServices'
import CreateUser from 'App/Validators/CreateUserValidator'

const userRepository = new UserRepository()

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    await request.validate(CreateUser)

    try {
      const createUserService = new CreateUserService(userRepository)

      const user = await createUserService.execute({ email, password })

      return { userId: user.secureId }
    } catch (err) {
      return response.status(err.status).badRequest({
        errors: [
          {
            message: err.message,
          },
        ],
      })
    }
  }
}
