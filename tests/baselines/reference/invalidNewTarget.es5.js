//// [invalidNewTarget.es5.ts]
const a = new.target;
const b = () => new.target;

class C {
    [new.target]() { }
    c() { return new.target; }
    get d() { return new.target; }
    set e(_) { _ = new.target; }
    f = () => new.target;

    static [new.target]() { }
    static g() { return new.target; }
    static get h() { return new.target; }
    static set i(_) { _ = new.target; }
    static j = () => new.target;
}

const O = {
    [new.target]: undefined,
    k() { return new.target; },
    get l() { return new.target; },
    set m(_) { _ = new.target; },
    n: new.target,
};

//// [invalidNewTarget.es5.js]
var _a;
var a = _newTarget;
var b = function () { return _newTarget; };
var C = /** @class */ (function () {
    function C() {
        var _newTarget = this.constructor;
        this.f = function () { return _newTarget; };
    }
    C.prototype[_newTarget] = function () { };
    C.prototype.c = function () { var _newTarget = void 0; return _newTarget; };
    Object.defineProperty(C.prototype, "d", {
        get: function () { var _newTarget = void 0; return _newTarget; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "e", {
        set: function (_) { var _newTarget = void 0; _ = _newTarget; },
        enumerable: true,
        configurable: true
    });
    C[_newTarget] = function () { };
    C.g = function () { var _newTarget = void 0; return _newTarget; };
    Object.defineProperty(C, "h", {
        get: function () { var _newTarget = void 0; return _newTarget; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "i", {
        set: function (_) { var _newTarget = void 0; _ = _newTarget; },
        enumerable: true,
        configurable: true
    });
    C.j = function () { return _newTarget; };
    return C;
}());
var O = (_a = {},
    _a[_newTarget] = undefined,
    _a.k = function () { var _newTarget = void 0; return _newTarget; },
    Object.defineProperty(_a, "l", {
        get: function () { var _newTarget = void 0; return _newTarget; },
        enumerable: true,
        configurable: true
    }),
    Object.defineProperty(_a, "m", {
        set: function (_) { var _newTarget = void 0; _ = _newTarget; },
        enumerable: true,
        configurable: true
    }),
    _a.n = _newTarget,
    _a);
