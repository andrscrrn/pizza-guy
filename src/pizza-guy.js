import dataAdapter from './data-adapter';
import downloadPool from './download-pool';
import invariant from 'invariant';

let savePath = '';
let filesList = [];

let errorCallback = () => {};
let successCallback = () => {};
let completeCallback = () => {};

// Not using ES6 export syntax to avoid backward compatibility problems
module.exports = {
  deliver(list) {
    invariant(Array.isArray(list), 'deliver argument must be an array');

    const isValidList = list.every(
        (item) => typeof item === 'string' || item.hasOwnProperty('url')
    );

    invariant(
      isValidList,
      'deliver argument must contains just strings or objects with the url property'
    );

    filesList = list;

    return this;
  },

  onAddress(path) {
    invariant(typeof path === 'string', 'onAddress argument must be a string');

    savePath = path;

    return this;
  },

  onSuccess(cb) {
    invariant(typeof cb === 'function', 'onSuccess argument must be a function');

    successCallback = cb;

    return this;
  },

  onError(cb) {
    invariant(typeof cb === 'function', 'onError argument must be a function');

    errorCallback = cb;

    return this;
  },

  onComplete(cb) {
    invariant(typeof cb === 'function', 'onComplete argument must be a function');

    completeCallback = cb;

    return this;
  },

  start() {
    downloadPool({
      fileList: dataAdapter(filesList, savePath),
      onFileSuccess: successCallback,
      onFileError: errorCallback,
      onComplete: completeCallback
    });
  }
};
