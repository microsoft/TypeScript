//// [tests/cases/compiler/declarationEmitToDeclarationDirWithDeclarationOption.ts] ////

//// [test.ts]
interface Foo {
    x: number;
}
export default Foo;


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [test.d.ts]
interface Foo {
    x: number;
}
export default Foo;


//// [DtsFileErrors]


message TS6042: No actionable task. Add 'composite': true, valid 'references', or use 'tsc -b'.


!!! message TS6042: No actionable task. Add 'composite': true, valid 'references', or use 'tsc -b'.
==== /foo/tsconfig.json (0 errors) ====
    {
        "compilerOptions": {
          "declaration": true,
          "declarationDir": "out"
        }
      }
    