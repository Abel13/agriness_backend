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

  test('ensure authentication fails', async (assert) => {
    const payload: LoginInterface = {
      email: 'abel@email.com',
      password: '123',
    }

    const obj = await supertest(BASE_URL).post('/session').send(payload).expect(400)

    const { text } = obj

    assert.exists(text)
    assert.equal(
      text,
      JSON.stringify({ errors: [{ message: 'E_INVALID_AUTH_PASSWORD: Password mis-match' }] })
    )
  })

  test('ensure authentication fails by email invalid', async (assert) => {
    const payload: LoginInterface = {
      email: 'abel@emaill.com',
      password: '123',
    }

    const obj = await supertest(BASE_URL).post('/session').send(payload).expect(400)

    const { text } = obj

    assert.exists(text)
    assert.equal(
      text,
      JSON.stringify({ errors: [{ message: 'E_INVALID_AUTH_UID: User not found' }] })
    )
  })
})
