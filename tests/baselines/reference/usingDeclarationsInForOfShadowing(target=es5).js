//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForOfShadowing.ts] ////

//// [main.ts]
class Foo {}

for (using foo of []) {
  const foo = new Foo();
}

for (using bar of []) {
  let bar = "test";
}

for (using baz of []) {
  var baz = 42;
}

//// [tslib.d.ts]
export declare function __addDisposableResource<T>(env: any, value: T, async: boolean): T;
export declare function __disposeResources(env: any): void;

//// [main.js]
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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var foo_1 = _a[_i];
    var env_1 = { stack: [], error: void 0, hasError: false };
    try {
        var foo = __addDisposableResource(env_1, foo_1, false);
        var foo_2 = new Foo();
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    var bar_1 = _c[_b];
    var env_2 = { stack: [], error: void 0, hasError: false };
    try {
        var bar = __addDisposableResource(env_2, bar_1, false);
        var bar_2 = "test";
    }
    catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
    }
    finally {
        __disposeResources(env_2);
    }
}
for (var _d = 0, _e = []; _d < _e.length; _d++) {
    var baz_1 = _e[_d];
    var env_3 = { stack: [], error: void 0, hasError: false };
    try {
        var baz_1 = __addDisposableResource(env_3, baz_1, false);
        var baz_2 = 42;
    }
    catch (e_3) {
        env_3.error = e_3;
        env_3.hasError = true;
    }
    finally {
        __disposeResources(env_3);
    }
}
