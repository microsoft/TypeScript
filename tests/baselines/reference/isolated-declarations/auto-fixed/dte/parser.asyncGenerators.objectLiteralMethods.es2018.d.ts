//// [tests/cases/conformance/parser/ecmascript2018/asyncGenerators/parser.asyncGenerators.objectLiteralMethods.es2018.ts] ////

//// [methodIsOk.ts]
const o1 = {
    async * f(): AsyncGenerator<never, void, unknown> {
    }
};
//// [awaitMethodNameIsOk.ts]
const o2 = {
    async * await(): AsyncGenerator<never, void, unknown> {
    }
};
//// [yieldMethodNameIsOk.ts]
const o3 = {
    async * yield(): AsyncGenerator<never, void, unknown> {
    }
};
//// [awaitParameterIsError.ts]
const o4 = {
    async * f(await: any): AsyncGenerator<never, void, unknown> {
    }
};
//// [yieldParameterIsError.ts]
const o5 = {
    async * f(yield: any): AsyncGenerator<never, void, unknown> {
    }
};
//// [awaitInParameterInitializerIsError.ts]
const o6 = {
    async * f(a: number = await 1): AsyncGenerator<never, void, unknown> {
    }
};
//// [yieldInParameterInitializerIsError.ts]
const o7 = {
    async * f(a: any = yield): AsyncGenerator<never, void, unknown> {
    }
};
//// [nestedAsyncGeneratorIsOk.ts]
const o8 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        async function * g() {
        }
    }
};
//// [nestedFunctionDeclarationNamedYieldIsError.ts]
const o9 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        function yield() {
        }
    }
};
//// [nestedFunctionExpressionNamedYieldIsError.ts]
const o10 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        const x = function yield() {
        };
    }
};
//// [nestedFunctionDeclarationNamedAwaitIsError.ts]
const o11 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        function await() {
        }
    }
};
//// [nestedFunctionExpressionNamedAwaitIsError.ts]
const o12 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        const x = function await() {
        };
    }
};
//// [yieldIsOk.ts]
const o13 = {
    async * f(): AsyncGenerator<any, void, unknown> {
        yield;
    }
};
//// [yieldWithValueIsOk.ts]
const o14 = {
    async * f(): AsyncGenerator<number, void, unknown> {
        yield 1;
    }
};
//// [yieldStarMissingValueIsError.ts]
const o15 = {
    async * f(): AsyncGenerator<any, void, any> {
        yield *;
    }
};
//// [yieldStarWithValueIsOk.ts]
const o16 = {
    async * f(): AsyncGenerator<any, void, undefined> {
        yield * [];
    }
};
//// [awaitWithValueIsOk.ts]
const o17 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        await 1;
    }
};
//// [awaitMissingValueIsError.ts]
const o18 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        await;
    }
};
//// [awaitAsTypeIsOk.ts]
interface await {}
const o19 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        let x: await;
    }
};
//// [yieldAsTypeIsOk.ts]
interface yield {}
const o20 = {
    async * f(): AsyncGenerator<never, void, unknown> {
        let x: yield;
    }
};
//// [yieldInNestedComputedPropertyIsOk.ts]
const o21 = {
    async * f(): AsyncGenerator<any, void, unknown> {
        const x = { [yield]: 1 };
    }
};
//// [asyncGeneratorGetAccessorIsError.ts]
const o22 = {
    async * get x(): number {
        return 1;
    }
};
//// [asyncGeneratorSetAccessorIsError.ts]
const o23 = {
    async * set x(value: number): void {
    }
};
//// [asyncGeneratorPropertyIsError.ts]
const o24 = {
    async * x: 1;
};


/// [Declarations] ////



//// [/.src/asyncGeneratorGetAccessorIsError.d.ts]
declare const o22: invalid;

//// [/.src/asyncGeneratorPropertyIsError.d.ts]
declare const o24: {
    x(): 1;
};

//// [/.src/asyncGeneratorSetAccessorIsError.d.ts]
declare const o23: invalid;

//// [/.src/awaitAsTypeIsOk.d.ts]
interface await {
}
declare const o19: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/awaitInParameterInitializerIsError.d.ts]
declare const o6: {
    f(a?: number): AsyncGenerator<never, void, unknown>;
};

