import { LoginInterface } from 'interfaces/iLogin'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Auth', () => {
  test('ensure authentication works', async (assert) => {
    const payload: LoginInterface = {
      email: 'abel@email.com',
      password: '123456',
    }

    const obj = await supertest(BASE_URL).post('/session').send(payload).expect(200)

    const { text } = obj

    assert.exists(text)
  })
})
