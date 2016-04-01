# pizza-guy
[![Travis](https://img.shields.io/travis/andresdavid90/pizza-guy.svg?style=flat-square)](https://travis-ci.org/andresdavid90/pizza-guy)
[![Codecov](https://img.shields.io/codecov/c/github/andresdavid90/pizza-guy.svg?style=flat-square)](https://codecov.io/github/andresdavid90/pizza-guy)
[![NPM](https://img.shields.io/npm/v/pizza-guy.svg?style=flat-square)](https://www.npmjs.com/package/pizza-guy)
[![Downloads Total](https://img.shields.io/npm/dt/pizza-guy.svg?style=flat-square)](https://www.npmjs.com/package/pizza-guy)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Semantic Released](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


If you already have a big list of urls of files that you want to download but you don't know how, this is your module.

The idea is to support really big lists of files that would be insane to download by hand.

## How to use

```
const pizzaGuy = require('pizza-guy');

const images = [
  'http://some.domain.com/file0.jpg',
  'http://some.domain.com/file1.jpg',
  'http://some.domain.com/file2.jpg',
  'http://some.domain.com/file3.jpg',
  'http://some.domain.com/file4.jpg'
];

pizzaGuy
  .deliver(images)
  .onAddress('./some-path')
  .start();
```

## NOT STABLE

We just started with this and it is definitely not stable. For now use it at your own risk.
