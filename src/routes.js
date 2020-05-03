const express = require('express');
const multer = require('multer');

const routes = express.Router();


const UserController = require('./controllers/UserController');
const RekognitionController = require('./controllers/RekognitionController');

const uploadAws = multer();


routes.post('/users', uploadAws.single('myfile_index') , UserController.store);
routes.post('/show-users', uploadAws.single('myfile_procurar') , UserController.show);
routes.get('/users', UserController.index);



routes.get('/aws-collection', RekognitionController.store);


module.exports = routes;