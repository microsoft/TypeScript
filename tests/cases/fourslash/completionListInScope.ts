/// <reference path="fourslash.ts" />

////module TestModule {
////    var localVariable = "";
////    export var exportedVariable = 0;
////
////    function localFunction() { }
////    export function exportedFunction() { }
////
////    class localClass { }
////    export class exportedClass { }
////
////    interface localInterface {}
////    export interface exportedInterface {}
////
////    module localModule {
////        export var x = 0;
////    }
////    export module exportedModule {
////        export var x = 0;
////    }
////
////    var v = /*valueReference*/ 0;
////    var t :/*typeReference*/;
////}
////
////// Add some new items to the module
////module TestModule {
////    var localVariable2 = "";
////    export var exportedVariable2 = 0;
////
////    function localFunction2() { }
////    export function exportedFunction2() { }
////
////    class localClass2 { }
////    export class exportedClass2 { }
////
////    interface localInterface2 {}
////    export interface exportedInterface2 {}
////
////    module localModule2 {
////        export var x = 0;
////    }
////    export module exportedModule2 {
////        export var x = 0;
////    }
////}
////var globalVar: string = "";
////function globalFunction() { }
////
////class TestClass {
////    property: number;
////    method() { }
////    staticMethod() { }
////    testMethod(param: number) {
////        var localVar = 0;
////        function localFunction() {};
////        /*insideMethod*/
////    }
////}

verify.completions(
    {
        marker: "valueReference",
        includes: [
            "localVariable",
            "exportedVariable",
            "localFunction",
            "exportedFunction",
            "localClass",
            "exportedClass",
            "localModule",
            "exportedModule",
            "exportedVariable2",
            "exportedFunction2",
            "exportedClass2",
            "exportedModule2",
        ],
        isNewIdentifierLocation: true, // TODO: Should not be a new identifier location
    },
    {
        marker: "typeReference",
        includes: [
            "localInterface",
            "exportedInterface",
            "localClass",
            "exportedClass",
            "exportedClass2",
        ],
        excludes: [
            "localModule",
            "exportedModule",
            "exportedModule2",
        ],
    },
    {
        marker: "insideMethod",
        includes: [
            "globalVar",
            "globalFunction",
            "param",
            "localVar",
            "localFunction",
        ],
        excludes: [
            "property",
            "testMethod",
            "staticMethod",
        ],
    },
);
