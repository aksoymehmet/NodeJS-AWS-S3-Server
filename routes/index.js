const express = require('express'),
      router = express.Router(),
      AWS = require('aws-sdk'),
      config = require('config'),
      request = require('request'),
      fs = require('fs');

const AWS_CONFIG = config.aws;

AWS.config.update({
  accessKeyId: AWS_CONFIG.accessKeyId,
  secretAccessKey: AWS_CONFIG.secretAccessKey,
  region: AWS_CONFIG.region
});

var s3 = new AWS.S3();

function getArtisteSong(callback){

  let params = {
    Bucket: AWS_CONFIG.bucket,
    MaxKeys: 20,
    Delimiter: '/',
    Prefix: AWS_CONFIG.prefix
  };

  s3.listObjectsV2(params, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (data) {
      return callback(data.Contents);
    }
  });

}

router.get('/', function(req, res, next) {
  
  getArtisteSong(data => {

    data.splice(0,1);
    data.push({"Key": AWS_CONFIG.url});
    res.json(data);    
 
  });
});


module.exports = router;
