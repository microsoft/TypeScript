'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape').test
var from = require('from2')
var crypto = require('crypto')
var sink = require('flush-write-stream')
var cloneable = require('./')

test('basic passthrough', function (t) {
  t.plan(2)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))
})

test('clone sync', function (t) {
  t.plan(4)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var cloned = instance.clone()
  t.notOk(read, 'stream not started')

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))

  cloned.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))
})

test('clone async', function (t) {
  t.plan(4)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var cloned = instance.clone()
  t.notOk(read, 'stream not started')

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))

  setImmediate(function () {
    cloned.pipe(sink(function (chunk, enc, cb) {
      t.equal(chunk.toString(), 'hello world', 'chunk matches')
      cb()
    }))
  })
})

test('basic passthrough in obj mode', function (t) {
  t.plan(2)

  var read = false
  var source = from.obj(function (size, next) {
    if (read) {
      return this.push(null)
    } else {
      read = true
      this.push({ hello: 'world' })
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  instance.pipe(sink.obj(function (chunk, enc, cb) {
    t.deepEqual(chunk, { hello: 'world' }, 'chunk matches')
    cb()
  }))
})

test('multiple clone in object mode', function (t) {
  t.plan(4)

  var read = false
  var source = from.obj(function (size, next) {
    if (read) {
      return this.push(null)
    } else {
      read = true
      this.push({ hello: 'world' })
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var cloned = instance.clone()
  t.notOk(read, 'stream not started')

  instance.pipe(sink.obj(function (chunk, enc, cb) {
    t.deepEqual(chunk, { hello: 'world' }, 'chunk matches')
    cb()
  }))

  setImmediate(function () {
    cloned.pipe(sink.obj(function (chunk, enc, cb) {
      t.deepEqual(chunk, { hello: 'world' }, 'chunk matches')
      cb()
    }))
  })
})

test('basic passthrough with data event', function (t) {
  t.plan(2)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var data = ''
  instance.on('data', function (chunk) {
    data += chunk.toString()
  })

  instance.on('end', function () {
    t.equal(data, 'hello world', 'chunk matches')
  })
})

test('basic passthrough with data event on clone', function (t) {
  t.plan(3)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  var cloned = instance.clone()

  t.notOk(read, 'stream not started')

  var data = ''
  cloned.on('data', function (chunk) {
    data += chunk.toString()
  })

  cloned.on('end', function () {
    t.equal(data, 'hello world', 'chunk matches in clone')
  })

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches in instance')
    cb()
  }))
})

test('errors if cloned after start', function (t) {
  t.plan(2)

  var source = from(function (size, next) {
    this.push('hello world')
    this.push(null)
    next()
  })

  var instance = cloneable(source)

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    t.throws(function () {
      instance.clone()
    }, 'throws if cloned after start')
    cb()
  }))
})

test('basic passthrough with readable event', function (t) {
  t.plan(2)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var data = ''
  instance.on('readable', function () {
    var chunk
    while ((chunk = this.read()) !== null) {
      data += chunk.toString()
    }
  })

  instance.on('end', function () {
    t.equal(data, 'hello world', 'chunk matches')
  })
})

test('basic passthrough with readable event on clone', function (t) {
  t.plan(3)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  var cloned = instance.clone()

  t.notOk(read, 'stream not started')

  var data = ''
  cloned.on('readable', function () {
    var chunk
    while ((chunk = this.read()) !== null) {
      data += chunk.toString()
    }
  })

  cloned.on('end', function () {
    t.equal(data, 'hello world', 'chunk matches in clone')
  })

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches in instance')
    cb()
  }))
})

test('source error destroys all', function (t) {
  t.plan(3)

  var source = from()
  var instance = cloneable(source)
  var clone = instance.clone()

  source.on('error', function (err) {
    t.ok(err, 'source errors')

    instance.on('error', function (err2) {
      t.ok(err === err2, 'instance receives same error')
    })

    clone.on('error', function (err3) {
      t.ok(err === err3, 'clone receives same error')
    })
  })

  source.emit('error', new Error())
})

test('source destroy destroys all', function (t) {
  t.plan(2)

  var source = from()
  var instance = cloneable(source)
  var clone = instance.clone()

  instance.on('end', function () {
    t.pass('instance has ended')
  })

  clone.on('end', function () {
    t.pass('clone has ended')
  })

  clone.resume()
  instance.resume()

  source.destroy()
})

test('instance error destroys all but the source', function (t) {
  t.plan(2)

  var source = from()
  var instance = cloneable(source)
  var clone = instance.clone()

  source.on('close', function () {
    t.fail('source should not be closed')
  })

  instance.on('error', function (err) {
    t.is(err.message, 'beep', 'instance errors')
  })

  instance.on('close', function () {
    t.fail('close should not be emitted')
  })

  clone.on('error', function (err) {
    t.is(err.message, 'beep', 'instance errors')
  })

  clone.on('close', function () {
    t.fail('close should not be emitted')
  })

  instance.destroy(new Error('beep'))
})

test('instance destroy destroys all but the source', function (t) {
  t.plan(2)

  var source = from()
  var instance = cloneable(source)
  var clone = instance.clone()

  source.on('close', function () {
    t.fail('source should not be closed')
  })

  instance.on('end', function () {
    t.pass('instance has ended')
  })

  clone.on('end', function () {
    t.pass('clone has ended')
  })

  instance.resume()
  clone.resume()

  instance.destroy()
})

