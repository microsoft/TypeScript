//// [tests/cases/compiler/privateFieldAssignabilityFromUnknown.ts] ////

//// [privateFieldAssignabilityFromUnknown.ts]
export class Class {
  #field: any
}

const task: Class = {} as unknown;


//// [privateFieldAssignabilityFromUnknown.js]
var _Class_field;
export class Class {
    constructor() {
        _Class_field.set(this, void 0);
    }
}
_Class_field = new WeakMap();
const task = {};
