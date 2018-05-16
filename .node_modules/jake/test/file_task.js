var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  , h = require('./helpers')
  , utils = require('utilities');

var cleanUpAndNext = function (callback) {
  utils.file.rmRf('./foo', {
    silent: true
  });
  callback();
};

var tests = {

  'before': function (next) {
    process.chdir('./test');
    cleanUpAndNext(next);
  }

, 'after': function () {
    process.chdir('../');
  }

, 'test concating two files': function (next) {
    h.exec('../bin/cli.js fileTest:foo/concat.txt', function (out) {
      var data;
      assert.equal('fileTest:foo/src1.txt task\ndefault task\nfileTest:foo/src2.txt task\n' +
          'fileTest:foo/concat.txt task', out);
      // Check to see the two files got concat'd
      data = fs.readFileSync(process.cwd() + '/foo/concat.txt');
      assert.equal('src1src2', data.toString());
      cleanUpAndNext(next);
    });
  }

, 'test where a file-task prereq does not change': function (next) {
    h.exec('../bin/cli.js fileTest:foo/from-src1.txt', function (out) {
      assert.equal('fileTest:foo/src1.txt task\nfileTest:foo/from-src1.txt task', out);
      h.exec('../bin/cli.js fileTest:foo/from-src1.txt', function (out) {
        // Second time should be a no-op
        assert.equal('', out);
        next(); // Don't clean up
      });
    });
  }

, 'file-task where prereq file is modified': function (next) {
    setTimeout(function () {
      fs.writeFile('./foo/src1.txt', '', function (err, data) {
        if (err) {
          throw err;
        }
        h.exec('../bin/cli.js fileTest:foo/from-src1.txt', function (out) {
          assert.equal('fileTest:foo/from-src1.txt task', out);
          cleanUpAndNext(next);
        });
      });
    }, 1000); // Wait to do the mod to ensure mod-time is different
  }

, 'test where a file-task prereq does not change with --always-make': function (next) {
    h.exec('../bin/cli.js fileTest:foo/from-src1.txt', function (out) {
      assert.equal('fileTest:foo/src1.txt task\nfileTest:foo/from-src1.txt task',
        out);
      h.exec('../bin/cli.js -B fileTest:foo/from-src1.txt', function (out) {
        assert.equal('fileTest:foo/src1.txt task\nfileTest:foo/from-src1.txt task',
          out);
        cleanUpAndNext(next);
      });
    });
  }

, 'test a preexisting file': function (next) {
    var prereqData = 'howdy';
    utils.file.mkdirP('foo');
    fs.writeFileSync('foo/prereq.txt', prereqData);
    h.exec('../bin/cli.js fileTest:foo/from-prereq.txt', function (out) {
      var data;
      assert.equal('fileTest:foo/from-prereq.txt task', out);
      data = fs.readFileSync(process.cwd() + '/foo/from-prereq.txt');
      assert.equal(prereqData, data.toString());
      h.exec('../bin/cli.js fileTest:foo/from-prereq.txt', function (out) {
        // Second time should be a no-op
        assert.equal('', out);
        cleanUpAndNext(next);
      });
    });
  }

, 'test a preexisting file with --always-make flag': function (next) {
    var prereqData = 'howdy';
    utils.file.mkdirP('foo');
    fs.writeFileSync('foo/prereq.txt', prereqData);
    h.exec('../bin/cli.js fileTest:foo/from-prereq.txt', function (out) {
      var data;
      assert.equal('fileTest:foo/from-prereq.txt task', out);
      data = fs.readFileSync(process.cwd() + '/foo/from-prereq.txt');
      assert.equal(prereqData, data.toString());
      h.exec('../bin/cli.js -B fileTest:foo/from-prereq.txt', function (out) {
        assert.equal('fileTest:foo/from-prereq.txt task', out);
        cleanUpAndNext(next);
      });
    });
  }

, 'test nested directory-task': function (next) {
    h.exec('../bin/cli.js fileTest:foo/bar/baz/bamf.txt', function (out) {
      var data = fs.readFileSync(process.cwd() + '/foo/bar/baz/bamf.txt');
      assert.equal('w00t', data);
      cleanUpAndNext(next);
    });
  }

};

module.exports = tests;

