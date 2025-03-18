//// [tests/cases/compiler/privateFieldAssignabilityFromUnknown.ts] ////

//// [privateFieldAssignabilityFromUnknown.ts]
export class Class {
  #field: any
}

const task: Class = {} as unknown;


//// [privateFieldAssignabilityFromUnknown.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
class Class {
    #field;
}
exports.Class = Class;
const task = {};
