var assert = require('assert')
  , es = require('event-stream')
  , StreamQueue = require('../src')
  , PlatformStream = require('stream')
  , Stream = require('readable-stream')
;

// Test each type of stream
[PlatformStream, Stream].slice(PlatformStream.Readable ? 0 : 1)
  .forEach(function(Stream) {

// Helpers
function writeToStreamSync(stream, chunks) {
  if(!chunks.length) {
    stream.end();
  } else {
    stream.write(chunks.shift());
    writeToStreamSync(stream, chunks);
  }
  return stream;
}
function writeToStream(stream, chunks) {
  if(!chunks.length) {
    stream.end();
  } else {
    setImmediate(function() {
      stream.write(chunks.shift());
      writeToStream(stream, chunks);
    });
  }
  return stream;
}
function readableStream(chunks) {
  var stream = new Stream.Readable();
  stream._read = function() {
    if(chunks.length) {
      setImmediate(function() {
        stream.push(chunks.shift());
        if(!chunks.length) {
          stream.push(null);
        }
      });
    }
  }
  stream.resume();
  return stream;
}
function erroredStream(msg) {
  var erroredStream = new Stream.PassThrough();
  setImmediate(function() {
    erroredStream.emit('error', new Error(msg));
    erroredStream.end();
  });
  return erroredStream;
}

// Tests
describe('StreamQueue', function() {

  describe('in binary mode', function() {

    describe('and with async streams', function() {

      it('should work with functionnal API', function(done) {
        StreamQueue(
          writeToStream(new Stream.PassThrough(), ['wa','dup']),
          writeToStream(new Stream.PassThrough(), ['pl','op']),
          writeToStream(new Stream.PassThrough(), ['ki','koo','lol'])
        ).pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
      });

      it('should work with functionnal API and options', function(done) {
        StreamQueue({pause: true},
          writeToStream(new Stream.PassThrough(), ['wa','dup']),
          writeToStream(new Stream.PassThrough(), ['pl','op']),
          writeToStream(new Stream.PassThrough(), ['ki','koo','lol'])
        ).pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
      });

      it('should work with POO API', function(done) {
        var queue = new StreamQueue();
        queue.queue(writeToStream(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should pause streams in flowing mode', function(done) {
        var queue = new StreamQueue({
          pauseFlowingStream: true,
          resumeFlowingStream: true
        });
        queue.queue(readableStream(['wa','dup']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should work with POO API and options', function(done) {
        var queue = new StreamQueue({
          pauseFlowingStream: true,
          resumeFlowingStream: true
        });
        queue.queue(writeToStream(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should work with POO API and a late done call', function(done) {
        var queue = new StreamQueue();
        queue.queue(writeToStream(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        setTimeout(function() {
          queue.done();
        }, 100);
      });

      it('should reemit errors', function(done) {
        var gotError = false;
        var queue = new StreamQueue();
        queue.queue(erroredStream('Aouch!'));
        queue.queue(writeToStream(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStream(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 4);
        queue.on('error', function(err) {
          gotError = true;
        });
        queue.pipe(es.wait(function(err, data) {
          assert(gotError);
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

    });

    describe('and with sync streams', function() {

      it('should work with functionnal API', function(done) {
        StreamQueue(
          writeToStreamSync(new Stream.PassThrough(), ['wa','dup']),
          writeToStreamSync(new Stream.PassThrough(), ['pl','op']),
          writeToStreamSync(new Stream.PassThrough(), ['ki','koo','lol'])
        ).pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
      });

      it('should work with POO API', function(done) {
        var queue = new StreamQueue();
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should emit an error when calling done twice', function(done) {
        var queue = new StreamQueue();
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
        assert.throws(function() {
          queue.done();
        });
      });

      it('should emit an error when queueing after done was called', function(done) {
        var queue = new StreamQueue();
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
        assert.throws(function() {
          queue.queue(new Stream.PassThrough());
        });
      });

      it('should reemit errors', function(done) {
        var gotError = false;
        var queue = new StreamQueue();
        queue.queue(erroredStream('Aouch!'));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['wa','dup']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['pl','op']));
        queue.queue(writeToStreamSync(new Stream.PassThrough(), ['ki','koo','lol']));
        assert.equal(queue.length, 4);
        queue.on('error', function(err) {
          gotError = true;
          assert.equal(err.message, 'Aouch!');
        });
        queue.pipe(es.wait(function(err, data) {
          assert(gotError);
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

    });

    describe('and with functions returning streams', function() {

      it('should work with functionnal API', function(done) {
        StreamQueue(function() {
          return writeToStream(new Stream.PassThrough(), ['wa','dup']);
        }, function() {
          return writeToStream(new Stream.PassThrough(), ['pl','op']);
        }, function() {
          return writeToStream(new Stream.PassThrough(), ['ki','koo','lol']);
        }).pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
      });

      it('should work with functionnal API and options', function(done) {
        var stream1 = new Stream.PassThrough()
          , stream2 = new Stream.PassThrough()
          , stream3 = new Stream.PassThrough()
        ;
        StreamQueue({pause: true},
          function() {
            return writeToStream(new Stream.PassThrough(), ['wa','dup']);
          }, function() {
            return writeToStream(new Stream.PassThrough(), ['pl','op']);
          }, function() {
            return writeToStream(new Stream.PassThrough(), ['ki','koo','lol']);
          })
          .pipe(es.wait(function(err, data) {
            assert.equal(err, null);
            assert.equal(data, 'wadupplopkikoolol');
            done();
          }));
      });

      it('should work with POO API', function(done) {
        var queue = new StreamQueue();
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['wa','dup']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['pl','op']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['ki','koo','lol']);
        });
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should pause streams in flowing mode', function(done) {
        var queue = new StreamQueue({
          pauseFlowingStream: true,
          resumeFlowingStream: true
        });
        queue.queue(function() {
          return readableStream(['wa','dup']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['pl','op']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['ki','koo','lol']);
        });
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should work with POO API and options', function(done) {
        var queue = new StreamQueue({
          pauseFlowingStream: true,
          resumeFlowingStream: true
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['wa','dup']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['pl','op'])
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['ki','koo','lol'])
        });
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

      it('should work with POO API and a late done call', function(done) {
        var queue = new StreamQueue();
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['wa','dup']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['pl','op'])
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['ki','koo','lol'])
        });
        assert.equal(queue.length, 3);
        queue.pipe(es.wait(function(err, data) {
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        setTimeout(function() {
          queue.done();
        }, 100);
      });

      it('should reemit errors', function(done) {
        var gotError = false;
        var queue = new StreamQueue();
        queue.queue(erroredStream('Aouch!'));
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['wa','dup']);
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['pl','op'])
        });
        queue.queue(function() {
          return writeToStream(new Stream.PassThrough(), ['ki','koo','lol'])
        });
        assert.equal(queue.length, 4);
        queue.on('error', function(err) {
          gotError = true;
        });
        queue.pipe(es.wait(function(err, data) {
          assert(gotError);
          assert.equal(err, null);
          assert.equal(data, 'wadupplopkikoolol');
          done();
        }));
        queue.done();
      });

    });

  });

  describe('in object mode', function() {

    var objs = [];
    it('should work', function(done) {
      var queue = new StreamQueue({objectMode: true});
      queue.queue(writeToStream(new Stream.PassThrough({objectMode: true}), [{s:'wa'},{s:'dup'}]));
      queue.queue(writeToStream(new Stream.PassThrough({objectMode: true}), [{s:'pl'},{s:'op'}]));
      queue.queue(writeToStream(new Stream.PassThrough({objectMode: true}), [{s:'ki'},{s:'koo'},{s:'lol'}]));
      queue.on('data', objs.push.bind(objs));
      queue.pipe(es.wait(function(err, data) {
        assert.equal(err, null);
        assert.deepEqual(objs, [{s:'wa'},{s:'dup'},{s:'pl'},{s:'op'},{s:'ki'},{s:'koo'},{s:'lol'}]);
        done();
      }));
      queue.done();
    });

  });

});

});
