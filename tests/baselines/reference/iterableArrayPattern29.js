//// [tests/cases/conformance/es6/destructuring/iterableArrayPattern29.ts] ////

//// [iterableArrayPattern29.ts]
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]: [string, number][]) { }
takeFirstTwoEntries(...new Map([["", true], ["hello", true]]));

//// [iterableArrayPattern29.js]
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]) { }
takeFirstTwoEntries(...new Map([["", true], ["hello", true]]));
