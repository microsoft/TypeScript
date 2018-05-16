#!/usr/bin/env node
var fold = require('./index.js'),
	ret = [];

console.error('stderr output...');
console.error('stderr output...');

// push to ret array
fold.pushStart(ret, 'foo');

ret.push('bar');
ret.push('next line');
ret.push('next line');

fold.pushStart(ret, 'bar'); // nested
ret.push('next line');
ret.push('next line');
ret.push('next line');
fold.pushEnd(ret, 'bar');

ret.push('next line');
ret.push('next line');
ret.push('next line');

fold.pushEnd(ret, 'foo');

// format ret array and echo it
console.log(ret.join('\n').trim());

console.log('Hello, ' + process.env.USER + '!');

console.log(
	fold.wrap('FooBar', "test\n123\ntest\n")
);
