const express = require('express');
const multer = require('multer');

const routes = express.Router();
const uploadAws = multer();


const UserController = require('./controllers/UserController');
const RekognitionController = require('./controllers/RekognitionController');


//Rotas de gerenciamento dos usuarios
routes.post('/users', uploadAws.single('myfile_index') , UserController.store);
routes.post('/show-users', uploadAws.single('myfile_procurar') , UserController.show);
routes.get('/users', UserController.index);
routes.delete('/users/:faceId', UserController.deleteFacesAndUser);

//Rotas para manipular as collection da aws
routes.get('/aws-collection', RekognitionController.store);


module.exports = routes;