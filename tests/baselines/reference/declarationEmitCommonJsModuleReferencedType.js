//// [tests/cases/compiler/declarationEmitCommonJsModuleReferencedType.ts] ////

//// [index.d.ts]
export interface NestedProps {}
//// [index.d.ts]
export interface OtherIndexProps {}
//// [other.d.ts]
export interface OtherProps {}
//// [index.d.ts]
import { OtherProps } from "./other";
import { OtherIndexProps } from "./other/index";
import { NestedProps } from "nested";
export interface SomeProps {}

export function foo(): [SomeProps, OtherProps, OtherIndexProps, NestedProps];
//// [index.d.ts]
export interface RootProps {}

export function bar(): RootProps;
//// [entry.ts]
import { foo } from "foo";
import { bar } from "root";
export const x = foo();
export const y = bar();


//// [entry.js]
import { foo } from "foo";
import { bar } from "root";
export const x = foo();
export const y = bar();
