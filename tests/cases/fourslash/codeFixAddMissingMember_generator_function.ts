/// <reference path='fourslash.ts' />

////class C {
////    *method() {
////        yield* this.y();
////    }
////}

verify.codeFix({
    index: 0,
    description: ignoreInterpolations(ts.Diagnostics.Declare_method_0),
    newFileContent:
        `class C {
    *method() {
        yield* this.y();
    }
    *y() {
        throw new Error("Method not implemented.");
    }
}`,
});
