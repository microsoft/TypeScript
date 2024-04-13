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

const bar = {
  p: null, // no error, this gets overriden
  other: null, // error, this does not get overriden
  ...getMore(),
};
