//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern25.ts] ////

//// [iterableArrayPattern25.ts]
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]) { }
takeFirstTwoEntries(new Map([["", 0], ["hello", 1]]));

//// [iterableArrayPattern25.js]
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]) { }
takeFirstTwoEntries(new Map([["", 0], ["hello", 1]]));
