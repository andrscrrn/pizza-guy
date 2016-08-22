import expect from 'expect';
import { splice } from '../src/download-pool';

describe('download-pool', function() {
  describe('splice', function() {
    it('should return spliced array', function() {
      const arr = [];
      const result = splice(arr, 10);

      expect(result.length).toEqual(0);
    });

    it('should return an array of arrays with exactly the same size', function() {
      const arr = ['foo', 'bar', 'baz', 'foobar'];
      const expectedResult = [['foo', 'bar'], ['baz', 'foobar']];
      const result = splice(arr, 2);

      expect(result.length).toEqual(2);
      expect(result).toEqual(expectedResult);
    });

    it('should return an array of arrays, arr.length % limit !== 0', function() {
      const arr = ['foo', 'bar', 'baz', 'foobar'];
      const expectedResult = [['foo', 'bar', 'baz'], ['foobar']];
      const result = splice(arr, 3);

      expect(result.length).toEqual(2);
      expect(result).toEqual(expectedResult);
    });

    it('should not mutate the original array', function() {
      const baseArray = [1, 2, 3, 4, 5];
      const expectedResult = [[1, 2, 3], [4, 5]];
      const result = splice(baseArray, 3);

      expect(result.length).toEqual(2);
      expect(result).toEqual(expectedResult);
      expect(baseArray).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
