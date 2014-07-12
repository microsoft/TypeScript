//// [module_augmentExistingVariable.ts]
var console: any;

module console {
    export var x = 2;
}

//// [module_augmentExistingVariable.js]
var console;
var console;
(function (console) {
    console.x = 2;
})(console || (console = {}));
