//// [tests/cases/compiler/duplicateClassElements.ts] ////

//// [duplicateClassElements.ts]
class a {
    public a;
    public a;
    public b() {
    }
    public b() {
    }
    public x;
    get x() {
        return 10;
    }
    set x(_x: number) {
    }

    get y() {
        return "Hello";
    }
    set y(_y: string) {
    }

    public z() {
    }
    get z() {
        return "Hello";
    }
    set z(_y: string) {
    }

    get x2() {
        return 10;
    }
    set x2(_x: number) {
    }
    public x2;

    get z2() {
        return "Hello";
    }
    set z2(_y: string) {
    }
    public z2() {
    }

}

//// [duplicateClassElements.js]
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.b = function () {
    };
    a.prototype.b = function () {
    };
    Object.defineProperty(a.prototype, "x", {
        get: function () {
            return 10;
        },
        set: function (_x) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(a.prototype, "y", {
        get: function () {
            return "Hello";
        },
        set: function (_y) {
        },
        enumerable: false,
        configurable: true
    });
    a.prototype.z = function () {
    };
    Object.defineProperty(a.prototype, "z", {
        get: function () {
            return "Hello";
        },
        set: function (_y) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(a.prototype, "x2", {
        get: function () {
            return 10;
        },
        set: function (_x) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(a.prototype, "z2", {
        get: function () {
            return "Hello";
        },
        set: function (_y) {
        },
        enumerable: false,
        configurable: true
    });
    a.prototype.z2 = function () {
    };
    return a;
}());
