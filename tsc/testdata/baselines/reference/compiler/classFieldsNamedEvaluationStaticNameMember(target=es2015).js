//// [tests/cases/compiler/classFieldsNamedEvaluationStaticNameMember.ts] ////

//// [classFieldsNamedEvaluationStaticNameMember.ts]
// A class that defines its own static `name` with a method or an accessor keeps that member: the class defines
// it after it is given its name, so the class must not be named explicitly after it is created.

const A = class { #p = 1; static name() { return "A.name"; } };
const B = class { static f = 1; static get name() { return "B.name"; } };

class C {
    f = class { static name() { return "f.name"; } };
}

// A static `name` field is initialized after the class is named, so it does not prevent naming.
const D = class { #p = 1; static name = "D.name"; };


//// [classFieldsNamedEvaluationStaticNameMember.js]
"use strict";
// A class that defines its own static `name` with a method or an accessor keeps that member: the class defines
// it after it is given its name, so the class must not be named explicitly after it is created.
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _A_p, _a, _b, _c, _D_p;
const A = (_a = class {
        constructor() {
            _A_p.set(this, 1);
        }
        static name() { return "A.name"; }
    },
    _A_p = new WeakMap(),
    _a);
const B = (_b = class {
        static get name() { return "B.name"; }
    },
    Object.defineProperty(_b, "f", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 1
    }),
    _b);
class C {
    constructor() {
        Object.defineProperty(this, "f", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: class {
                static name() { return "f.name"; }
            }
        });
    }
}
// A static `name` field is initialized after the class is named, so it does not prevent naming.
const D = (_c = class {
        constructor() {
            _D_p.set(this, 1);
        }
    },
    _D_p = new WeakMap(),
    __setFunctionName(_c, "D"),
    Object.defineProperty(_c, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "D.name"
    }),
    _c);
