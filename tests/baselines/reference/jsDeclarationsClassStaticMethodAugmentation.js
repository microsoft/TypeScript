//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassStaticMethodAugmentation.ts] ////

//// [source.js]
export class Clazz {
    static method() { }
}

Clazz.method.prop = 5;

//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clazz = void 0;
var Clazz = /** @class */ (function () {
    function Clazz() {
    }
    Clazz.method = function () { };
    return Clazz;
}());
exports.Clazz = Clazz;
Clazz.method.prop = 5;


//// [source.d.ts]
export class Clazz {
}
export namespace Clazz {
    function method(): void;
    namespace method {
        let prop: number;
    }
}
