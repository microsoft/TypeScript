//// [tests/cases/compiler/noUnusedLocals_selfReference_skipsBlockLocations.ts] ////

//// [noUnusedLocals_selfReference_skipsBlockLocations.ts]
namespace n {
    function f() {
        f;
    }

    switch (0) {
        case 0:
            function g() {
                g;
            }
        default:
            function h() {
                h;
            }
    }
}


//// [noUnusedLocals_selfReference_skipsBlockLocations.js]
var n;
(function (n) {
    function f() {
        f;
    }
    switch (0) {
        case 0:
            function g() {
                g;
            }
        default:
            function h() {
                h;
            }
    }
})(n || (n = {}));
