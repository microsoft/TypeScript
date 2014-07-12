//// [privateStaticNotAccessibleInClodule.js]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.
var C = (function () {
    function C() {
    }
    return C;
})();

var C;
(function (C) {
    C.y = C.bar;
})(C || (C = {}));
