# pizza-guy

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
