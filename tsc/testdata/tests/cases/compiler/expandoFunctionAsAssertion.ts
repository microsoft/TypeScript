// @strict: true
// @noEmit: true

function example() {}

example.isFoo = function isFoo(value: string): asserts value is 'foo' {
  if (value !== 'foo') {
    throw new Error('Not foo');
  }
};

example.isFoo('test');
