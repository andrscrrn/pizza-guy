import nock from 'nock';
import path from 'path';
import downloadFile from '../src/download-file';
import fs from 'fs';
import expect from 'expect';

nock('http://local.foo.com')
  .persist()
  .get('/image-1.jpg')
  .replyWithFile(200, path.join(__dirname, 'fixtures/images/image-1.jpg'), {
    'content-type': 'image/jpg'
  });

describe('HTTP Server', () => {
  it('should create an array of objects when passing an array of relative paths', async () => {
    const file = await downloadFile({
      host: 'http://local.foo.com',
      path: '/image-1.jpg',
      fileName: 'test/whatever-1.jpg'
    });

    expect(file).toEqual({
      fileName: 'test/whatever-1.jpg',
      isRepeated: false
    });

    fs.unlinkSync('./test/whatever-1.jpg');
  });
});
