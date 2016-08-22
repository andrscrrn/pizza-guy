import downloadFile from '../src/download-file';
import expect from 'expect';
import fs from 'fs-extra-promise';
import { mockImages } from './helpers/mock-images';

describe('download-file', function() {
  it('should return fileName and isRepeated: true if the file already exists', async function() {
    const file = {
      fileName: './test/fixtures/images/image-1.jpg'
    };

    const { fileName, isRepeated } = await downloadFile(file);

    expect(fileName).toEqual(file.fileName);
    expect(isRepeated).toBe(true);
  });

  it('should return fileName and isRepeated: false if the file does not exists', async function() {
    const baseUrl = 'local.foo.com/';
    const images = ['./test/fixtures/images/image-1.jpg'];

    mockImages(baseUrl, images);

    const file = {
      fileName: 'image-1.jpg',
      host: baseUrl,
      path: 'foo.jpg'
    };

    const { fileName, isRepeated } = await downloadFile(file);

    expect(fileName).toEqual(file.fileName);
    expect(isRepeated).toBe(false);

    await fs.removeAsync('image-1.jpg');
  });
});
