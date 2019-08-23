// @target: es2018
// @lib: esnext
// @noEmit: true
// @filename: methodIsOk.ts
class C1 {
    async * f() {
    }
}
// @filename: awaitMethodNameIsOk.ts
class C2 {
    async * await() {
    }
}
// @filename: yieldMethodNameIsOk.ts
class C3 {
    async * yield() {
    }
}
// @filename: awaitParameterIsError.ts
class C4 {
    async * f(await) {
    }
}
// @filename: yieldParameterIsError.ts
class C5 {
    async * f(yield) {
    }
}
// @filename: awaitInParameterInitializerIsError.ts
class C6 {
    async * f(a = await 1) {
    }
}
// @filename: yieldInParameterInitializerIsError.ts
class C7 {
    async * f(a = yield) {
    }
}
// @filename: nestedAsyncGeneratorIsOk.ts
class C8 {
    async * f() {
        async function * g() {
        }
    }
}
// @filename: nestedFunctionDeclarationNamedYieldIsError.ts
class C9 {
    async * f() {
        function yield() {
        }
    }
}
// @filename: nestedFunctionExpressionNamedYieldIsError.ts
class C10 {
    async * f() {
        const x = function yield() {
        };
    }
}
// @filename: nestedFunctionDeclarationNamedAwaitIsError.ts
class C11 {
    async * f() {
        function await() {
        }
    }
}
// @filename: nestedFunctionExpressionNamedAwaitIsError.ts
class C12 {
    async * f() {
        const x = function await() {
        };
    }
}
// @filename: yieldIsOk.ts
class C13 {
    async * f() {
        yield;
    }
}
// @filename: yieldWithValueIsOk.ts
class C14 {
    async * f() {
        yield 1;
    }
}
// @filename: yieldStarMissingValueIsError.ts
class C15 {
    async * f() {
        yield *;
    }
}
// @filename: yieldStarWithValueIsOk.ts
class C16 {
    async * f() {
        yield * [];
    }
}
// @filename: awaitWithValueIsOk.ts
class C17 {
    async * f() {
        await 1;
    }
}
// @filename: awaitMissingValueIsError.ts
class C18 {
    async * f() {
        await;
    }
}
// @filename: awaitAsTypeIsOk.ts
interface await {}
class C19 {
    async * f() {
        let x: await;
    }
}
// @filename: yieldAsTypeIsStrictError.ts
interface yield {}
class C20 {
    async * f() {
        let x: yield;
    }
}
// @filename: yieldInClassComputedPropertyIsError.ts
class C21 {
    async * [yield]() {
    }
}
// @filename: yieldInNestedComputedPropertyIsOk.ts
class C22 {
    async * f() {
        const x = { [yield]: 1 };
    }
}
// @filename: asyncGeneratorGetAccessorIsError.ts
class C23 {
    async * get x() {
        return 1;
    }
}
// @filename: asyncGeneratorSetAccessorIsError.ts
class C24 {
    async * set x(value: number) {
    }
}
// @filename: asyncGeneratorPropertyIsError.ts
class C25 {
    async * x = 1;
}
