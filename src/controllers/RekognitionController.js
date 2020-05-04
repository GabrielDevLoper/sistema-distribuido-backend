const aws = require('aws-sdk');
global.atob = require("atob");

module.exports = {
    async store(req, res) {
        aws.config.update({ region: 'us-east-1' });

        var rekognition = new aws.Rekognition();

        var params = {
            CollectionId: 'usuarios'
        };

        rekognition.createCollection(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            }
            else {
                console.log(data); // successful response
                res.json(data);
            }
        });
    },

    async deleteCollection(req, res){
        /* This operation deletes a Rekognition collection. */
            aws.config.update({ region: 'us-east-1' });
            var rekognition = new aws.Rekognition();
            var params = {
                CollectionId: 'usuarios'
            };
           rekognition.deleteCollection(params, function (err, data) {
            if (err){
                console.log(err, err.stack); // an error occurred
            }
            else{
                console.log(data); // successful response
                res.json(data);
            }
            /*
            data = {
            StatusCode: 200
            }
            */
        });
    },

    

}