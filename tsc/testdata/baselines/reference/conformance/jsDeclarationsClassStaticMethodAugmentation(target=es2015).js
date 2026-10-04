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
class Clazz {
    static method() { }
}
exports.Clazz = Clazz;
Clazz.method.prop = 5;


//// [source.d.ts]
export declare class Clazz {
    static method(): void;
}
