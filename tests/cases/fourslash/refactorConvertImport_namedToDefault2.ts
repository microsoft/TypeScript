/// <reference path="fourslash.ts" />

// @esModuleInterop: true
// @allowJs: true
// @checkJs: true

// @Filename: /process.d.ts
////declare module "process" {
////    interface Process {
////        pid: number;
////        addListener(event: string, listener: (...args: any[]) => void): void;
////    }
////    var process: Process;
////    export = process;
////}

// @Filename: /a.js
/////** [|@import { pid, addListener } from "process"|] */

goTo.selectRange(test.ranges()[0]);
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert named imports to default import",
    actionDescription: "Convert named imports to default import",
    newContent: `/** @import process from "process" */`,
});
