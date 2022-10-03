//// [module_augmentExistingAmbientVariable.ts]
declare var console: any;

module console {
    export var x = 2;
}

//// [module_augmentExistingAmbientVariable.js]
var console;
(function (console) {
    console.x = 2;
})(console || (console = {}));
