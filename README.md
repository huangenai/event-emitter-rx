# EventEmitterRx

EventEmitter using [RxJS](https://github.com/Reactive-Extensions/RxJS).

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

[npm-url]: https://www.npmjs.com/package/eventemitter-rx
[npm-image]: https://badge.fury.io/js/eventemitter-rx.svg
[travis-url]: https://travis-ci.org/stylelab-io/event-emitter-rx
[travis-image]: https://travis-ci.org/stylelab-io/event-emitter-rx.svg?branch=master

### TSD files are available at our [stylelab-io/DefinitelyTyped](https://github.com/stylelab-io/DefinitelyTyped/tree/master/eventemitter-rx) fork

## Usage

```typescript

// import of EventEmitter
import EventEmitter from 'eventemitter-rx';

// create an instance of it
const emitter:EventEmitter = new EventEmitter();

// dispatching an event
const EVENT:string = 'myEvent';
emitter.next(EVENT);

// dispatching an event with data
const DATA: string = 'myData';
emitter.next(EVENT, DATA);

// subscribing to an event
emitter.subscribe(EVENT, () => {
    console.log('handle event');
});

// subscribing to an event and handling of its data
emitter.subscribe(EVENT, (DATA) => {
    console.log('event data', DATA);
});

// unsubscribing to an event
var observer:Rx.IDisposable = emitter.subscribe(EVENT, () => {
    console.log('handle event');
});
observer.dispose();

```


## Test

![Running tests](/wiki/screenshot_test.png)

Clone project:

Run tests:

```bash
$ npm run test
```

## Release History

[History](./HISTORY.md)


## License

[MIT license](./LICENSE.md).
