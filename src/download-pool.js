'use strict';

const downloadFile = require('./download-file');

const POOL_LIMIT = 6;

function sliceByLimit(arrayToSlice) {
  let slicedArray = [];
  while(arrayToSlice.length) {
    let temp = arrayToSlice.splice(0, POOL_LIMIT);
    slicedArray.push(temp);
  }
  return slicedArray;
}

function batchDownload(arr, successCb, errorCb) {
  let downloadIndex = 0;
  arr
    .shift()
    .forEach((file) => {
      downloadFile(file)
        .then((fileName) => {
          successCb(fileName);
          if (++downloadIndex % POOL_LIMIT === 0) {
            batchDownload(arr, successCb, errorCb);
          }
        })
        .catch((error, fileName) => {
          errorCb(fileName);
          console.log(error);
        });
    }
  );
}

module.exports = function(list, successCb, errorCb) {
  batchDownload(
    sliceByLimit(list),
    successCb,
    errorCb
  );
};
