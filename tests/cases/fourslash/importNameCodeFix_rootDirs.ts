/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const a = 0;

// @Filename: /b.ts
////a;

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "baseUrl": ".",
////        "rootDirs": ["."]
////    }
////}

const nonRelative = 'import { a } from "a";\n\na;';
const relative = nonRelative.replace('"a"', '"./a"');

goTo.file("/b.ts");
verify.importFixAtPosition([nonRelative]);
verify.importFixAtPosition([nonRelative], undefined, { importModuleSpecifierPreference: "non-relative" });
verify.importFixAtPosition([relative], undefined, { importModuleSpecifierPreference: "relative" });
