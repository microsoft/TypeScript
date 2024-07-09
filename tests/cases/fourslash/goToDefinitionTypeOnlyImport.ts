/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////enum /*1*/SyntaxKind { SourceFile }
////export type { SyntaxKind }

// @Filename: /b.ts
//// export type { SyntaxKind } from './a';

// @Filename: /c.ts
////import type { SyntaxKind } from './b';
////let kind: [|/*2*/SyntaxKind|];


verify.baselineGoToDefinition("2");
