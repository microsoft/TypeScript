//// [tests/cases/conformance/es6/binaryAndOctalIntegerLiteral/octalIntegerLiteralError.ts] ////

//// [octalIntegerLiteralError.ts]
// error
var oct1 = 0O13334823;
var oct2 = 0o34318592;

var obj1 = {
    0O45436: "hi",
    19230: "Hello",
    "19230": "world",
};


//// [octalIntegerLiteralError.js]
// error
var oct1 = 0O13334;
823;
var oct2 = 0o3431;
8592;
var obj1 = {
    0O45436: "hi",
    19230: "Hello",
    "19230": "world",
};
