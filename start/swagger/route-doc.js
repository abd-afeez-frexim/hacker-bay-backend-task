/**
 * @swagger
 * securitySchemes:
 *   bearerAuth:            
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 * definition:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   Patch:
 *     properties:
 *       json:
 *         type: object
 *       patch:
 *         type: array
 *   Token:
 *     properties:
 *       token:
 *         type: string
 *   Image:
 *     properties:
 *       image:
 *         type: string
 *   Patched:
 *     properties:
 *       patched:
 *         type: object
 *   Thumbnail:
 *     properties:
 *       thumbnail:
 *         type: string
 *   Error:
 *     properties:
 *       err:
 *         type: object
 */


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     description: Registers a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user login credentials
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Token'
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: token cannot be generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

/**
 * @swagger
 * /patch:
 *   post:
 *     tags:
 *       - Patch
 *     description: Apply a patch to json
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: patch
 *         description: Patch credentials
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Patch'
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Patched'
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *       500:
 *         description: an error occured while trying to patch the json
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */

 /**
 * @swagger
 * /thumbnail:
 *   post:
 *     tags:
 *       - thumbnail
 *     description: Transform an image to thumbnails
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: thumbnail
 *         description: Patch credentials
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Image'
 *     responses:
 *       200:
 *         description: thumbnail successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Thumbnail'      
 *       400:
 *         description: validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'       
 *       500:
 *         description: token cannot be generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 */
