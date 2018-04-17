'use strict'
const Env = use('Env')
const jwt = require('jsonwebtoken')
class Jwt {
  async handle ({ request, response }, next) {
    // call next to advance the request
    var header = request.header('Authorization');
    header =header ? header.slice(7) : header
    if(!header){
      return response.unauthorized({'err': "token not attached to authorization"})
    }
    try {
      var decoded = jwt.verify(header, Env.get('APP_KEY') || "this is a random secrete");
    } catch(e) {
      return response.unauthorized({'msg': "invalid token attached to header", err: e.message})
    }
    await next()
  }
}

module.exports = Jwt
