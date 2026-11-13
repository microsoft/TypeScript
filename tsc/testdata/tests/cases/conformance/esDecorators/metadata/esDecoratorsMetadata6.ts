// @strict: false
// @target: es2022,es2015
// @noTypesAndSymbols: true
// @lib: esnext
// @filename: /foo.ts

// The parent metadata object of a class whose superclass is `null` is `null`.
// Reading `Symbol.metadata` from the superclass must not throw.

function meta(key: string, value: string) {
    return (_, context) => {
        context.metadata[key] = value;
    };
}

@meta('a', 'x')
class C extends null {
}

declare const maybeBase: (new () => object) | null;

@meta('b', 'y')
class D extends maybeBase {
}

C[Symbol.metadata].a; // 'x'
D[Symbol.metadata].b; // 'y'
