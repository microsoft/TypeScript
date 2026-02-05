/// <reference path='fourslash.ts' />

// @strict: false
////class C {
////    /**
////     * @return {...*}
////     */
////    m(x) {
////        return [x];
////    }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`class C {
    /**
     * @return {...*}
     */
    m(x): any[] {
        return [x];
    }
}`,
});
