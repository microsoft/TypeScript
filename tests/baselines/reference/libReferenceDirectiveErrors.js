//// [tests/cases/compiler/libReferenceDirectiveErrors.ts] ////

//// [a.ts]
/// <reference />
//// [b.ts]
/// <reference lib="" />
//// [c.ts]
/// <reference lib="es2015.foo" />
//// [d.ts]
/// <reference lib="es2015.collections" />

//// [a.js]
/// <reference /> 
//// [b.js]
/// <reference lib="" /> 
//// [c.js]
/// <reference lib="es2015.foo" /> 
//// [d.js]
/// <reference lib="es2015.collections" /> 
