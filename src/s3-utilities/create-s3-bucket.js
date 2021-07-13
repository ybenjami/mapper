const AWS = require('aws-sdk');
const config = require('config');
const sleep = require('util').promisify(setTimeout)

const createBucket = async (s3, params)  => { 

    const s3Config = config.get('AppConfig.S3');

    if(s3Config.region !='us-east-1'){
        params.CreateBucketConfiguration.LocationConstraint = s3Config.region
    }

    s3.createBucket(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log('Bucket Created Successfully', data.Location);
       });
      /***
       * Adding  in a few seconds for Eventual /Strong Consistancy on creating 
       * Bucket
       * 
       */

       await sleep(4000);
       console.log('Bucket should be usable...');
    return;
    

}
module.exports = {createBucket}