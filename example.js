import {Client} from '@equibles/websockets';

let client = new Client("MY_API_KEY", ["AAPL", "GOOG", "TSLA"]);

client.addQuoteListener(q => {
    console.log(q);
});

await client.connect();
