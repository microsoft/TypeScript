//// [subtypingWithNumericIndexer5.js]
// Derived type indexer must be subtype of base type indexer

var B = (function () {
    function B() {
    }
    return B;
})();

var B2 = (function () {
    function B2() {
    }
    return B2;
})();

var Generics;
(function (Generics) {
    var B = (function () {
        function B() {
        }
        return B;
    })();

    var B2 = (function () {
        function B2() {
        }
        return B2;
    })();

    var B3 = (function () {
        function B3() {
        }
        return B3;
    })();

    var B4 = (function () {
        function B4() {
        }
        return B4;
    })();

    var B5 = (function () {
        function B5() {
        }
        return B5;
    })();
})(Generics || (Generics = {}));
