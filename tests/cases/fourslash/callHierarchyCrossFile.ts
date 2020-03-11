/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export function /**/createModelReference() {}

// @filename: /b.ts
////import { createModelReference } from "./a";
////function openElementsAtEditor() {
////  createModelReference();
////}

// @filename: /c.ts
////import { createModelReference } from "./a";
////function registerDefaultLanguageCommand() {
////  createModelReference();
////}

goTo.marker();
verify.baselineCallHierarchy();
