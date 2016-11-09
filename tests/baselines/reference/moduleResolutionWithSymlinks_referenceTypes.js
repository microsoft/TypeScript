//// [tests/cases/compiler/moduleResolutionWithSymlinks_referenceTypes.ts] ////

//// [index.d.ts]
// Symlinks are always resolved for type reference directives.
// NOTE: This test would still compile without errors even if they were not,
// because `processTypeReferenceDirective` also checks for textual equivalence of file contents.
// But the `moduleResolutionWithSymlinks_referenceTypes.trace.json` shows the difference.


declare class MyClass { private x: number; }

//// [index.d.ts]
/// <reference types="library-a" />

//// [app.ts]
/// <reference types="library-a" />
/// <reference types="library-b" />

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


//// [/app.js]
/// <reference types="library-a" />
/// <reference types="library-b" />
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
