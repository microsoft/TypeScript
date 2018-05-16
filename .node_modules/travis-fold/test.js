#!/usr/bin/env node
var assert = require('assert'),
	fold = require('./index.js');

function getOutput() {
	var ret = [];

	fold.pushStart(ret, 'foo');
	ret.push('bar');
	fold.pushEnd(ret, 'foo');
	ret.push('end');

	return ret;
}

// no Travis env
process.env.TRAVIS = undefined;

assert.strictEqual(false, fold.isTravis(), 'isTravis() should return false');

assert.strictEqual('', fold.start('foo'));
assert.strictEqual('', fold.end('foo'));
assert.strictEqual('content\n123', fold.wrap('foo', 'content\n123\n'));

assert.deepEqual(['bar', 'end'], getOutput());

// Travis env
process.env.TRAVIS = 'true';

assert.strictEqual(true, fold.isTravis(), 'isTravis() should return true');

assert.strictEqual('travis_fold:start:foo', fold.start('foo'));
assert.strictEqual('travis_fold:end:foo', fold.end('foo'));
assert.strictEqual('travis_fold:start:foo\ncontent\n123\ntravis_fold:end:foo', fold.wrap('foo', 'content\n123\n'));

assert.deepEqual(["travis_fold:start:foo","bar","travis_fold:end:foo","end"], getOutput());

// URL encoding
assert.strictEqual('travis_fold:start:https-github-com-macbre-travis-fold123', fold.start('https://github.com/macbre/travis-fold123/'));
