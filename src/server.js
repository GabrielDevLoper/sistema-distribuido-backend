require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan('dev'));

const aws = require('aws-sdk');

//configurando variáveis ambientes para se conectar com aws-rekognition
aws.config.accessKeyId = process.env.AWS_ACCESS_KEY;
aws.config.secretAccessKey = process.env.AWS_SECRET_KEY;
aws.config.region = process.env.AWS_DEFAULT_REGION;



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
});

app.use(routes);

app.listen(3333);