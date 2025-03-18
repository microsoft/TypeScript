//// [tests/cases/conformance/esDecorators/metadata/esDecoratorsMetadata3.ts] ////

//// [foo.ts]
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


//// [foo.js]
function appendMeta(key, value) {
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
C[Symbol.metadata].a;
D[Symbol.metadata].a;
