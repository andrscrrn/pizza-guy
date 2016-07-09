/* eslint max-nested-callbacks: [2, 4] */

import expect from 'expect';
import pizzaGuy from '../src/pizza-guy.js';

describe('pizza-guy', () => {
  describe('deliver', () => {
    it('should throw an error when passing a non-array object', () => {
      expect(() => {
        pizzaGuy.deliver({});
      }).toThrow(/The list must be an array/);
    });
    it('should throw an error with arrays containing non-string objects', () => {
      expect(() => {
        pizzaGuy.deliver([{}]);
      }).toThrow(/The list must contains just strings/);
    });
    it('should return itself when running correctly', () => {
      expect(pizzaGuy.deliver([
        'http://andrescarreno.co/storage/cache/images/000/317/IMG-2606,huge.1459740781.jpg'
      ])).toBe(pizzaGuy);
    });
  });

  describe('onAddress', () => {
    it('should throw an error for non-strings', () => {
      expect(() => {
        pizzaGuy.onAddress(null);
      }).toThrow(/The address must be a string/);
    });
    it('should return itself when running with a relative path', () => {
      expect(pizzaGuy.onAddress('./test-path/')).toBe(pizzaGuy);
    });
    it('should return itself when running with an absolute path', () => {
      expect(pizzaGuy.onAddress('/test-path/')).toBe(pizzaGuy);
    });
  });

  describe('onSuccess', () => {
    it('should throw an error for non-function values', () => {
      expect(() => {
        pizzaGuy.onSuccess(null);
      }).toThrow('Must be a function');
    });
    it('should return itself when running correctly', () => {
      expect(pizzaGuy.onSuccess(() => {})).toBe(pizzaGuy);
    });
  });

  describe('onError', () => {
    it('should throw an error for non-function values', () => {
      expect(() => {
        pizzaGuy.onError(null);
      }).toThrow('Must be a function');
    });
    it('should return itself when running correctly', () => {
      expect(pizzaGuy.onError(() => {})).toBe(pizzaGuy);
    });
  });

  describe('start', () => {
    it('should return undefined', () => {
      expect(pizzaGuy.deliver([]).start()).toBe(undefined);
    });
  });
});
