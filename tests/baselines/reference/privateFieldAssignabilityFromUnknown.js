//// [privateFieldAssignabilityFromUnknown.ts]
export class Class {
  #field: any
}

const task: Class = {} as unknown;


//// [privateFieldAssignabilityFromUnknown.js]
"use strict";
var _field;
exports.__esModule = true;
exports.Class = void 0;
var Class = /** @class */ (function () {
    function Class() {
        _field.set(this, void 0);
    }
    return Class;
}());
exports.Class = Class;
_field = new WeakMap();
var task = {};
