//// [accessorWithES5.ts]
class C {
    get x() {
        return 1;
    }
}

class D {
    set x(v) {
    }
}

class E {
    // comment 1
    get x() { return 2; }
    // comment 2
    set x(v) { }
}

var x = {
    get a() { return 1 }
}

var y = {
    set b(v) { }
}


//// [accessorWithES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    Object.defineProperty(E.prototype, "x", {
        // comment 1
        get: function () { return 2; },
        // comment 2
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return E;
}());
var x = {
    get a() { return 1; }
};
var y = {
    set b(v) { }
};


//// [accessorWithES5.d.ts]
declare class C {
    /**@accessor*/ readonly x: number;
}
declare class D {
    /**@accessor*/ x: any;
}
declare class E {
    /**@accessor*/ x: number;
}
declare var x: {
    readonly a: number;
};
declare var y: {
    b: any;
};
