// @target: es2022,es2015
// @noTypesAndSymbols: true
// @lib: esnext
// @filename: /foo.ts

const PRIVATE_METADATA = new WeakMap();

function meta(key: string, value: string) {
    return (_, context) => {
        let metadata = PRIVATE_METADATA.get(context.metadata);

        if (!metadata) {
            metadata = {};
            PRIVATE_METADATA.set(context.metadata, metadata);
        }

        metadata[key] = value;
    };
}

@meta('a', 'x')
class C {
    @meta('b', 'y')
    m() { }
}

PRIVATE_METADATA.get(C[Symbol.metadata]).a; // 'x'
PRIVATE_METADATA.get(C[Symbol.metadata]).b; // 'y'
