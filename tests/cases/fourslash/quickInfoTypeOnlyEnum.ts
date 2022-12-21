/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export enum SyntaxKind {
////  SourceFile
////}

// @Filename: /b.ts
////import type { SyntaxKind } from './a';
////let x: SyntaxKind/*1*/;
////let y: SyntaxKind./*2*/SourceFile;

verify.quickInfoAt("1", [
  "(alias) enum SyntaxKind",
  "import SyntaxKind"
].join("\n"));

verify.quickInfoAt("2", "(enum member) SyntaxKind.SourceFile = 0");