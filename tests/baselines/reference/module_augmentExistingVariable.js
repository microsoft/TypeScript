//// [tests/cases/compiler/module_augmentExistingVariable.ts] ////

//// [module_augmentExistingVariable.ts]
var console: any;

namespace console {
    export var x = 2;
}

//// [module_augmentExistingVariable.js]
"use strict";
var console;
var console;
(function (console) {
    console.x = 2;
})(console || (console = {}));
