import downloadFile from '../src/download-file';
import expect from 'expect';

describe('downloadFile()', function() {
  it('should return fileName and isRepeated: true if the file already exists', async function() {
    const file = {
      fileName: './test/fixtures/images/image-1.jpg'
    };

    const { fileName, isRepeated } = await downloadFile(file);

    expect(fileName).toEqual(fileName);
    expect(isRepeated).toBe(true);
  });
});
