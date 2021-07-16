const config = require('config');
const s3Utility = require('./s3-utilities/s3-upload-util');
const mapper = require('./mapper');


const init =async ()=>{
    /****
     * 1.  Establish a Configuration
     */
     const appConfig = config.get('AppConfig');
     /*** 
     * 2.  Grap Source From API Endpoint 
     ***/
     const sourceObj = require('./endpoint.js');
     const converter = require('./jsonToCsv');
     let data = {};

    if(appConfig.ApiSource.isSecureEndpoint){
        console.log('Run SecureEndpoint Mode')
    }

    if(!appConfig.ApiSource.isSecureEndpoint){
        const response = await sourceObj.retreveUnsecure(appConfig.ApiSource.sourceEnpoint);
        
        data = response.data.results;
        console.log('Run UnSecure SecureEndpoint Mode')
    }
  
    /**
    * Mapper Logic
    */

    const s = mapper.init();
    console.log(s);
    //TODO: Module Generic Mapper
    /**
    * Convert JSON TO CSV
    */
     await converter.convert(s.results);
    /**
    * Handle Uploader
    */
     if(appConfig.fileDistribution.type === 'S3'){
        s3Utility.init();
     }
}

init();