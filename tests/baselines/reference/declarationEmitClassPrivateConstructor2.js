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
var ExportedClass1 = (function () {
    function ExportedClass1(data) {
        this.data = data;
    }
    return ExportedClass1;
}());
exports.ExportedClass1 = ExportedClass1;
var ExportedClass2 = (function () {
    function ExportedClass2(data) {
    }
    return ExportedClass2;
}());
exports.ExportedClass2 = ExportedClass2;
