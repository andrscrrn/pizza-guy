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

const batchDownload = (arr, limit, successCb, errorCb) => { // eslint-disable-line
  let downloadIndex = 0;
  if (arr.length) {
    arr
      .shift()
      .forEach((file) => {
        downloadFile(file)
          .then((data) => {
            successCb(data);
            downloadIndex++;
            if (!(downloadIndex % limit)) {
              batchDownload(arr, limit, successCb, errorCb);
            }
          })
          .catch((error, data) => {
            errorCb(error, data);
            downloadIndex++;
          });
      }
    );
  }
};

export default function downloadPool(list, successCb, errorCb) {
  batchDownload(splice(list, POOL_LIMIT), POOL_LIMIT, successCb, errorCb);
}
