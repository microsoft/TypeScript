//// [tests/cases/compiler/useBeforeDeclaration_propertyAssignment.ts] ////

//// [useBeforeDeclaration_propertyAssignment.ts]
export class C {
    public a =  { b: this.b, ...this.c, [this.b]: `${this.c}`};
    private b = 0;
    public c = { c: this.b };
}

class D {
    static A = class extends D.B {
        [D.D]() {} // should be an error
    }
    static B = class {}
    static C = {
        [D.D]: 1,
        ...{get [D.D]() {return 0;}} // should be an error
    };
    static D = '';
}

//// [useBeforeDeclaration_propertyAssignment.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b;
export class C {
    constructor() {
        this.a = Object.assign(Object.assign({ b: this.b }, this.c), { [this.b]: `${this.c}` });
        this.b = 0;
        this.c = { c: this.b };
    }
}
class D {
}
D.A = (_a = class extends D.B {
        [D.D]() { } // should be an error
    },
    __setFunctionName(_a, "A"),
    _a);
D.B = (_b = class {
    },
    __setFunctionName(_b, "B"),
    _b);
D.C = Object.assign({ [D.D]: 1 }, { get [D.D]() { return 0; } } // should be an error
);
D.D = '';
