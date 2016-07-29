const pizzaGuy = require('../dist/pizza-guy');
const images = [
  'http://www.pizzabellabristol.com/images/pizza.jpg',
  'http://www.italianpizzas.co.uk/assets/images/italianpizza.jpg',
  'http://www.mrwallpaper.com/wallpapers/delicious-italian-pizza.jpg',
  'http://previews.123rf.com/images/foodandmore/foodandmore1209/foodandmore120900019/15145674-Delicious-freshly-cooked-homemade-vegetarian-Italian-pizza-topped-with-cheese-vegetables-and-fresh-h-Stock-Photo.jpg',
  'http://previews.123rf.com/images/foodandmore/foodandmore1304/foodandmore130400224/19271412-Italian-pizza-with-tomato-topped-with-melted-golden-cheese-herbs-and-basil-served-on-a-round-wooden--Stock-Photo.jpg',
  'http://www.godine.co.uk/blog/wp-content/uploads/2009/12/Italian-pizza1.jpg',
  'http://www.chamonix.com/img/sitra/fiche/39493-1-pizza-valerio.jpg',
  'http://previews.123rf.com/images/jagcz/jagcz1211/jagcz121100303/16598280-Delicious-italian-pizza-served-on-wooden-table-Stock-Photo-pizza-food-vegetarian.jpg'
];

pizzaGuy
  .deliver(images)
  .onAddress('./demo/downloaded-images')
  .onSuccess((info) => {
    console.log(`Downloaded: ${info.fileName}`);
  })
  .onError((info) => {
    console.log(`Download ${info.fileName} failed`);
  })
  .start();
