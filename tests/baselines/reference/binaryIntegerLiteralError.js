//// [binaryIntegerLiteralError.ts]
// error
var bin1 = 0B1102110;
var bin1 = 0b11023410;

var obj1 = {
    0b11010: "hi",
    26: "Hello",
    "26": "world",
};


//// [binaryIntegerLiteralError.js]
// error
var bin1 = 6;
2110;
var bin1 = 6;
23410;
var obj1 = {
    26: "hi",
    26: "Hello",
    "26": "world"
};
