/// <reference path='fourslash.ts' />

////class C {
////    /**
////     * @return {...*}
////     */
////    m(x) {
////    }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`class C {
    /**
     * @return {...*}
     */
    m(x): any[] {
    }
}`,
});
