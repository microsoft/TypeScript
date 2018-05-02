/// <reference path="fourslash.ts" />

// @moduleResolution: classic

// @Filename: /node_modules/@types/foo/index.d.ts
////export const xyz: number;

// @Filename: /a.ts
////[|xyz|]

goTo.file("/a.ts");
verify.importFixAtPosition([
`import { xyz } from "foo";

xyz`
]);
