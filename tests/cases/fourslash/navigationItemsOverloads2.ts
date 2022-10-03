/// <reference path="fourslash.ts"/>

////interface I {
////    [|interfaceMethodSignature(a: string): boolean;|]
////    interfaceMethodSignature(b: number): boolean;
////    interfaceMethodSignature(f: I): boolean;
////}
////interface I {
////    [|interfaceMethodSignature(b: boolean): boolean;|]
////}

verify.navigateTo({
    pattern: "interfaceMethodSignature",
    expected: test.ranges().map(range =>
        ({ name: "interfaceMethodSignature", kind: "method", range, containerName: "I", containerKind: "interface" })),
});
