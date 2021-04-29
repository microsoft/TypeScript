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
exports.y = exports.x = void 0;
var foo_1 = require("foo");
var root_1 = require("root");
exports.x = (0, foo_1.foo)();
exports.y = (0, root_1.bar)();
