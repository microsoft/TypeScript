//// [templateStringInPropertyName1.ts]
var x = {
    `a`: 321
}

//// [templateStringInPropertyName1.js]
var x = (_a = ["a"], _a.raw = ["a"], {}(_a));
321;
var _a;
