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
  return removeDuplicates(data).map((item) => {
    const itemurl = (typeof item === 'string') ? item : item.url;
    let name = '';
    if (typeof item === 'string') {
      name = path.basename(item);
    } else if (!item.name) {
      name = path.basename(item.url);
    } else {
      name = item.name;
    }
    return {
      host: url.parse(itemurl).host,
      path: url.parse(itemurl).path,
      fileName: `${parseDirPath(savePath)}${name}`
    };
  });
}
