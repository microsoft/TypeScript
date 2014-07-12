//// [ClassAndModuleThatMergeWithModuleMemberThatUsesClassTypeParameter.js]
// all expected to be errors
var clodule1 = (function () {
    function clodule1() {
    }
    return clodule1;
})();

var clodule1;
(function (clodule1) {
    function f(x) {
    }
})(clodule1 || (clodule1 = {}));

var clodule2 = (function () {
    function clodule2() {
    }
    return clodule2;
})();

var clodule2;
(function (clodule2) {
    var x;

    var D = (function () {
        function D() {
        }
        return D;
    })();
})(clodule2 || (clodule2 = {}));

var clodule3 = (function () {
    function clodule3() {
    }
    return clodule3;
})();

var clodule3;
(function (clodule3) {
    clodule3.y = { id: T };
})(clodule3 || (clodule3 = {}));

var clodule4 = (function () {
    function clodule4() {
    }
    return clodule4;
})();

var clodule4;
(function (clodule4) {
    var D = (function () {
        function D() {
        }
        return D;
    })();
})(clodule4 || (clodule4 = {}));
