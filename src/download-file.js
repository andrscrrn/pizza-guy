import request from 'request';
import path from 'path';
import fs from 'fs-extra-promise';

function downloadFileStream(filePath, fileName) {
  return new Promise((resolve, reject) => {
    request
      .get(filePath)
      .on('response', function(response) {
        if (response.statusCode === 200) {
          response.request
            .pipe(fs.createWriteStream(fileName))
            .on('error', (error) => reject(error, { fileName }))
            .on('close', () => resolve({ fileName, isRepeated: false }));
        } else {
          reject({ fileName });
        }
      });
  });
}

async function fileExists(filePath) {
  try {
    await fs.statAsync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

function createFolderForFile(fileName) {
  return fs.ensureDirAsync(path.parse(fileName));
}

/**
 * Establish TCP connection for saving an image on disk
 * @param  {Object} file object containing data for the download process
 * @param  {String} file.fileName name of the file
 * @param  {String} file.host host for the request
 * @param  {String} file.path path for the request.
 * @return {Promise}
 */
async function downloadFile(file) {
  const {
    fileName,
    host,
    path: filePath
  } = file;

  const fileAlreadyExists = await fileExists(fileName);

  if (fileAlreadyExists) {
    return { fileName, isRepeated: true };
  }

  await createFolderForFile(fileName);

  try {
    const downloadedFile = await downloadFileStream(`http://${host}${filePath}`, fileName);
    return downloadedFile;
  } catch (error) {
    return { error, fileName };
  }
  // downloadRawFile(`http://${host}${path}`, fileName);

  // return new Promise((resolve, reject) => {
  //   fs.stat(fileName, (err) => {
  //     if (err) { // File doesn't exists yet
  //       const { dir } = parsePath(fileName);

  //       // TODO: Change synchronous call.
  //       fs.ensureDirSync(dir);
  //     } else { // File is already on disk
  //       resolve({ fileName, isRepeated: true });
  //     }
  //   });
  // });
}

export default downloadFile;
