//// [templateStringInPropertyAssignment.ts]
var x = {
    a: `abc${ 123 }def${ 456 }ghi`
}

//// [templateStringInPropertyAssignment.js]
var x = {
    a: "abc" + 123 + "def" + 456 + "ghi"
};
