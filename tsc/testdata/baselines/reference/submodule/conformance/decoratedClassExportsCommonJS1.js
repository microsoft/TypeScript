//// [tests/cases/conformance/decorators/class/decoratedClassExportsCommonJS1.ts] ////

//// [a.ts]
declare function forwardRef(x: any): any;
declare var Something: any;
@Something({ v: () => Testing123 })
export class Testing123 {
    static prop0: string;
    static prop1 = Testing123.prop0;
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testing123 = void 0;
@Something({ v: () => Testing123 })
class Testing123 {
    static prop0;
    static prop1 = Testing123.prop0;
}
exports.Testing123 = Testing123;
