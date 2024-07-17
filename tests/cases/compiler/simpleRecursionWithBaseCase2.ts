// @strict: true
// @noImplicitAny: true
// @lib: esnext
// @noEmit: true

async function rec1() {
  if (Math.random() < 0.5) {
    return rec1();
  } else {
    return "hello";
  }
}

async function rec2() {
  if (Math.random() < 0.5) {
    return await rec2();
  } else {
    return "hello";
  }
}

async function rec3() {
  return rec3();
}

async function rec4() {
  return await rec4();
}

async function rec5() {
  if (Math.random() < 0.5) {
    return ((rec1()));
  } else {
    return "hello";
  }
}

async function rec6() {
  if (Math.random() < 0.5) {
    return await ((rec1()));
  } else {
    return "hello";
  }
}

declare const ps: Promise<string> | number;

async function foo1() {
  if (Math.random() > 0.5) {
    return ps;
  } else {
    return await foo1();
  }
}

async function foo2() {
  if (Math.random() > 0.5) {
    return ps;
  } else {
    return foo2();
  }
}
