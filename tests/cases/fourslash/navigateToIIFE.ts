/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////(function () {
////    "use strict";
////    [|function onResume() {
////    }|];
////} )();
// @Filename: /b.ts
////class EventManager {
////    [|{| "containerName": "EventManager" |}public onResume(name: string) { }|]
////}
////class MyOtherEventManager {
////    [|{| "containerName": "MyOtherEventManager" |}public onResume(name: string) { }|]
////}

const [r0, r1, r2] = test.ranges();
const aTs: ReadonlyArray<FourSlashInterface.ExpectedNavigateToItem> = [{ name: "onResume", kind: "function", range: r0 }];
const bTs: ReadonlyArray<FourSlashInterface.ExpectedNavigateToItem> = [r1, r2].map((range): FourSlashInterface.ExpectedNavigateToItem =>
    ({ name: "onResume", kind: "method", kindModifiers: "public", range, containerName: range.marker.data.containerName, containerKind: "class" }));

verify.navigateTo(
    { pattern: "onResume", expected: [...aTs, ...bTs] },
    { pattern: "onResume", fileName: "/a.ts", expected: aTs },
    { pattern: "onResume", fileName: "/b.ts", expected: bTs },
);
