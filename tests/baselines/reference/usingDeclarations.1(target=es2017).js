//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.1.ts] ////

//// [usingDeclarations.1.ts]
using d1 = { [Symbol.dispose]() {} };

function f() {
    using d2 = { [Symbol.dispose]() {} };
}

async function af() {
    using d3 = { [Symbol.dispose]() {} };
    await null;
}

function * g() {
    using d4 = { [Symbol.dispose]() {} };
    yield;
}

async function * ag() {
    using d5 = { [Symbol.dispose]() {} };
    yield;
    await null;
}

const a = () => {
    using d6 = { [Symbol.dispose]() {} };
}

class C1 {
    a = () => {
        using d7 = { [Symbol.dispose]() {} };
    }

    constructor() {
        using d8 = { [Symbol.dispose]() {} };
    }

    static {
        using d9 = { [Symbol.dispose]() {} };
    }

    m() {
        using d10 = { [Symbol.dispose]() {} };
    }

    get x() {
        using d11 = { [Symbol.dispose]() {} };
        return 0;
    }

    set x(v) {
        using d12 = { [Symbol.dispose]() {} };
    }

    async am() {
        using d13 = { [Symbol.dispose]() {} };
        await null;
    }

    * g() {
        using d14 = { [Symbol.dispose]() {} };
        yield;
    }

    async * ag() {
        using d15 = { [Symbol.dispose]() {} };
        yield;
        await null;
    }
}

class C2 extends C1 {
    constructor() {
        using d16 = { [Symbol.dispose]() {} };
        super();
    }
}

class C3 extends C1 {
    y = 1;
    constructor() {
        using d17 = { [Symbol.dispose]() {} };
        super();
    }
}

namespace N {
    using d18 = { [Symbol.dispose]() {} };
}

{
    using d19 = { [Symbol.dispose]() {} };
}

switch (Math.random()) {
    case 0:
        using d20 = { [Symbol.dispose]() {} };
        break;

    case 1:
        using d21 = { [Symbol.dispose]() {} };
        break;
}

if (true)
    switch (0) {
        case 0:
            using d22 = { [Symbol.dispose]() {} };
            break;
    }

try {
    using d23 = { [Symbol.dispose]() {} };
}
catch {
    using d24 = { [Symbol.dispose]() {} };
}
finally {
    using d25 = { [Symbol.dispose]() {} };
}

if (true) {
    using d26 = { [Symbol.dispose]() {} };
}
else {
    using d27 = { [Symbol.dispose]() {} };
}

while (true) {
    using d28 = { [Symbol.dispose]() {} };
    break;
}

do {
    using d29 = { [Symbol.dispose]() {} };
    break;
}
while (true);

for (;;) {
    using d30 = { [Symbol.dispose]() {} };
    break;
}

for (const x in {}) {
    using d31 = { [Symbol.dispose]() {} };
}

for (const x of []) {
    using d32 = { [Symbol.dispose]() {} };
}

export {};

