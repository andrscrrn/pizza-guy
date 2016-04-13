'use strict';

const dataAdapter = require('./data-adapter');
const downloadFile = require('./download-file');

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
  filesList
    .forEach((file) => {
      downloadFile(file)
        .then((fileName)=>{
          console.log(`${fileName} done.`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
}

module.exports = {
  deliver: setFilesList,
  onAddress: setDestinyFolder,
  start: start
};
