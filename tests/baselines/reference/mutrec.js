//// [mutrec.ts]
interface A {
    x:B[];
}

interface B {
    x:A[];
}

function f(p: A) { return p };
var b:B;
f(b);

interface I1 {
    y:I2;
}

interface I2 {
    y:I3;
}

interface I3 {
    y:I1;
}

function g(p: I1) { return p };
var i2:I2;
g(i2);
var i3:I3;
g(i3);

interface I4 {
    y:I5;
}

interface I5 {
    y:I4;
}

var i4:I4;
g(i4);



//// [mutrec.js]
function f(p) { return p; }
;
var b;
f(b);
function g(p) { return p; }
;
var i2;
g(i2);
var i3;
g(i3);
var i4;
g(i4);
