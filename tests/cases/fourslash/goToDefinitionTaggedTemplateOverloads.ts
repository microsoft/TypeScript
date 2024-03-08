/// <reference path='fourslash.ts' />

////function /*defFNumber*/f(strs: TemplateStringsArray, x: number): void;
////function /*defFBool*/f(strs: TemplateStringsArray, x: boolean): void;
////function f(strs: TemplateStringsArray, x: number | boolean) {}
////
////[|/*useFNumber*/f|]`${0}`;
////[|/*useFBool*/f|]`${false}`;

verify.baselineGoToDefinition(
    "useFNumber",
    "useFBool"
);
