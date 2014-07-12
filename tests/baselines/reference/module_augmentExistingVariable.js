//// [module_augmentExistingVariable.js]
var console;

var console;
(function (console) {
    console.x = 2;
})(console || (console = {}));
