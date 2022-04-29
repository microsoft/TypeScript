//@target: ES6
function takeFirstTwoEntries(...[[k1, v1], [k2, v2]]: [string, number][]) { }
takeFirstTwoEntries(new Map([["", 0], ["hello", 1]]));