//// [tests/cases/compiler/usingDeclarationsForOfShadowing.ts] ////

//// [usingDeclarationsForOfShadowing.ts]
class Foo {}

// Error when downleveling: using declaration shadowed by loop body declaration  
for (using foo of [{ [Symbol.dispose]() {} }]) {
  const foo = new Foo();
}

// OK: different names
for (using bar of [{ [Symbol.dispose]() {} }]) {
  const baz = new Foo();
}

// Error when downleveling: using declaration shadowed by loop body declaration  
for (using x of [{ [Symbol.dispose]() {} }]) {
  let x = 1;
}

// Error when downleveling: using declaration shadowed by loop body declaration
for (using y of [{ [Symbol.dispose]() {} }]) {
  var y = "test";
}

//// [usingDeclarationsForOfShadowing.js]
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
var _a, _b, _c, _d;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
// Error when downleveling: using declaration shadowed by loop body declaration  
for (var _i = 0, _e = [(_a = {}, _a[Symbol.dispose] = function () { }, _a)]; _i < _e.length; _i++) {
    var foo_1 = _e[_i];
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
// OK: different names
for (var _f = 0, _g = [(_b = {}, _b[Symbol.dispose] = function () { }, _b)]; _f < _g.length; _f++) {
    var bar_1 = _g[_f];
    var env_2 = { stack: [], error: void 0, hasError: false };
    try {
        var bar = __addDisposableResource(env_2, bar_1, false);
        var baz = new Foo();
    }
    catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
    }
    finally {
        __disposeResources(env_2);
    }
}
// Error when downleveling: using declaration shadowed by loop body declaration  
for (var _h = 0, _j = [(_c = {}, _c[Symbol.dispose] = function () { }, _c)]; _h < _j.length; _h++) {
    var x_1 = _j[_h];
    var env_3 = { stack: [], error: void 0, hasError: false };
    try {
        var x = __addDisposableResource(env_3, x_1, false);
        var x_2 = 1;
    }
    catch (e_3) {
        env_3.error = e_3;
        env_3.hasError = true;
    }
    finally {
        __disposeResources(env_3);
    }
}
// Error when downleveling: using declaration shadowed by loop body declaration
for (var _k = 0, _l = [(_d = {}, _d[Symbol.dispose] = function () { }, _d)]; _k < _l.length; _k++) {
    var y_1 = _l[_k];
    var env_4 = { stack: [], error: void 0, hasError: false };
    try {
        var y_1 = __addDisposableResource(env_4, y_1, false);
        var y = "test";
    }
    catch (e_4) {
        env_4.error = e_4;
        env_4.hasError = true;
    }
    finally {
        __disposeResources(env_4);
    }
}
