//// [tests/cases/compiler/declFilePrivateStatic.ts] ////

//// [declFilePrivateStatic.ts]
class C {
    private static x = 1;
    static y = 1;

    private static a() { }
    static b() { }

    private static get c() { return 1; }
    static get d() { return 1; }

    private static set e(v) { }
    static set f(v) { }
}

//// [declFilePrivateStatic.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.a = function () { };
    C.b = function () { };
    Object.defineProperty(C, "c", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "d", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "e", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "f", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    C.x = 1;
    C.y = 1;
    return C;
}());


//// [declFilePrivateStatic.d.ts]
declare class C {
    private static x;
    static y: number;
    private static a;
    static b(): void;
    private static get c();
    static get d(): number;
    private static set e(value);
    static set f(v: any);
}
