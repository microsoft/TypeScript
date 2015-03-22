var Test;
(function (Test) {
    var A = (function () {
        function A(t) {
            this.one = t;
            this.two = false;
        }
        return A;
    })();
    var B = (function () {
        function B() {
            this.member = [];
        }
        return B;
    })();
    Test.B = B;
})(Test || (Test = {}));
