const pizzaGuy = require('../dist/pizza-guy');
const images = require('./large-data').images;

pizzaGuy
  .deliver(images)
  .onAddress('./demo/downloaded-images')
  .onSuccess((info) => {
    console.log(`Downloaded: ${info.fileName}`);
  })
  .onError((info) => {
    console.log(`Failed: ${info.fileName}`);
  })
  .start();
