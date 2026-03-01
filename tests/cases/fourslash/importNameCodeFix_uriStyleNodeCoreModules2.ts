/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/@types/node/index.d.ts
//// declare module "fs" { function writeFile(): void }
//// declare module "fs/promises" { function writeFile(): Promise<void> }
//// declare module "node:fs" { export * from "fs"; }
//// declare module "node:fs/promises" { export * from "fs/promises"; }

// @Filename: /other.ts
//// import "node:fs/promises";

// @Filename: /index.ts
//// writeFile/**/

verify.importFixModuleSpecifiers("", ["node:fs", "node:fs/promises"]);

goTo.file("/other.ts");
edit.replaceLine(0, "\n");

goTo.file("/index.ts");
verify.importFixModuleSpecifiers("", ["fs", "fs/promises", "node:fs", "node:fs/promises"]);

goTo.file("/other.ts");
edit.replaceLine(0, `import "node:fs/promises";\n`);

goTo.file("/index.ts");
verify.importFixModuleSpecifiers("", ["node:fs", "node:fs/promises"]);