//// [/.src/awaitMethodNameIsOk.d.ts]
declare const o2: {
    await(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/awaitMissingValueIsError.d.ts]
declare const o18: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/awaitParameterIsError.d.ts]
declare const o4: {
    f(await: any): AsyncGenerator<never, void, unknown>;
};

//// [/.src/awaitWithValueIsOk.d.ts]
declare const o17: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/methodIsOk.d.ts]
declare const o1: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/nestedAsyncGeneratorIsOk.d.ts]
declare const o8: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/nestedFunctionDeclarationNamedAwaitIsError.d.ts]
declare const o11: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/nestedFunctionDeclarationNamedYieldIsError.d.ts]
declare const o9: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/nestedFunctionExpressionNamedAwaitIsError.d.ts]
declare const o12: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/nestedFunctionExpressionNamedYieldIsError.d.ts]
declare const o10: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/yieldAsTypeIsOk.d.ts]
interface yield {
}
declare const o20: {
    f(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/yieldInNestedComputedPropertyIsOk.d.ts]
declare const o21: {
    f(): AsyncGenerator<any, void, unknown>;
};

//// [/.src/yieldInParameterInitializerIsError.d.ts]
declare const o7: {
    f(a?: any): AsyncGenerator<never, void, unknown>;
};

//// [/.src/yieldIsOk.d.ts]
declare const o13: {
    f(): AsyncGenerator<any, void, unknown>;
};

//// [/.src/yieldMethodNameIsOk.d.ts]
declare const o3: {
    yield(): AsyncGenerator<never, void, unknown>;
};

//// [/.src/yieldParameterIsError.d.ts]
declare const o5: {
    f(yield: any): AsyncGenerator<never, void, unknown>;
};

//// [/.src/yieldStarMissingValueIsError.d.ts]
declare const o15: {
    f(): AsyncGenerator<any, void, any>;
};

//// [/.src/yieldStarWithValueIsOk.d.ts]
declare const o16: {
    f(): AsyncGenerator<any, void, undefined>;
};

//// [/.src/yieldWithValueIsOk.d.ts]
declare const o14: {
    f(): AsyncGenerator<number, void, unknown>;
};
/// [Errors] ////

asyncGeneratorGetAccessorIsError.ts(2,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
asyncGeneratorGetAccessorIsError.ts(2,17): error TS1005: '(' expected.
asyncGeneratorPropertyIsError.ts(2,14): error TS1005: '(' expected.
asyncGeneratorSetAccessorIsError.ts(2,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
asyncGeneratorSetAccessorIsError.ts(2,17): error TS1005: '(' expected.
awaitInParameterInitializerIsError.ts(2,27): error TS2524: 'await' expressions cannot be used in a parameter initializer.
awaitMissingValueIsError.ts(3,14): error TS1109: Expression expected.
awaitParameterIsError.ts(2,15): error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
nestedFunctionDeclarationNamedAwaitIsError.ts(3,18): error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
nestedFunctionDeclarationNamedYieldIsError.ts(3,18): error TS1359: Identifier expected. 'yield' is a reserved word that cannot be used here.
nestedFunctionExpressionNamedAwaitIsError.ts(3,28): error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
nestedFunctionExpressionNamedYieldIsError.ts(3,28): error TS1359: Identifier expected. 'yield' is a reserved word that cannot be used here.
yieldInNestedComputedPropertyIsOk.ts(3,21): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
yieldInParameterInitializerIsError.ts(2,24): error TS2322: Type 'undefined' is not assignable to type 'never'.
yieldInParameterInitializerIsError.ts(2,24): error TS2523: 'yield' expressions cannot be used in a parameter initializer.
yieldParameterIsError.ts(2,15): error TS1359: Identifier expected. 'yield' is a reserved word that cannot be used here.
yieldStarMissingValueIsError.ts(3,16): error TS1109: Expression expected.


==== methodIsOk.ts (0 errors) ====
    const o1 = {
        async * f(): AsyncGenerator<never, void, unknown> {
        }
    };
==== awaitMethodNameIsOk.ts (0 errors) ====
    const o2 = {
        async * await(): AsyncGenerator<never, void, unknown> {
        }
    };
==== yieldMethodNameIsOk.ts (0 errors) ====
    const o3 = {
        async * yield(): AsyncGenerator<never, void, unknown> {
        }
    };
==== awaitParameterIsError.ts (1 errors) ====
    const o4 = {
        async * f(await: any): AsyncGenerator<never, void, unknown> {
                  ~~~~~
!!! error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
        }
    };
==== yieldParameterIsError.ts (1 errors) ====
    const o5 = {
        async * f(yield: any): AsyncGenerator<never, void, unknown> {
                  ~~~~~
!!! error TS1359: Identifier expected. 'yield' is a reserved word that cannot be used here.
        }
    };
==== awaitInParameterInitializerIsError.ts (1 errors) ====
    const o6 = {
        async * f(a: number = await 1): AsyncGenerator<never, void, unknown> {
                              ~~~~~~~
!!! error TS2524: 'await' expressions cannot be used in a parameter initializer.
        }
    };
==== yieldInParameterInitializerIsError.ts (2 errors) ====
    const o7 = {
        async * f(a: any = yield): AsyncGenerator<never, void, unknown> {
                           ~~~~~
!!! error TS2322: Type 'undefined' is not assignable to type 'never'.
                           ~~~~~
!!! error TS2523: 'yield' expressions cannot be used in a parameter initializer.
        }
    };
==== nestedAsyncGeneratorIsOk.ts (0 errors) ====
    const o8 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            async function * g() {
            }
        }
    };
==== nestedFunctionDeclarationNamedYieldIsError.ts (1 errors) ====
    const o9 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            function yield() {
                     ~~~~~
!!! error TS1359: Identifier expected. 'yield' is a reserved word that cannot be used here.
            }
        }
    };
