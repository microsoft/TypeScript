//// [tests/cases/compiler/arrayEvery.ts] ////

//// [arrayEvery.ts]
const foo: (number | string)[] = ['aaa'];

const isString = (x: unknown): x is string => typeof x === 'string';

if (foo.every(isString)) {
  foo[0].slice(0);
}


//// [arrayEvery.js]
const foo = ['aaa'];
const isString = (x) => typeof x === 'string';
if (foo.every(isString)) {
    foo[0].slice(0);
}
