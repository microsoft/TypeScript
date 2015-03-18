// @declaration: true
var {a: [b, c]} = { a: [10, "HI"] };
var [{x, y}, {t:{z}}] = [{ x: true, y: 200 }, {t:{z: "string" }}];
var [[[foo, bar, {baz}], e1], e2] = [[[10, "bar", { baz: "baz" }], true], 2000];