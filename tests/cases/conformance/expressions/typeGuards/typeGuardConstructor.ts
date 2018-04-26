class C1 {
    p1: string;
}
class C2 {
    p2: number;
}
class D1 extends C1 {
    p3: number;
}
class C3 {
    p4: number;
}
class D2 extends D1 {
    p5: number
}

var a: C1;
if (a.constructor === D1) {
    a.p3;
}
if (a.constructor == D1) {
    a.p3;
}
if (D1 === a.constructor) {
    a.p3;
}
if (a["constructor"] === D1) {
    a.p3;
}
if (D1 === a["constructor"]) {
    a.p3;
}

var b: C1;
if (b.constructor === D2) {
    b.p3;
    b.p5;
}

var ctor3: C1 | C2;
if (ctor3.constructor ===  C1) {
    ctor3.p1; // C1
}
else {
    ctor3.p2; // C2
}

if (ctor3.constructor !==  C1) {
    ctor3.p2; // C1
}
else {
    ctor3.p1; // C2
}

var ctor4: C1 | C2 | C3;
if (ctor4.constructor ===  C1) {
    ctor4.p1; // C1
}
else if (ctor4.constructor ===  C2) {
    ctor4.p2; // C2
}
else {
    ctor4.p4; // C3
}

var x: number | "hello" | "world" | true | 1[] | undefined;
if (x.constructor === String) {
  x.length;
}

if (x.constructor === Number) {
    x.toFixed();
}

if (x.constructor === Boolean) {
    const b = x;
}

if(x.constructor === Array) {
    const c = x[0];
}
