/// <reference path='fourslash.ts' />

//// class C {}
//// function f(v: number): void { }
//// f(new C().add(1, 2))

verify.codeFix({
    index: 0,
    description: ignoreInterpolations(ts.Diagnostics.Declare_method_0),
    newFileContent:
`class C {
    add(arg0: number, arg1: number): number {
        throw new Error("Method not implemented.");
    }
}
function f(v: number): void { }
f(new C().add(1, 2))`,
});
