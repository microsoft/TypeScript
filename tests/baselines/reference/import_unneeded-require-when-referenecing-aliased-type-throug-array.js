//// [tests/cases/compiler/import_unneeded-require-when-referenecing-aliased-type-throug-array.ts] ////

//// [b.ts]
declare module "ITest" {
    interface Name {
        name: string;
    }
    export = Name;
}

//// [a.ts]
/// <reference path="b.ts" />
import ITest = require('ITest');
var testData: ITest[];
var p = testData[0].name;
 

//// [b.js]
//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var testData;
    var p = testData[0].name;
});
