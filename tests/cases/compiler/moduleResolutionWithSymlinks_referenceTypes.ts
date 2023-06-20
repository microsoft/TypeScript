// Symlinks are always resolved for type reference directives.
// NOTE: This test would still compile without errors even if they were not,
// because `processTypeReferenceDirective` also checks for textual equivalence of file contents.
// But the `moduleResolutionWithSymlinks_referenceTypes.trace.json` shows the difference.

// @noImplicitReferences: true
// @traceResolution: true
// @fullEmitPaths: true

// @filename: /node_modules/@types/library-a/index.d.ts
// @symlink: /node_modules/@types/library-b/node_modules/@types/library-a/index.d.ts
declare class MyClass { private x: number; }

// @filename: /node_modules/@types/library-b/index.d.ts
/// <reference types="library-a" />

// @filename: /app.ts
/// <reference types="library-a" />
/// <reference types="library-b" />

// @filename: /tsconfig.json
{
    "compilerOptions": {
        // If this is its default of node_modules/@types,
        // node_modules/@types/library-a will be looked up be fore node_modules/@types/library-b/node_modules/@types/library-a
        "typeRoots": []
    }
}

/*
# To reproduce in a real project:

echo '/// <reference types="library-a" />' > app.ts
echo '/// <reference types="library-b" />' >> app.ts

mkdir node_modules/@types
cd mode_modules/@types
mkdir library-a
echo 'declare class MyClass { private x: number; }' > library-a/index.d.ts

mkdir library-b
cd library-b
echo '/// <reference types="library-a" />' > index.d.ts

mkdir node_modules
cd node_modules

ln -s ../../library-a ./library-a
# Windows: Open command prompt as administrator and run: `mklink /D library-a ..\..\library-a`

cd ../../.. # back to root

tsc app.ts # Should create `app.js`
*/
