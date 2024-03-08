//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters6.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters6.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>
};
type SubFoo<R, S> = Foo<S, R>;

function foo() {
    return {} as SubFoo<number, string>;
}


//// [declarationEmitTypeAliasWithTypeParameters6.js]
function foo() {
    return {};
}


//// [declarationEmitTypeAliasWithTypeParameters6.d.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>;
};
type SubFoo<R, S> = Foo<S, R>;
declare function foo(): SubFoo<number, string>;
