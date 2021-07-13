const AWS = require('aws-sdk');
const config = require('config');
const bucketCreator = require('./create-s3-bucket');
const s3Upload = require('./s3-upload');
const args = require('minimist')(process.argv.slice(2))

const ID = args['id'];
const SECRET = args['secret'];
const s3Config = config.get('AppConfig.S3');
const sleep = require('util').promisify(setTimeout)


const BUCKET_NAME = s3Config.bucketName;
let bucketExists = false;


const init = async () => { 
    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });
    
    const options = {
      Bucket: BUCKET_NAME,
    };

    try {
      await s3.headBucket(options).promise().then(()=>{
          bucketExists = true;
      });
      console.log(`Uploading file to bucket ${BUCKET_NAME}...`)
    } catch (error) {
      if (error.statusCode === 404) {
        console.log(`${BUCKET_NAME} not found, creating bucket now...`);
      }
    } finally {
        if(!bucketExists){
            await bucketCreator.createBucket(s3, options);
        }
            await s3Upload.uploadFile(s3);
    }
  };


  module.exports = {init}