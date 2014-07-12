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
verify.memberListContains("localVariable");
verify.memberListContains("exportedVaribale");

verify.memberListContains("localFunction");
verify.memberListContains("exportedFunction");

verify.memberListContains("localClass");
verify.memberListContains("exportedClass");

verify.memberListContains("localModule");
verify.memberListContains("exportedModule");

verify.memberListContains("exportedVaribale2");
verify.memberListContains("exportedFunction2");
verify.memberListContains("exportedClass2");
verify.memberListContains("exportedModule2");

goTo.marker("typeReference");
verify.memberListContains("localInterface");
verify.memberListContains("exportedInterface");

verify.memberListContains("localClass");
verify.memberListContains("exportedClass");

verify.memberListContains("localModule");
verify.memberListContains("exportedModule");

verify.memberListContains("exportedClass2");
verify.memberListContains("exportedModule2");

goTo.marker("insideMethod");
verify.not.memberListContains("property");
verify.not.memberListContains("testMethod");
verify.not.memberListContains("staticMethod");

verify.memberListContains("globalVar");
verify.memberListContains("globalFunction");

verify.memberListContains("param");
verify.memberListContains("localVar");
verify.memberListContains("localFunction");
