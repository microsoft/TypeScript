//// [tests/cases/compiler/inheritance.ts] ////

//// [inheritance.ts]
class B1 {
    public x;
}

class B2 {
    public x;
}


class D1 extends B1 {
}

class D2 extends B2 {
}


class N {
    public y:number;
}

class ND extends N { // any is assignable to number
    public y;
}

class Good {
    public f: () => number = function () { return 0; }
    public g() { return 0; }
}

class Baad extends Good {
    public f(): number { return 0; }
    public g(n: number) { return 0; }
}


//// [inheritance.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class B1 {
}
class B2 {
}
class D1 extends B1 {
}
class D2 extends B2 {
}
class N {
}
class ND extends N {
}
class Good {
    constructor() {
        this.f = __setFunctionName(function () { return 0; }, "f");
    }
    g() { return 0; }
}
class Baad extends Good {
    f() { return 0; }
    g(n) { return 0; }
}
