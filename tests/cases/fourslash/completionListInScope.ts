/// <reference path="fourslash.ts" />

////module TestModule {
////    var localVariable = "";
////    export var exportedVaribale = 0;
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
////    export var exportedVaribale2 = 0;
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


goTo.marker("valueReference");
verify.completionListContains("localVariable");
verify.completionListContains("exportedVaribale");

verify.completionListContains("localFunction");
verify.completionListContains("exportedFunction");

verify.completionListContains("localClass");
verify.completionListContains("exportedClass");

verify.completionListContains("localModule");
verify.completionListContains("exportedModule");

verify.completionListContains("exportedVaribale2");
verify.completionListContains("exportedFunction2");
verify.completionListContains("exportedClass2");
verify.completionListContains("exportedModule2");

goTo.marker("typeReference");
verify.completionListContains("localInterface");
verify.completionListContains("exportedInterface");

verify.completionListContains("localClass");
verify.completionListContains("exportedClass");

verify.not.completionListContains("localModule");
verify.not.completionListContains("exportedModule");

verify.completionListContains("exportedClass2");
verify.not.completionListContains("exportedModule2");

goTo.marker("insideMethod");
verify.not.completionListContains("property");
verify.not.completionListContains("testMethod");
verify.not.completionListContains("staticMethod");

verify.completionListContains("globalVar");
verify.completionListContains("globalFunction");

verify.completionListContains("param");
verify.completionListContains("localVar");
verify.completionListContains("localFunction");
