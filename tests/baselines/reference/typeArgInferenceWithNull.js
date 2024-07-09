//// [tests/cases/compiler/typeArgInferenceWithNull.ts] ////

//// [typeArgInferenceWithNull.ts]
// All legal

function fn4<T extends string>(n: T) { }
fn4(null);

function fn5<T extends { x: string }>(n: T) { }
fn5({ x: null });

function fn6<T extends { x: string }>(n: T, fun: (x: T) => void, n2: T) { }
fn6({ x: null }, y => { }, { x: "" }); // y has type { x: any }, but ideally would have type { x: string }


//// [typeArgInferenceWithNull.js]
// All legal
function fn4(n) { }
fn4(null);
function fn5(n) { }
fn5({ x: null });
function fn6(n, fun, n2) { }
fn6({ x: null }, function (y) { }, { x: "" }); // y has type { x: any }, but ideally would have type { x: string }
