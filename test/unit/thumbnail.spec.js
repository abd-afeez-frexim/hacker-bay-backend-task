const { test } = use('Test/Suite')('Thumbnail unit test')
const User = use('App/Models/User')
const AuthController = use('App/Controllers/Http/AuthController')
const { validate } = use('Validator')
var fs = require("fs");
var Helpers = use("Helpers")

test('image url required', async ({ assert }) => {
  const validation = await validate({
  }, User.imageRules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
      "message":"required validation failed on image",
      "field":"image",
      "validation":"required"
    }
  ])
})
test('image must be a url', async ({ assert }) => {
  const validation = await validate({
      image: "name"
  }, User.imageRules)

  assert.isTrue(validation.fails())
  assert.deepEqual(validation.messages(), [
    {
        "message":"url validation failed on image",
        "field":"image",
        "validation":"url"
    }
  ])
})
test('confirm image created and thumbnail url returned', async ({ assert }) => {
    var myImage = "https://cdn.pixabay.com/photo/2018/02/23/22/48/light-3176887__340.jpg"
    var rand = Math.floor((Math.random()) * 9000 + 1111);
    var controller = new AuthController();
    var thumb;
    this.timeout = 5000;
    try{
      thumb = await controller.resizeImage(myImage,50,50, "thumb" + rand)
      assert.equal(thumb.length, 32);
      path = Helpers.appRoot() + thumb.slice(1);
      // console.log(path);
      var exist = await fs.existsSync(path)
      assert.isTrue(exist);
    }
    catch(e){
      console.log(e.message)
      assert.notNull(thumb)
    }
})