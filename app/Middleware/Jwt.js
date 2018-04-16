'use strict'

class Jwt {
  async handle ({ request }, next) {
    // call next to advance the request
    var header = request.header('Authorization');
    if(!header){
      response.unAuthourized({'msg': 'header bearer not provided'})
    }
    await next()
  }
}

module.exports = Jwt
