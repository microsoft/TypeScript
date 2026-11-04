//// [tests/cases/compiler/contentMapperOutputExtensionsTypeOnlyUnsafeRewrite.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [index.ts]
export interface Props { title: string }

//// [index.ts]
export interface NativeProps { title: string }

//// [actual.astro]
const __VERSION = "1.0.0";
export interface ActualProps { title: string }

//// [ambient.d.astro.ts]
export interface AmbientProps { title: string }

//// [existing.d.ts]
export declare const existing: import("./components.astro").Props;

//// [main.ts]
export type { Props } from "./components.astro";
export type * from "./components.astro";
export type * as Namespace from "./components.astro";
export { type Props as InlineProps } from "./components.astro";
import type { Props as ImportedProps } from "./components.astro";
export type Alias = ImportedProps;
import { type Props as InlineImportedProps } from "./components.astro";
export type InlineAlias = InlineImportedProps;
export type ImportType = import("./components.astro").Props;
export declare const props: import("./components.astro").Props;
export type { AmbientProps } from "./ambient.astro";
export type NativeImportType = import("./native.ts").NativeProps;
export type { ActualProps } from "./actual.astro";
import type { ActualProps } from "./actual.astro";
export type ActualAlias = ActualProps;
export type ActualImportType = import("./actual.astro").ActualProps;
export declare const actualProps: import("./actual.astro").ActualProps;


//// [index.js]
//// [index.js]
//// [main.js]
