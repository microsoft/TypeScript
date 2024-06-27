//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.11.ts] ////

//// [usingDeclarations.11.ts]
class A {}
class C1 extends A {
    constructor() {
        using x = null;
        super();
    }
}
class C2 extends A {
    constructor() {
        super();
        using x = null;
    }
}
class C3 extends A {
    y = 1;
    constructor() {
        using x = null;
        super();
    }
}
class C4 extends A {
    constructor(public y: number) {
        using x = null;
        super();
    }
}
class C5 extends A {
    z = 1;
    constructor(public y: number) {
        using x = null;
        super();
    }
}


//// [usingDeclarations.11.js]
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
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
        var _this = this;
        var env_1 = { stack: [], error: void 0, hasError: false };
        try {
            var x = __addDisposableResource(env_1, null, false);
            _this = _super.call(this) || this;
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
        return _this;
    }
    return C1;
}(A));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        var _this = this;
        var env_2 = { stack: [], error: void 0, hasError: false };
        try {
            _this = _super.call(this) || this;
            var x = __addDisposableResource(env_2, null, false);
        }
        catch (e_2) {
            env_2.error = e_2;
            env_2.hasError = true;
        }
        finally {
            __disposeResources(env_2);
        }
        return _this;
    }
    return C2;
}(A));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        var _this = this;
        var env_3 = { stack: [], error: void 0, hasError: false };
        try {
            var x = __addDisposableResource(env_3, null, false);
            _this = _super.call(this) || this;
            _this.y = 1;
        }
        catch (e_3) {
            env_3.error = e_3;
            env_3.hasError = true;
        }
        finally {
            __disposeResources(env_3);
        }
        return _this;
    }
    return C3;
}(A));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4(y) {
        var _this = this;
        var env_4 = { stack: [], error: void 0, hasError: false };
        try {
            var x = __addDisposableResource(env_4, null, false);
            _this = _super.call(this) || this;
            _this.y = y;
        }
        catch (e_4) {
            env_4.error = e_4;
            env_4.hasError = true;
        }
        finally {
            __disposeResources(env_4);
        }
        return _this;
    }
    return C4;
}(A));
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5(y) {
        var _this = this;
        var env_5 = { stack: [], error: void 0, hasError: false };
        try {
            var x = __addDisposableResource(env_5, null, false);
            _this = _super.call(this) || this;
            _this.y = y;
            _this.z = 1;
        }
        catch (e_5) {
            env_5.error = e_5;
            env_5.hasError = true;
        }
        finally {
            __disposeResources(env_5);
        }
        return _this;
    }
    return C5;
}(A));
