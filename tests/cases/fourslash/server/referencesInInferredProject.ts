/// <reference path="../fourslash.ts"/>

// @Filename: /tsconfig.json
////{ }

// @Filename: /proj/tsconfig.json
////{
////    "compilerOptions": {
////        "composite": true,
////    },
////    "exclude": ["**/__test__/"]
////}

// @Filename: /proj/a.ts
////export const /*1*/x = 1;

// @Filename: /proj/__test__/a.test.ts
////import { x } from "../a";
////x.toString();

// Open both source files
//   The test file will be in an inferred project, since its default project excludes it
//   The product file will be in both its default configured project and the inferred project for the test file
goTo.file("/proj/a.ts");
goTo.file("/proj/__test__/a.test.ts");
// FAR will cause the root tsconfig to be loaded (since the LS happens to know about it and it could contain references),
// which will *remove* both files from the inferred project, invalidating any references attributed to that project
verify.baselineFindAllReferences('1')
