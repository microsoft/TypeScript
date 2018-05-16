/* eslint-env mocha */

var Transform = require('stream').Transform;
var fs = require('fs');
var path = require('path');

var chai = require('chai');
var Vinyl = require('vinyl');
var mock = require('mock-fs');

var newer = require('./index.js');

chai.config.includeStack = true;

var assert = chai.assert;

/**
 * Test utility function.  Create File instances for each of the provided paths
 * and write to the provided stream.  Call stream.end() when done.
 * @param {stream.Transform} stream Transform stream.
 * @param {Array.<string>} paths Array of file paths.
 */
function write(stream, paths) {
  paths.forEach(function(filePath) {
    stream.write(
      new Vinyl({
        contents: fs.readFileSync(filePath),
        path: path.resolve(filePath),
        stat: fs.statSync(filePath)
      })
    );
  });
  stream.end();
}

describe('newer()', function() {
  it('creates a transform stream', function() {
    var stream = newer('foo');
    assert.instanceOf(stream, Transform);
  });

  it('requires a string dest or an object with the dest property', function() {
    assert.throws(function() {
      newer();
    });

    assert.throws(function() {
      newer(123);
    });

    assert.throws(function() {
      newer({});
    });
  });

  describe('config.ext', function() {
    it('must be a string', function() {
      assert.throws(function() {
        newer({dest: 'foo', ext: 1});
      });

      assert.throws(function() {
        newer({dest: 'foo', ext: {}});
      });
    });
  });

  describe('config.map', function() {
    it('must be a function', function() {
      assert.throws(function() {
        newer({dest: 'foo', map: 1});
      });

      assert.throws(function() {
        newer({dest: 'foo', map: 'bar'});
      });
    });

    it('makes the dest config optional', function() {
      assert.doesNotThrow(function() {
        newer({map: function() {}});
      });
    });
  });

  describe('config.extra', function() {
    beforeEach(function() {
      mock({
        main: mock.file({
          content: 'main content',
          mtime: new Date(1)
        }),
        imported: mock.file({
          content: '2: other content, used by main',
          mtime: new Date(3)
        }),
        collected: mock.file({
          content: 'main content\n1: other content, used by main',
          mtime: new Date(2)
        })
      });
    });
    afterEach(mock.restore);

    it('must be a string or an array', function() {
      assert.throws(function() {
        newer({dest: 'foo', extra: 1});
      });

      assert.throws(function() {
        newer({dest: 'foo', extra: function() {}});
      });

      assert.doesNotThrow(function() {
        newer({dest: 'foo', extra: 'extra1'});
      });

      assert.doesNotThrow(function() {
        newer({dest: 'foo', extra: ['extra1', 'extra2']});
      });
    });

    it('must not be passed into stream', function(done) {
      var stream = newer({dest: 'collected', extra: 'imported'});

      var paths = ['main'];

      stream.on('data', function(file) {
        assert.notEqual(file.path, path.resolve('imported'));
      });
      stream.on('error', done);
      stream.on('end', done);

      write(stream, paths);
    });

    it('must let other files through stream if an "extra" is newer', function(
      done
    ) {
      var stream = newer({dest: 'collected', extra: 'imported'});

      var paths = ['main'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest dir that does not exist', function() {
    beforeEach(function() {
      mock({
        source1: 'source1 content',
        source2: 'source2 content',
        source3: 'source3 content'
      });
    });
    afterEach(mock.restore);

    it('passes through all files', function(done) {
      var stream = newer('new/dir');

      var paths = ['source1', 'source2', 'source3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest file that does not exist', function() {
    beforeEach(function() {
      mock({
        file1: 'file1 content',
        file2: 'file2 content',
        file3: 'file3 content',
        dest: {}
      });
    });
    afterEach(mock.restore);

    it('passes through all files', function(done) {
      var stream = newer('dest/concat');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('empty dest dir', function() {
    beforeEach(function() {
      mock({
        source1: 'source1 content',
        source2: 'source2 content',
        source3: 'source3 content',
        dest: {}
      });
    });
    afterEach(mock.restore);

    it('passes through all files', function(done) {
      var stream = newer('dest');

      var paths = ['source1', 'source2', 'source3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest dir with one older file', function() {
    beforeEach(function() {
      mock({
        file1: 'file1 content',
        file2: 'file2 content',
        file3: 'file3 content',
        dest: {
          file2: mock.file({
            content: 'file2 content',
            mtime: new Date(1)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through all files', function(done) {
      var stream = newer('dest');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest dir with one newer file', function() {
    beforeEach(function() {
      mock({
        file1: mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        file2: mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        file3: mock.file({
          content: 'file3 content',
          mtime: new Date(100)
        }),
        dest: {
          file2: mock.file({
            content: 'file2 content',
            mtime: new Date(200)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through two newer files', function(done) {
      var stream = newer('dest');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.notEqual(file.path, path.resolve('file2'));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length - 1);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest dir with two newer and one older file', function() {
    beforeEach(function() {
      mock({
        file1: mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        file2: mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        file3: mock.file({
          content: 'file3 content',
          mtime: new Date(100)
        }),
        dest: {
          file1: mock.file({
            content: 'file1 content',
            mtime: new Date(150)
          }),
          file2: mock.file({
            content: 'file2 content',
            mtime: new Date(50)
          }),
          file3: mock.file({
            content: 'file3 content',
            mtime: new Date(150)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through one newer file', function(done) {
      var stream = newer('dest');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve('file2'));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, 1);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest file with first source file newer', function() {
    beforeEach(function() {
      mock({
        file1: mock.file({
          content: 'file1 content',
          mtime: new Date(200)
        }),
        file2: mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        file3: mock.file({
          content: 'file3 content',
          mtime: new Date(100)
        }),
        dest: {
          output: mock.file({
            content: 'file2 content',
            mtime: new Date(150)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through all source files', function(done) {
      var stream = newer('dest/output');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest file with second source file newer', function() {
    beforeEach(function() {
      mock({
        file1: mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        file2: mock.file({
          content: 'file2 content',
          mtime: new Date(200)
        }),
        file3: mock.file({
          content: 'file3 content',
          mtime: new Date(100)
        }),
        dest: {
          output: mock.file({
            content: 'file2 content',
            mtime: new Date(150)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through all source files', function(done) {
      var stream = newer('dest/output');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest file with last source file newer', function() {
    beforeEach(function() {
      mock({
        file1: mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        file2: mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        file3: mock.file({
          content: 'file3 content',
          mtime: new Date(200)
        }),
        dest: {
          output: mock.file({
            content: 'file2 content',
            mtime: new Date(150)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through all source files', function(done) {
      var stream = newer('dest/output');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve(paths[calls]));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, paths.length);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest file with no newer source files', function() {
    beforeEach(function() {
      mock({
        file1: mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        file2: mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        file3: mock.file({
          content: 'file3 content',
          mtime: new Date(100)
        }),
        dest: {
          output: mock.file({
            content: 'file2 content',
            mtime: new Date(150)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through no source files', function(done) {
      var stream = newer('dest/output');

      var paths = ['file1', 'file2', 'file3'];

      var calls = 0;
      stream.on('data', function() {
        done(new Error('Expected no source files'));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, 0);
        done();
      });

      write(stream, paths);
    });
  });

  describe('dest file ext and two files', function() {
    beforeEach(function() {
      mock({
        'file1.ext1': mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        'file2.ext1': mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        dest: {
          'file1.ext2': mock.file({
            content: 'file1 content',
            mtime: new Date(100)
          }),
          'file2.ext2': mock.file({
            content: 'file2 content',
            mtime: new Date(50)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through one newer file', function(done) {
      var stream = newer({dest: 'dest', ext: '.ext2'});

      var paths = ['file1.ext1', 'file2.ext1'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve('file2.ext1'));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, 1);
        done();
      });

      write(stream, paths);
    });
  });

  describe('custom mapping between source and dest', function() {
    beforeEach(function() {
      mock({
        'file1.ext1': mock.file({
          content: 'file1 content',
          mtime: new Date(100)
        }),
        'file2.ext1': mock.file({
          content: 'file2 content',
          mtime: new Date(100)
        }),
        dest: {
          'file1.ext2': mock.file({
            content: 'file1 content',
            mtime: new Date(100)
          }),
          'file2.ext2': mock.file({
            content: 'file2 content',
            mtime: new Date(50)
          })
        }
      });
    });
    afterEach(mock.restore);

    it('passes through one newer file', function(done) {
      var stream = newer({
        dest: 'dest',
        map: function(destPath) {
          return destPath.replace('.ext1', '.ext2');
        }
      });

      var paths = ['file1.ext1', 'file2.ext1'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve('file2.ext1'));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, 1);
        done();
      });

      write(stream, paths);
    });

    it('allows people to join to dest themselves', function(done) {
      var stream = newer({
        map: function(destPath) {
          return path.join('dest', destPath.replace('.ext1', '.ext2'));
        }
      });

      var paths = ['file1.ext1', 'file2.ext1'];

      var calls = 0;
      stream.on('data', function(file) {
        assert.equal(file.path, path.resolve('file2.ext1'));
        ++calls;
      });

      stream.on('error', done);

      stream.on('end', function() {
        assert.equal(calls, 1);
        done();
      });

      write(stream, paths);
    });
  });

  describe('reports errors', function() {
    beforeEach(function() {
      mock({
        q: mock.file({
          mtime: new Date(100)
        }),
        dest: {}
      });
    });
    afterEach(mock.restore);

    it('in "data" handlers', function(done) {
      var stream = newer('dest');

      var err = new Error('test');

      stream.on('data', function() {
        throw err;
      });

      stream.on('error', function(caught) {
        assert.equal(caught, err);
        done();
      });

      write(stream, ['q']);
    });
  });
});
