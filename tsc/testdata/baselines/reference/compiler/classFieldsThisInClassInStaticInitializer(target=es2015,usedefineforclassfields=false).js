//// [tests/cases/compiler/classFieldsThisInClassInStaticInitializer.ts] ////

//// [classFieldsThisInClassInStaticInitializer.ts]
// `this` in an instance field initializer of a class defined in a static initializer is the instance of that
// class, also when the class is emitted through a temp and its constructor is synthesized.

class C {
    static f = 1;
    static x = class { static s = 1; f = 10; a = this.f + 3; };
    static y = class { #p = 1; f = 20; a = this.f + 3; };
    static z = class { static s = 1; f = 30; a = this.f + 3; constructor() {} };
}


//// [classFieldsThisInClassInStaticInitializer.js]
"use strict";
// `this` in an instance field initializer of a class defined in a static initializer is the instance of that
// class, also when the class is emitted through a temp and its constructor is synthesized.
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _y_p, _c;
class C {
}
C.f = 1;
C.x = (_a = class {
        constructor() {
            this.f = 10;
            this.a = this.f + 3;
        }
    },
    __setFunctionName(_a, "x"),
    _a.s = 1,
    _a);
C.y = (_b = class {
        constructor() {
            _y_p.set(this, 1);
            this.f = 20;
            this.a = this.f + 3;
        }
    },
    _y_p = new WeakMap(),
    __setFunctionName(_b, "y"),
    _b);
C.z = (_c = class {
        constructor() {
            this.f = 30;
            this.a = this.f + 3;
        }
    },
    __setFunctionName(_c, "z"),
    _c.s = 1,
    _c);
