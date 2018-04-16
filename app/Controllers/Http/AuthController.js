'use strict'
const jwt = require('jsonwebtoken')
const User = use('App/Models/User')
const { validate } = use('Validator')
const Env = use('Env')

class AuthController {
    async login ({ request }) {
        const validation = await validate(request.all(), User.rules)
        
        if (validation.fails()) {
        return response.badRequest({err: validation.messages()});
        }
        const email = request.input('email');
        const data = {email: email};
        var userJwt = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: 'foobar'
          }, Env.get('APP_KEY'));
          return userJwt;
      }
}

module.exports = AuthController
