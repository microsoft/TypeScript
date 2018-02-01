/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string;
////
////     static b: string;
////
////     private c: string;
////
////     d: number | undefined;
//// }

verify.codeFixAll({
    fixId: "addMissingUndefinedType",
    newFileContent: `class T {
    a: string | undefined;

    static b: string;

    private c: string | undefined;

    d: number | undefined;
}`,
});
