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
"use strict";
exports.__esModule = true;
var foo_1 = require("foo");
var root_1 = require("root");
exports.x = foo_1.foo();
exports.y = root_1.bar();


//// [entry.d.ts]
export declare const x: [import("foo").SomeProps, import("foo/other").OtherProps, import("foo/other/index").OtherIndexProps, import("foo/node_modules/nested").NestedProps];
export declare const y: import("root").RootProps;
