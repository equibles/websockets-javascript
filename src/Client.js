import * as signalR from '@microsoft/signalr';
import * as messagePack from '@microsoft/signalr-protocol-msgpack';

export class Client {
    constructor(apiKey, tickers) {
        this.apiKey = apiKey;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://websockets.equibles.com/stocks")
            .withHubProtocol(new messagePack.MessagePackHubProtocol())
            .build();
        this.quoteListeners = [];
        this.listenersRegistered = false;
        this.tickers = [...tickers];
    }

    sendAddTickers(tickers) {
        this.tickers = new Set([...this.tickers, ...tickers])
        this.connection.send("StartListening", tickers);
    }

    sendStopTickers(tickers) {
        this.tickers = this.tickers.filter(t => tickers.indexOf(t) === -1);
        this.connection.send("StopListening", tickers);
    }

    async connect() {
        if (this.connection.state !== signalR.HubConnectionState.Disconnected) {
            return;
        }

        // Register the message listeners
        this.registerListeners();

        // Open the connection
        await this.connection.start();

        await this.connection.send("Authentication", this.apiKey);
    }

    addQuoteListener(callback){
        if(typeof callback !== "function"){
            throw "The callback of addQuoteListener must be a function.";
        }
        this.quoteListeners.push(callback);
    }

    registerListeners() {
        if (this.listenersRegistered) return;
        this.listenersRegistered = true;

        this.connection.onclose((error) => {
            console.log(`Connection closed. Reason: ${error.message}`);
        });

        this.connection.onreconnected((message) => {
            console.log("Reconnected. " + message);
            this.connection.send("Authentication", this.apiKey);
        });

        this.connection.on("Quote", (quote) => {
            for (let listener of this.quoteListeners) {
                listener(quote);
            }
        });

        this.connection.on("AuthenticationResult", (success, errorMessage) => {
            if (success) {
                this.sendAddTickers(this.tickers);
            } else {
                console.log("Error while authenticating. Message: " + errorMessage);
            }
        });

        this.connection.on("StartListeningResult", (success, errorMessage) => {
            if (success) {
                console.log("Connection successful. Waiting for quotes...");
            } else {
                console.log("Error while adding tickers. Message: " + errorMessage);
            }
        });

        this.connection.on("StopListeningResult", (success, errorMessage) => {
            if (success) {
                console.log("Stopped listening to tickers with success.");
            } else {
                console.log("Error while removing tickers. Message: " + errorMessage);
            }
        });
    }
};
