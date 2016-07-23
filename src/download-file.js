import http from 'http';
import path from 'path';
import fs from 'fs';
import {
  PORT,
  ENCODING_TYPE
} from './constants';

export const writeImageOnDisk = ({
  response,
  encoding,
  fileName,
  resolve,
  reject
}) => {
  let filedata = '';

  response.setEncoding(encoding);

  if (!fs.existsSync(path.dirname(fileName))) {
    fs.mkdirSync(path.dirname(fileName));
  }

  response.on('data', (chunk) => {
    filedata += chunk;
  });

  response.on('end', () => {
    fs.writeFile(fileName, filedata, encoding, (err) => {
      if (err) {
        reject(err, { fileName });
      }
      resolve({ fileName, isRepeated: false });
    });
  });
};

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} file object containg data for the download process
 * @return {Promise}
 */
const downloadFile = (file) => {
  const {
    fileName,
    host,
    path: filePath
  } = file;

  return new Promise((resolve, reject) => {
    const config = {
      host,
      port: PORT,
      filePath
    };

    if (fs.existsSync(fileName)) {
      resolve({ fileName, isRepeated: true });
    } else {
      http
        .get(config, (response) => {
          writeImageOnDisk({
            response,
            encoding: ENCODING_TYPE,
            fileName,
            resolve,
            reject
          });
        })
        .on('error', (err) => {
          if (err) {
            reject(err, { fileName });
          }
        });
    }
  });
};

export default downloadFile;
