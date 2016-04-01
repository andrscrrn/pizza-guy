'use strict';

function dataAdapter (data, savePath) {

  const com = '.com';

  return data.map((url) => {

    let host = `${url.split(com)[0]}.com`;
    let path = url.split(com)[1];
    let filename = `/${url.split('/')[url.split('/').length - 1]}`;

    let fileObject = {
      host: host.replace('http://', ''),
      path: path,
      fileName: `${savePath}${filename}`
    };

    return fileObject;
  });
}

module.exports = dataAdapter;
