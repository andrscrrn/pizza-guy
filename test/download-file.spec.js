import expect from 'expect';
import sinon from 'sinon';
import fs from 'fs';

import { writeImageOnDisk } from '../src/download-file';

/* eslint-disable func-names, prefer-arrow-callback */
describe('writeImageOnDisk', function() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  it('should set encoding', function() {
    const { sandbox } = this;
    const response = {
      setEncoding: sandbox.stub(),
      on: sandbox.stub()
    };

    writeImageOnDisk({
      response,
      encoding: 'foo',
      fileName: 'foo',
      resolve() {},
      reject() {}
    });

    expect(response.setEncoding.calledWith('foo')).toBe(true);
  });

  it('should call fs.mkdirSync with right params', function() {
    const { sandbox } = this;
    const response = {
      setEncoding: sandbox.stub(),
      on: sandbox.stub()
    };

    sandbox.stub(fs, 'existsSync').returns(false);
    sandbox.stub(fs, 'mkdirSync');

    writeImageOnDisk({
      response,
      encoding: 'foo',
      fileName: 'foo',
      resolve() {},
      reject() {}
    });

    expect(fs.mkdirSync.called).toBe(true);
  });
});
/* eslint-enable  func-names, prefer-arrow-callback */
