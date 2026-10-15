//// [tests/cases/compiler/declarationEmitCommonJsModuleReferencedType.ts] ////

//// [index.d.ts]
export interface NestedProps {}
//// [index.d.ts]
export interface OtherIndexProps {}
//// [other.d.ts]
export interface OtherProps {}
//// [package.json]
{ "types": "main.d.ts" }
//// [main.d.ts]
export interface SubpkgProps {}
//// [index.d.ts]
import { OtherProps } from "./other";
import { OtherIndexProps } from "./other/index";
import { SubpkgProps } from "./subpkg/main";
import { NestedProps } from "nested";
export interface SomeProps {}

export function foo(): [SomeProps, OtherProps, OtherIndexProps, SubpkgProps, NestedProps];
//// [index.d.ts]
export interface RootProps {}

export function bar(): RootProps;
//// [entry.ts]
import { foo } from "foo";
import { bar } from "root";
export const x = foo();
export const y = bar();


//// [entry.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
const foo_1 = require("foo");
const root_1 = require("root");
exports.x = (0, foo_1.foo)();
exports.y = (0, root_1.bar)();
