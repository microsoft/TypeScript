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
Object.defineProperty(C, "f", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 1
});
Object.defineProperty(C, "x", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (_a = class {
            constructor() {
                Object.defineProperty(this, "f", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 10
                });
                Object.defineProperty(this, "a", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: this.f + 3
                });
            }
        },
        __setFunctionName(_a, "x"),
        Object.defineProperty(_a, "s", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        }),
        _a)
});
Object.defineProperty(C, "y", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (_b = class {
            constructor() {
                _y_p.set(this, 1);
                Object.defineProperty(this, "f", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 20
                });
                Object.defineProperty(this, "a", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: this.f + 3
                });
            }
        },
        _y_p = new WeakMap(),
        __setFunctionName(_b, "y"),
        _b)
});
Object.defineProperty(C, "z", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (_c = class {
            constructor() {
                Object.defineProperty(this, "f", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 30
                });
                Object.defineProperty(this, "a", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: this.f + 3
                });
            }
        },
        __setFunctionName(_c, "z"),
        Object.defineProperty(_c, "s", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        }),
        _c)
});
