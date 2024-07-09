///<reference path="fourslash.ts" />

// @module: esnext
// @Filename: foo.ts
/////// <reference no-default-lib="true"/>
/////// <reference path='./bar.d.ts' />
////im/*1*/port.me/*2*/ta;

//@Filename: bar.d.ts
/////**
//// * The type of `import.meta`.
//// *
//// * If you need to declare that a given property exists on `import.meta`,
//// * this type may be augmented via interface merging.
//// */
//// interface ImportMeta {
////}

verify.baselineQuickInfo()
