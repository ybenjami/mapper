    /**
     * JSON to CSV converter Split to own file
     */
     const fs = require('fs')
     const { parseAsync } = require('json2csv');
     const config = require('config');



    const convert = async (data) =>{
     /****
     * Establish a Configuration
     */
        const appConfig = config.get('AppConfig');
        const fields = appConfig.Csv.fields;
        const fileName = appConfig.Csv.fileName;
        const outPath = appConfig.Csv.path;
        const opts = { fields };
    
        /*** 
         * Convert json to CSV
         */
       
      parseAsync(data, opts)
      .then(csv => {
        fs.writeFile(outPath+fileName, csv, err => {
            if (err) {
              console.error(err)
              return
            }
             console.log('new file written to temp....')
             
          })
      })
      .catch(err => console.error(err));
    }

    module.exports = { convert }