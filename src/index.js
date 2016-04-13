'use strict';

const dataAdapter = require('./data-adapter');
const downloadPool = require('./download-pool');

let filesList = null;
let savePath = null;
let successCallback;
let errorCallback;

function setFilesList(list) {
  filesList = dataAdapter(
    list,
    savePath ? savePath : process.cwd()
  );
  return this;
}

function setDestinyFolder(path) {
  savePath = path;
  return this;
}

function setSuccessCallback(cb) {
  successCallback = cb;
  return this;
}

function setErrorCallback(cb) {
  errorCallback = cb;
  return this;
}

function start () {
  downloadPool(
    filesList,
    successCallback,
    errorCallback
  );
}

module.exports = {
  deliver: setFilesList,
  onAddress: setDestinyFolder,
  onSuccess: setSuccessCallback,
  onError: setErrorCallback,
  start: start
};
