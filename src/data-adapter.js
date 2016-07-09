import url from 'url';
import path from 'path';

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

export default function getDataAdapterOptions(data, savePath = process.cwd()) {
  return Array.from(new Set(data)).map((link) => ({
    host: url.parse(link).host,
    path: url.parse(link).path,
    fileName: `${parseDirPath(savePath)}${path.basename(link)}`
  }));
}
