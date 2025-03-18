//// [tests/cases/conformance/esDecorators/metadata/esDecoratorsMetadata1.ts] ////

//// [foo.ts]
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


//// [foo.js]
function meta(key, value) {
    return (_, context) => {
        context.metadata[key] = value;
    };
}
@meta('a', 'x')
class C {
    @meta('b', 'y')
    m() { }
}
C[Symbol.metadata].a;
C[Symbol.metadata].b;
