import expect from 'expect';
import pizzaGuy from '../src/pizza-guy.js';
import path from 'path';
import fs from 'fs-extra-promise';
import { mockImages } from './helpers/mock-images';

describe('pizza-guy', function() {
  describe('deliver', function() {
    it('should throw an error when passing a non-array object', function() {
      expect(() => pizzaGuy.deliver({})).toThrow(/deliver argument must be an array/);
    });

    it('should throw an error with arrays containing non-string objects without url property',
      function() {
        expect(() => pizzaGuy.deliver([{}])).toThrow(
          /deliver argument must contains just strings or objects with the url property/
        );
      }
    );

    it('should return itself when running correctly', function() {
      expect(pizzaGuy.deliver([
        'http://andrescarreno.co/storage/cache/images/000/317/IMG-2606,huge.1459740781.jpg',
        { url: 'http://andrescarreno.co/storage/cache/images/000/317/IMG-2606,huge.1459740781.jpg', name: 'andres.jpg' }
      ])).toBe(pizzaGuy);
    });
  });

  describe('onAddress', function() {
    it('should throw an error for non-strings', function() {
      expect(() => pizzaGuy.onAddress(null)).toThrow(/onAddress argument must be a string/);
    });

    it('should return itself when running with a relative path', function() {
      expect(pizzaGuy.onAddress('./test-path/')).toBe(pizzaGuy);
    });

    it('should return itself when running with an absolute path', function() {
      expect(pizzaGuy.onAddress('/test-path/')).toBe(pizzaGuy);
    });
  });

  describe('onSuccess', function() {
    it('should throw an error for non-function values', function() {
      expect(() => pizzaGuy.onSuccess(null)).toThrow('onSuccess argument must be a function');
    });

    it('should return itself when running correctly', function() {
      expect(pizzaGuy.onSuccess(() => {})).toBe(pizzaGuy);
    });
  });

  describe('onError', function() {
    it('should throw an error for non-function values', function() {
      expect(() => pizzaGuy.onError(null)).toThrow('onError argument must be a function');
    });

    it('should return itself when running correctly', function() {
      expect(pizzaGuy.onError(() => {})).toBe(pizzaGuy);
    });
  });

  describe('onComplete', function() {
    it('should throw an error for non-function values', function() {
      expect(() => pizzaGuy.onComplete(null)).toThrow('onComplete argument must be a function');
    });

    it('should return itself when running correctly', function() {
      expect(pizzaGuy.onComplete(() => {})).toBe(pizzaGuy);
    });
  });

  describe('start', function() {
    it('should return undefined', function() {
      expect(pizzaGuy.deliver([]).start()).toBe(undefined);
    });
  });

  describe('end', function() {
    it('should call onComplete after all the images where downloaded', function(done) {
      const baseUrl = 'http://local.foo.com';
      const images = [
        'test/fixtures/images/image-1.jpg',
        'test/fixtures/images/image-2.jpg',
        'test/fixtures/images/image-3.jpg'
      ];

      const imagesUrls = images.map(image => `${baseUrl}/${path.parse(image).base}`);

      mockImages(baseUrl, images);

      pizzaGuy
        .deliver(imagesUrls)
        .onAddress('./_tmp/foo')
        .onComplete(function() {
          const downloadedFiles = fs.readdirSync('./_tmp/foo');

          expect(downloadedFiles).toEqual([
            'image-1.jpg',
            'image-2.jpg',
            'image-3.jpg'
          ]);

          // TODO: Add physical check of files (checksum probably)

          fs.removeSync('./_tmp'); // Remove the generated files
          done();
        })
        .start();
    });
  });
});
