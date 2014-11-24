// @target: es6
var oct1 = 0o45436;
var oct2 = 0O45436;
var obj1 = {
    0o45436: "Hello",
    a: 0o45436,
    b: oct1,
    oct1,
}

var obj2 = {
    0O45436: "hi",
    a: 0O45436,
    b: oct2,
    oct2,
}

obj1[0o45436];    // string
obj1["0o45436"];  // any
obj1["19230"];       // string
obj1[19230];         // string
obj1["a"];        // number
obj1["b"];        // number
obj1["oct1"];     // number

obj2[0O45436];   // string
obj2["0O45436"]; // any
obj2["19230"];       // string
obj2[19230];         // string
obj2["a"];        // number
obj2["b"];        // number
obj2["oct2"];     // number
