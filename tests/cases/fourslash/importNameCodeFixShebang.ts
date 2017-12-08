/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////[|#!/usr/bin/env node
////foo/**/|]

goTo.file("/a.ts");
goTo.file("/b.ts");

verify.importFixAtPosition([
`#!/usr/bin/env node
import { foo } from "./a";

foo`,
]);
