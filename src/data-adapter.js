import url from 'url';
import path from 'path';

const parseDirPath = (dirPath) => {
  let newPath = '';
  if (path.isAbsolute(dirPath)) {
    newPath = `${dirPath}/`;
  } else {
    newPath = `${process.cwd()}/${dirPath}/`.replace('./', '');
  }
  return path.normalize(newPath);
};

const removeDuplicates = arr => Array.from(new Set(arr));

export default function getDataAdapterOptions(data, savePath = process.cwd()) {
  return removeDuplicates(data).map((urlString) => ({
    host: url.parse(urlString).host,
    path: url.parse(urlString).path,
    fileName: `${parseDirPath(savePath)}${path.basename(urlString)}`
  }));
}
