/// <reference path="fourslash.ts" />

// @Filename: quickInfoImportedTypesWithMergedMeanings.ts
//// export namespace Original { }
//// export type Original<T> = () => T;
//// /** some docs */
//// export function Original() { }

// @Filename: transient.ts
//// export { Original/*1*/ } from './quickInfoImportedTypesWithMergedMeanings';

// @Filename: importer.ts
//// import { Original as Alias } from './quickInfoImportedTypesWithMergedMeanings';
//// Alias/*2*/;

verify.quickInfoAt("1", [
    "(alias) function Original(): void",
    "(alias) type Original<T> = () => T",
    "(alias) namespace Original",
    "import Original",
].join("\n"), "some docs ");

verify.quickInfoAt("2", [
    "(alias) function Alias(): void",
    "(alias) type Alias<T> = () => T",
    "(alias) namespace Alias",
    "import Alias",
].join("\n"), "some docs ");
