// @strict: true
// @noEmit: true
// @exactOptionalPropertyTypes: true

type T1 = { a: number; b?: never };

const t1: T1 = {
  a: 0,
  b: 0,
};

type T2 = { a: number; b?: never } | { a?: never; b: number };

const t2: T2 = {
  a: 0,
  b: 0,
};

// for comparison with the above:
const obj1 = {
  a: 0,
  b: 0,
}

const t3: T1 = obj1;

const obj2 = {
  a: 0,
  b: 0,
};

const t4: T2 = obj2;
