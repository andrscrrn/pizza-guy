'use strict';

const dataAdapter = require('./data-adapter');
const downloadPool = require('./download-pool');

let filesList = null;
let savePath = null;

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

function start () {
  downloadPool(
    filesList
  );
}

module.exports = {
  deliver: setFilesList,
  onAddress: setDestinyFolder,
  start: start
};
