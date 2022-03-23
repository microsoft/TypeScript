// @noTypesAndSymbols: true
// @noImplicitReferences: true

// @Filename: /other/tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "p1": ["./lib/p1"]
        }
    }
}

// @Filename: /other/lib/p1/index.d.ts
export { };
declare global {
    const foo: number;
}

// @Filename: /project/index.ts
/// <reference types="p1" />
foo;
