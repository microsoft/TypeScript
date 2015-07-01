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
var oct1 = 5852;
823;
var oct2 = 1817;
8592;
var obj1 = {
    19230: "hi",
    19230: "Hello",
    "19230": "world"
};
