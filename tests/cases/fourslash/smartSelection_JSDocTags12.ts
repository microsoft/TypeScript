/// <reference path="fourslash.ts" />

////type B = {};
////type A = {
////    a(/** Comment */ /*1*/p0: number, /** Comment */ /*2*/p1: number, /** Comment */ /*3*/p2: number): string;
////};

// https://github.com/microsoft/TypeScript/issues/49807
verify.baselineSmartSelection();
