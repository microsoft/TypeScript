//// [tests/cases/compiler/declarationEmitDestructuring4.ts] ////

//// [declarationEmitDestructuring4.ts]
// For an array binding pattern with empty elements,
// we will not make any modification and will emit
// the similar binding pattern users' have written
function baz([]) { }
function baz1([] = [1,2,3]) { }
function baz2([[]] = [[1,2,3]]) { }

function baz3({}) { }
function baz4({} = { x: 10 }) { }



//// [declarationEmitDestructuring4.js]
function baz([]) { }
function baz1([] = [1, 2, 3]) { }
function baz2([[]] = [[1, 2, 3]]) { }
function baz3({}) { }
function baz4({} = { x: 10 }) { }
