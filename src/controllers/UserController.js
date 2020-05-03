const User = require('../models/User');
const aws = require('aws-sdk');
global.atob = require('atob');

var user1 = null;

module.exports = {
    async index(req, res) {
      const user = await User.find();

      return res.json(user);
    },

    async store(req, res) {
        var {buffer} = req.file;
        aws.config.update({ region: 'us-east-1' });

        var rekognition = new aws.Rekognition();

        var params = {
            CollectionId: 'usuarios',
            Image: {
                Bytes: buffer
            },
            DetectionAttributes: ['ALL'],
            ExternalImageId: req.file.originalname,
            MaxFaces: 10,
            QualityFilter: 'AUTO',
        };

        await rekognition.indexFaces(params, function (err, data) {

            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {
                const { FaceId } = data.FaceRecords[0].Face
                console.log(`Usuário Cadastrado FaceID:  ${FaceId}`); // successful response
                   
                const {name } = req.body;
            
                const user = User.create({
                        //image:filename,
                        name,
                        faceid:FaceId
                    });//Cadastrando cliente no banco
                    
                return res.json(user);
            }
        });
    },

    async show(req, res ) {
        var base64 = req.body.myfile_procurar;
        const arquivo = atob(base64.split("data:image/jpeg;base64,")[1]);

        var length = arquivo.length;
        imageBytes = new ArrayBuffer(length);
        var ua = new Uint8Array(imageBytes);
        for (var i = 0; i < length; i++) {
          ua[i] = arquivo.charCodeAt(i);
        }

        // const { buffer } = req.file;
        aws.config.update({ region: 'us-east-1' });

        var rekognition = new aws.Rekognition();

        var params = {
            CollectionId: 'usuarios',
            /* required */
            Image: {
                Bytes: imageBytes //buffer 
            },
            FaceMatchThreshold: 80,
            MaxFaces: 50
        };
        

        rekognition.searchFacesByImage(params, async function (err, data) {
            
            if (err) {
                console.log(err, err.stack); // an error occurred
            }
            else {
                if (data.FaceMatches.length === 0) {
                    console.log('Usuário não cadastrado');
                    return res.json({ message: 'Usuário não cadastrado na aws'});  
                }
                else{
                    const faceids = data.FaceMatches[0].Face.FaceId;
                    const user = await User.find({faceid: faceids});

                    if(!user) {
                        return res.json({message: 'Usuário não cadastrado no banco de dados'});  
                        
                    }
                       
                    const { name } = user[0];
                    
                    console.log(name);
                    console.log(`Usuário Encontrado FaceID:  ${faceids}`);

                    return res.json(user); 

                    

                    
                }  
            }
        });
    }
}