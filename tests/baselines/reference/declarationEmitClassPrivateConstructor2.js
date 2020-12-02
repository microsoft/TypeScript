//// [declarationEmitClassPrivateConstructor2.ts]
interface PrivateInterface {
}

export class ExportedClass1 {
    private constructor(public data: PrivateInterface) { }
}


export class ExportedClass2 {
    protected constructor(data: PrivateInterface) { }
}

//// [declarationEmitClassPrivateConstructor2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportedClass2 = exports.ExportedClass1 = void 0;
var ExportedClass1 = /** @class */ (function () {
    function ExportedClass1(data) {
        this.data = data;
    }
    return ExportedClass1;
}());
exports.ExportedClass1 = ExportedClass1;
var ExportedClass2 = /** @class */ (function () {
    function ExportedClass2(data) {
    }
    return ExportedClass2;
}());
exports.ExportedClass2 = ExportedClass2;


//// [declarationEmitClassPrivateConstructor2.d.ts]
interface PrivateInterface {
}
export declare class ExportedClass1 {
    data: PrivateInterface;
    private constructor();
}
export declare class ExportedClass2 {
    protected constructor(data: PrivateInterface);
}
export {};
