const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');

const uploadFile = async (s3)  => { 
    // Read content from the file
    /*** MUST FIX THIS READ STREAM */
    const appConfig = config.get('AppConfig');

    const fileName = `${appConfig.Csv.path}${appConfig.Csv.fileName}`;
    const fileContent = fs.createReadStream(fileName);
    const s3Config = appConfig.S3;

    // Setting up S3 upload parameters
    const params = {
        Bucket: s3Config.bucketName,
        Key: s3Config.datePrefix ? `
            ${Date.now()}${s3Config.key}` 
            : s3Config.key,
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = {uploadFile};