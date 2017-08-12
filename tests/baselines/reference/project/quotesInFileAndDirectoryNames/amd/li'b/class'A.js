var test;
(function (test) {
    var ClassA = (function () {
        function ClassA() {
        }
        var proto_1 = ClassA.prototype;
        proto_1.method = function () { };
        return ClassA;
    }());
    test.ClassA = ClassA;
})(test || (test = {}));
