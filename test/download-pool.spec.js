import expect from 'expect';
import { splice } from '../src/download-pool';

describe('downloadPool', function() {
  it('splice() - should return spliced array', function() {
    const arr = [];
    const result = splice(arr, 10);

    expect(result.length).toEqual(0);
  });

  it('splice() - should return an array of arrays with exactly the same size', function() {
    const arr = ['foo', 'bar', 'baz', 'foobar'];
    const expectedResult = [['foo', 'bar'], ['baz', 'foobar']];
    const result = splice(arr, 2);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expectedResult);
  });

  it('splice() - should return an array of arrays, arr.length % limit !== 0', function() {
    const arr = ['foo', 'bar', 'baz', 'foobar'];
    const expectedResult = [['foo', 'bar', 'baz'], ['foobar']];
    const result = splice(arr, 3);

    expect(result.length).toEqual(2);
    expect(result).toEqual(expectedResult);
  });
});
