import downloadFile from '../src/download-file';
import expect from 'expect';
import mock from 'mock-fs';

const file = {
  fileName: 'foo-file.txt',
  host: 'foo-host',
  path: 'fake-path'
};

function createFakeFile() {
  mock({
    [file.fileName]: mock.file({
      content: 'bla bla bla'
    })
  });
}

describe('downloadFile()', function() {
  beforeEach(function() {
    createFakeFile();
  });

  afterEach(function() {
    mock.restore();
  });

  it('should return fileName and isRepeated: true if the file already exists', async function() {
    const { fileName, isRepeated } = await downloadFile(file);

    expect(fileName).toEqual(fileName);
    expect(isRepeated).toBe(true);
  });
});
