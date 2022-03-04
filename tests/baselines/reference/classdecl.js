//// [classdecl.ts]
class a {
    //constructor ();
    constructor (n: number);
    constructor (s: string);
    constructor (ns: any) {

    }

    public pgF() { }

    public pv;
    public get d() {
        return 30;
    }
    public set d(a: number) {
    }

    public static get p2() {
        return { x: 30, y: 40 };
    }

    private static d2() {
    }
    private static get p3() {
        return "string";
    }
    private pv3;

    private foo(n: number): string;
    private foo(s: string): string;
    private foo(ns: any) {
        return ns.toString();
    }
}

class b extends a {
}

module m1 {
    export class b {
    }
    class d {
    }


    export interface ib {
    }
}

module m2 {

    export module m3 {
        export class c extends b {
        }
        export class ib2 implements m1.ib {
        }
    }
}

class c extends m1.b {
}

class ib2 implements m1.ib {
}

declare class aAmbient {
    constructor (n: number);
    constructor (s: string);
    public pgF(): void;
    public pv;
    public d : number;
    static p2 : { x: number; y: number; };
    static d2();
    static p3;
    private pv3;
    private foo(s);
}

class d {
    private foo(n: number): string;
    private foo(s: string): string;
    private foo(ns: any) {
        return ns.toString();
    }    
}

class e {    
    private foo(s: string): string;
    private foo(n: number): string;
    private foo(ns: any) {
        return ns.toString();
    }
}

//// [classdecl.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = /** @class */ (function () {
    function a(ns) {
    }
    a.prototype.pgF = function () { };
    Object.defineProperty(a.prototype, "d", {
        get: function () {
            return 30;
        },
        set: function (a) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(a, "p2", {
        get: function () {
            return { x: 30, y: 40 };
        },
        enumerable: false,
        configurable: true
    });
    a.d2 = function () {
    };
    Object.defineProperty(a, "p3", {
        get: function () {
            return "string";
        },
        enumerable: false,
        configurable: true
    });
    a.prototype.foo = function (ns) {
        return ns.toString();
    };
    return a;
}());
var b = /** @class */ (function (_super) {
    __extends(b, _super);
    function b() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return b;
}(a));
var m1;
(function (m1) {
    var b = /** @class */ (function () {
        function b() {
        }
        return b;
    }());
    m1.b = b;
    var d = /** @class */ (function () {
        function d() {
        }
        return d;
    }());
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    var m3;
    (function (m3) {
        var c = /** @class */ (function (_super) {
            __extends(c, _super);
            function c() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return c;
        }(b));
        m3.c = c;
        var ib2 = /** @class */ (function () {
            function ib2() {
            }
            return ib2;
        }());
        m3.ib2 = ib2;
    })(m3 = m2.m3 || (m2.m3 = {}));
})(m2 || (m2 = {}));
var c = /** @class */ (function (_super) {
    __extends(c, _super);
    function c() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return c;
}(m1.b));
var ib2 = /** @class */ (function () {
    function ib2() {
    }
    return ib2;
}());
var d = /** @class */ (function () {
    function d() {
    }
    d.prototype.foo = function (ns) {
        return ns.toString();
    };
    return d;
}());
var e = /** @class */ (function () {
    function e() {
    }
    e.prototype.foo = function (ns) {
        return ns.toString();
    };
    return e;
}());


//// [classdecl.d.ts]
declare class a {
    constructor(n: number);
    constructor(s: string);
    pgF(): void;
    pv: any;
    get d(): number;
    set d(a: number);
    static get p2(): {
        x: number;
        y: number;
    };
    private static d2;
    private static get p3();
    private pv3;
    private foo;
}
declare class b extends a {
}
declare module m1 {
    class b {
    }
    interface ib {
    }
}
declare module m2 {
    module m3 {
        class c extends b {
        }
        class ib2 implements m1.ib {
        }
    }
}
declare class c extends m1.b {
}
declare class ib2 implements m1.ib {
}
declare class aAmbient {
    constructor(n: number);
    constructor(s: string);
    pgF(): void;
    pv: any;
    d: number;
    static p2: {
        x: number;
        y: number;
    };
    static d2(): any;
    static p3: any;
    private pv3;
    private foo;
}
declare class d {
    private foo;
}
declare class e {
    private foo;
}
