//// [keyofAndIndexedAccessErrors.ts]
class Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}

type Dictionary<T> = { [x: string]: T };

type T00 = keyof K0;  // Error

type T01 = keyof Object;
type T02 = keyof keyof Object;
type T03 = keyof keyof keyof Object;
type T04 = keyof keyof keyof keyof Object;
type T05 = keyof keyof keyof keyof keyof Object;
type T06 = keyof keyof keyof keyof keyof keyof Object;

type T10 = Shape["name"];
type T11 = Shape["foo"];  // Error
type T12 = Shape["name" | "foo"];  // Error
type T13 = Shape[any];  // Error
type T14 = Shape[string];  // Error
type T15 = Shape[number];  // Error
type T16 = Shape[boolean];  // Error
type T17 = Shape[void];  // Error
type T18 = Shape[undefined];  // Error
type T19 = Shape[{ x: string }];  // Error
type T20 = Shape[string | number];  // Error
type T21 = Shape[string & number];  // Error
type T22 = Shape[string | boolean];  // Error

type T30 = string[]["length"];
type T31 = string[][number];
type T32 = string[][string];  // Error
type T33 = string[][boolean];  // Error

type T40 = Dictionary<string>[any];
type T41 = Dictionary<string>[number];
type T42 = Dictionary<string>[string];
type T43 = Dictionary<string>[boolean];  // Error

type T50 = any[any];
type T51 = any[number];
type T52 = any[string];
type T53 = any[boolean];  // Error

type T60 = {}["toString"];
type T61 = []["toString"];

declare let cond: boolean;

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

function f10(shape: Shape) {
    let x1 = getProperty(shape, "name");
    let x2 = getProperty(shape, "size");  // Error
    let x3 = getProperty(shape, cond ? "name" : "size");  // Error
    setProperty(shape, "name", "rectangle");
    setProperty(shape, "size", 10);  // Error
    setProperty(shape, cond ? "name" : "size", 10);  // Error
}

function f20<T, U>(k1: keyof (T | U), k2: keyof (T & U), o1: T | U, o2: T & U) {
    o1[k1];
    o1[k2];   // Error
    o2[k1];
    o2[k2];
    o1 = o2;
    o2 = o1;  // Error
    k1 = k2;  // Error
    k2 = k1;
}

//// [keyofAndIndexedAccessErrors.js]
var Shape = (function () {
    function Shape() {
    }
    return Shape;
}());
function getProperty(obj, key) {
    return obj[key];
}
function setProperty(obj, key, value) {
    obj[key] = value;
}
function f10(shape) {
    var x1 = getProperty(shape, "name");
    var x2 = getProperty(shape, "size"); // Error
    var x3 = getProperty(shape, cond ? "name" : "size"); // Error
    setProperty(shape, "name", "rectangle");
    setProperty(shape, "size", 10); // Error
    setProperty(shape, cond ? "name" : "size", 10); // Error
}
function f20(k1, k2, o1, o2) {
    o1[k1];
    o1[k2]; // Error
    o2[k1];
    o2[k2];
    o1 = o2;
    o2 = o1; // Error
    k1 = k2; // Error
    k2 = k1;
}
