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

describe('HTTP Server', function() {
  it('should download a file using nock', async function() {
    const file = await downloadFile({
      host: 'local.foo.com',
      path: '/image-1.jpg',
      fileName: 'test/whatever-1.jpg'
    });

    expect(file).toEqual({
      fileName: 'test/whatever-1.jpg',
      isRepeated: false
    });

    fs.unlinkSync('./test/whatever-1.jpg');
  });

  afterEach(function() {
    nock.restore();
  });
});
