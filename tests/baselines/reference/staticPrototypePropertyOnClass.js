//// [tests/cases/compiler/staticPrototypePropertyOnClass.ts] ////

//// [staticPrototypePropertyOnClass.ts]
class c1 {
}
class c2<T> {
}
class c3 {
    constructor() {
    }
}
class c4 {
    constructor(param: string);
    constructor(param: number);
    constructor(param: any) {
    }
}
var a = c1;
var b = c2;
var c = c3;
var d = c4;

//// [staticPrototypePropertyOnClass.js]
var c1 = /** @class */ (function () {
    function c1() {
    }
    return c1;
}());
var c2 = /** @class */ (function () {
    function c2() {
    }
    return c2;
}());
var c3 = /** @class */ (function () {
    function c3() {
    }
    return c3;
}());
var c4 = /** @class */ (function () {
    function c4(param) {
    }
    return c4;
}());
var a = c1;
var b = c2;
var c = c3;
var d = c4;
