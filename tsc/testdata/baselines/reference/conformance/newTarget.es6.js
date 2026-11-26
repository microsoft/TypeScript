//// [tests/cases/conformance/es6/newTarget/newTarget.es6.ts] ////

//// [newTarget.es6.ts]
class A {
    constructor() {
        const a = new.target;
        const b = () => new.target;
    }
    static c = function () { return new.target; }
    d = function () { return new.target; }
}

class B extends A {
    constructor() {
        super();
        const e = new.target;
        const f = () => new.target;
    }
}

function f1() {
    const g = new.target;
    const h = () => new.target;
}

const f2 = function () {
    const i = new.target;
    const j = () => new.target;
}

const O = {
    k: function () { return new.target; }
};



//// [newTarget.es6.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class A {
    constructor() {
        this.d = __setFunctionName(function () { return new.target; }, "d");
        const a = new.target;
        const b = () => new.target;
    }
}
A.c = __setFunctionName(function () { return new.target; }, "c");
class B extends A {
    constructor() {
        super();
        const e = new.target;
        const f = () => new.target;
    }
}
function f1() {
    const g = new.target;
    const h = () => new.target;
}
const f2 = function () {
    const i = new.target;
    const j = () => new.target;
};
const O = {
    k: function () { return new.target; }
};
