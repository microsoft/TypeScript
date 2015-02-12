// @declaration: true
var [x10, [y10, [z10]]] = [1, ["hello", [true]]];

var [x11 = 0, y11 = ""] = [1, "hello"];
var [a11, b11, c11] = [];

var [a2, [b2, { x12, y12: c2 }]=["abc", { x12: 10, y12: false }]] = [1, ["hello", { x12: 5, y12: true }]];

var [x13, y13] = [1, "hello"];
var [a3, b3] = [[x13, y13], { x: x13, y: y13 }];
