/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
////{ "compilerOptions": { "baseUrl": "./src" } }

// @Filename: /src/d0/d1/d2/file.ts
////foo/**/;

// @Filename: /src/d0/a.ts
////export const foo = 0;

goTo.file("/src/d0/d1/d2/file.ts");
verify.importFixAtPosition([
`import { foo } from "d0/a";

foo;`
]);
