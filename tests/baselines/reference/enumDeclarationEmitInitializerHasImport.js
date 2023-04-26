//// [tests/cases/compiler/enumDeclarationEmitInitializerHasImport.ts] ////

//// [provider.ts]
export enum Enum {
    Value1,
    Value2,
}
//// [consumer.ts]
import provider = require('./provider');

export const value = provider.Enum.Value1;

//// [provider.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
var Enum;
(function (Enum) {
    Enum[Enum["Value1"] = 0] = "Value1";
    Enum[Enum["Value2"] = 1] = "Value2";
})(Enum || (exports.Enum = Enum = {}));
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = void 0;
var provider = require("./provider");
exports.value = provider.Enum.Value1;


//// [provider.d.ts]
export declare enum Enum {
    Value1 = 0,
    Value2 = 1
}
//// [consumer.d.ts]
import provider = require('./provider');
export declare const value = provider.Enum.Value1;
