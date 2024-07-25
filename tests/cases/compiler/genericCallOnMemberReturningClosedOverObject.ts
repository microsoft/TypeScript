// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/11584

function example<T1>() {
  let x = {
    foo: <T2>(t2: T2) => x,
    bar: (t1: T1) => x,
  };
  return x;
}

example<number>().foo("hello").bar(1);
