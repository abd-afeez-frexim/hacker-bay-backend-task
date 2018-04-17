const { test } = use('Test/Suite')('Patch unit test')
const User = use('App/Models/User')
const { validate } = use('Validator')
const Env = use('Env')
const jsonpatch = require('jsonpatch');

test('patch credentials required', async ({ assert }) => {
  const validation = await validate({
  }, User.patchRules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"required validation failed on json",
      "field":"json",
      "validation":"required"
    }
  ])
})
test('json must be a json object', async ({ assert }) => {
  const validation = await validate({
      json: "name"
  }, User.patchRules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
        "message":"json validation failed on json",
        "field":"json",
        "validation":"json"
    }
  ])
})
test('patch must be parsable as json object', async ({ assert }) => {
  const validation = await validate({
      json: JSON.stringify({"name": "my name"}),
      patch: "cool"
  }, User.patchRules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
        "message":"json validation failed on patch",
        "field":"patch",
        "validation":"json"
    }
  ])
})
test('patch not supplied', async ({ assert }) => {
  const validation = await validate({
    json: JSON.stringify({"name": "my name"})
  }, User.patchRules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"required validation failed on patch",
      "field":"patch",
      "validation":"required"
    }
  ])
})
test('confirm patch result is an object', async ({ assert }) => {
    var mydoc = {
        "baz": "qux",
        "foo": "bar"
      };
      var thepatch = [
        { "op": "replace", "path": "/baz", "value": "boo" }
      ];
      var patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
      console.log(patcheddoc);
  assert.isObject(patcheddoc)
})