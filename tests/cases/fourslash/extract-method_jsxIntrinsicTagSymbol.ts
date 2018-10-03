/// <reference path='fourslash.ts' />

// @Filename: /a.tsx

// Test that we don't get `unknownSymbol`, which causes a crash when we try getting its declarations.

/////*a*/<div></div>/*b*/

goTo.select("a", "b");
verify.refactorAvailable("Extract Symbol", "constant_scope_0");
