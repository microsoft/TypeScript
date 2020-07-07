//// [arrayEvery.ts]
const foo: (number | string)[] = ['aaa'];

const isString = (x: unknown): x is string => typeof x === 'string';

if (foo.every(isString)) {
  foo[0].slice(0);
}


//// [arrayEvery.js]
var foo = ['aaa'];
var isString = function (x) { return typeof x === 'string'; };
if (foo.every(isString)) {
    foo[0].slice(0);
}
