// @strict: true
// @noEmit: true

declare class Base {
  IsA(): this is A;
  IsB(): this is B;
}
declare class A extends Base {
  _a: true;
}
declare class B extends Base {
  _b: true;
}

declare const obj: A | B | undefined;

function test1() {
  if (!obj?.IsA()) {
    obj; // B | undefined
    return;
  }
  obj; // A
}

function test2() {
  if (obj?.IsA() === false) {
    obj; // B
    return;
  }
  obj; // A | undefined
}

function test3() {
  if (obj?.IsA()) {
    obj; // A
    return;
  }
  obj; // B | undefined
}

function test4() {
  if (obj?.IsA() === true) {
    obj; // A
    return;
  }
  obj; // B | undefined
}
