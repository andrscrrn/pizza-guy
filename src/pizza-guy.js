'use strict';

const dataAdapter = require('./data-adapter');
const downloadPool = require('./download-pool');

let savePath = '';
let filesList = [];
let errorCallback = () => {};
let successCallback = () => {};

module.exports = {
  deliver(list) {
    if (!Array.isArray(list)) {
      throw Error('The list must be an array');
    }
    if (!list.every((item) => typeof item === 'string')) {
      throw Error('The list must contains just strings');
    }
    filesList = list;
    return this;
  },
  onAddress(path) {
    if (typeof path !== 'string') {
      throw Error('The address must be a string');
    }
    savePath = path;
    return this;
  },
  onSuccess(cb) {
    if (typeof cb !== 'function') {
      throw Error('Must be a function');
    }
    successCallback = cb;
    return this;
  },
  onError(cb) {
    if (typeof cb !== 'function') {
      throw Error('Must be a function');
    }
    errorCallback = cb;
    return this;
  },
  start() {
    downloadPool(
      dataAdapter(
        filesList,
        savePath
      ),
      successCallback,
      errorCallback
    );
  }
};
