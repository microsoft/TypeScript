/// <reference path="../fourslash.ts"/>

// @Filename: /a/tsconfig.json
////{ "files": ["a.ts"] }

// @Filename: /a/a.ts
/////// <reference path="../b/b.ts" />
/////*1*/;

// @Filename: /b/tsconfig.json
////{ "files": ["b.ts"] }

// @Filename: /b/b.ts
/////*2*/;

verify.baselineFindAllReferences('1', '2')
