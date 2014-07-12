//// [ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.js]
var A;
(function (A) {
    var B = (function () {
        function B() {
        }
        return B;
    })();

    A.beez;
    A.beez2 = new Array();
})(A || (A = {}));
