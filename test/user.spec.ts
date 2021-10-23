import { LoginInterface } from 'interfaces/iLogin'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
  test('ensure return error when email and password are invalids', async (assert) => {
    const obj = await supertest(BASE_URL).post('/user').send({}).expect(422)

    const { text } = obj

    assert.exists(text)
    assert.equal(
      text,
      JSON.stringify({
        errors: [
          { rule: 'required', field: 'email', message: 'E-mail is required' },
          { rule: 'required', field: 'password', message: 'Password is required' },
        ],
      })
    )
  })

  test('ensure return error when email is empty', async (assert) => {
    const payload: LoginInterface = {
      email: '',
      password: '123456',
    }

    const obj = await supertest(BASE_URL).post('/user').send(payload).expect(422)

    const { text } = obj

    assert.exists(text)
    assert.equal(
      text,
      JSON.stringify({
        errors: [{ rule: 'required', field: 'email', message: 'E-mail is required' }],
      })
    )
  })

  test('ensure return error when email is invalid', async (assert) => {
    const payload: LoginInterface = {
      email: 'test',
      password: '123456',
    }

    const obj = await supertest(BASE_URL).post('/user').send(payload).expect(422)

    const { text } = obj

    assert.exists(text)
    assert.equal(
      text,
      JSON.stringify({
        errors: [{ rule: 'email', field: 'email', message: 'E-mail is invalid' }],
      })
    )
  })
})
