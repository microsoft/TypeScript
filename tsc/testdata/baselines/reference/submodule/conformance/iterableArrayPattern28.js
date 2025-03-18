//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern28.ts] ////

//// [iterableArrayPattern28.ts]
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]: [string, number][]) { }
takeFirstTwoEntries(...new Map([["", 0], ["hello", true]]));

//// [iterableArrayPattern28.js]
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]) { }
takeFirstTwoEntries(...new Map([["", 0], ["hello", true]]));
