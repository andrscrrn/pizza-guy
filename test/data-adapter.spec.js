import expect from 'expect';
import dataAdapter from '../src/data-adapter.js';

describe('data-adapter', () => {
  it('should create an array of objects when passing an array of relative paths', () => {
    expect(
      dataAdapter(
        [
          'http://some.domain.com/image1.jpg',
          { url: 'http://someother.domain.com/image2.jpg', name: 'image2_renamed.jpg' }
        ],
        'myfolder'
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: `${process.cwd()}/myfolder/image1.jpg`
    },
    {
      host: 'someother.domain.com',
      path: '/image2.jpg',
      fileName: `${process.cwd()}/myfolder/image2_renamed.jpg`
    }]);
  });

  it('should create an array of objects when passing an array of absolute paths', () => {
    expect(
      dataAdapter(
        [
          'http://some.domain.com/image1.jpg',
          { url: 'http://someother.domain.com/image2.jpg', name: 'image2_renamed.jpg' }
        ],
        '/myfolder'
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: '/myfolder/image1.jpg'
    },
    {
      host: 'someother.domain.com',
      path: '/image2.jpg',
      fileName: '/myfolder/image2_renamed.jpg'
    }]);
  });

  it('should create an array of objects without providing the savePath parameter', () => {
    expect(
      dataAdapter(
        [
          'http://some.domain.com/image1.jpg',
          { url: 'http://someother.domain.com/image2.jpg', name: 'image2_renamed.jpg' }
        ]
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: `${process.cwd()}/image1.jpg`
    },
    {
      host: 'someother.domain.com',
      path: '/image2.jpg',
      fileName: `${process.cwd()}/image2_renamed.jpg`
    }]);
  });

  it('should use original image name if name property is unset or empty', () => {
    expect(
      dataAdapter(
        [
           { url: 'http://some.domain.com/image1.jpg', name: '' },
          { url: 'http://someother.domain.com/image2.jpg' }
        ],
        'myfolder'
      )
    ).toEqual([{
      host: 'some.domain.com',
      path: '/image1.jpg',
      fileName: `${process.cwd()}/myfolder/image1.jpg`
    },
    {
      host: 'someother.domain.com',
      path: '/image2.jpg',
      fileName: `${process.cwd()}/myfolder/image2.jpg`
    }]);
  });
});
