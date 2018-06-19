// @declaration: true
// @filename: r/node_modules/foo/node_modules/nested/index.d.ts
export interface NestedProps {}
// @filename: r/node_modules/foo/other/index.d.ts
export interface OtherIndexProps {}
// @filename: r/node_modules/foo/other.d.ts
export interface OtherProps {}
// @filename: r/node_modules/foo/index.d.ts
import { OtherProps } from "./other";
import { OtherIndexProps } from "./other/index";
import { NestedProps } from "nested";
export interface SomeProps {}

export function foo(): [SomeProps, OtherProps, OtherIndexProps, NestedProps];
// @filename: node_modules/root/index.d.ts
export interface RootProps {}

export function bar(): RootProps;
// @filename: r/entry.ts
import { foo } from "foo";
import { bar } from "root";
export const x = foo();
export const y = bar();
