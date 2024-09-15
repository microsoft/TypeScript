// @strict: true
// @noEmit: true

function test1({ a: { b = 1 } } = { a: {} }) {}
test1({ a: { b: 42 } }); // ok

function test2({ a: { b, c = 1 } } = { a: { b: 2 } }) {}
test2({ a: { c: 42 } }); // error, missing b
test2({ a: { b: 100, c: 42 } }); // ok

function test3({ a: { b = 1, c = 2 } } = { a: { b: 3 } }) {}
test3({ a: { b: 42 } }); // ok
test3({ a: { c: 42 } }); // ok

function test4({ a: { b } } = { a: {} }) {} // implicit any
test4({ a: { b: 42 } }); // ok (implicit any reported at declaration site)
test4({ a: {} }); // ok

function test5({ a: { b } = { b: 1 } }) {}
test5({ a: { b: 42 } }); // ok
test5({ a: {} }); // error, missing b

function test6({ a: { b = 1 } = {} }) {}
test6({ a: { b: 42 } }); // ok
test6({ a: {} }); // ok

function test7({ a: { b = 1 } = {} } = {}) {}
test7({ a: { b: 42 } }); // ok
test7({ a: {} }); // ok
test7({}); // ok

function test8({ a: { b, c = 1 } = {} }) {} // implicit any
test8({ a: { b: 42 } }); // ok (implicit any reported at declaration site)
test8({ a: { b: 42, c: 100 } }); // ok

function test9({ a: { b, c = 1 } = { b: 2 } }) {}
test9({ a: { b: 42 } }); // ok
test9({ a: { b: 42, c: 100 } }); // ok

function test10({ a = 1 } = { b: 2 }) {} // error, EPC
test10({ a: 42 }); // error, missing b
test10({ b: 42 }); // ok
test10({ a: 42, b: 100 }); // ok

function test11({ a: { b = 1 } = { c: 2 } }) {} // error, EPC
test11({ a: { b: 42 } }); // error, missing c
test11({ a: { c: 42 } }); // ok

function test12({ a: { b = 1 } = {}, c = 2 } = { a: {} }) {}
test12({ a: { b: 42 } }); // ok
test12({ a: { b: 42 }, c: 100 }); // ok
test12({ a: {}, c: 100 }); // ok
test12({ c: 100 }); // ok
test12({}); // ok

function test13({ a: { b = 1 } = {}, c = 2 } = {}) {}
test13({ a: { b: 42 } }); // ok
test13({ c: 100 }); // ok

export {};
