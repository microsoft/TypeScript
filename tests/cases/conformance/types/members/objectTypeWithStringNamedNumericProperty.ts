// @target: ES5

// string named numeric properties are legal and distinct when indexed by string values
// indexed numerically the value is converted to a number
// no errors expected below

class C {
    "0.1": void;
    ".1": Object;
    "1": number;
    "1.": string;
    "1..": boolean;
    "1.0": Date;
    "-1.0": RegExp;
    "-1": Date;
}

var c: C;
var r1 = c['0.1'];
var r2 = c['.1'];
var r3 = c['1'];
var r3 = c[1];
var r4 = c['1.'];
var r3 = c[1.]; // same as indexing by 1 when done numerically
var r5 = c['1..'];
var r6 = c['1.0'];
var r3 = c[1.0]; // same as indexing by 1 when done numerically
// BUG 823822
var r7 = i[-1];
var r7 = i[-1.0];
var r8 = i["-1.0"];
var r9 = i["-1"];
var r10 = i[0x1]
var r11 = i[-0x1]
var r12 = i[01]
var r13 = i[-01]

interface I {
    "0.1": void;
    ".1": Object;
    "1": number;
    "1.": string;
    "1..": boolean;
    "1.0": Date;
    "-1.0": RegExp;
    "-1": Date;
}

var i: I;
var r1 = i['0.1'];
var r2 = i['.1'];
var r3 = i['1'];
var r3 = c[1];
var r4 = i['1.'];
var r3 = c[1.]; // same as indexing by 1 when done numerically
var r5 = i['1..'];
var r6 = i['1.0'];
var r3 = c[1.0]; // same as indexing by 1 when done numerically
// BUG 823822
var r7 = i[-1]; 
var r7 = i[-1.0]; 
var r8 = i["-1.0"];
var r9 = i["-1"];
var r10 = i[0x1]
var r11 = i[-0x1]
var r12 = i[01]
var r13 = i[-01]

var a: {
    "0.1": void;
    ".1": Object;
    "1": number;
    "1.": string;
    "1..": boolean;
    "1.0": Date;
    "-1.0": RegExp;
    "-1": Date;
}

var r1 = a['0.1'];
var r2 = a['.1'];
var r3 = a['1'];
var r3 = c[1];
var r4 = a['1.'];
var r3 = c[1.]; // same as indexing by 1 when done numerically
var r5 = a['1..'];
var r6 = a['1.0'];
var r3 = c[1.0]; // same as indexing by 1 when done numerically
// BUG 823822
var r7 = i[-1];
var r7 = i[-1.0];
var r8 = i["-1.0"];
var r9 = i["-1"];
var r10 = i[0x1]
var r11 = i[-0x1]
var r12 = i[01]
var r13 = i[-01]

var b = {
    "0.1": <void>null,
    ".1": new Object(),
    "1": 1,
    "1.": "",
    "1..": true,
    "1.0": new Date(),
    "-1.0": /123/,
    "-1": Date
};

var r1 = b['0.1'];
var r2 = b['.1'];
var r3 = b['1'];
var r3 = c[1];
var r4 = b['1.'];
var r3 = c[1.]; // same as indexing by 1 when done numerically
var r5 = b['1..'];
var r6 = b['1.0'];
var r3 = c[1.0]; // same as indexing by 1 when done numerically
// BUG 823822
var r7 = i[-1];
var r7 = i[-1.0];
var r8 = i["-1.0"];
var r9 = i["-1"];
var r10 = i[0x1]
var r11 = i[-0x1]
var r12 = i[01]
var r13 = i[-01]
