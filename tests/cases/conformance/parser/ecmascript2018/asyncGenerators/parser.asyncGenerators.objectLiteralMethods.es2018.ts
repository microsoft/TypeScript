// @target: es2018
// @skipLibCheck: true
// @lib: esnext
// @noEmit: true
// @filename: methodIsOk.ts
const o1 = {
    async * f() {
    }
};
// @filename: awaitMethodNameIsOk.ts
const o2 = {
    async * await() {
    }
};
// @filename: yieldMethodNameIsOk.ts
const o3 = {
    async * yield() {
    }
};
// @filename: awaitParameterIsError.ts
const o4 = {
    async * f(await) {
    }
};
// @filename: yieldParameterIsError.ts
const o5 = {
    async * f(yield) {
    }
};
// @filename: awaitInParameterInitializerIsError.ts
const o6 = {
    async * f(a = await 1) {
    }
};
// @filename: yieldInParameterInitializerIsError.ts
const o7 = {
    async * f(a = yield) {
    }
};
// @filename: nestedAsyncGeneratorIsOk.ts
const o8 = {
    async * f() {
        async function * g() {
        }
    }
};
// @filename: nestedFunctionDeclarationNamedYieldIsError.ts
const o9 = {
    async * f() {
        function yield() {
        }
    }
};
// @filename: nestedFunctionExpressionNamedYieldIsError.ts
const o10 = {
    async * f() {
        const x = function yield() {
        };
    }
};
// @filename: nestedFunctionDeclarationNamedAwaitIsError.ts
const o11 = {
    async * f() {
        function await() {
        }
    }
};
// @filename: nestedFunctionExpressionNamedAwaitIsError.ts
const o12 = {
    async * f() {
        const x = function await() {
        };
    }
};
// @filename: yieldIsOk.ts
const o13 = {
    async * f() {
        yield;
    }
};
// @filename: yieldWithValueIsOk.ts
const o14 = {
    async * f() {
        yield 1;
    }
};
// @filename: yieldStarMissingValueIsError.ts
const o15 = {
    async * f() {
        yield *;
    }
};
// @filename: yieldStarWithValueIsOk.ts
const o16 = {
    async * f() {
        yield * [];
    }
};
// @filename: awaitWithValueIsOk.ts
const o17 = {
    async * f() {
        await 1;
    }
};
// @filename: awaitMissingValueIsError.ts
const o18 = {
    async * f() {
        await;
    }
};
// @filename: awaitAsTypeIsOk.ts
interface await {}
const o19 = {
    async * f() {
        let x: await;
    }
};
// @filename: yieldAsTypeIsOk.ts
interface yield {}
const o20 = {
    async * f() {
        let x: yield;
    }
};
// @filename: yieldInNestedComputedPropertyIsOk.ts
const o21 = {
    async * f() {
        const x = { [yield]: 1 };
    }
};
// @filename: asyncGeneratorGetAccessorIsError.ts
const o22 = {
    async * get x() {
        return 1;
    }
};
// @filename: asyncGeneratorSetAccessorIsError.ts
const o23 = {
    async * set x(value: number) {
    }
};
// @filename: asyncGeneratorPropertyIsError.ts
const o24 = {
    async * x: 1;
};
