/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
////namespace Validation {
////    var function1 = function() {
////    }
////
////    export function function2() {
////
////    }
////
////    [| function function3() {
////        function1();
////    }
////
////    function function4() {
////
////    }
////
////    export let a = function3; |]
////}

verify.rangeAfterCodeFix(`function function3() {
        function1();
    }

    export let a = function3;`);