test('clone destroy does not affect other clones, cloneable or source', function (t) {
  t.plan(1)

  var source = from()
  var instance = cloneable(source)
  var clone = instance.clone()
  var other = instance.clone()

  source.on('close', function () {
    t.fail('source should not be closed')
  })

  instance.on('close', function () {
    t.fail('instance should not be closed')
  })

  other.on('close', function () {
    t.fail('other clone should not be closed')
  })

  clone.on('close', function () {
    t.pass('clone is closed')
  })

  clone.destroy()
})

test('clone remains readable if other is destroyed', function (t) {
  t.plan(3)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello')
    }
    next()
  })

  var instance = cloneable(source)
  var clone = instance.clone()
  var other = instance.clone()

  instance.pipe(sink.obj(function (chunk, enc, cb) {
    t.deepEqual(chunk.toString(), 'hello', 'instance chunk matches')
    cb()
  }))

  clone.pipe(sink.obj(function (chunk, enc, cb) {
    t.deepEqual(chunk.toString(), 'hello', 'clone chunk matches')
    cb()
  }))

  clone.on('close', function () {
    t.fail('clone should not be closed')
  })

  instance.on('close', function () {
    t.fail('instance should not be closed')
  })

  other.on('close', function () {
    t.pass('other is closed')
  })

  other.destroy()
})

test('clone of clone', function (t) {
  t.plan(6)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var cloned = instance.clone()
  t.notOk(read, 'stream not started')

  var replica = cloned.clone()
  t.notOk(read, 'stream not started')

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))

  cloned.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))

  replica.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), 'hello world', 'chunk matches')
    cb()
  }))
})

test('from vinyl', function (t) {
  t.plan(3)

  var source = from(['wa', 'dup'])

  var instance = cloneable(source)
  var clone = instance.clone()

  var data = ''
  var data2 = ''
  var ends = 2

  function latch () {
    if (--ends === 0) {
      t.equal(data, data2)
    }
  }

  instance.on('data', function (chunk) {
    data += chunk.toString()
  })

  process.nextTick(function () {
    t.equal('', data, 'nothing was written yet')
    t.equal('', data2, 'nothing was written yet')

    clone.on('data', function (chunk) {
      data2 += chunk.toString()
    })
  })

  instance.on('end', latch)
  clone.on('end', latch)
})

test('waits till all are flowing', function (t) {
  t.plan(1)

  var source = from(['wa', 'dup'])

  var instance = cloneable(source)

  // we create a clone
  instance.clone()

  instance.on('data', function (chunk) {
    t.fail('this should never happen')
  })

  process.nextTick(function () {
    t.pass('wait till nextTick')
  })
})

test('isCloneable', function (t) {
  t.plan(4)

  var source = from(['hello', ' ', 'world'])
  t.notOk(cloneable.isCloneable(source), 'a generic readable is not cloneable')

  var instance = cloneable(source)
  t.ok(cloneable.isCloneable(instance), 'a cloneable is cloneable')

  var clone = instance.clone()
  t.ok(cloneable.isCloneable(clone), 'a clone is cloneable')

  var cloneClone = clone.clone()
  t.ok(cloneable.isCloneable(cloneClone), 'a clone of a clone is cloneable')
})

test('emits finish', function (t) {
  var chunks = ['a', 'b', 'c', 'd', null]
  var e1 = ['a', 'b', 'c', 'd']
  var e2 = ['a', 'b', 'c', 'd']

  t.plan(2 + e1.length + e2.length)

  var source = from(function (size, next) {
    setImmediate(next, null, chunks.shift())
  })

  var instance = cloneable(source)

  var clone = instance.clone()

  clone.on('finish', t.pass.bind(null, 'clone emits finish'))
  instance.on('finish', t.pass.bind(null, 'main emits finish'))

  instance.pipe(sink(function (chunk, enc, cb) {
    t.equal(chunk.toString(), e1.shift(), 'chunk matches')
    cb()
  }))

  clone.on('data', function (chunk) {
    t.equal(chunk.toString(), e2.shift(), 'chunk matches')
  })
})

test('clone async w resume', function (t) {
  t.plan(4)

  var read = false
  var source = from(function (size, next) {
    if (read) {
      this.push(null)
    } else {
      read = true
      this.push('hello world')
    }
    next()
  })

  var instance = cloneable(source)
  t.notOk(read, 'stream not started')

  var cloned = instance.clone()
  t.notOk(read, 'stream not started')

  instance.on('end', t.pass.bind(null, 'end emitted'))
  instance.resume()

  setImmediate(function () {
    cloned.on('end', t.pass.bind(null, 'end emitted'))
    cloned.resume()
  })
})

test('big file', function (t) {
  t.plan(13)

  var stream = cloneable(fs.createReadStream(path.join(__dirname, 'big')))
  var hash = crypto.createHash('sha1')
  hash.setEncoding('hex')

  var toCheck

  fs.createReadStream(path.join(__dirname, 'big'))
    .pipe(hash)
    .once('readable', function () {
      toCheck = hash.read()
      t.ok(toCheck)
    })

  function pipe (s, num) {
    s.on('end', function () {
      t.pass('end for ' + num)
    })

    var dest = path.join(__dirname, 'out')

    s.pipe(fs.createWriteStream(dest))
      .on('finish', function () {
        t.pass('finish for ' + num)

        var destHash = crypto.createHash('sha1')
        destHash.setEncoding('hex')

        fs.createReadStream(dest)
          .pipe(destHash)
          .once('readable', function () {
            var hash = destHash.read()
            t.ok(hash)
            t.equal(hash, toCheck)
          })
      })
  }

  // Pipe in another event loop tick <-- this one finished only, it's the original cloneable.
  setImmediate(pipe.bind(null, stream, 1))

  // Pipe in the same event loop tick
  pipe(stream.clone(), 0)

  // Pipe a long time after
  setTimeout(pipe.bind(null, stream.clone(), 2), 1000)
})
