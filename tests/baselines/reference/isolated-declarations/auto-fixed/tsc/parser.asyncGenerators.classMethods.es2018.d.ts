//// [tests/cases/conformance/parser/ecmascript2018/asyncGenerators/parser.asyncGenerators.classMethods.es2018.ts] ////

//// [methodIsOk.ts]
class C1 {
    async * f(): AsyncGenerator<never, void, unknown> {
    }
}
//// [awaitMethodNameIsOk.ts]
class C2 {
    async * await(): AsyncGenerator<never, void, unknown> {
    }
}
//// [yieldMethodNameIsOk.ts]
class C3 {
    async * yield(): AsyncGenerator<never, void, unknown> {
    }
}
//// [awaitParameterIsError.ts]
class C4 {
    async * f(await: any): AsyncGenerator<never, void, unknown> {
    }
}
//// [yieldParameterIsError.ts]
class C5 {
    async * f(yield: any): AsyncGenerator<never, void, unknown> {
    }
}
//// [awaitInParameterInitializerIsError.ts]
class C6 {
    async * f(a: number = await 1): AsyncGenerator<never, void, unknown> {
    }
}
//// [yieldInParameterInitializerIsError.ts]
class C7 {
    async * f(a: any = yield): AsyncGenerator<never, void, unknown> {
    }
}
//// [nestedAsyncGeneratorIsOk.ts]
class C8 {
    async * f(): AsyncGenerator<never, void, unknown> {
        async function * g() {
        }
    }
}
//// [nestedFunctionDeclarationNamedYieldIsError.ts]
class C9 {
    async * f(): AsyncGenerator<never, void, unknown> {
        function yield() {
        }
    }
}
//// [nestedFunctionExpressionNamedYieldIsError.ts]
class C10 {
    async * f(): AsyncGenerator<never, void, unknown> {
        const x = function yield() {
        };
    }
}
//// [nestedFunctionDeclarationNamedAwaitIsError.ts]
class C11 {
    async * f(): AsyncGenerator<never, void, unknown> {
        function await() {
        }
    }
}
//// [nestedFunctionExpressionNamedAwaitIsError.ts]
class C12 {
    async * f(): AsyncGenerator<never, void, unknown> {
        const x = function await() {
        };
    }
}
//// [yieldIsOk.ts]
class C13 {
    async * f(): AsyncGenerator<any, void, unknown> {
        yield;
    }
}
//// [yieldWithValueIsOk.ts]
class C14 {
    async * f(): AsyncGenerator<number, void, unknown> {
        yield 1;
    }
}
//// [yieldStarMissingValueIsError.ts]
class C15 {
    async * f(): AsyncGenerator<any, void, any> {
        yield *;
    }
}
//// [yieldStarWithValueIsOk.ts]
class C16 {
    async * f(): AsyncGenerator<any, void, undefined> {
        yield * [];
    }
}
//// [awaitWithValueIsOk.ts]
class C17 {
    async * f(): AsyncGenerator<never, void, unknown> {
        await 1;
    }
}
//// [awaitMissingValueIsError.ts]
class C18 {
    async * f(): AsyncGenerator<never, void, unknown> {
        await;
    }
}
//// [awaitAsTypeIsOk.ts]
interface await {}
class C19 {
    async * f(): AsyncGenerator<never, void, unknown> {
        let x: await;
    }
}
//// [yieldAsTypeIsStrictError.ts]
interface yield {}
class C20 {
    async * f(): AsyncGenerator<never, void, unknown> {
        let x: yield;
    }
}
//// [yieldInClassComputedPropertyIsError.ts]
class C21 {
    async * [yield](): AsyncGenerator<never, void, unknown> {
    }
}
//// [yieldInNestedComputedPropertyIsOk.ts]
class C22 {
    async * f(): AsyncGenerator<any, void, unknown> {
        const x = { [yield]: 1 };
    }
}
//// [asyncGeneratorGetAccessorIsError.ts]
class C23 {
    async * get x(): number {
        return 1;
    }
}
//// [asyncGeneratorSetAccessorIsError.ts]
class C24 {
    async * set x(value: number): void {
    }
}
//// [asyncGeneratorPropertyIsError.ts]
class C25 {
    async * x = 1: any;
}


/// [Declarations] ////



//// [asyncGeneratorGetAccessorIsError.d.ts]
declare class C23 {
    get(): any;
    x(): number;
}

//// [asyncGeneratorPropertyIsError.d.ts]
declare class C25 {
    x(): any;
    1: any;
}

//// [asyncGeneratorSetAccessorIsError.d.ts]
declare class C24 {
    set(): any;
    x(value: number): void;
}

//// [awaitAsTypeIsOk.d.ts]
interface await {
}
declare class C19 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [awaitInParameterInitializerIsError.d.ts]
declare class C6 {
    f(a?: number): AsyncGenerator<never, void, unknown>;
}

