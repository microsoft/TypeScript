//// [selfRef.js]
var M;
(function (M) {
    var Test = (function () {
        function Test() {
            this.name = "hello";
            this.setName = function (value) {
                (function () {
                    name = value;
                })();
            };
            this.getName = function () {
                return name;
            };
        }
        return Test;
    })();
    M.Test = Test;
})(M || (M = {}));
