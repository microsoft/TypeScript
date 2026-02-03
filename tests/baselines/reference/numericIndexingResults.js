//// [tests/cases/conformance/types/objectTypeLiteral/indexSignatures/numericIndexingResults.ts] ////

//// [numericIndexingResults.ts]
class C {
    [x: number]: string;
    1 = '';
    "2" = ''
}

var c: C;
var r1 = c['1'];
var r2 = c['2'];
var r3 = c['3'];
var r4 = c[1];
var r5 = c[2];
var r6 = c[3];

interface I {
    [x: number]: string;
    1: string;
    "2": string;
}

var i: I
var r1 = i['1'];
var r2 = i['2'];
var r3 = i['3'];
var r4 = i[1];
var r5 = i[2];
var r6 = i[3];

var a: {
    [x: number]: string;
    1: string;
    "2": string;
}

var r1 = a['1'];
var r2 = a['2'];
var r3 = a['3'];
var r4 = a[1];
var r5 = a[2];
var r6 = a[3];

var b: { [x: number]: string } = { 1: '', "2": '' }
var r1a = b['1'];
var r2a = b['2'];
var r3 = b['3'];
var r4 = b[1];
var r5 = b[2];
var r6 = b[3];

var b2: { [x: number]: string; 1: string; "2": string; } = { 1: '', "2": '' }
var r1b = b2['1'];
var r2b = b2['2'];
var r3 = b2['3'];
var r4 = b2[1];
var r5 = b2[2];
var r6 = b2[3];

//// [numericIndexingResults.js]
var C = /** @class */ (function () {
    function C() {
        this[1] = '';
        this["2"] = '';
    }
    return C;
}());
var c;
var r1 = c['1'];
var r2 = c['2'];
var r3 = c['3'];
var r4 = c[1];
var r5 = c[2];
var r6 = c[3];
var i;
var r1 = i['1'];
var r2 = i['2'];
var r3 = i['3'];
var r4 = i[1];
var r5 = i[2];
var r6 = i[3];
var a;
var r1 = a['1'];
var r2 = a['2'];
var r3 = a['3'];
var r4 = a[1];
var r5 = a[2];
var r6 = a[3];
var b = { 1: '', "2": '' };
var r1a = b['1'];
var r2a = b['2'];
var r3 = b['3'];
var r4 = b[1];
var r5 = b[2];
var r6 = b[3];
var b2 = { 1: '', "2": '' };
var r1b = b2['1'];
var r2b = b2['2'];
var r3 = b2['3'];
var r4 = b2[1];
var r5 = b2[2];
var r6 = b2[3];
