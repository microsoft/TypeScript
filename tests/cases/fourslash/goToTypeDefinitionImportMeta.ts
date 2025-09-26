/// <reference path='fourslash.ts' />

// @module: esnext
// @Filename: foo.ts
/////// <reference path='./bar.d.ts' />
////import.me/*reference*/ta;

//@Filename: bar.d.ts
////interface /*definition*/ImportMeta {
////}

verify.baselineGoToType("reference");
