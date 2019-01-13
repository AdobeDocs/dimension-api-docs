var program = require('commander');
var request = require('request');
var s3 = require('./lib/s3');
var login = require('./lib/login');
var dncr = require('./lib/dncr');
var async = require('async');
var urljoin = require('url-join');
var open = require("open");

program
  .version('0.1.0')
  .option('-b, --bucket [string]', 's3 bucket name')
  .option('-r, --region [string]', 'region of the s3 bucket', 'us-east-1')
  .option('-u, --username [string]', 'username')
  .option('-p, --password [string]', 'password')
  .option('-e, --example [string]', 'example asset black, blue, green, red, yellow', 'black')

  .parse(process.argv);

function getS3SignedURL(bucket, object_key, operation, region) {
  return new Promise((resolve, reject)=>{
    s3.getS3SignedURL(bucket, object_key, operation, region, (err, url)=>{
      if(err){
        reject(err);
      }else{
        resolve(url);
      }
    })
  })
}

function getToken(url, username, password){
  return new Promise((resolve, reject)=>{
    login.getToken(url, username, password, (err, body)=>{
      if(err){
        reject(err);
      }else{
        resolve(body.token);
      }
    })
  })
}

function submitRenderVariation(url, token, baseDnURL, variationURL, outputURL){
  return new Promise( (resolve, reject)=>{
    dncr.submitRenderVariation(url, token, baseDnURL, variationURL, outputURL, (err, body)=>{
      if(err){
        reject(err);
      }else{
        resolve(body);
      }
    })
  })
}

function pollStatus(url, token){
  return new Promise( (resolve, reject) => {
    let check_status_internval_id = setInterval(check_status, 1000);
    let max_tries = 240;
    let tries = 0;
    function check_status() {
      let options = {
        url : url,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
      request(options, (err, res, body) => {
        try{
          body = JSON.parse(body)
        }catch(e){
          console.log(e)
        }
        if(err){
          console.error(err);
          reject(err);
        }else{
          if(body.render_status == "complete"){
            console.log('job: ', body.id, body.render_status);
            clearInterval(check_status_internval_id);
            resolve(body);
          }else if(tries >= max_tries){
            console.log('timed out: ', body.id, body.render_status);
            clearInterval(check_status_internval_id);
            reject(body);
          } else{
            console.log('job: ', body.id, body.render_status);
            tries += 1;
          }
        }
      })
    }
  })
}

async function start(){
  var bucket = program.bucket;
  var object_key = program.objectKey || 'test/test.png';
  var operation =  program.operation || 'putObject';
  var region = program.region;
  var username = program.username;
  var password = program.password;
  var example = program.example;

  var dncrURL = "https://felicity-api.adobedice.com"
  var baseDnURL = "https://raw.githubusercontent.com/johnleetran/workflow-automation-docs/master/assets/base.dn"
  var variationURL = "https://raw.githubusercontent.com/johnleetran/workflow-automation-docs/master/assets/" + example + ".psd";
  try{
    console.log("Get S3 Signed URL");
    let outputURL = await getS3SignedURL(bucket, object_key, operation, region)
    console.log(outputURL);
    let displayURL = await getS3SignedURL(bucket, object_key, "getObject", region)

    console.log("Get Token");
    let token = await getToken( urljoin(dncrURL, "login") , username, password)
    console.log(token);

    console.log("Submit Render Variation")
    let requestBody = await submitRenderVariation(urljoin(dncrURL, "v1/render/variation"), token, baseDnURL, variationURL, outputURL)
    console.log(requestBody)

    let jobId = requestBody.id[0]
    console.log(jobId)
    await pollStatus(urljoin(dncrURL, "v1/status", jobId), token)

    console.log(displayURL)
    open(displayURL);

  }catch(e){
    console.error("error: ", e)
  }


}

start()
