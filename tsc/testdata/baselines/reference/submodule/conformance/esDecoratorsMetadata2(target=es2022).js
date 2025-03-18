//// [tests/cases/conformance/esDecorators/metadata/esDecoratorsMetadata2.ts] ////

//// [foo.ts]
function meta(key: string, value: string) {
    return (_, context) => {
        context.metadata[key] = value;
    };
}

@meta('a', 'x')
class C {
    @meta('b', 'y')
    m() {}
}

C[Symbol.metadata].a; // 'x'
C[Symbol.metadata].b; // 'y'

class D extends C {
    @meta('b', 'z')
    m() {}
}

D[Symbol.metadata].a; // 'x'
D[Symbol.metadata].b; // 'z'


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
class D extends C {
    @meta('b', 'z')
    m() { }
}
D[Symbol.metadata].a;
D[Symbol.metadata].b;
