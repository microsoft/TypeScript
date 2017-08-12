//// [parserErrantSemicolonInClass1.ts]
class a {
    //constructor ();
    constructor (n: number);
    constructor (s: string);
    constructor (ns: any) {

    }

    public pgF() { };

    public pv;
    public get d() {
        return 30;
    }
    public set d() {
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


//// [parserErrantSemicolonInClass1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var a = (function () {
    function a(ns) {
    }
    a.prototype.pgF = function () { };
    ;
    Object.defineProperty(a.prototype, "d", {
        get: function () {
            return 30;
        },
        set: function () {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(a, "p2", {
        get: function () {
            return { x: 30, y: 40 };
        },
        enumerable: true,
        configurable: true
    });
    a.d2 = function () {
    };
    Object.defineProperty(a, "p3", {
        get: function () {
            return "string";
        },
        enumerable: true,
        configurable: true
    });
    a.prototype.foo = function (ns) {
        return ns.toString();
    };
    __names(a.prototype, ["pgF", "foo"]);
    return a;
}());
