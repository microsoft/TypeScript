/// <reference path="fourslash.ts" />

////{
////    /*1*/export const /*2*/x = 0;
////    /*3*/x;
////}

verify.baselineFindAllReferences('1', '2', '3');
