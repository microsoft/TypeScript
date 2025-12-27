// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59804

let test1 = undefined;
test1 = "" as string | undefined;
test1?.length;

let test2 = null;
test2 = "" as string | undefined;
test2?.length;

let test3;
test3 = "" as string | undefined;
test3?.length;

let test4 = undefined;
let other1 = test4;

let test5 = null;
let other2 = test5;

let test6;
test6 = undefined;
let other3 = test6;

let test7 = undefined;
test7 = undefined;
let other4 = test7;

let test8 = null;
test8 = undefined;
let other5 = test8;

let test9;
let other6 = test9;

let test10 = undefined;
test10 = "" as string | undefined;
test10?.charAt(0);

let test11 = null;
test11 = "" as string | undefined;
test11?.charAt(0);

let test12;
test12 = "" as string | undefined;
test12?.charAt(0);

let test13;
test13.length;
function fn1() {
  return { length: test13.length };
}

let test14 = [];
test14.length;
function fn2() {
  return { length: test14.length };
}

let test15;
test15 = [];
test15.length;
function fn3() {
  return { length: test15.length };
}
