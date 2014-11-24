// @target: es5
var bin1 = 0b11010;
var bin2 = 0B11010;

var obj1 = {
    0b11010: "Hello",
    a: bin1,
    bin1,
    b: 0b11010,
}

var obj2 = {
    0B11010: "World",
    a: bin2,
    bin2,
    b: 0B11010,
}

obj1[0b11010];    // string
obj1[26];         // string
obj1["26"];       // string
obj1["0b11010"];  // any
obj1["a"];        // number
obj1["b"];        // number
obj1["bin1"];     // number

obj2[0B11010];    // string
obj2[26];         // string
obj2["26"];       // string
obj2["0B11010"];  // any
obj2["a"];        // number
obj2["b"];        // number
obj2["bin2"];     // number

