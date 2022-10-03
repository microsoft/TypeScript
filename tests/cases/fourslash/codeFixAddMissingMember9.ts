/// <reference path='fourslash.ts' />

////class C {
////    z: boolean = true;
////    method() {
////        const x = 0;
////        this.y(x, "a", this.z);
////    }
////}

verify.codeFix({
    index: 0,
    description: ignoreInterpolations(ts.Diagnostics.Declare_method_0),
    newFileContent:
`class C {
    z: boolean = true;
    method() {
        const x = 0;
        this.y(x, "a", this.z);
    }
    y(x: number, arg1: string, z: boolean) {
        throw new Error("Method not implemented.");
    }
}`,
});
