//// [templateStringInObjectLiteral.ts]
var x = {
    a: `abc${ 123 }def`,
    `b`: 321
}

//// [templateStringInObjectLiteral.js]
<<<<<<< HEAD
var x = (_a = ["b"], _a.raw = ["b"], ({
    a: "abc" + 123 + "def"
})(_a));
=======
var x = {
    a: "abc" + 123 + "def" } "b";
>>>>>>> master
321;
var _a;
