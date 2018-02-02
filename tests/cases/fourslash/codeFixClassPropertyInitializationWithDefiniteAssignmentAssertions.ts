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
////
////     e: number | string;
////
////     foo: T;
//// }

verify.codeFixAll({
    fixId: "addMissingDefiniteAssignmentAssertions",
    newFileContent: `class T {
    a!: string;

    static b: string;

    private c!: string;

    d: number | undefined;

    e!: number | string;

    foo!: T;
}`,
});
