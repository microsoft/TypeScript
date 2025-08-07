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
async function af() {
    const env_15 = { stack: [], error: void 0, hasError: false };
    try {
        const d3 = __addDisposableResource(env_15, { async [Symbol.asyncDispose]() { } }, true);
        await null;
    }
    catch (e_15) {
        env_15.error = e_15;
        env_15.hasError = true;
    }
    finally {
        const result_15 = __disposeResources(env_15);
        if (result_15)
            await result_15;
    }
}
async function* ag() {
    const env_16 = { stack: [], error: void 0, hasError: false };
    try {
        const d5 = __addDisposableResource(env_16, { async [Symbol.asyncDispose]() { } }, true);
        yield;
        await null;
    }
    catch (e_16) {
        env_16.error = e_16;
        env_16.hasError = true;
    }
    finally {
        const result_16 = __disposeResources(env_16);
        if (result_16)
            await result_16;
    }
}
var d1, a, C1, env_1;
const env_2 = { stack: [], error: void 0, hasError: false };
try {
    d1 = __addDisposableResource(env_2, { async [Symbol.asyncDispose]() { } }, true);
    a = async () => {
        const env_17 = { stack: [], error: void 0, hasError: false };
        try {
            const d6 = __addDisposableResource(env_17, { async [Symbol.asyncDispose]() { } }, true);
        }
        catch (e_17) {
            env_17.error = e_17;
            env_17.hasError = true;
        }
        finally {
            const result_17 = __disposeResources(env_17);
            if (result_17)
                await result_17;
        }
    };
    C1 = class C1 {
        a = async () => {
            const env_18 = { stack: [], error: void 0, hasError: false };
            try {
                const d7 = __addDisposableResource(env_18, { async [Symbol.asyncDispose]() { } }, true);
            }
            catch (e_18) {
                env_18.error = e_18;
                env_18.hasError = true;
            }
            finally {
                const result_18 = __disposeResources(env_18);
                if (result_18)
                    await result_18;
            }
        };
        async am() {
            const env_19 = { stack: [], error: void 0, hasError: false };
            try {
                const d13 = __addDisposableResource(env_19, { async [Symbol.asyncDispose]() { } }, true);
                await null;
            }
            catch (e_19) {
                env_19.error = e_19;
                env_19.hasError = true;
            }
            finally {
                const result_19 = __disposeResources(env_19);
                if (result_19)
                    await result_19;
            }
        }
        async *ag() {
            const env_20 = { stack: [], error: void 0, hasError: false };
            try {
                const d15 = __addDisposableResource(env_20, { async [Symbol.asyncDispose]() { } }, true);
                yield;
                await null;
            }
            catch (e_20) {
                env_20.error = e_20;
                env_20.hasError = true;
            }
            finally {
                const result_20 = __disposeResources(env_20);
                if (result_20)
                    await result_20;
            }
        }
    };
    {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            const d19 = __addDisposableResource(env_3, { async [Symbol.asyncDispose]() { } }, true);
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
                const d20 = __addDisposableResource(env_1, { async [Symbol.asyncDispose]() { } }, true);
                break;
            case 1:
                const d21 = __addDisposableResource(env_1, { async [Symbol.asyncDispose]() { } }, true);
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
                    const d22 = __addDisposableResource(env_4, { async [Symbol.asyncDispose]() { } }, true);
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
            const d23 = __addDisposableResource(env_5, { async [Symbol.asyncDispose]() { } }, true);
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
    catch {
        const env_6 = { stack: [], error: void 0, hasError: false };
        try {
            const d24 = __addDisposableResource(env_6, { async [Symbol.asyncDispose]() { } }, true);
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
            const d25 = __addDisposableResource(env_7, { async [Symbol.asyncDispose]() { } }, true);
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
            const d26 = __addDisposableResource(env_8, { async [Symbol.asyncDispose]() { } }, true);
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
            const d27 = __addDisposableResource(env_9, { async [Symbol.asyncDispose]() { } }, true);
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
            const d28 = __addDisposableResource(env_10, { async [Symbol.asyncDispose]() { } }, true);
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
            const d29 = __addDisposableResource(env_11, { async [Symbol.asyncDispose]() { } }, true);
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
            const d30 = __addDisposableResource(env_12, { async [Symbol.asyncDispose]() { } }, true);
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
            const d31 = __addDisposableResource(env_13, { async [Symbol.asyncDispose]() { } }, true);
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
            const d32 = __addDisposableResource(env_14, { async [Symbol.asyncDispose]() { } }, true);
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
