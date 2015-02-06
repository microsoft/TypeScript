//// [templateStringInPropertyName2.ts]
var x = {
    `abc${ 123 }def${ 456 }ghi`: 321
}

//// [templateStringInPropertyName2.js]
var x = (_a = ["abc", "def", "ghi"], _a.raw = ["abc", "def", "ghi"], {}(_a, 123, 456));
321;
var _a;
