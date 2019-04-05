//// [tests/cases/compiler/disableImportOptimizations.ts] ////

//// [disableImportOptimizations1.ts]
export class ClassWithSideEffect {
  static someValue = ClassWithSideEffect.initValue();

  static initValue(): string {
    console.log("We have a side-effect here!");
    return "something";
  }
}

//// [disableImportOptimizations2.ts]
import { ClassWithSideEffect } from "./disableImportOptimizations1"; //Import gets removed without disableImportOptimizations

export class OtherClass {
}

//// [disableImportOptimizations1.js]
"use strict";
exports.__esModule = true;
var ClassWithSideEffect = /** @class */ (function () {
    function ClassWithSideEffect() {
    }
    ClassWithSideEffect.initValue = function () {
        console.log("We have a side-effect here!");
        return "something";
    };
    ClassWithSideEffect.someValue = ClassWithSideEffect.initValue();
    return ClassWithSideEffect;
}());
exports.ClassWithSideEffect = ClassWithSideEffect;
//// [disableImportOptimizations2.js]
"use strict";
exports.__esModule = true;
var disableImportOptimizations1_1 = require("./disableImportOptimizations1"); //Import gets removed without disableImportOptimizations
var OtherClass = /** @class */ (function () {
    function OtherClass() {
    }
    return OtherClass;
}());
exports.OtherClass = OtherClass;
