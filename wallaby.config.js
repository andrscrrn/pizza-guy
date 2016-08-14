module.exports = function (wallaby) {
  return {
    files: [
      'test/fixtures/**/*',
      'src/**/*.js'
    ],

    tests: [
      'test/**/*.spec.js'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  };
};
