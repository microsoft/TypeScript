var test;
(function (test) {
    class ClassA {
        method() { }
    }
    test.ClassA = ClassA;
})(test || (test = {}));
