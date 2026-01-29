//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters5.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters5.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>
};
export type SubFoo<R> = Foo<string, R>;

function foo() {
    return {} as SubFoo<number>;
}


//// [declarationEmitTypeAliasWithTypeParameters5.js]
function foo() {
    return {};
}
export {};


//// [declarationEmitTypeAliasWithTypeParameters5.d.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>;
};
export type SubFoo<R> = Foo<string, R>;
export {};
