//// [assignToExistingClass.js]
var Test;
(function (Test) {
    var Mocked = (function () {
        function Mocked() {
        }
        return Mocked;
    })();

    var Tester = (function () {
        function Tester() {
        }
        Tester.prototype.willThrowError = function () {
            Mocked = Mocked || function () {
                return { myProp: "test" };
            };
        };
        return Tester;
    })();
})(Test || (Test = {}));
