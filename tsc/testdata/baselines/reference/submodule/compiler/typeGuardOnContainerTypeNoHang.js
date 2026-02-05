//// [tests/cases/compiler/typeGuardOnContainerTypeNoHang.ts] ////

//// [typeGuardOnContainerTypeNoHang.ts]
export namespace TypeGuards {
    export function IsObject(value: any) : value is {[index:string]:any} {
        return typeof(value) === 'object'
    }

}

//// [typeGuardOnContainerTypeNoHang.js]
export { TypeGuards };
var TypeGuards;
(function (TypeGuards) {
    function IsObject(value) {
        return typeof (value) === 'object';
    }
    TypeGuards.IsObject = IsObject;
})(TypeGuards || (TypeGuards = {}));
