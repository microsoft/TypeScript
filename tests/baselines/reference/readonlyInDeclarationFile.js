//// [readonlyInDeclarationFile.ts]
interface Foo {
    readonly x: number;
    readonly [x: string]: Object;
}

class C {
    readonly [x: string]: Object;
    private readonly a1: number;
    protected readonly a2: number;
    public readonly a3: number;
    private get b1() { return 1 }
    protected get b2() { return 1 }
    public get b3() { return 1 }
    private get c1() { return 1 }
    private set c1(value) { }
    protected get c2() { return 1 }
    protected set c2(value) { }
    public get c3() { return 1 }
    public set c3(value) { }
    private static readonly s1: number;
    protected static readonly s2: number;
    public static readonly s3: number;
    private static get t1() { return 1 }
    protected static get t2() { return 1 }
    public static get t3() { return 1 }
    private static get u1() { return 1 }
    private static set u1(value) { }
    protected static get u2() { return 1 }
    protected static set u2(value) { }
    public static get u3() { return 1 }
    public static set u3(value) { }
}

var z: {
    readonly a: string;
    readonly [x: string]: Object;
}

function f() {
    return {
        get x() { return 1; },
        get y() { return 1; },
        set y(value) { }
    }
}

function g() {
    var x: {
        readonly a: string;
        readonly [x: string]: Object;
    }
    return x;
}

//// [readonlyInDeclarationFile.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "b1", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "b2", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "b3", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "c1", {
        get: function () { return 1; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "c2", {
        get: function () { return 1; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "c3", {
        get: function () { return 1; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "t1", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "t2", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "t3", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "u1", {
        get: function () { return 1; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "u2", {
        get: function () { return 1; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "u3", {
        get: function () { return 1; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var z;
function f() {
    return {
        get x() { return 1; },
        get y() { return 1; },
        set y(value) { }
    };
}
function g() {
    var x;
    return x;
}


//// [readonlyInDeclarationFile.d.ts]
interface Foo {
    readonly x: number;
    readonly [x: string]: Object;
}
declare class C {
    readonly [x: string]: Object;
    private readonly a1;
    protected readonly a2: number;
    readonly a3: number;
    private get b1();
    protected get b2(): number;
    get b3(): number;
    private get c1();
    private set c1(value);
    protected get c2(): number;
    protected set c2(value: number);
    get c3(): number;
    set c3(value: number);
    private static readonly s1;
    protected static readonly s2: number;
    static readonly s3: number;
    private static get t1();
    protected static get t2(): number;
    static get t3(): number;
    private static get u1();
    private static set u1(value);
    protected static get u2(): number;
    protected static set u2(value: number);
    static get u3(): number;
    static set u3(value: number);
}
declare var z: {
    readonly a: string;
    readonly [x: string]: Object;
};
declare function f(): {
    readonly x: number;
    y: number;
};
declare function g(): {
    readonly [x: string]: Object;
    readonly a: string;
};
