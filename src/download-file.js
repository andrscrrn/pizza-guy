'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} file object containg data for the download process
 * @return {void}
 */
const downloadFile = (file) => {

  const ENCODING_TYPE = 'binary';

  return new Promise((resolve, reject) => {

    const config = {
      host: file.host,
      port: 80,
      path: file.path
    };

    const writeImageOnDisk = (response) => {

      let imagedata = '';

      response.setEncoding(ENCODING_TYPE);

      if (!fs.existsSync(path.dirname(file.fileName))) {
        fs.mkdirSync(path.dirname(file.fileName));
      }

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
                err,
                {fileName: file.fileName}
              );
            }
            resolve({fileName: file.fileName, isRepeated: false});
          }
        );
      });
    };

    if (fs.existsSync(file.fileName)) {
      resolve({fileName: file.fileName, isRepeated: true});
    } else {
      http
        .get(config, writeImageOnDisk)
        .on('error', (err) => {
          if (err) {
            reject(
              err,
              {fileName: file.fileName}
            );
          }
        });
    }

  });
};

module.exports = downloadFile;
