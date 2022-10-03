//// [narrowingOrderIndependent.ts]
// Repro from #36709

class A {
    constructor(public stringOrUndefined: string | undefined) {}
}

class B {
    constructor(public str: string) {}
}

const a = new A("123");

if (a instanceof A && a.stringOrUndefined) {
    new B(a.stringOrUndefined)
}

if (a.stringOrUndefined && a instanceof A) {
    new B(a.stringOrUndefined)
}

if (a instanceof A) {
    if (a.stringOrUndefined) {
        new B(a.stringOrUndefined)
    }
}

if (a.stringOrUndefined) {
    if (a instanceof A) {
        new B(a.stringOrUndefined)
    }
}


//// [narrowingOrderIndependent.js]
"use strict";
// Repro from #36709
var A = /** @class */ (function () {
    function A(stringOrUndefined) {
        this.stringOrUndefined = stringOrUndefined;
    }
    return A;
}());
var B = /** @class */ (function () {
    function B(str) {
        this.str = str;
    }
    return B;
}());
var a = new A("123");
if (a instanceof A && a.stringOrUndefined) {
    new B(a.stringOrUndefined);
}
if (a.stringOrUndefined && a instanceof A) {
    new B(a.stringOrUndefined);
}
if (a instanceof A) {
    if (a.stringOrUndefined) {
        new B(a.stringOrUndefined);
    }
}
if (a.stringOrUndefined) {
    if (a instanceof A) {
        new B(a.stringOrUndefined);
    }
}
