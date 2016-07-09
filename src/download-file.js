import http from 'http';
import path from 'path';
import fs from 'fs';

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} file object containg data for the download process
 * @return {Promise}
 */
const downloadFile = (file) => {
  const ENCODING_TYPE = 'binary';
  const { fileName } = file;

  return new Promise((resolve, reject) => {
    const config = {
      host: file.host,
      port: 80,
      path: file.path
    };

    const writeImageOnDisk = (response) => {
      let filedata = '';

      response.setEncoding(ENCODING_TYPE);

      if (!fs.existsSync(path.dirname(fileName))) {
        fs.mkdirSync(path.dirname(fileName));
      }

      response.on('data', (chunk) => {
        filedata += chunk;
      });

      response.on('end', () => {
        fs.writeFile(fileName, filedata, ENCODING_TYPE, (err) => {
          if (err) reject(err, { fileName });
          resolve({ fileName, isRepeated: false });
        });
      });
    };

    if (fs.existsSync(fileName)) {
      resolve({ fileName, isRepeated: true });
    } else {
      http
        .get(config, writeImageOnDisk)
        .on('error', (err) => {
          if (err) reject(err, { fileName });
        });
    }
  });
};

export default downloadFile;
