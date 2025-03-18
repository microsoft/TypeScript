//// [tests/cases/compiler/declarationEmitClassPrivateConstructor2.ts] ////

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
class ExportedClass1 {
    data;
    constructor(data) {
        this.data = data;
    }
}
exports.ExportedClass1 = ExportedClass1;
class ExportedClass2 {
    constructor(data) { }
}
exports.ExportedClass2 = ExportedClass2;
