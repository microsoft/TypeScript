// @strictNullChecks: false
// @noImplicitAny: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58150#issuecomment-2052517378

function getMore() {
  return {
    c: "foo",
    p: "bar",
    s: "baz",
  };
}

const foo = {
  p: null,
  ...getMore(),
};

const bar = {
  p: null, // no error, this gets overriden
  other: null, // error, this does not get overriden
  ...getMore(),
};

function doSthWithParams(params: unknown) {
  return {
    c: 'foo',
    p: 'bar',
    s: 'baz',
  };
}

const baz = {
  p: null,
  s: null,
  ...doSthWithParams({
    p: 'hello',
    s: 'world',
  }),
};
