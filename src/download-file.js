import fs from 'fs';
import request from 'request';
import { parse as parsePath } from 'path';
import fse from 'co-fs-extra';

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} file object containing data for the download process
 * @param  {String} file.fileName name of the file
 * @param  {String} file.host host for the request
 * @param  {String} file.path path for the request.
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
        const { dir } = parsePath(fileName);

        // TODO: Change synchronous call.
        fse.ensureDirSync(dir);

        request
          .get(`http://${host}${path}`)
          .on('response', function(response) {
            if (response.statusCode === 200) {
              response.request
                .pipe(fs.createWriteStream(fileName))
                .on('error', (error) => reject(error, { fileName }))
                .on('close', () => resolve({ fileName, isRepeated: false }));
            } else {
              reject({ fileName });
            }
          }
        );
      } else { // File is already on disk
        resolve({ fileName, isRepeated: true });
      }
    });
  });
};

export default downloadFile;
