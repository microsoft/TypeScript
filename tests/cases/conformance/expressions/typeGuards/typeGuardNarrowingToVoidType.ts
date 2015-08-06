let x: number | string | boolean;

if (typeof x === "number") {
    x.toPrecision();
}
else if (typeof x === "string") {
    x.charCodeAt(1);
}
else if(typeof x === "boolean") {
    x.valueOf();
}
else {
    x
}

if(typeof x === "boolean") {
    x.valueOf();
}
else if (typeof x === "number") {
    x.toPrecision();
}
else if (typeof x === "string") {
    x.charCodeAt(1);
}
else if(typeof x === "boolean") {
    x.valueOf();
}
else {
    x
}

class A { a: string; }
class B { b: string; }
class C { c: string; }

declare function isA(x: any): x is A;
declare function isB(x: any): x is B;
declare function isC(x: any): x is C;

let y: A | B | C;

if (isA(y)) {
    y.a;
}
else if(isB(y)){
    y.b;
}
else if(isC(y)) {
    y.c;
}
else{
    y
}

if (isB(y)) {
    y.b;
}
else if (isA(y)) {
    y.a;
}
else if(isB(y)){
    y.b;
}
else if(isC(y)) {
    y.c;
}
else{
    y
}
