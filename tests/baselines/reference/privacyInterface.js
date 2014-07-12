//// [privacyInterface.js]
(function (m1) {
    var C1_public = (function () {
        function C1_public() {
        }
        C1_public.prototype.f1 = function () {
        };
        return C1_public;
    })();
    m1.C1_public = C1_public;

    var C2_private = (function () {
        function C2_private() {
        }
        return C2_private;
    })();
})(exports.m1 || (exports.m1 = {}));
var m1 = exports.m1;

var m2;
(function (m2) {
    var C1_public = (function () {
        function C1_public() {
        }
        C1_public.prototype.f1 = function () {
        };
        return C1_public;
    })();
    m2.C1_public = C1_public;

    var C2_private = (function () {
        function C2_private() {
        }
        return C2_private;
    })();
})(m2 || (m2 = {}));

var C5_public = (function () {
    function C5_public() {
    }
    C5_public.prototype.f1 = function () {
    };
    return C5_public;
})();
exports.C5_public = C5_public;

var C6_private = (function () {
    function C6_private() {
    }
    return C6_private;
})();
