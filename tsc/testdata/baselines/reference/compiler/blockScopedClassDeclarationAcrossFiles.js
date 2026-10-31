//// [tests/cases/compiler/blockScopedClassDeclarationAcrossFiles.ts] ////

//// [c.ts]
let foo: typeof C;
//// [b.ts]
class C { }


//// [c.js]
"use strict";
let foo;
//// [b.js]
"use strict";
class C {
}
