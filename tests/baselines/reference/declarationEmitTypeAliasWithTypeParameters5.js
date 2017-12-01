//// [declarationEmitTypeAliasWithTypeParameters5.ts]
type Foo<T, Y> = {
    foo<U, J>(): Foo<U, J>
};
export type SubFoo<R> = Foo<string, R>;

function foo() {
    return {} as SubFoo<number>;
}


//// [declarationEmitTypeAliasWithTypeParameters5.js]
"use strict";
exports.__esModule = true;
function foo() {
    return {};
}
