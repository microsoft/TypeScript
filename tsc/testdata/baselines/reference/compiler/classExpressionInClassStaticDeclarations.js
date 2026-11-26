//// [tests/cases/compiler/classExpressionInClassStaticDeclarations.ts] ////

//// [classExpressionInClassStaticDeclarations.ts]
class C {
    static D = class extends C {};
}

//// [classExpressionInClassStaticDeclarations.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
class C {
}
C.D = (_a = class extends C {
    },
    __setFunctionName(_a, "D"),
    _a);


//// [classExpressionInClassStaticDeclarations.d.ts]
declare class C {
    static D: {
        new (): {};
        D: /*elided*/ any;
    };
}
