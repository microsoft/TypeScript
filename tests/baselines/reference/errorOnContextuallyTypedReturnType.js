//// [errorOnContextuallyTypedReturnType.ts]
var n1: () => boolean = function () { }; // expect an error here
var n2: () => boolean = function ():boolean { }; // expect an error here


//// [errorOnContextuallyTypedReturnType.js]
var n1 = function () {
};
var n2 = function () {
};
