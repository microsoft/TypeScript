//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.1.ts] ////

//// [awaitUsingDeclarations.1.ts]
await using d1 = { async [Symbol.asyncDispose]() {} };

async function af() {
    await using d3 = { async [Symbol.asyncDispose]() {} };
    await null;
}

async function * ag() {
    await using d5 = { async [Symbol.asyncDispose]() {} };
    yield;
    await null;
}

const a = async () => {
    await using d6 = { async [Symbol.asyncDispose]() {} };
};

class C1 {
    a = async () => {
        await using d7 = { async [Symbol.asyncDispose]() {} };
    };

    async am() {
        await using d13 = { async [Symbol.asyncDispose]() {} };
        await null;
    }

    async * ag() {
        await using d15 = { async [Symbol.asyncDispose]() {} };
        yield;
        await null;
    }
}

{
    await using d19 = { async [Symbol.asyncDispose]() {} };
}

switch (Math.random()) {
    case 0:
        await using d20 = { async [Symbol.asyncDispose]() {} };
        break;

    case 1:
        await using d21 = { async [Symbol.asyncDispose]() {} };
        break;
}

if (true)
    switch (0) {
        case 0:
            await using d22 = { async [Symbol.asyncDispose]() {} };
            break;
    }

try {
    await using d23 = { async [Symbol.asyncDispose]() {} };
}
catch {
    await using d24 = { async [Symbol.asyncDispose]() {} };
}
finally {
    await using d25 = { async [Symbol.asyncDispose]() {} };
}

if (true) {
    await using d26 = { async [Symbol.asyncDispose]() {} };
}
else {
    await using d27 = { async [Symbol.asyncDispose]() {} };
}

while (true) {
    await using d28 = { async [Symbol.asyncDispose]() {} };
    break;
}

do {
    await using d29 = { async [Symbol.asyncDispose]() {} };
    break;
}
while (true);

for (;;) {
    await using d30 = { async [Symbol.asyncDispose]() {} };
    break;
}

for (const x in {}) {
    await using d31 = { async [Symbol.asyncDispose]() {} };
}

for (const x of []) {
    await using d32 = { async [Symbol.asyncDispose]() {} };
}

export {};

