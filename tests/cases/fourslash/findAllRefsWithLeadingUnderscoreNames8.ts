/// <reference path='fourslash.ts' />

////(function [|__foo|]() {
////    [|__foo|]();
////})

verify.rangesReferenceEachOther();
