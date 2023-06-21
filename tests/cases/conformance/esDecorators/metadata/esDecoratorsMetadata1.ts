// @target: es2022,es2015
// @noTypesAndSymbols: true
// @lib: esnext
// @filename: /foo.ts

function meta(key: string, value: string) {
    return (_, context) => {
        context.metadata[key] = value;
    };
}

@meta('a', 'x')
class C {
    @meta('b', 'y')
    m() { }
}

C[Symbol.metadata].a; // 'x'
C[Symbol.metadata].b; // 'y'
