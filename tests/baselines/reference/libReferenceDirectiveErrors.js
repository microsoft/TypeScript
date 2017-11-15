//// [tests/cases/compiler/libReferenceDirectiveErrors.ts] ////

//// [a.ts]
/// <reference />
//// [b.ts]
/// <reference lib="" />
//// [c.ts]
/// <reference lib="es2015.foo" />
//// [d.ts]
/// <reference lib="es2015.collections" />
//// [e.ts]
/// <reference lib="lib.es2015.d.ts" />

//// [a.js]
/// <reference /> 
//// [b.js]
/// <reference lib="" /> 
//// [c.js]
/// <reference lib="es2015.foo" /> 
//// [d.js]
/// <reference lib="es2015.collections" /> 
//// [e.js]
/// <reference lib="lib.es2015.d.ts" /> 
