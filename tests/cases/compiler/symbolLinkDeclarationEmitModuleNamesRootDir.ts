// @currentDirectory: /monorepo/core
// @filename: /monorepo/context/src/value-promise.d.ts
export type Constructor<T> = (...args: any[]) => T;
// @filename: /monorepo/context/src/bindingkey.d.ts
import { Constructor } from "./value-promise"
export declare class BindingKey<T> {
  readonly __type: T;
  static create<T extends Constructor<any>>(ctor: T): BindingKey<T>;
}

// @filename: /monorepo/context/index.d.ts
export * from "./src/value-promise";
export * from "./src/bindingkey";

// @filename: /monorepo/core/tsconfig.json
{
  "compilerOptions": {
    "rootDir": ".",
    "declaration": true,
    "outDir": "./dist"
  }
}
// @filename: /monorepo/core/src/application.ts
import { Constructor } from "@loopback/context";
export type ControllerClass = Constructor<any>;

// @filename: /monorepo/core/src/usage.ts
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';

export const CONTROLLER_CLASS = BindingKey.create<ControllerClass>(null as any); // line in question

// @link: /monorepo/context -> /monorepo/core/node_modules/@loopback/context