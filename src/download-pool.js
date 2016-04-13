'use strict';

const downloadFile = require('./download-file');

const POOL_LIMIT = 6;

function splice(arr, limit) {
  let slicedArray = [];
  while(arr.length) {
    let temp = arr.splice(0, limit);
    slicedArray.push(temp);
  }
  return slicedArray;
}

function batchDownload(arr, limit, successCb, errorCb) {
  let downloadIndex = 0;
  arr
    .shift()
    .forEach((file) => {
      downloadFile(file)
        .then((fileName) => {
          successCb(fileName);
          if (++downloadIndex % limit === 0) {
            batchDownload(arr, limit, successCb, errorCb);
          }
        })
        .catch((error, fileName) => {
          errorCb(fileName);
          console.log(error);
        });
    }
  );
}

module.exports = (list, successCb, errorCb) => {
  batchDownload(
    splice(list, POOL_LIMIT),
    POOL_LIMIT,
    successCb,
    errorCb
  );
};
