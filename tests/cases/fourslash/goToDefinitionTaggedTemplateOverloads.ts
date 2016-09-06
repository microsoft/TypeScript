/// <reference path='fourslash.ts' />

/////*defFNumber*/function f(strs: TemplateStringsArray, x: number): void;
/////*defFBool*/function f(strs: TemplateStringsArray, x: boolean): void;
////function f(strs: TemplateStringsArray, x: number | boolean) {}
////
/////*useFNumber*/f`${0}`;
/////*useFBool*/f`${false}`;

verify.goToDefinition({
    useFNumber: "defFNumber",
    useFBool: "defFBool"
});
