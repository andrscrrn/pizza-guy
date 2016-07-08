# pizza-guy
[![Travis](https://img.shields.io/travis/andresdavid90/pizza-guy.svg?style=flat-square)](https://travis-ci.org/andresdavid90/pizza-guy)
[![Codecov](https://img.shields.io/codecov/c/github/andresdavid90/pizza-guy.svg?style=flat-square)](https://codecov.io/github/andresdavid90/pizza-guy)
[![NPM](https://img.shields.io/npm/v/pizza-guy.svg?style=flat-square)](https://www.npmjs.com/package/pizza-guy)
[![Downloads Total](https://img.shields.io/npm/dt/pizza-guy.svg?style=flat-square)](https://www.npmjs.com/package/pizza-guy)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Semantic Released](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


If you already have a big list of urls of files that you want to download but you don't know how, this is your module.

The idea is to support really big lists of files that would be insane to download simultaneusly since Node would break for this kind of cases.

## How to use

```
const pizzaGuy = require('pizza-guy');

const images = [
  'http://some.domain.com/file0.jpg',
  'https://some.domain.com/file1.gif',
  'https://some.domain.com/file2.png'
];

pizzaGuy
  .deliver(images)
  .onAddress('./some-path')
  .onSuccess((info) => {
    console.log(`${info.fileName} succeed!`);
  })
  .onError((info) => {
    console.log(`${info.fileName} failed`);
  })
  .start();
```

## STABLE!

Or that is what it seems to be. Please report an issue if you find out that this is not true.
