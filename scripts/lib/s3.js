var AWS = require('aws-sdk');

function getS3SignedURL(bucket, object_key, operation, region, next){
  AWS.config.update({"region": region});
  let params = {Bucket: bucket, Key: object_key, Expires: 3600 * 24};
  let s3 = new AWS.S3({apiVersion: '2006-03-01', signatureVersion: 'v4'});
  s3.getSignedUrl(operation, params, function (err, url) {
  	if(err){
  		next(err);
  	}else{
  		next(null, url);
  	}
  });
}

exports.getS3SignedURL = getS3SignedURL;
