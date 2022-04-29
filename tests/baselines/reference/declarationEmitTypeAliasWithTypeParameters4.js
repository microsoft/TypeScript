//// [declarationEmitTypeAliasWithTypeParameters4.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>
};
type SubFoo<R> = Foo<string, R>;

function foo() {
    return {} as SubFoo<number>;
}


//// [declarationEmitTypeAliasWithTypeParameters4.js]
function foo() {
    return {};
}


//// [declarationEmitTypeAliasWithTypeParameters4.d.ts]
declare type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>;
};
declare type SubFoo<R> = Foo<string, R>;
declare function foo(): SubFoo<number>;
