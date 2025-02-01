// @strict: true
// @noEmit: true

const foo_autoType = <T extends 1 | 2>(bar: T) => {
  let test1;
  test1 = bar;
  return test1;
};

const foo_autoArrayType = <T extends 1 | 2>(bar: T) => {
  let test1 = [];
  test1.push(bar);
  return test1;
};