//// [usingDeclarations.1.js]
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var _a;
function f() {
    const env_15 = { stack: [], error: void 0, hasError: false };
    try {
        const d2 = __addDisposableResource(env_15, { [Symbol.dispose]() { } }, false);
    }
    catch (e_15) {
        env_15.error = e_15;
        env_15.hasError = true;
    }
    finally {
        __disposeResources(env_15);
    }
}
async function af() {
    const env_16 = { stack: [], error: void 0, hasError: false };
    try {
        const d3 = __addDisposableResource(env_16, { [Symbol.dispose]() { } }, false);
        await null;
    }
    catch (e_16) {
        env_16.error = e_16;
        env_16.hasError = true;
    }
    finally {
        __disposeResources(env_16);
    }
}
function* g() {
    const env_17 = { stack: [], error: void 0, hasError: false };
    try {
        const d4 = __addDisposableResource(env_17, { [Symbol.dispose]() { } }, false);
        yield;
    }
    catch (e_17) {
        env_17.error = e_17;
        env_17.hasError = true;
    }
    finally {
        __disposeResources(env_17);
    }
}
function ag() {
    return __asyncGenerator(this, arguments, function* ag_1() {
        const env_18 = { stack: [], error: void 0, hasError: false };
        try {
            const d5 = __addDisposableResource(env_18, { [Symbol.dispose]() { } }, false);
            yield yield __await(void 0);
            yield __await(null);
        }
        catch (e_18) {
            env_18.error = e_18;
            env_18.hasError = true;
        }
        finally {
            __disposeResources(env_18);
        }
    });
}
var d1, a, C1, C2, C3, N, env_1;
const env_2 = { stack: [], error: void 0, hasError: false };
try {
    d1 = __addDisposableResource(env_2, { [Symbol.dispose]() { } }, false);
    a = () => {
        const env_19 = { stack: [], error: void 0, hasError: false };
        try {
            const d6 = __addDisposableResource(env_19, { [Symbol.dispose]() { } }, false);
        }
        catch (e_19) {
            env_19.error = e_19;
            env_19.hasError = true;
        }
        finally {
            __disposeResources(env_19);
        }
    };
    C1 = (_a = class C1 {
            constructor() {
                this.a = () => {
                    const env_21 = { stack: [], error: void 0, hasError: false };
                    try {
                        const d7 = __addDisposableResource(env_21, { [Symbol.dispose]() { } }, false);
                    }
                    catch (e_21) {
                        env_21.error = e_21;
                        env_21.hasError = true;
                    }
                    finally {
                        __disposeResources(env_21);
                    }
                };
                const env_20 = { stack: [], error: void 0, hasError: false };
                try {
                    const d8 = __addDisposableResource(env_20, { [Symbol.dispose]() { } }, false);
                }
                catch (e_20) {
                    env_20.error = e_20;
                    env_20.hasError = true;
                }
                finally {
                    __disposeResources(env_20);
                }
            }
            m() {
                const env_22 = { stack: [], error: void 0, hasError: false };
                try {
                    const d10 = __addDisposableResource(env_22, { [Symbol.dispose]() { } }, false);
                }
                catch (e_22) {
                    env_22.error = e_22;
                    env_22.hasError = true;
                }
                finally {
                    __disposeResources(env_22);
                }
            }
            get x() {
                const env_23 = { stack: [], error: void 0, hasError: false };
                try {
                    const d11 = __addDisposableResource(env_23, { [Symbol.dispose]() { } }, false);
                    return 0;
                }
                catch (e_23) {
                    env_23.error = e_23;
                    env_23.hasError = true;
                }
                finally {
                    __disposeResources(env_23);
                }
            }
            set x(v) {
                const env_24 = { stack: [], error: void 0, hasError: false };
                try {
                    const d12 = __addDisposableResource(env_24, { [Symbol.dispose]() { } }, false);
                }
                catch (e_24) {
                    env_24.error = e_24;
                    env_24.hasError = true;
                }
                finally {
                    __disposeResources(env_24);
                }
            }
            async am() {
                const env_25 = { stack: [], error: void 0, hasError: false };
                try {
                    const d13 = __addDisposableResource(env_25, { [Symbol.dispose]() { } }, false);
                    await null;
                }
                catch (e_25) {
                    env_25.error = e_25;
                    env_25.hasError = true;
                }
                finally {
                    __disposeResources(env_25);
                }
            }
            *g() {
                const env_26 = { stack: [], error: void 0, hasError: false };
                try {
                    const d14 = __addDisposableResource(env_26, { [Symbol.dispose]() { } }, false);
                    yield;
                }
                catch (e_26) {
                    env_26.error = e_26;
                    env_26.hasError = true;
                }
                finally {
                    __disposeResources(env_26);
                }
            }
            ag() {
                return __asyncGenerator(this, arguments, function* ag_2() {
                    const env_27 = { stack: [], error: void 0, hasError: false };
                    try {
                        const d15 = __addDisposableResource(env_27, { [Symbol.dispose]() { } }, false);
                        yield yield __await(void 0);
                        yield __await(null);
                    }
                    catch (e_27) {
                        env_27.error = e_27;
                        env_27.hasError = true;
                    }
                    finally {
                        __disposeResources(env_27);
                    }
                });
            }
        },
        (() => {
            const env_28 = { stack: [], error: void 0, hasError: false };
            try {
                const d9 = __addDisposableResource(env_28, { [Symbol.dispose]() { } }, false);
            }
            catch (e_28) {
                env_28.error = e_28;
                env_28.hasError = true;
            }
            finally {
                __disposeResources(env_28);
            }
        })(),
        _a);
    C2 = class C2 extends C1 {
        constructor() {
            const env_29 = { stack: [], error: void 0, hasError: false };
            try {
                const d16 = __addDisposableResource(env_29, { [Symbol.dispose]() { } }, false);
                super();
            }
            catch (e_29) {
                env_29.error = e_29;
                env_29.hasError = true;
            }
            finally {
                __disposeResources(env_29);
            }
        }
    };
    C3 = class C3 extends C1 {
        constructor() {
            const env_30 = { stack: [], error: void 0, hasError: false };
            try {
                const d17 = __addDisposableResource(env_30, { [Symbol.dispose]() { } }, false);
                super();
                this.y = 1;
            }
            catch (e_30) {
                env_30.error = e_30;
                env_30.hasError = true;
            }
            finally {
                __disposeResources(env_30);
            }
        }
    };
    (function (N) {
        const env_31 = { stack: [], error: void 0, hasError: false };
        try {
            const d18 = __addDisposableResource(env_31, { [Symbol.dispose]() { } }, false);
        }
        catch (e_31) {
            env_31.error = e_31;
            env_31.hasError = true;
        }
        finally {
            __disposeResources(env_31);
        }
    })(N || (N = {}));
    {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            const d19 = __addDisposableResource(env_3, { [Symbol.dispose]() { } }, false);
        }
        catch (e_1) {
            env_3.error = e_1;
            env_3.hasError = true;
        }
        finally {
            __disposeResources(env_3);
        }
    }
    env_1 = { stack: [], error: void 0, hasError: false };
    try {
        switch (Math.random()) {
            case 0:
                const d20 = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
                break;
            case 1:
                const d21 = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
                break;
        }
    }
    catch (e_2) {
        env_1.error = e_2;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
    if (true) {
        const env_4 = { stack: [], error: void 0, hasError: false };
        try {
            switch (0) {
                case 0:
                    const d22 = __addDisposableResource(env_4, { [Symbol.dispose]() { } }, false);
                    break;
            }
        }
        catch (e_3) {
            env_4.error = e_3;
            env_4.hasError = true;
        }
        finally {
            __disposeResources(env_4);
        }
    }
    try {
        const env_5 = { stack: [], error: void 0, hasError: false };
        try {
            const d23 = __addDisposableResource(env_5, { [Symbol.dispose]() { } }, false);
        }
        catch (e_4) {
            env_5.error = e_4;
            env_5.hasError = true;
        }
        finally {
            __disposeResources(env_5);
        }
    }
    catch (_b) {
        const env_6 = { stack: [], error: void 0, hasError: false };
        try {
            const d24 = __addDisposableResource(env_6, { [Symbol.dispose]() { } }, false);
        }
        catch (e_5) {
            env_6.error = e_5;
            env_6.hasError = true;
        }
        finally {
            __disposeResources(env_6);
        }
    }
    finally {
        const env_7 = { stack: [], error: void 0, hasError: false };
        try {
            const d25 = __addDisposableResource(env_7, { [Symbol.dispose]() { } }, false);
        }
        catch (e_6) {
            env_7.error = e_6;
            env_7.hasError = true;
        }
        finally {
            __disposeResources(env_7);
        }
    }
    if (true) {
        const env_8 = { stack: [], error: void 0, hasError: false };
        try {
            const d26 = __addDisposableResource(env_8, { [Symbol.dispose]() { } }, false);
        }
        catch (e_7) {
            env_8.error = e_7;
            env_8.hasError = true;
        }
        finally {
            __disposeResources(env_8);
        }
    }
    else {
        const env_9 = { stack: [], error: void 0, hasError: false };
        try {
            const d27 = __addDisposableResource(env_9, { [Symbol.dispose]() { } }, false);
        }
        catch (e_8) {
            env_9.error = e_8;
            env_9.hasError = true;
        }
        finally {
            __disposeResources(env_9);
        }
    }
    while (true) {
        const env_10 = { stack: [], error: void 0, hasError: false };
        try {
            const d28 = __addDisposableResource(env_10, { [Symbol.dispose]() { } }, false);
            break;
        }
        catch (e_9) {
            env_10.error = e_9;
            env_10.hasError = true;
        }
        finally {
            __disposeResources(env_10);
        }
    }
    do {
        const env_11 = { stack: [], error: void 0, hasError: false };
        try {
            const d29 = __addDisposableResource(env_11, { [Symbol.dispose]() { } }, false);
            break;
        }
        catch (e_10) {
            env_11.error = e_10;
            env_11.hasError = true;
        }
        finally {
            __disposeResources(env_11);
        }
    } while (true);
    for (;;) {
        const env_12 = { stack: [], error: void 0, hasError: false };
        try {
            const d30 = __addDisposableResource(env_12, { [Symbol.dispose]() { } }, false);
            break;
        }
        catch (e_11) {
            env_12.error = e_11;
            env_12.hasError = true;
        }
        finally {
            __disposeResources(env_12);
        }
    }
    for (const x in {}) {
        const env_13 = { stack: [], error: void 0, hasError: false };
        try {
            const d31 = __addDisposableResource(env_13, { [Symbol.dispose]() { } }, false);
        }
        catch (e_12) {
            env_13.error = e_12;
            env_13.hasError = true;
        }
        finally {
            __disposeResources(env_13);
        }
    }
    for (const x of []) {
        const env_14 = { stack: [], error: void 0, hasError: false };
        try {
            const d32 = __addDisposableResource(env_14, { [Symbol.dispose]() { } }, false);
        }
        catch (e_13) {
            env_14.error = e_13;
            env_14.hasError = true;
        }
        finally {
            __disposeResources(env_14);
        }
    }
}
catch (e_14) {
    env_2.error = e_14;
    env_2.hasError = true;
}
finally {
    __disposeResources(env_2);
}
export {};
