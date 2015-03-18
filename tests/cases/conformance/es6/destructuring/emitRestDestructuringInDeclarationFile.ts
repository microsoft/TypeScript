// @declaration: true
var [a, b, ...rest] = [1, 2, 3, "string"];
var [a1, b1, [...rest]] = [1, 2, [3, "string"]];