==== nestedFunctionExpressionNamedYieldIsError.ts (1 errors) ====
    const o10 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            const x = function yield() {
                               ~~~~~
!!! error TS1359: Identifier expected. 'yield' is a reserved word that cannot be used here.
            };
        }
    };
==== nestedFunctionDeclarationNamedAwaitIsError.ts (1 errors) ====
    const o11 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            function await() {
                     ~~~~~
!!! error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
            }
        }
    };
==== nestedFunctionExpressionNamedAwaitIsError.ts (1 errors) ====
    const o12 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            const x = function await() {
                               ~~~~~
!!! error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
            };
        }
    };
==== yieldIsOk.ts (0 errors) ====
    const o13 = {
        async * f(): AsyncGenerator<any, void, unknown> {
            yield;
        }
    };
==== yieldWithValueIsOk.ts (0 errors) ====
    const o14 = {
        async * f(): AsyncGenerator<number, void, unknown> {
            yield 1;
        }
    };
==== yieldStarMissingValueIsError.ts (1 errors) ====
    const o15 = {
        async * f(): AsyncGenerator<any, void, any> {
            yield *;
                   ~
!!! error TS1109: Expression expected.
        }
    };
==== yieldStarWithValueIsOk.ts (0 errors) ====
    const o16 = {
        async * f(): AsyncGenerator<any, void, undefined> {
            yield * [];
        }
    };
==== awaitWithValueIsOk.ts (0 errors) ====
    const o17 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            await 1;
        }
    };
==== awaitMissingValueIsError.ts (1 errors) ====
    const o18 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            await;
                 ~
!!! error TS1109: Expression expected.
        }
    };
==== awaitAsTypeIsOk.ts (0 errors) ====
    interface await {}
    const o19 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            let x: await;
        }
    };
==== yieldAsTypeIsOk.ts (0 errors) ====
    interface yield {}
    const o20 = {
        async * f(): AsyncGenerator<never, void, unknown> {
            let x: yield;
        }
    };
==== yieldInNestedComputedPropertyIsOk.ts (1 errors) ====
    const o21 = {
        async * f(): AsyncGenerator<any, void, unknown> {
            const x = { [yield]: 1 };
                        ~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        }
    };
==== asyncGeneratorGetAccessorIsError.ts (2 errors) ====
    const o22 = {
        async * get x(): number {
                ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~
!!! error TS1005: '(' expected.
            return 1;
        }
    };
==== asyncGeneratorSetAccessorIsError.ts (2 errors) ====
    const o23 = {
        async * set x(value: number): void {
                ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                    ~
!!! error TS1005: '(' expected.
        }
    };
==== asyncGeneratorPropertyIsError.ts (1 errors) ====
    const o24 = {
        async * x: 1;
                 ~
!!! error TS1005: '(' expected.
    };
    