//// [tests/cases/compiler/typeGuardOnContainerTypeNoHang.ts] ////

//// [typeGuardOnContainerTypeNoHang.ts]
export namespace TypeGuards {
    export function IsObject(value: any) : value is {[index:string]:any} {
        return typeof(value) === 'object'
    }

}

//// [typeGuardOnContainerTypeNoHang.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGuards = void 0;
var TypeGuards;
(function (TypeGuards) {
    function IsObject(value) {
        return typeof (value) === 'object';
    }
    TypeGuards.IsObject = IsObject;
})(TypeGuards || (exports.TypeGuards = TypeGuards = {}));
