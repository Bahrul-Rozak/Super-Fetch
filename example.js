const SuperFetch = require('./dist/superfetch.min.js');

// Contoh penggunaan SuperFetch
SuperFetch.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => console.log(response))
  .catch(error => console.error(error));
