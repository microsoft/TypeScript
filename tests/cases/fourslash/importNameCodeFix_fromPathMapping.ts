/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////foo;

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "paths": {
////            "@root/*": ["*"],
////        }
////    }
////}

goTo.file("/b.ts");
verify.importFixAtPosition([
`import { foo } from "@root/a";

foo;`,
]);
