import fs from 'fs';
import request from 'request';

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} file object containing data for the download process
 * @param  {string} file.fileName name of the file
 * @param  {string} file.host host for the request
 * @param  {string} file.path path for the request.
 * @return {Promise}
 */
const downloadFile = (file) => {
  const {
    fileName,
    host,
    path
  } = file;

  return new Promise((resolve, reject) => {
    fs.stat(fileName, (err) => {
      if (err) { // File doesn't exists yet
        request
          .get(`http://${host}${path}`)
          .on('error', (error) => {
            reject(error, { fileName });
          })
          .pipe(fs.createWriteStream(fileName))
          .on('close', () => {
            resolve({ fileName, isRepeated: false });
          });
      } else { // File is already on disk
        resolve({ fileName, isRepeated: true });
      }
    });
  });
};

export default downloadFile;
