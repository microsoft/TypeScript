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
class A {
}
class C1 extends A {
    constructor() {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const x = __addDisposableResource(env_1, null, false);
            super();
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
}
class C2 extends A {
    constructor() {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
            super();
            const x = __addDisposableResource(env_2, null, false);
        }
        catch (e_2) {
            env_2.error = e_2;
            env_2.hasError = true;
        }
        finally {
            __disposeResources(env_2);
        }
    }
}
class C3 extends A {
    y = 1;
    constructor() {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            const x = __addDisposableResource(env_3, null, false);
            super();
        }
        catch (e_3) {
            env_3.error = e_3;
            env_3.hasError = true;
        }
        finally {
            __disposeResources(env_3);
        }
    }
}
class C4 extends A {
    y;
    constructor(y) {
        const env_4 = { stack: [], error: void 0, hasError: false };
        try {
            const x = __addDisposableResource(env_4, null, false);
            super();
            this.y = y;
        }
        catch (e_4) {
            env_4.error = e_4;
            env_4.hasError = true;
        }
        finally {
            __disposeResources(env_4);
        }
    }
}
class C5 extends A {
    y;
    z = 1;
    constructor(y) {
        const env_5 = { stack: [], error: void 0, hasError: false };
        try {
            const x = __addDisposableResource(env_5, null, false);
            super();
            this.y = y;
        }
        catch (e_5) {
            env_5.error = e_5;
            env_5.hasError = true;
        }
        finally {
            __disposeResources(env_5);
        }
    }
}
