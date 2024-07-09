/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export class ReadonlyArray<T> {}

// @Filename: /b.ts
////[|new ReadonlyArray<string>();|]

goTo.file("/b.ts");
verify.importFixAtPosition([
`import { ReadonlyArray } from "./a";

new ReadonlyArray<string>();`,
]);
