//// [tests/cases/compiler/privateFieldAssignabilityFromUnknown.ts] ////

//// [privateFieldAssignabilityFromUnknown.ts]
export class Class {
  #field: any
}

const task: Class = {} as unknown;


//// [privateFieldAssignabilityFromUnknown.js]
"use strict";
var _Class_field;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
class Class {
    constructor() {
        _Class_field.set(this, void 0);
    }
}
exports.Class = Class;
_Class_field = new WeakMap();
const task = {};
