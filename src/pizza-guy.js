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
    invariant(Array.isArray(list), 'The list must be an array');

    const isValidList = list.every(
        (item) => typeof item === 'string' || item.hasOwnProperty('url')
    );

    invariant(
      isValidList,
      'The list must contains just strings or be objects with the url property.'
    );

    filesList = list;

    return this;
  },

  onAddress(path) {
    invariant(typeof path === 'string', 'The address must be a string');

    savePath = path;

    return this;
  },

  onSuccess(cb) {
    invariant(typeof cb === 'function', 'The onSuccess must be a function');

    successCallback = cb;

    return this;
  },

  onError(cb) {
    invariant(typeof cb === 'function', 'The onError must be a function');

    errorCallback = cb;

    return this;
  },

  onComplete(cb) {
    invariant(typeof cb === 'function', 'The onComplete must be a function');

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
