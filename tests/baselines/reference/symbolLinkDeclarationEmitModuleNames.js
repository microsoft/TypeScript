//// [tests/cases/compiler/symbolLinkDeclarationEmitModuleNames.ts] ////

//// [application.ts]
import { Constructor } from "@loopback/context";
export type ControllerClass = Constructor<any>;
//// [usage.ts]
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';

export const CONTROLLER_CLASS = BindingKey.create<ControllerClass>(null as any); // line in question
//// [value-promise.ts]
export type Constructor<T> = (...args: any[]) => T;
//// [bindingkey.ts]
import { Constructor } from "@loopback/context"
export class BindingKey<T> {
  readonly __type: T;
  static create<T extends Constructor<any>>(ctor: T) {
    return new BindingKey<T>();
  }
}

//// [index.ts]
export * from "./src/value-promise";
export * from "./src/bindingkey";


//// [value-promise.js]
export {};
//// [bindingkey.js]
export class BindingKey {
    static create(ctor) {
        return new BindingKey();
    }
}
//// [index.js]
export * from "./src/value-promise";
export * from "./src/bindingkey";
//// [application.js]
export {};
//// [usage.js]
import { BindingKey } from '@loopback/context';
export const CONTROLLER_CLASS = BindingKey.create(null); // line in question


//// [value-promise.d.ts]
export type Constructor<T> = (...args: any[]) => T;
//// [bindingkey.d.ts]
import { Constructor } from "@loopback/context";
export declare class BindingKey<T> {
    readonly __type: T;
    static create<T extends Constructor<any>>(ctor: T): BindingKey<T>;
}
//// [index.d.ts]
export * from "./src/value-promise";
export * from "./src/bindingkey";
//// [application.d.ts]
import { Constructor } from "@loopback/context";
export type ControllerClass = Constructor<any>;
//// [usage.d.ts]
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';
export declare const CONTROLLER_CLASS: BindingKey<ControllerClass>;
