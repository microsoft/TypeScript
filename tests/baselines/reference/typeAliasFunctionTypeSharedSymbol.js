//// [tests/cases/compiler/typeAliasFunctionTypeSharedSymbol.ts] ////

//// [typeAliasFunctionTypeSharedSymbol.ts]
// Repro from comment in #21496

function Mixin<TBase extends {new (...args: any[]): {}}>(Base: TBase) {
    return class extends Base {
    };
}

type Mixin = ReturnTypeOf<typeof Mixin>

type ReturnTypeOf<V> = V extends (...args: any[])=>infer R ? R : never;

type Crashes = number & Mixin;


//// [typeAliasFunctionTypeSharedSymbol.js]
// Repro from comment in #21496
function Mixin(Base) {
    return class extends Base {
    };
}
