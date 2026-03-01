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
var ExportedClass1 = /** @class */ (function () {
    function ExportedClass1(data) {
    }
    return ExportedClass1;
}());
exports.ExportedClass1 = ExportedClass1;
var ExportedClass2 = /** @class */ (function () {
    function ExportedClass2(data) {
        this.data = data;
    }
    return ExportedClass2;
}());
exports.ExportedClass2 = ExportedClass2;
var ExportedClass3 = /** @class */ (function () {
    function ExportedClass3(data, n) {
        this.data = data;
        this.n = n;
    }
    return ExportedClass3;
}());
exports.ExportedClass3 = ExportedClass3;
var ExportedClass4 = /** @class */ (function () {
    function ExportedClass4(data, n) {
        this.data = data;
        this.n = n;
    }
    return ExportedClass4;
}());
exports.ExportedClass4 = ExportedClass4;


//// [declarationEmitClassPrivateConstructor.d.ts]
export declare class ExportedClass1 {
    private constructor();
}
export declare class ExportedClass2 {
    private data;
    private constructor();
}
export declare class ExportedClass3 {
    private data;
    private n;
    private constructor();
}
export declare class ExportedClass4 {
    private data;
    n: number;
    private constructor();
}
