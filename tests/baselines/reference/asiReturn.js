//// [tests/cases/compiler/asiReturn.ts] ////

//// [asiReturn.ts]
// This should be an error for using a return outside a function, but ASI should work properly
return

//// [asiReturn.js]
// This should be an error for using a return outside a function, but ASI should work properly
return;
