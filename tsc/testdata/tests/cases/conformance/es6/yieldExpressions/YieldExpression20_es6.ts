// @target: es6

function* test() {
  return () => ({
    b: yield 2, // error
  });
}
