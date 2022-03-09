//// [typeGuardOnContainerTypeNoHang.ts]
export namespace TypeGuards {
    export function IsObject(value: any) : value is {[index:string]:any} {
        return typeof(value) === 'object'
    }

}

//// [typeGuardOnContainerTypeNoHang.js]
"use strict";
exports.__esModule = true;
exports.TypeGuards = void 0;
var TypeGuards;
(function (TypeGuards) {
    function IsObject(value) {
        return typeof (value) === 'object';
    }
    TypeGuards.IsObject = IsObject;
})(TypeGuards = exports.TypeGuards || (exports.TypeGuards = {}));
