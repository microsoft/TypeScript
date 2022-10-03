//// [classStaticBlock20.ts]
class C {
    async static {
        // something
    }

    public static {
        // something
    }

    readonly private static {
        // something
    }
}


//// [classStaticBlock20.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function () {
    // something
})();
(function () {
    // something
})();
(function () {
    // something
})();
