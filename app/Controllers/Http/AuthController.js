'use strict'
const jwt = require('jsonwebtoken')
const User = use('App/Models/User')
const { validate } = use('Validator')
const Env = use('Env')
const Patch = require('jsonpatch');
const Logger = use('Logger')
// Import both http & https for handling different uris
var http = require('http');  
var https = require('https');  
// in order to write to the filesystem we need the `fs` lib
var fs = require('fs');  
// import the lib
var sharp = require('sharp');

class AuthController {
    async login ({ request, response }) {
        Logger.info('login in progress')
        const validation = await validate(request.all(), User.rules)
        
        if (validation.fails()) {
            return response.badRequest({err: validation.messages()});
        }
        const email = request.input('email');
        const data = {email: email};
        try{
            var userJwt = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48),
                data: email
              }, Env.get('APP_KEY')|| "this is a random secrete");
              Logger.info('login is successful')
              return {token:userJwt};
        }
        catch(e){
            response.internalServerError({err: {
                msg: 'an error occured while trying to generate your token', 
                err: e.message}})
        }
      }
      
      async patch ({ request, response }) {
        Logger.info('patching in progress')
        const validation = await validate(request.all(), User.patchRules)
        
        if (validation.fails()) {
            return response.badRequest({err: validation.messages()});
        }
        try{
            var data = request.input('json')
            var myPatch = request.input('patch');
            data = JSON.parse(data);
            var patched = Patch.apply_patch(data, myPatch);
            Logger.info('patching is successful')
            return response.json({patched:patched});
        }
        catch(e){
            response.internalServerError({err: {
                msg: 'an error occured while trying to patch your json', 
                err: e.message}})
        }
      }
      
      async thumbnail ({ request, response }) {
        Logger.info('transformation in progress')
        const validation = await validate(request.all(), User.imageRules)
        
        if (validation.fails()) {

            return response.badRequest({err: validation.messages()});
        }
        const imageUrl = request.input('image')
        try{
            var rand =  Math.floor((Math.random()) * 9000 + 1111);
            var thumbnail = await this.resizeImage(imageUrl, 50, 50, "thumb"+rand);
            thumbnail = "localhost:3333" + thumbnail.slice(8);
            Logger.info('transformation is successful')
            return response.json({thumbnail:thumbnail})
        }
        catch(e){
            return respons.internalServerError({err: {
                msg: 'an error occured while trying to generate your token', 
                err: e.message}})
        }
          
            // .then((thumbnailPath) => response.json({"msg":thumbnail}))
            // .catch((err) => response.json({err:err}));
      }
      
      resizeImage(imageUrl, width, height, rand) {  
        // create the resize transform
        var resizeTransform = sharp().resize(width, height).max();
        return new Promise((resolve, reject) => {
            // determine wether we need to use `http` or `https` libs
            var httpLib = http;
            if ( /^https/.test(imageUrl) ) {
            httpLib = https;
            }
            // begin reading the image
            httpLib.get(imageUrl, function(downloadStream) {
            var outPath = `./public/img/${ rand }-${ width }x${ height }.jpg`;
            var writeStream = fs.createWriteStream(outPath);
            downloadStream.pipe(resizeTransform).pipe(writeStream);
            downloadStream.on('end', () => resolve(outPath));
            writeStream.on('error', reject);
            downloadStream.on('error', reject);
            resizeTransform.on('error', reject);
            });
        });
        }
}

module.exports = AuthController
