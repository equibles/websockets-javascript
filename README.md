# Equibles WebSockets live quotes for JavaScript

## Getting Started

Checkout the index.js file

```javascript
import Client from './client.js';

let client = new Client("MY_API_KEY", ["AAPL", "GOOG", "TSLA"]);

client.addQuoteListener(q => {
    console.log(q);
});

await client.connect();
```


## Author
[Equibles](https://www.equibles.com)\
contact@equibles.com
