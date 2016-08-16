import downloadFile from './download-file';

const POOL_LIMIT = 6;

/**
 * Groups the elements in an array in subarrays defined by limit.
 * @example
 *
 * splice([1, 2, 3, 4, 5], 3); // [[1, 2, 3], [4, 5]]
 *
 * @param {Array} arr
 * @param {Number} limit
 * @returns {Array} New array with the subgroups.
 */
export const splice = (arr, limit) => {
  const splicedArray = [];
  const baseArray = arr.slice(0);

  while (baseArray.length) {
    splicedArray.push(baseArray.splice(0, limit));
  }

  return splicedArray;
};

async function batchDownload(config) {
  const { batches, onFileSuccess, onFileError, onComplete } = config;

  if (batches.length === 0) {
    // TODO: onComplete could pass a "report" as parameter that can give more
    // Information about the process.
    onComplete();
    return;
  }

  let downloadedImagesInBatch = 0;
  const [batch, ...remainingBatches] = batches;
  const batchLength = batch.length;

  for (const file of batch) {
    let data;
    try {
      data = await downloadFile(file);
      onFileSuccess(data);
    } catch (e) {
      onFileError(e, data);
    } finally {
      downloadedImagesInBatch += 1;

      if (downloadedImagesInBatch === batchLength) {
        batchDownload(Object.assign({}, config, {
          batches: remainingBatches
        }));
      }
    }
  }
}

/**
 * Download a set of files grouped in multiple bundles. Only one bundle is
 * downloaded at a time.
 * @param {Object} config
 * @param {String[]} config.fileList
 * @param {Function} config.onFileSuccess
 * @param {Function} config.onFileError
 */
export default function downloadPool(config) {
  const { fileList, onFileSuccess, onFileError, onComplete } = config;

  batchDownload({
    batches: splice(fileList, POOL_LIMIT),
    onFileSuccess,
    onFileError,
    onComplete
  });
}
