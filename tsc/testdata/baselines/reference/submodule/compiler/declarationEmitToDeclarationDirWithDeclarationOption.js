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


error TS5011: The common source directory of 'tsconfig.json' is '../.src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.


!!! error TS5011: The common source directory of 'tsconfig.json' is '../.src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
!!! error TS5011:   Visit https://aka.ms/ts6 for migration information.
==== /foo/tsconfig.json (0 errors) ====
    {
        "compilerOptions": { "declaration": true, "declarationDir": "out", "module": "commonjs", "target": "es2015" }
    }
    