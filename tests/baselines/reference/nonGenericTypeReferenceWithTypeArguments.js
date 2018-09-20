//// [nonGenericTypeReferenceWithTypeArguments.ts]
// Check that errors are reported for non-generic types with type arguments

class C { }
interface I { }
enum E { }
type T = { };
var v1: C<string>;
var v2: I<string>;
var v3: E<string>;
var v4: T<string>;

function f<U>() {
    class C { }
    interface I { }
    enum E { }
    type T = {};
    var v1: C<string>;
    var v2: I<string>;
    var v3: E<string>;
    var v4: T<string>;
    var v5: U<string>;
}


//// [nonGenericTypeReferenceWithTypeArguments.js]
// Check that errors are reported for non-generic types with type arguments
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var E;
(function (E) {
})(E || (E = {}));
var v1;
var v2;
var v3;
var v4;
function f() {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var E;
    (function (E) {
    })(E || (E = {}));
    var v1;
    var v2;
    var v3;
    var v4;
    var v5;
}
