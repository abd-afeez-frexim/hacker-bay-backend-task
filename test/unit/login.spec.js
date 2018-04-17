const { test } = use('Test/Suite')('Login unit test')
const User = use('App/Models/User')
const AuthController = use('App/Controllers/Http/AuthController')
const { validate } = use('Validator')
const Env = use('Env')
const jwt = require('jsonwebtoken')

test('invalid login email', async ({ assert }) => {
  const validation = await validate({
    email: 'wrong email',
    password: 'my password'
  }, User.rules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"email validation failed on email",
      "field":"email",
      "validation":"email"
    }
  ])
})
test('login credentials required', async ({ assert }) => {
  const validation = await validate({
  }, User.rules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"required validation failed on email",
      "field":"email",
      "validation":"required"
    }
  ])
})
test('login password not supplied', async ({ assert }) => {
  const validation = await validate({
    email: 'dent4real@yahoo.com'
  }, User.rules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"required validation failed on password",
      "field":"password",
      "validation":"required"
    }
  ])
})
test('login password not supplied', async ({ assert }) => {
  const validation = await validate({
    email: 'dent4real@yahoo.com'
  }, User.rules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"required validation failed on password",
      "field":"password",
      "validation":"required"
    }
  ])
})
test('login password less than six characters', async ({ assert }) => {
  const validation = await validate({
    email: 'dent4real@yahoo.com',
    password: 'not'
  }, User.rules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"min validation failed on password",
      "field":"password",
      "validation":"min"
    }
  ])
})
test('login password more than thirty characters', async ({ assert }) => {
  const validation = await validate({
    email: 'dent4real@yahoo.com',
    password: 'thispasswordisabsolutelytoowrong'
  }, User.rules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"max validation failed on password",
      "field":"password",
      "validation":"max"
    }
  ])
})
test('confirm jwt generated', async ({ assert }) => {
  const appKey = Env.get('APP_KEY') || "this is a random secrete";
  var userJwt = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: 'dent4real@yahoo.com'
  }, appKey);
  assert.isOk(userJwt, "to ensure the generated jwt is not null")
  assert.isTrue(userJwt.length > 60)
})