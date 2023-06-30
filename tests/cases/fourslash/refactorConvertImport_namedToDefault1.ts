/// <reference path="fourslash.ts" />

// @esModuleInterop: true

// @Filename: /process.d.ts
//// declare module "process" {
////   interface Process {
////     pid: number;
////     addListener(event: string, listener: (...args: any[]) => void): void;
////   }
////   var process: Process;
////   export = process;
//// }

// @Filename: /url.d.ts
//// declare module "url" {
////   export function parse(urlStr: string): any;
//// }

// @Filename: /index.ts
//// [|import { pid, addListener } from "process";|]
//// addListener("message", (m) => {
////   console.log(pid);
//// });

// @Filename: /a.ts
//// [|import { parse } from "url";|]
//// parse("https://www.typescriptlang.org");

goTo.selectRange(test.ranges()[0]);
edit.applyRefactor({
  refactorName: "Convert import",
  actionName: "Convert named imports to default import",
  actionDescription: "Convert named imports to default import",
  newContent: `import process from "process";
process.addListener("message", (m) => {
  console.log(process.pid);
});`,
});
verify.not.refactorAvailable("Convert import", "Convert named imports to namespace import");

goTo.selectRange(test.ranges()[1]);
edit.applyRefactor({
  refactorName: "Convert import",
  actionName: "Convert named imports to namespace import",
  actionDescription: "Convert named imports to namespace import",
  newContent: `import * as url from "url";
url.parse("https://www.typescriptlang.org");`,
});
verify.not.refactorAvailable("Convert import", "Convert named imports to default import");