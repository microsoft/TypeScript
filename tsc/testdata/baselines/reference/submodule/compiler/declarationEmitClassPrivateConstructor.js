//// [tests/cases/compiler/declarationEmitClassPrivateConstructor.ts] ////

//// [declarationEmitClassPrivateConstructor.ts]
interface PrivateInterface {
}

export class ExportedClass1 {
    private constructor(data: PrivateInterface) { }
}

export class ExportedClass2 {
    private constructor(private data: PrivateInterface) { }
}

export class ExportedClass3 {
    private constructor(private data: PrivateInterface, private n: number) { }
}

export class ExportedClass4 {
    private constructor(private data: PrivateInterface, public n:number) { }
}

//// [declarationEmitClassPrivateConstructor.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportedClass4 = exports.ExportedClass3 = exports.ExportedClass2 = exports.ExportedClass1 = void 0;
class ExportedClass1 {
    constructor(data) { }
}
exports.ExportedClass1 = ExportedClass1;
class ExportedClass2 {
    data;
    constructor(data) {
        this.data = data;
    }
}
exports.ExportedClass2 = ExportedClass2;
class ExportedClass3 {
    data;
    n;
    constructor(data, n) {
        this.data = data;
        this.n = n;
    }
}
exports.ExportedClass3 = ExportedClass3;
class ExportedClass4 {
    data;
    n;
    constructor(data, n) {
        this.data = data;
        this.n = n;
    }
}
exports.ExportedClass4 = ExportedClass4;
