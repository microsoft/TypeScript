/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /x/y.ts
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

goTo.file("/x/y.ts");
verify.importFixAtPosition([
`import { foo } from "@root/a";

foo;`,
]);
