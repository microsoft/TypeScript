var test;
(function (test) {
    var ClassA = /** @class */ (function () {
        function ClassA() {
        }
        ClassA.prototype.method = function () { };
        return ClassA;
    }());
    test.ClassA = ClassA;
})(test || (test = {}));
