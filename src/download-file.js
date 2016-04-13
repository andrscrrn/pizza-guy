'use strict';

const http = require('http');
const fs = require('fs');

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} image object containg data for the download process
 * @return {void}
 */
function downloadFile(file) {

  const ENCODING_TYPE = 'binary';

  return new Promise(function(resolve, reject) {

    const config = {
      host: file.host,
      port: 80,
      path: file.path
    };

    if (fs.existsSync(file.fileName)) {
      resolve(file.fileName);
    } else {
      http
        .get(config, writeImageOnDisk)
        .on('error', (err) => {
          if (err) reject(err);
        });
    }

    function writeImageOnDisk(response) {

      let imagedata = '';

      response.setEncoding(ENCODING_TYPE);

      response.on('data', (chunk) => {
        imagedata += chunk;
      });

      response.on('end', () => {
        fs.writeFile(
          file.fileName,
          imagedata,
          ENCODING_TYPE,
          (err) => {
            if (err) {
              reject(
                Error('There was a problem saving the file.'),
                file.fileName
              );
            }
            resolve(file.fileName);
          }
        );
      });
    }
  });
}

module.exports = downloadFile;
