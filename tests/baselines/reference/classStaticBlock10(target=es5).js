//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock10.ts] ////

//// [classStaticBlock10.ts]
var a1 = 1;
var a2 = 1;
const b1 = 2;
const b2 = 2;

function f () {
    var a1 = 11;
    const b1 = 22;

    class C1 {
        static {
            var a1 = 111;
            var a2 = 111;
            const b1 = 222;
            const b2 = 222;
        }
    }
}

class C2 {
    static {
        var a1 = 111;
        var a2 = 111;
        const b1 = 222;
        const b2 = 222;
    }
}


//// [classStaticBlock10.js]
var a1 = 1;
var a2 = 1;
var b1 = 2;
var b2 = 2;
function f() {
    var a1 = 11;
    var b1 = 22;
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    (function () {
        var a1 = 111;
        var a2 = 111;
        var b1 = 222;
        var b2 = 222;
    })();
}
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
(function () {
    var a1 = 111;
    var a2 = 111;
    var b1 = 222;
    var b2 = 222;
})();