//// [awaitMethodNameIsOk.d.ts]
declare class C2 {
    await(): AsyncGenerator<never, void, unknown>;
}

//// [awaitMissingValueIsError.d.ts]
declare class C18 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [awaitParameterIsError.d.ts]
declare class C4 {
    f(await: any): AsyncGenerator<never, void, unknown>;
}

//// [awaitWithValueIsOk.d.ts]
declare class C17 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [methodIsOk.d.ts]
declare class C1 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [nestedAsyncGeneratorIsOk.d.ts]
declare class C8 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [nestedFunctionDeclarationNamedAwaitIsError.d.ts]
declare class C11 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [nestedFunctionDeclarationNamedYieldIsError.d.ts]
declare class C9 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [nestedFunctionExpressionNamedAwaitIsError.d.ts]
declare class C12 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [nestedFunctionExpressionNamedYieldIsError.d.ts]
declare class C10 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [yieldAsTypeIsStrictError.d.ts]
interface yield {
}
declare class C20 {
    f(): AsyncGenerator<never, void, unknown>;
}

//// [yieldInClassComputedPropertyIsError.d.ts]
declare class C21 {
}

//// [yieldInNestedComputedPropertyIsOk.d.ts]
declare class C22 {
    f(): AsyncGenerator<any, void, unknown>;
}

//// [yieldInParameterInitializerIsError.d.ts]
declare class C7 {
    f(a?: any): AsyncGenerator<never, void, unknown>;
}

//// [yieldIsOk.d.ts]
declare class C13 {
    f(): AsyncGenerator<any, void, unknown>;
}

//// [yieldMethodNameIsOk.d.ts]
declare class C3 {
    yield(): AsyncGenerator<never, void, unknown>;
}

//// [yieldParameterIsError.d.ts]
declare class C5 {
    f(yield: any): AsyncGenerator<never, void, unknown>;
}

//// [yieldStarMissingValueIsError.d.ts]
declare class C15 {
    f(): AsyncGenerator<any, void, any>;
}

//// [yieldStarWithValueIsOk.d.ts]
declare class C16 {
    f(): AsyncGenerator<any, void, undefined>;
}

//// [yieldWithValueIsOk.d.ts]
declare class C14 {
    f(): AsyncGenerator<number, void, unknown>;
}

/// [Errors] ////

asyncGeneratorGetAccessorIsError.ts(2,17): error TS1005: '(' expected.
asyncGeneratorPropertyIsError.ts(2,15): error TS1005: '(' expected.
asyncGeneratorSetAccessorIsError.ts(2,17): error TS1005: '(' expected.
awaitInParameterInitializerIsError.ts(2,27): error TS2524: 'await' expressions cannot be used in a parameter initializer.
awaitMissingValueIsError.ts(3,14): error TS1109: Expression expected.
awaitParameterIsError.ts(2,15): error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
nestedFunctionDeclarationNamedAwaitIsError.ts(3,18): error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
nestedFunctionDeclarationNamedYieldIsError.ts(3,18): error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
nestedFunctionExpressionNamedAwaitIsError.ts(3,28): error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
nestedFunctionExpressionNamedYieldIsError.ts(3,28): error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
yieldAsTypeIsStrictError.ts(4,16): error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
yieldInClassComputedPropertyIsError.ts(2,14): error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
yieldInClassComputedPropertyIsError.ts(2,14): error TS2693: 'yield' only refers to a type, but is being used as a value here.
yieldInNestedComputedPropertyIsOk.ts(3,21): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
yieldInParameterInitializerIsError.ts(2,24): error TS2322: Type 'undefined' is not assignable to type 'never'.
yieldInParameterInitializerIsError.ts(2,24): error TS2523: 'yield' expressions cannot be used in a parameter initializer.
yieldParameterIsError.ts(2,15): error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
yieldStarMissingValueIsError.ts(3,16): error TS1109: Expression expected.


==== methodIsOk.ts (0 errors) ====
    class C1 {
        async * f(): AsyncGenerator<never, void, unknown> {
        }
    }
==== awaitMethodNameIsOk.ts (0 errors) ====
    class C2 {
        async * await(): AsyncGenerator<never, void, unknown> {
        }
    }
==== yieldMethodNameIsOk.ts (0 errors) ====
    class C3 {
        async * yield(): AsyncGenerator<never, void, unknown> {
        }
    }
==== awaitParameterIsError.ts (1 errors) ====
    class C4 {
        async * f(await: any): AsyncGenerator<never, void, unknown> {
                  ~~~~~
!!! error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
        }
    }
==== yieldParameterIsError.ts (1 errors) ====
    class C5 {
        async * f(yield: any): AsyncGenerator<never, void, unknown> {
                  ~~~~~
!!! error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
        }
    }
