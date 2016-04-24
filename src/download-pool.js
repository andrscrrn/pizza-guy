'use strict';

const downloadFile = require('./download-file');

const POOL_LIMIT = 6;

const splice = (arr, limit) => {
  const splicedArray = [];
  while (arr.length) {
    const temp = arr.splice(0, limit);
    splicedArray.push(temp);
  }
  return splicedArray;
};

const batchDownload = (arr, limit, successCb, errorCb) => {
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
            errorCb(data);
            downloadIndex++;
          });
      }
    );
  }
};

module.exports = (list, successCb, errorCb) => {
  batchDownload(
    splice(list, POOL_LIMIT),
    POOL_LIMIT,
    successCb,
    errorCb
  );
};
