//// [moduleVisibilityTest2.js]
var OuterMod;
(function (OuterMod) {
    function someExportedOuterFunc() {
        return -1;
    }
    OuterMod.someExportedOuterFunc = someExportedOuterFunc;

    (function (OuterInnerMod) {
        function someExportedOuterInnerFunc() {
            return "foo";
        }
        OuterInnerMod.someExportedOuterInnerFunc = someExportedOuterInnerFunc;
    })(OuterMod.OuterInnerMod || (OuterMod.OuterInnerMod = {}));
    var OuterInnerMod = OuterMod.OuterInnerMod;
})(OuterMod || (OuterMod = {}));

var OuterInnerAlias = OuterMod.OuterInnerMod;

var M;
(function (M) {
    var InnerMod;
    (function (InnerMod) {
        function someExportedInnerFunc() {
            return -2;
        }
        InnerMod.someExportedInnerFunc = someExportedInnerFunc;
    })(InnerMod || (InnerMod = {}));

    var E;
    (function (E) {
        E[E["A"] = 0] = "A";
        E[E["B"] = 1] = "B";
        E[E["C"] = 2] = "C";
    })(E || (E = {}));

    var x = 5;

    var y = x + x;

    var B = (function () {
        function B() {
            this.b = 0;
        }
        return B;
    })();

    var C = (function () {
        function C() {
            this.someProp = 1;
            function someInnerFunc() {
                return 2;
            }
            var someInnerVar = 3;
        }
        C.prototype.someMethodThatCallsAnOuterMethod = function () {
            return OuterInnerAlias.someExportedOuterInnerFunc();
        };
        C.prototype.someMethodThatCallsAnInnerMethod = function () {
            return InnerMod.someExportedInnerFunc();
        };
        C.prototype.someMethodThatCallsAnOuterInnerMethod = function () {
            return OuterMod.someExportedOuterFunc();
        };
        C.prototype.someMethod = function () {
            return 0;
        };
        return C;
    })();
    M.C = C;

    var someModuleVar = 4;

    function someModuleFunction() {
        return 5;
    }
})(M || (M = {}));

var M;
(function (M) {
    M.c = x;
    M.meb = M.E.B;
})(M || (M = {}));

var cprime = null;

var c = new M.C();
var z = M.x;
var alpha = M.E.A;
var omega = M.exported_var;
c.someMethodThatCallsAnOuterMethod();
