/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/a/tsconfig.json
////{ "files": ["a.ts"] }

// @Filename: /home/src/workspaces/project/a/a.ts
/////// <reference path="../b/b.ts" />
////const str: string = "hello/*1*/";

// @Filename: /home/src/workspaces/project/b/tsconfig.json
////{ "files": ["b.ts"] }

// @Filename: /home/src/workspaces/project/b/b.ts
////const str2: string = "hello/*2*/";

verify.baselineFindAllReferences('1', '2')
