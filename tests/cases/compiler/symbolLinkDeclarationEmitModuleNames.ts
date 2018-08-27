// @declaration: true
// @filename: monorepo/core/src/application.ts
import { Constructor } from "@loopback/context";
export type ControllerClass = Constructor<any>;
// @filename: monorepo/core/src/usage.ts
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';

export const CONTROLLER_CLASS = BindingKey.create<ControllerClass>(null as any); // line in question
// @filename: monorepo/context/src/value-promise.ts
export type Constructor<T> = (...args: any[]) => T;
// @filename: monorepo/context/src/bindingkey.ts
import { Constructor } from "@loopback/context"
export class BindingKey<T> {
  readonly __type: T;
  static create<T extends Constructor<any>>(ctor: T) {
    return new BindingKey<T>();
  }
}

// @filename: monorepo/context/index.ts
export * from "./src/value-promise";
export * from "./src/bindingkey";

// @link: tests/cases/compiler/monorepo/context -> tests/cases/compiler/monorepo/node_modules/@loopback/context