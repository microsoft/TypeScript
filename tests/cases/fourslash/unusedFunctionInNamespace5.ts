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
////    function function3() {
////        function1();
////    }/*0*/
////
////    function function4() {
////
////    }/*1*/
////
////    export let a = function3;
////}

verify.codeFixAtPosition(`
namespace Validation {
    var function1 = function() {
    }

    export function function2() {

    }

    function function3() {
        function1();
    }

    export let a = function3;
}`);
