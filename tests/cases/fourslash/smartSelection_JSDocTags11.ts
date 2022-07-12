/// <reference path="fourslash.ts" />

////const x = 1;
////type Foo = {
////  /** comment */
////  /*2*/readonly /*1*/status: number;
////};

// https://github.com/microsoft/TypeScript/issues/39618
verify.baselineSmartSelection();
