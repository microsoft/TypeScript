// @noLib: true

/// <reference path='fourslash.ts'/>

// @module: esnext
// @Filename: foo.ts
/////// <reference no-default-lib="true"/>
/////// <reference path='./bar.d.ts' />
////import./**/meta;
////import.[|meta|];

//@Filename: bar.d.ts
////interface ImportMeta {
////}

// @Filename: baz.ts
/////// <reference no-default-lib="true"/>
/////// <reference path='./bar.d.ts' />
////let x = import
////  .  // hai :)
////    meta;

verify.baselineFindAllReferences("");

goTo.rangeStart(test.ranges()[0]);
verify.renameInfoFailed();