//// [awaitUsingDeclarations.1.js]
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
function af() {
    return __awaiter(this, void 0, void 0, function* () {
        const env_15 = { stack: [], error: void 0, hasError: false };
        try {
            const d3 = __addDisposableResource(env_15, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
            yield null;
        }
        catch (e_15) {
            env_15.error = e_15;
            env_15.hasError = true;
        }
        finally {
            const result_15 = __disposeResources(env_15);
            if (result_15)
                yield result_15;
        }
    });
}
function ag() {
    return __asyncGenerator(this, arguments, function* ag_1() {
        const env_16 = { stack: [], error: void 0, hasError: false };
        try {
            const d5 = __addDisposableResource(env_16, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
            yield yield __await(void 0);
            yield __await(null);
        }
        catch (e_16) {
            env_16.error = e_16;
            env_16.hasError = true;
        }
        finally {
            const result_16 = __disposeResources(env_16);
            if (result_16)
                yield __await(result_16);
        }
    });
}
var d1, a, C1, env_1;
const env_2 = { stack: [], error: void 0, hasError: false };
try {
    d1 = __addDisposableResource(env_2, { [Symbol.asyncDispose]() {
            return __awaiter(this, void 0, void 0, function* () { });
        } }, true);
    a = () => __awaiter(void 0, void 0, void 0, function* () {
        const env_17 = { stack: [], error: void 0, hasError: false };
        try {
            const d6 = __addDisposableResource(env_17, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_17) {
            env_17.error = e_17;
            env_17.hasError = true;
        }
        finally {
            const result_17 = __disposeResources(env_17);
            if (result_17)
                yield result_17;
        }
    });
    C1 = class C1 {
        constructor() {
            this.a = () => __awaiter(this, void 0, void 0, function* () {
                const env_18 = { stack: [], error: void 0, hasError: false };
                try {
                    const d7 = __addDisposableResource(env_18, { [Symbol.asyncDispose]() {
                            return __awaiter(this, void 0, void 0, function* () { });
                        } }, true);
                }
                catch (e_18) {
                    env_18.error = e_18;
                    env_18.hasError = true;
                }
                finally {
                    const result_18 = __disposeResources(env_18);
                    if (result_18)
                        yield result_18;
                }
            });
        }
        am() {
            return __awaiter(this, void 0, void 0, function* () {
                const env_19 = { stack: [], error: void 0, hasError: false };
                try {
                    const d13 = __addDisposableResource(env_19, { [Symbol.asyncDispose]() {
                            return __awaiter(this, void 0, void 0, function* () { });
                        } }, true);
                    yield null;
                }
                catch (e_19) {
                    env_19.error = e_19;
                    env_19.hasError = true;
                }
                finally {
                    const result_19 = __disposeResources(env_19);
                    if (result_19)
                        yield result_19;
                }
            });
        }
        ag() {
            return __asyncGenerator(this, arguments, function* ag_2() {
                const env_20 = { stack: [], error: void 0, hasError: false };
                try {
                    const d15 = __addDisposableResource(env_20, { [Symbol.asyncDispose]() {
                            return __awaiter(this, void 0, void 0, function* () { });
                        } }, true);
                    yield yield __await(void 0);
                    yield __await(null);
                }
                catch (e_20) {
                    env_20.error = e_20;
                    env_20.hasError = true;
                }
                finally {
                    const result_20 = __disposeResources(env_20);
                    if (result_20)
                        yield __await(result_20);
                }
            });
        }
    };
    {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            const d19 = __addDisposableResource(env_3, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_1) {
            env_3.error = e_1;
            env_3.hasError = true;
        }
        finally {
            const result_1 = __disposeResources(env_3);
            if (result_1)
                await result_1;
        }
    }
    env_1 = { stack: [], error: void 0, hasError: false };
    try {
        switch (Math.random()) {
            case 0:
                const d20 = __addDisposableResource(env_1, { [Symbol.asyncDispose]() {
                        return __awaiter(this, void 0, void 0, function* () { });
                    } }, true);
                break;
            case 1:
                const d21 = __addDisposableResource(env_1, { [Symbol.asyncDispose]() {
                        return __awaiter(this, void 0, void 0, function* () { });
                    } }, true);
                break;
        }
    }
    catch (e_2) {
        env_1.error = e_2;
        env_1.hasError = true;
    }
    finally {
        const result_2 = __disposeResources(env_1);
        if (result_2)
            await result_2;
    }
    if (true) {
        const env_4 = { stack: [], error: void 0, hasError: false };
        try {
            switch (0) {
                case 0:
                    const d22 = __addDisposableResource(env_4, { [Symbol.asyncDispose]() {
                            return __awaiter(this, void 0, void 0, function* () { });
                        } }, true);
                    break;
            }
        }
        catch (e_3) {
            env_4.error = e_3;
            env_4.hasError = true;
        }
        finally {
            const result_3 = __disposeResources(env_4);
            if (result_3)
                await result_3;
        }
    }
    try {
        const env_5 = { stack: [], error: void 0, hasError: false };
        try {
            const d23 = __addDisposableResource(env_5, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_4) {
            env_5.error = e_4;
            env_5.hasError = true;
        }
        finally {
            const result_4 = __disposeResources(env_5);
            if (result_4)
                await result_4;
        }
    }
    catch (_a) {
        const env_6 = { stack: [], error: void 0, hasError: false };
        try {
            const d24 = __addDisposableResource(env_6, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_5) {
            env_6.error = e_5;
            env_6.hasError = true;
        }
        finally {
            const result_5 = __disposeResources(env_6);
            if (result_5)
                await result_5;
        }
    }
    finally {
        const env_7 = { stack: [], error: void 0, hasError: false };
        try {
            const d25 = __addDisposableResource(env_7, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_6) {
            env_7.error = e_6;
            env_7.hasError = true;
        }
        finally {
            const result_6 = __disposeResources(env_7);
            if (result_6)
                await result_6;
        }
    }
    if (true) {
        const env_8 = { stack: [], error: void 0, hasError: false };
        try {
            const d26 = __addDisposableResource(env_8, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_7) {
            env_8.error = e_7;
            env_8.hasError = true;
        }
        finally {
            const result_7 = __disposeResources(env_8);
            if (result_7)
                await result_7;
        }
    }
    else {
        const env_9 = { stack: [], error: void 0, hasError: false };
        try {
            const d27 = __addDisposableResource(env_9, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_8) {
            env_9.error = e_8;
            env_9.hasError = true;
        }
        finally {
            const result_8 = __disposeResources(env_9);
            if (result_8)
                await result_8;
        }
    }
    while (true) {
        const env_10 = { stack: [], error: void 0, hasError: false };
        try {
            const d28 = __addDisposableResource(env_10, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
            break;
        }
        catch (e_9) {
            env_10.error = e_9;
            env_10.hasError = true;
        }
        finally {
            const result_9 = __disposeResources(env_10);
            if (result_9)
                await result_9;
        }
    }
    do {
        const env_11 = { stack: [], error: void 0, hasError: false };
        try {
            const d29 = __addDisposableResource(env_11, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
            break;
        }
        catch (e_10) {
            env_11.error = e_10;
            env_11.hasError = true;
        }
        finally {
            const result_10 = __disposeResources(env_11);
            if (result_10)
                await result_10;
        }
    } while (true);
    for (;;) {
        const env_12 = { stack: [], error: void 0, hasError: false };
        try {
            const d30 = __addDisposableResource(env_12, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
            break;
        }
        catch (e_11) {
            env_12.error = e_11;
            env_12.hasError = true;
        }
        finally {
            const result_11 = __disposeResources(env_12);
            if (result_11)
                await result_11;
        }
    }
    for (const x in {}) {
        const env_13 = { stack: [], error: void 0, hasError: false };
        try {
            const d31 = __addDisposableResource(env_13, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_12) {
            env_13.error = e_12;
            env_13.hasError = true;
        }
        finally {
            const result_12 = __disposeResources(env_13);
            if (result_12)
                await result_12;
        }
    }
    for (const x of []) {
        const env_14 = { stack: [], error: void 0, hasError: false };
        try {
            const d32 = __addDisposableResource(env_14, { [Symbol.asyncDispose]() {
                    return __awaiter(this, void 0, void 0, function* () { });
                } }, true);
        }
        catch (e_13) {
            env_14.error = e_13;
            env_14.hasError = true;
        }
        finally {
            const result_13 = __disposeResources(env_14);
            if (result_13)
                await result_13;
        }
    }
}
catch (e_14) {
    env_2.error = e_14;
    env_2.hasError = true;
}
finally {
    const result_14 = __disposeResources(env_2);
    if (result_14)
        await result_14;
}
export {};
