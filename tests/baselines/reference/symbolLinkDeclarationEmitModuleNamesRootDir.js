//// [tests/cases/compiler/symbolLinkDeclarationEmitModuleNamesRootDir.ts] ////

//// [value-promise.d.ts]
export type Constructor<T> = (...args: any[]) => T;
//// [bindingkey.d.ts]
import { Constructor } from "./value-promise"
export declare class BindingKey<T> {
  readonly __type: T;
  static create<T extends Constructor<any>>(ctor: T): BindingKey<T>;
}

//// [index.d.ts]
export * from "./src/value-promise";
export * from "./src/bindingkey";

//// [application.ts]
import { Constructor } from "@loopback/context";
export type ControllerClass = Constructor<any>;

//// [usage.ts]
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';

export const CONTROLLER_CLASS = BindingKey.create<ControllerClass>(null as any); // line in question


//// [application.js]
"use strict";
exports.__esModule = true;
//// [usage.js]
"use strict";
exports.__esModule = true;
exports.CONTROLLER_CLASS = void 0;
var context_1 = require("@loopback/context");
exports.CONTROLLER_CLASS = context_1.BindingKey.create(null); // line in question


//// [application.d.ts]
import { Constructor } from "@loopback/context";
export declare type ControllerClass = Constructor<any>;
//// [usage.d.ts]
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';
export declare const CONTROLLER_CLASS: BindingKey<ControllerClass>;
