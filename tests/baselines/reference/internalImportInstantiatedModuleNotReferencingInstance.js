//// [internalImportInstantiatedModuleNotReferencingInstance.js]
var A;
(function (A) {
    A.a = 10;
})(A || (A = {}));

var B;
(function (B) {
    var A = 1;
})(B || (B = {}));
