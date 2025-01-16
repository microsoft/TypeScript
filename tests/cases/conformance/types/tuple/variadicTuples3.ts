// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/58697

function test1<T extends any[], P extends any[]>(): [...T, ...P] {
  let x: any[] = [];
  return x;
}

function test2<T extends any[], P extends any[]>(): [...T, ...P] {
  let x: [any, any] = [null, null];
  return x;
}

function test3<T extends any[], P extends any[]>(): [...T, ...P] {
  let x: [any, any, any] = [null, null, null];
  return x;
}
