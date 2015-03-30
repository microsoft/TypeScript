//// [computedPropertyNames15_ES6.ts]
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
class C {
    [p1]() { }
    [p2]() { }
    [p3]() { }
}

//// [computedPropertyNames15_ES6.js]
var p1;
var p2;
var p3;
class C {
    [p1]() { }
    [p2]() { }
    [p3]() { }
}
