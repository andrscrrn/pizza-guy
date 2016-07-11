import expect from 'expect';
import dataAdapter from '../src/data-adapter.js';

describe('data-adapter', () => {
  it('should create an array of objects when passing an array of relative paths', () => {
    expect(
      dataAdapter(
        ['http://some.domain.com/image1.jpg'],
        'myfolder'
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: `${process.cwd()}/myfolder/image1.jpg`
    }]);
  });

  it('should create an array of objects when passing an array of absolute paths', () => {
    expect(
      dataAdapter(
        ['http://some.domain.com/image1.jpg'],
        '/myfolder'
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: '/myfolder/image1.jpg'
    }]);
  });

  it('should create an array of objects without providing the savePath parameter', () => {
    expect(
      dataAdapter(
        ['http://some.domain.com/image1.jpg']
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: `${process.cwd()}/image1.jpg`
    }]);
  });
});
