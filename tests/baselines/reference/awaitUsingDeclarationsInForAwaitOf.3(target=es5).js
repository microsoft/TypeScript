//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForAwaitOf.3.ts] ////

//// [awaitUsingDeclarationsInForAwaitOf.3.ts]
// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357

declare const x: any[]

for await (await using of x);

export async function test() {
  for await (await using of x);
}


//// [awaitUsingDeclarationsInForAwaitOf.3.js]
// https://github.com/microsoft/TypeScript/pull/55558#issuecomment-1817595357
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
try {
    for (var _d = true, x_1 = __asyncValues(x), x_1_1; x_1_1 = await x_1.next(), _a = x_1_1.done, !_a; _d = true) {
        _c = x_1_1.value;
        _d = false;
        const _e_1 = _c;
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const _e = __addDisposableResource(env_1, _e_1, true);
            ;
        }
        catch (e_2) {
            env_1.error = e_2;
            env_1.hasError = true;
        }
        finally {
            const result_1 = __disposeResources(env_1);
            if (result_1)
                await result_1;
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = x_1.return)) await _b.call(x_1);
    }
    finally { if (e_1) throw e_1.error; }
}
export function test() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_3, _b, _c;
        try {
            for (var _d = true, x_2 = __asyncValues(x), x_2_1; x_2_1 = yield x_2.next(), _a = x_2_1.done, !_a; _d = true) {
                _c = x_2_1.value;
                _d = false;
                const _e_2 = _c;
                const env_2 = { stack: [], error: void 0, hasError: false };
                try {
                    const _e = __addDisposableResource(env_2, _e_2, true);
                    ;
                }
                catch (e_4) {
                    env_2.error = e_4;
                    env_2.hasError = true;
                }
                finally {
                    const result_2 = __disposeResources(env_2);
                    if (result_2)
                        yield result_2;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = x_2.return)) yield _b.call(x_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
}
