//// [foo1.js]
var foo2 = require('./foo2');
(function (M1) {
    var C1 = (function () {
        function C1() {
            this.m1 = new foo2.M1.C1();
            this.m1.y = 10; // OK
            this.m1.x = 20; // Error
        }
        return C1;
    })();
    M1.C1 = C1;
})(exports.M1 || (exports.M1 = {}));
var M1 = exports.M1;
//// [foo2.js]
var foo1 = require('./foo1');
(function (M1) {
    var C1 = (function () {
        function C1() {
            this.m1 = new foo1.M1.C1();
            this.m1.y = 10; // Error
            this.m1.x = 20; // OK

            var tmp = new M1.C1();
            tmp.y = 10; // OK
            tmp.x = 20; // Error
        }
        return C1;
    })();
    M1.C1 = C1;
})(exports.M1 || (exports.M1 = {}));
var M1 = exports.M1;
