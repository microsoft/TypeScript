//// [stringIndexingResults.ts]
class C {
    [x: string]: string;
    y = '';
}

var c: C;
var r1 = c['y']; 
var r2 = c['a'];
var r3 = c[1]; 

interface I {
    [x: string]: string;
    y: string;
}

var i: I
var r4 = i['y'];
var r5 = i['a'];
var r6 = i[1]; 

var a: {
    [x: string]: string;
    y: string;
}

var r7 = a['y'];
var r8 = a['a'];
var r9 = a[1];

var b: { [x: string]: string } = { y: '' }

var r10 = b['y'];
var r11 = b['a'];
var r12 = b[1];


//// [stringIndexingResults.js]
var C = /** @class */ (function () {
    function C() {
        this.y = '';
    }
    return C;
}());
var c;
var r1 = c['y'];
var r2 = c['a'];
var r3 = c[1];
var i;
var r4 = i['y'];
var r5 = i['a'];
var r6 = i[1];
var a;
var r7 = a['y'];
var r8 = a['a'];
var r9 = a[1];
var b = { y: '' };
var r10 = b['y'];
var r11 = b['a'];
var r12 = b[1];
