# StreamQueue
> StreamQueue pipe the queued streams one by one in order to preserve their content
 order.

[![NPM version](https://badge.fury.io/js/streamqueue.png)](https://npmjs.org/package/streamqueue) [![Build Status](https://travis-ci.org/nfroidure/StreamQueue.png?branch=master)](https://travis-ci.org/nfroidure/StreamQueue) [![Dependency Status](https://david-dm.org/nfroidure/streamqueue.png)](https://david-dm.org/nfroidure/streamqueue) [![devDependency Status](https://david-dm.org/nfroidure/streamqueue/dev-status.png)](https://david-dm.org/nfroidure/streamqueue#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/nfroidure/StreamQueue/badge.png?branch=master)](https://coveralls.io/r/nfroidure/StreamQueue?branch=master)

## Usage
Install the [npm module](https://npmjs.org/package/streamqueue):
```sh
npm install streamqueue --save
```
Then, in your scripts:
```js
var streamqueue = require('streamqueue');

var queue = streamqueue(
  Fs.createReadStream('input.txt'),
  Fs.createReadStream('input2.txt'),
  Fs.createReadStream('input3.txt')
).pipe(process.stdout);
```
StreamQueue also accept functions returning streams, the above can be written
 like this, doing system calls only when piping:
```js
var streamqueue = require('streamqueue');

var queue = streamqueue(
  Fs.createReadStream.bind(null, 'input.txt'),
  Fs.createReadStream.bind(null, 'input2.txt'),
  Fs.createReadStream.bind(null, 'input3.txt')
).pipe(process.stdout);
```

Object-oriented traditionnal API offers more flexibility:
```js
var StreamQueue = require('streamqueue');

var queue = new StreamQueue();
queue.queue(
  Fs.createReadStream('input.txt'),
  Fs.createReadStream('input2.txt'),
  Fs.createReadStream('input3.txt')
);
queue.done();

queue.pipe(process.stdout);
```
You can also chain StreamQueue methods like that:
```js
var StreamQueue = require('streamqueue');

new StreamQueue()
  .queue(Fs.createReadStream('input.txt'))
  .queue(Fs.createReadStream('input2.txt'))
  .queue(Fs.createReadStream('input3.txt'))
  .done()
  .pipe(process.stdout);
```

You can queue new streams at any moment until you call the done() method. So the
 created stream will not fire the end event until done() call.

Note that stream queue is compatible with the Node 0.10+ streams. For older
 streams, stream queue will wrap them with
 [`Readable.wrap`](http://nodejs.org/api/stream.html#stream_readable_wrap_stream)
 before queueing.

## API

### StreamQueue([options], [stream1, stream2, ... streamN])

#### options

##### options.objectMode
Type: `Boolean`
Default value: `false`

Use if piped in streams are in object mode. In this case, the stream queue will
 also be in the object mode.

##### options.pauseFlowingStream
Type: `Boolean`
Default value: `true`

If a stream is in flowing mode, then it will be paused before queueing.

##### options.resumeFlowingStream
Type: `Boolean`
Default value: `true`

If a stream is in flowing mode, then it will be resumed before piping.

##### options.*

StreamQueue inherits of Stream.PassThrough, the options are passed to the
 parent constructor so you can use it's options too.

#### streamN
Type: `Stream`

Append streams given in argument to the queue and ends when the queue is empty.

### StreamQueue.queue(stream1, [stream2, ... streamN])

Append streams given in argument to the queue.

### StreamQueue.done([stream1, stream2, ... streamN])

Append streams given in argument to the queue and ends when the queue is empty.

## Stats

[![NPM](https://nodei.co/npm/streamqueue.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-iconfont/)
[![NPM](https://nodei.co/npm-dl/streamqueue.png)](https://nodei.co/npm/gulp-iconfont/)


## Contributing
Feel free to pull your code if you agree with publishing it under the MIT license.

