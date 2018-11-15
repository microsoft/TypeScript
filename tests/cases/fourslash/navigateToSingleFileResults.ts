/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////class Greeter {
////    [|public hello(name: string) { }|]
////}
////var x = new Greeter();
// @Filename: /b.ts
////class MyGreeter {
////    [|{| "containerName": "MyGreeter" |}public hello(name: string) { }|]
////}
////class MyOtherGreeter {
////    [|{| "containerName": "MyOtherGreeter" |}public hello(name: string) { }|]
////}

const [r0, r1, r2] = test.ranges();
const aTs: ReadonlyArray<FourSlashInterface.ExpectedNavigateToItem> = [
    { name: "hello", kind: "method", kindModifiers: "public", range: r0, containerName: "Greeter", containerKind: "class" },
];
const bTs: ReadonlyArray<FourSlashInterface.ExpectedNavigateToItem> = [r1, r2].map((range): FourSlashInterface.ExpectedNavigateToItem =>
    ({ name: "hello", kind: "method", kindModifiers: "public", range, containerName: range.marker.data.containerName, containerKind: "class" }));

verify.navigateTo(
    { pattern: "hello", expected: [...aTs, ...bTs] },
    { pattern: "hello", fileName: "/a.ts", expected: aTs },
    { pattern: "hello", fileName: "/b.ts", expected: bTs },
);
