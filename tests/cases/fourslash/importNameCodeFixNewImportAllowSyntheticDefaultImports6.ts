/// <reference path="fourslash.ts" />
// @esModuleInterop: true
// @target: es5

// @Filename: size.ts
////declare function size(): void;
////export = size;

// @Filename: index.ts
////size

goTo.file("index.ts");
verify.importFixAtPosition([
  `import size from "./size";

size`
]);