//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters3.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters3.ts]
type Foo<T> = {
    foo<U>(): Foo<U>
};
function bar() {
    return {} as Foo<number>;
}


//// [declarationEmitTypeAliasWithTypeParameters3.js]
function bar() {
    return {};
}


//// [declarationEmitTypeAliasWithTypeParameters3.d.ts]
type Foo<T> = {
    foo<U>(): Foo<U>;
};
declare function bar(): Foo<number>;
