const foo: (number | string)[] = ['aaa'];

function assertString(x: unknown): asserts x is string {
  if (typeof x !== 'string') throw new Error('Must be a string!');
}

foo.forEach(assertString);
foo[0].slice(0);
