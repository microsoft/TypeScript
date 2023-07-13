// @target: es2022,es2015
// @noTypesAndSymbols: true
// @lib: esnext
// @filename: /foo.ts

function appendMeta(key: string, value: string) {
    return (_, context) => {
        const existing = context.metadata[key] ?? [];
        context.metadata[key] = [...existing, value];
    };
}

@appendMeta('a', 'x')
class C {
}

@appendMeta('a', 'z')
class D extends C {
}

C[Symbol.metadata].a; // ['x']
D[Symbol.metadata].a; // ['x', 'z']