==== awaitInParameterInitializerIsError.ts (1 errors) ====
    class C6 {
        async * f(a: number = await 1): AsyncGenerator<never, void, unknown> {
                              ~~~~~~~
!!! error TS2524: 'await' expressions cannot be used in a parameter initializer.
        }
    }
==== yieldInParameterInitializerIsError.ts (2 errors) ====
    class C7 {
        async * f(a: any = yield): AsyncGenerator<never, void, unknown> {
                           ~~~~~
!!! error TS2322: Type 'undefined' is not assignable to type 'never'.
                           ~~~~~
!!! error TS2523: 'yield' expressions cannot be used in a parameter initializer.
        }
    }
==== nestedAsyncGeneratorIsOk.ts (0 errors) ====
    class C8 {
        async * f(): AsyncGenerator<never, void, unknown> {
            async function * g() {
            }
        }
    }
==== nestedFunctionDeclarationNamedYieldIsError.ts (1 errors) ====
    class C9 {
        async * f(): AsyncGenerator<never, void, unknown> {
            function yield() {
                     ~~~~~
!!! error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
            }
        }
    }
==== nestedFunctionExpressionNamedYieldIsError.ts (1 errors) ====
    class C10 {
        async * f(): AsyncGenerator<never, void, unknown> {
            const x = function yield() {
                               ~~~~~
!!! error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
            };
        }
    }
==== nestedFunctionDeclarationNamedAwaitIsError.ts (1 errors) ====
    class C11 {
        async * f(): AsyncGenerator<never, void, unknown> {
            function await() {
                     ~~~~~
!!! error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
            }
        }
    }
==== nestedFunctionExpressionNamedAwaitIsError.ts (1 errors) ====
    class C12 {
        async * f(): AsyncGenerator<never, void, unknown> {
            const x = function await() {
                               ~~~~~
!!! error TS1359: Identifier expected. 'await' is a reserved word that cannot be used here.
            };
        }
    }
==== yieldIsOk.ts (0 errors) ====
    class C13 {
        async * f(): AsyncGenerator<any, void, unknown> {
            yield;
        }
    }
==== yieldWithValueIsOk.ts (0 errors) ====
    class C14 {
        async * f(): AsyncGenerator<number, void, unknown> {
            yield 1;
        }
    }
==== yieldStarMissingValueIsError.ts (1 errors) ====
    class C15 {
        async * f(): AsyncGenerator<any, void, any> {
            yield *;
                   ~
!!! error TS1109: Expression expected.
        }
    }
==== yieldStarWithValueIsOk.ts (0 errors) ====
    class C16 {
        async * f(): AsyncGenerator<any, void, undefined> {
            yield * [];
        }
    }
==== awaitWithValueIsOk.ts (0 errors) ====
    class C17 {
        async * f(): AsyncGenerator<never, void, unknown> {
            await 1;
        }
    }
==== awaitMissingValueIsError.ts (1 errors) ====
    class C18 {
        async * f(): AsyncGenerator<never, void, unknown> {
            await;
                 ~
!!! error TS1109: Expression expected.
        }
    }
==== awaitAsTypeIsOk.ts (0 errors) ====
    interface await {}
    class C19 {
        async * f(): AsyncGenerator<never, void, unknown> {
            let x: await;
        }
    }
==== yieldAsTypeIsStrictError.ts (1 errors) ====
    interface yield {}
    class C20 {
        async * f(): AsyncGenerator<never, void, unknown> {
            let x: yield;
                   ~~~~~
!!! error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
        }
    }
==== yieldInClassComputedPropertyIsError.ts (2 errors) ====
    class C21 {
        async * [yield](): AsyncGenerator<never, void, unknown> {
                 ~~~~~
!!! error TS1213: Identifier expected. 'yield' is a reserved word in strict mode. Class definitions are automatically in strict mode.
                 ~~~~~
!!! error TS2693: 'yield' only refers to a type, but is being used as a value here.
        }
    }
==== yieldInNestedComputedPropertyIsOk.ts (1 errors) ====
    class C22 {
        async * f(): AsyncGenerator<any, void, unknown> {
            const x = { [yield]: 1 };
                        ~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        }
    }
==== asyncGeneratorGetAccessorIsError.ts (1 errors) ====
    class C23 {
        async * get x(): number {
                    ~
!!! error TS1005: '(' expected.
            return 1;
        }
    }
==== asyncGeneratorSetAccessorIsError.ts (1 errors) ====
    class C24 {
        async * set x(value: number): void {
                    ~
!!! error TS1005: '(' expected.
        }
    }
==== asyncGeneratorPropertyIsError.ts (1 errors) ====
    class C25 {
        async * x = 1: any;
                  ~
!!! error TS1005: '(' expected.
    }
    