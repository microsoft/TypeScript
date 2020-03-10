//// [accessibilityModifiers.ts]
// No errors
class C {
    private static privateProperty;
    private static privateMethod() { }
    private static get privateGetter() { return 0; }
    private static set privateSetter(a: number) { }

    protected static protectedProperty;
    protected static protectedMethod() { }
    protected static get protectedGetter() { return 0; }
    protected static set protectedSetter(a: number) { }

    public static publicProperty;
    public static publicMethod() { }
    public static get publicGetter() { return 0; }
    public static set publicSetter(a: number) { }
}

// Errors, accessibility modifiers must precede static
class D {
    static private privateProperty;
    static private privateMethod() { }
    static private get privateGetter() { return 0; }
    static private set privateSetter(a: number) { }

    static protected protectedProperty;
    static protected protectedMethod() { }
    static protected get protectedGetter() { return 0; }
    static protected set protectedSetter(a: number) { }

    static public publicProperty;
    static public publicMethod() { }
    static public get publicGetter() { return 0; }
    static public set publicSetter(a: number) { }
}

// Errors, multiple accessibility modifier
class E {
    private public protected property;
    public protected method() { }
    private protected get getter() { return 0; }
    public public set setter(a: number) { }
}


//// [accessibilityModifiers.js]
// No errors
var C = /** @class */ (function () {
    function C() {
    }
    C.privateMethod = function () { };
    Object.defineProperty(C, "privateGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "privateSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    C.protectedMethod = function () { };
    Object.defineProperty(C, "protectedGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "protectedSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    C.publicMethod = function () { };
    Object.defineProperty(C, "publicGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "publicSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
// Errors, accessibility modifiers must precede static
var D = /** @class */ (function () {
    function D() {
    }
    D.privateMethod = function () { };
    Object.defineProperty(D, "privateGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D, "privateSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    D.protectedMethod = function () { };
    Object.defineProperty(D, "protectedGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D, "protectedSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    D.publicMethod = function () { };
    Object.defineProperty(D, "publicGetter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D, "publicSetter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return D;
}());
// Errors, multiple accessibility modifier
var E = /** @class */ (function () {
    function E() {
    }
    E.prototype.method = function () { };
    Object.defineProperty(E.prototype, "getter", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(E.prototype, "setter", {
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return E;
}());
