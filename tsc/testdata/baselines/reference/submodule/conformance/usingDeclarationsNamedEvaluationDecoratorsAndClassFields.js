//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsNamedEvaluationDecoratorsAndClassFields.ts] ////

//// [usingDeclarationsNamedEvaluationDecoratorsAndClassFields.ts]
export {};

declare var dec: any;

using C1 = class {
    static [Symbol.dispose]() {}
};

using C2 = class {
    static x = 1;
    static [Symbol.dispose]() {}
};

using C3 = @dec class {
    static [Symbol.dispose]() {}
};

using C4 = @dec class {
    static x = 1;
    static [Symbol.dispose]() {}
};


//// [usingDeclarationsNamedEvaluationDecoratorsAndClassFields.js]
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
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
var C1, C2, C3, C4;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    C1 = __addDisposableResource(env_1, class {
        static { __setFunctionName(this, "C1"); }
        static [Symbol.dispose]() { }
    }, false);
    C2 = __addDisposableResource(env_1, class {
        static { __setFunctionName(this, "C2"); }
        static x = 1;
        static [Symbol.dispose]() { }
    }, false);
    C3 = __addDisposableResource(env_1, 
    @dec
    class {
        static { __setFunctionName(this, "C3"); }
        static [Symbol.dispose]() { }
    }, false);
    C4 = __addDisposableResource(env_1, 
    @dec
    class {
        static { __setFunctionName(this, "C4"); }
        static x = 1;
        static [Symbol.dispose]() { }
    }, false);
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
export {};
