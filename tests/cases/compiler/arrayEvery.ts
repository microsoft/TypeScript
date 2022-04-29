const foo: (number | string)[] = ['aaa'];

const isString = (x: unknown): x is string => typeof x === 'string';

if (foo.every(isString)) {
  foo[0].slice(0);
}
