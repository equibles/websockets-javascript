# Equibles WebSockets live quotes for JavaScript

## Getting Started


### Browser
```html
<script type="text/javascript" src="dist/all.min.js"></script>
<script type="text/javascript">
    (async () => {
        let client = new Equibles.Client("MY_API_KEY", ["AAPL", "GOOG", "TSLA"]);

        client.addQuoteListener(q => {
            console.log(q);
        });

        await client.connect();
    })();
</script>

```

### Node JS
```javascript
import {Client} from '@equibles/websockets';

let client = new Client("MY_API_KEY", ["AAPL", "GOOG", "TSLA"]);

client.addQuoteListener(q => {
    console.log(q);
});

await client.connect();
```


## Author
[Equibles](https://www.equibles.com)\
contact@equibles.com
