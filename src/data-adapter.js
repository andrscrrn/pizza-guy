'use strict';

const url = require('url');
const path = require('path');

const parseDirPath = (dirPath) => {
  let newPath = '';
  if (path.isAbsolute(dirPath)) {
    newPath = `${dirPath}/`;
  } else {
    newPath = `${process.cwd()}/${dirPath}/`
      .replace('./', '');
  }
  return path.normalize(newPath);
};

module.exports = (data, savePath) => {
  return Array.from(new Set(data)).map((link) => {
    return {
      host: url.parse(link).host,
      path: url.parse(link).path,
      fileName: `${parseDirPath(savePath)}${path.basename(link)}`
    };
  });
};
