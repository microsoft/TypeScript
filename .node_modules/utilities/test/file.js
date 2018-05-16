/*
 * Utilities: A classic collection of JavaScript utilities
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , file = require('../lib/file')
  , existsSync = fs.existsSync || path.existsSync
  , tests;

tests = {

  'before': function () {
    process.chdir('./test');
  }

, 'after': function () {
    process.chdir('../');
  }

, 'test mkdirP': function () {
    var expected = [
          ['foo']
        , ['foo', 'bar']
        , ['foo', 'bar', 'baz']
        , ['foo', 'bar', 'baz', 'qux']
        ]
      , res;
    file.mkdirP('foo/bar/baz/qux');
    res = file.readdirR('foo');
    for (var i = 0, ii = res.length; i < ii; i++) {
      assert.equal(path.join.apply(path, expected[i]), res[i]);
    }
    file.rmRf('foo', {silent: true});
  }

, 'test rmRf': function () {
    file.mkdirP('foo/bar/baz/qux', {silent: true});
    file.rmRf('foo/bar', {silent: true});
    res = file.readdirR('foo');
    assert.equal(1, res.length);
    assert.equal('foo', res[0]);
    fs.rmdirSync('foo');
  }

, 'test rmRf with symlink subdir': function () {
    file.mkdirP('foo');
    file.mkdirP('bar');
    fs.writeFileSync('foo/hello.txt', 'hello, it\'s me');
    fs.symlinkSync('../foo', 'bar/foo');
    file.rmRf('bar', {silent: true});

    // Make sure the bar directory was successfully deleted
    var barDeleted = false;
    try {
      var stat = fs.statSync('bar');
    } catch(err) {
      if(err.code == 'ENOENT') {
        barDeleted = true;
      }
    }
    assert.equal(true, barDeleted);

    // Make sure that the file inside the linked folder wasn't deleted
    res = fs.readdirSync('foo');
    assert.equal(1, res.length);
    assert.equal('hello.txt', res[0]);

    // Cleanup
    fs.unlinkSync('foo/hello.txt');
    fs.rmdirSync('foo');
  }

, 'test rmRf with symlinked dir': function () {
    file.mkdirP('foo');
    fs.writeFileSync('foo/hello.txt', 'hello!');
    fs.symlinkSync('foo', 'bar');
    file.rmRf('bar', {silent: true});

    // Make sure the bar directory was successfully deleted
    var barDeleted = false;
    try {
      var stat = fs.statSync('bar');
    } catch(err) {
      if(err.code == 'ENOENT') {
        barDeleted = true;
      }
    }
    assert.equal(true, barDeleted);

    // Make sure that the file inside the linked folder wasn't deleted
    res = fs.readdirSync('foo');
    assert.equal(1, res.length);
    assert.equal('hello.txt', res[0]);

    // Cleanup
    fs.unlinkSync('foo/hello.txt');
    fs.rmdirSync('foo');
  }
  
, 'test cpR with same name and different directory': function () {
      file.mkdirP('foo', {silent: true});
      fs.writeFileSync('foo/bar.txt', 'w00t');
      file.cpR('foo', 'bar', {silent: true});
      assert.ok(existsSync('bar/bar.txt'));
      file.rmRf('foo', {silent: true});
      file.rmRf('bar', {silent: true});
      
  }

, 'test cpR with same to and from will throw': function () {
    assert.throws(function () {
      file.cpR('foo.txt', 'foo.txt', {silent: true});
    });
  }

, 'test cpR rename via copy in directory': function () {
    file.mkdirP('foo', {silent: true});
    fs.writeFileSync('foo/bar.txt', 'w00t');
    file.cpR('foo/bar.txt', 'foo/baz.txt', {silent: true});
    assert.ok(existsSync('foo/baz.txt'));
    file.rmRf('foo', {silent: true});
  }

, 'test cpR rename via copy in base': function () {
    fs.writeFileSync('bar.txt', 'w00t');
    file.cpR('bar.txt', 'baz.txt', {silent: true});
    assert.ok(existsSync('baz.txt'));
    file.rmRf('bar.txt', {silent: true});
    file.rmRf('baz.txt', {silent: true});
  }

, 'test cpR keeps file mode': function () {
    fs.writeFileSync('bar.txt', 'w00t', {mode: 0750});
    fs.writeFileSync('bar1.txt', 'w00t!', {mode: 0744});
    file.cpR('bar.txt', 'baz.txt', {silent: true});
    file.cpR('bar1.txt', 'baz1.txt', {silent: true});

    assert.ok(existsSync('baz.txt'));
    assert.ok(existsSync('baz1.txt'));
    var bazStat = fs.statSync('baz.txt');
    var bazStat1 = fs.statSync('baz1.txt');
    assert.equal(0750, bazStat.mode & 07777);
    assert.equal(0744, bazStat1.mode & 07777);

    file.rmRf('bar.txt', {silent: true});
    file.rmRf('baz.txt', {silent: true});
    file.rmRf('bar1.txt', {silent: true});
    file.rmRf('baz1.txt', {silent: true});
  }

, 'test cpR keeps file mode when overwriting with preserveMode': function () {
    fs.writeFileSync('bar.txt', 'w00t', {mode: 0755});
    fs.writeFileSync('baz.txt', 'w00t!', {mode: 0744});
    file.cpR('bar.txt', 'baz.txt', {silent: true, preserveMode: true});

    assert.ok(existsSync('baz.txt'));
    var bazStat = fs.statSync('baz.txt');
    assert.equal(0755, bazStat.mode & 07777);

    file.rmRf('bar.txt', {silent: true});
    file.rmRf('baz.txt', {silent: true});
  }

, 'test cpR does not keep file mode when overwriting': function () {
    fs.writeFileSync('bar.txt', 'w00t', {mode: 0766});
    fs.writeFileSync('baz.txt', 'w00t!', {mode: 0744});
    file.cpR('bar.txt', 'baz.txt', {silent: true});

    assert.ok(existsSync('baz.txt'));
    var bazStat = fs.statSync('baz.txt');
    assert.equal(0744, bazStat.mode & 07777);

    file.rmRf('bar.txt', {silent: true});
    file.rmRf('baz.txt', {silent: true});
  }

, 'test cpR copies file mode recursively': function () {
    fs.mkdirSync('foo');
    fs.writeFileSync('foo/bar.txt', 'w00t', {mode: 0740});
    file.cpR('foo', 'baz', {silent: true});

    assert.ok(existsSync('baz'));
    var barStat = fs.statSync('baz/bar.txt');
    assert.equal(0740, barStat.mode & 07777);

    file.rmRf('foo');
    file.rmRf('baz');
  }

, 'test cpR keeps file mode recursively': function () {
    fs.mkdirSync('foo');
    fs.writeFileSync('foo/bar.txt', 'w00t', {mode: 0740});
    fs.mkdirSync('baz');
    fs.mkdirSync('baz/foo');
    fs.writeFileSync('baz/foo/bar.txt', 'w00t!', {mode: 0755});
    file.cpR('foo', 'baz', {silent: true, preserveMode: true});

    assert.ok(existsSync('baz'));
    var barStat = fs.statSync('baz/foo/bar.txt');
    assert.equal(0740, barStat.mode & 07777);

    file.rmRf('foo');
    file.rmRf('baz');
  }

, 'test cpR copies directory mode recursively': function () {
    fs.mkdirSync('foo', 0755);
    fs.mkdirSync('foo/bar', 0700);
    file.cpR('foo', 'bar');

    assert.ok(existsSync('foo'));
    var fooBarStat = fs.statSync('bar/bar');
    assert.equal(0700, fooBarStat.mode & 07777);

    file.rmRf('foo');
    file.rmRf('bar');
  }

, 'test readdirR': function () {
    var expected = [
          ['foo']
        , ['foo', 'bar']
        , ['foo', 'bar', 'baz']
        , ['foo', 'bar', 'baz', 'qux']
        ]
      , res;

    file.mkdirP('foo/bar/baz/qux', {silent: true});
    res = file.readdirR('foo');

    for (var i = 0, ii = res.length; i < ii; i++) {
      assert.equal(path.join.apply(path, expected[i]), res[i]);
    }
    file.rmRf('foo', {silent: true});
  }

, 'test isAbsolute with Unix absolute path': function () {
    var p = '/foo/bar/baz';
    assert.equal('/', file.isAbsolute(p));
  }

, 'test isAbsolute with Unix relative path': function () {
    var p = 'foo/bar/baz';
    assert.equal(false, file.isAbsolute(p));
  }

, 'test isAbsolute with Win absolute path': function () {
    var p = 'C:\\foo\\bar\\baz';
    assert.equal('C:\\', file.isAbsolute(p));
  }

, 'test isAbsolute with Win relative path': function () {
    var p = 'foo\\bar\\baz';
    assert.equal(false, file.isAbsolute(p));
  }

, 'test absolutize with Unix absolute path': function () {
    var expected = '/foo/bar/baz'
      , actual = file.absolutize('/foo/bar/baz');
    assert.equal(expected, actual);
  }

, 'test absolutize with Win absolute path': function () {
    var expected = 'C:\\foo\\bar\\baz'
      , actual = file.absolutize('C:\\foo\\bar\\baz');
    assert.equal(expected, actual);
  }

, 'test absolutize with relative path': function () {
    var expected = process.cwd()
      , actual = '';

    // We can't just create two different tests here
    // because file.absolutize uses process.cwd()
    // to get absolute path which is platform
    // specific
    if (process.platform === 'win32') {
      expected += '\\foo\\bar\\baz'
      actual = file.absolutize('foo\\bar\\baz')
    }
    else {
      expected += '/foo/bar/baz'
      actual = file.absolutize('foo/bar/baz');
    }

    assert.equal(expected, actual);
  }

, 'test basedir with Unix absolute path': function () {
    var p = '/foo/bar/baz';
    assert.equal('/foo/bar', file.basedir(p));
  }

, 'test basedir with Win absolute path': function () {
    var p = 'C:\\foo\\bar\\baz';
    assert.equal('C:\\foo\\bar', file.basedir(p));
  }

, 'test basedir with Unix root path': function () {
    var p = '/';
    assert.equal('/', file.basedir(p));
  }

, 'test basedir with Unix absolute path and double-asterisk': function () {
    var p = '/**/foo/bar/baz';
    assert.equal('/', file.basedir(p));
  }

, 'test basedir with leading double-asterisk': function () {
    var p = '**/foo';
    assert.equal('.', file.basedir(p));
  }

, 'test basedir with leading asterisk': function () {
    var p = '*.js';
    assert.equal('.', file.basedir(p));
  }

, 'test basedir with leading dot-slash and double-asterisk': function () {
    var p = './**/foo';
    assert.equal('.', file.basedir(p));
  }

, 'test basedir with leading dirname and double-asterisk': function () {
    var p = 'a/**/*.js';
    assert.equal('a', file.basedir(p));
  }

, 'test basedir with leading dot-dot-slash and double-asterisk': function () {
    var p = '../../test/**/*.js';
    assert.equal('../../test', file.basedir(p));
  }

, 'test basedir with single-asterisk in dirname': function () {
    var p = 'a/test*/file';
    assert.equal('a', file.basedir(p));
  }

, 'test basedir with single filename': function () {
    var p = 'filename';
    assert.equal('.', file.basedir(p));
  }

, 'test basedir with empty path': function () {
    var p = '';
    assert.equal('.', file.basedir(p));
    assert.equal('.', file.basedir());
  }

};

module.exports = tests;


