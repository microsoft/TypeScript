// @isolatedDeclarations: true
// @strict: true
// @declaration: true
// @moduleResolution: nodenext
// @module: nodenext

// https://github.com/microsoft/TypeScript/issues/60192

import { Unresolved } from "foo";

export const foo1 = (type?: Unresolved): void => {};
export const foo2 = (type?: Unresolved | undefined): void => {};
export const foo3 = (type: Unresolved): void => {};
