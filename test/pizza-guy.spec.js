import expect from 'expect';
import pizzaGuy from '../src/pizza-guy.js';

describe('pizza-guy', function() {
  describe('deliver', function() {
    it('should throw an error when passing a non-array object', function() {
      expect(() => pizzaGuy.deliver({}))
        .toThrow(/The list must be an array/);
    });

    it('should throw an error with arrays containing non-string objects without url property',
      function() {
        expect(() => pizzaGuy.deliver([{}])).toThrow(/The list must contains just strings/);
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
      expect(() => pizzaGuy.onAddress(null)).toThrow(/The address must be a string/);
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
      expect(() => pizzaGuy.onSuccess(null)).toThrow('Must be a function');
    });

    it('should return itself when running correctly', function() {
      expect(pizzaGuy.onSuccess(() => {})).toBe(pizzaGuy);
    });
  });

  describe('onError', function() {
    it('should throw an error for non-function values', function() {
      expect(() => pizzaGuy.onError(null)).toThrow('Must be a function');
    });

    it('should return itself when running correctly', function() {
      expect(pizzaGuy.onError(() => {})).toBe(pizzaGuy);
    });
  });

  describe('start', function() {
    it('should return undefined', function() {
      expect(pizzaGuy.deliver([]).start()).toBe(undefined);
    });
  });
});
