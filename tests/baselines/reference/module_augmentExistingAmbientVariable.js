//// [module_augmentExistingAmbientVariable.js]
var console;
(function (console) {
    console.x = 2;
})(console || (console = {}));
