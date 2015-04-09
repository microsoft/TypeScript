//// [strictModeCode4.ts]
class C {
    public bar() {
        var v = foo(
            public blaz() {}
            );
    }
}

//// [strictModeCode4.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var v = foo(public, blaz(), {});
    };
    return C;
})();
