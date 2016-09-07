//// [templateStringInObjectLiteral.ts]
var x = {
    a: `abc${ 123 }def`,
    `b`: 321
}

//// [templateStringInObjectLiteral.js]
var x = (_a = ["b"], _a.raw = ["b"], {
    a: "abc" + 123 + "def"
}(_a));
321;
var _a;
