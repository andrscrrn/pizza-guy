import request from 'request';
import path from 'path';
import fs from 'fs-extra-promise';

/**
 * Tries to download a file stream from an url.
 * @param {string} fileUrl
 * @param {string} fileName Final path of the downloaded image.
 * @returns {Promise} Resolves to an object with information about the
 * downloaded file.
 */
function downloadFileStream(fileUrl, fileName) {
  return new Promise((resolve, reject) => {
    request
      .get(fileUrl)
      .on('response', function(response) {
        if (response.statusCode === 200) {
          response.request
            .pipe(fs.createWriteStream(fileName))
            .on('error', (error) => reject(error, { fileName }))
            .on('close', () => resolve({ fileName }));
        } else {
          reject({ fileName });
        }
      });
  });
}

/**
 * Checks if a file exists.
 * @param {string} filePath Path of the file to evaluate.
 * @return {Promise} Resolving to boolean based in the file existence.
 */
async function fileExists(filePath) {
  try {
    await fs.statAsync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Takes the directory route and creates the directories recursively.
 *
 * @example
 * createFolderForFile('foo/bar/baz.jpg'); // Creates foo/bar route
 *
 * @param {string} fileName path of the generated file.
 * @returns {Promise} When resolved, the folder was created.
 */
function createFolderForFile(fileName) {
  return fs.ensureDirAsync(path.parse(fileName).dir);
}

/**
 * Establish TCP connection for saving a file on disk.
 * @param  {Object} file object containing data for the download process.
 * @param  {String} file.fileName name of the file.
 * @param  {String} file.host host for the request
 * @param  {String} file.path path for the request.
 * @return {Promise} Object with the downloaded file name and additional
 * information of the download.
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
    const downloaded = await downloadFileStream(`http://${host}${filePath}`, fileName);
    return {
      fileName: downloaded.fileName,
      isRepeated: false
    };
  } catch (error) {
    return { error, fileName };
  }
}

export default downloadFile;
