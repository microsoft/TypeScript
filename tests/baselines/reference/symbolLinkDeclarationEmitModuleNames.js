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
"use strict";
exports.__esModule = true;
//// [bindingkey.js]
"use strict";
exports.__esModule = true;
var BindingKey = /** @class */ (function () {
    function BindingKey() {
    }
    BindingKey.create = function (ctor) {
        return new BindingKey();
    };
    return BindingKey;
}());
exports.BindingKey = BindingKey;
//// [index.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(require("./src/bindingkey"));
//// [application.js]
"use strict";
exports.__esModule = true;
//// [usage.js]
"use strict";
exports.__esModule = true;
var context_1 = require("@loopback/context");
exports.CONTROLLER_CLASS = context_1.BindingKey.create(null); // line in question


//// [value-promise.d.ts]
export declare type Constructor<T> = (...args: any[]) => T;
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
export declare type ControllerClass = Constructor<any>;
//// [usage.d.ts]
import { BindingKey } from '@loopback/context';
export declare const CONTROLLER_CLASS: BindingKey<import("@loopback/context/src/value-promise").Constructor<any>>;


//// [DtsFileErrors]


tests/cases/compiler/monorepo/context/src/bindingkey.d.ts(1,29): error TS2307: Cannot find module '@loopback/context'.
tests/cases/compiler/monorepo/core/src/application.d.ts(1,29): error TS2307: Cannot find module '@loopback/context'.
tests/cases/compiler/monorepo/core/src/usage.d.ts(1,28): error TS2307: Cannot find module '@loopback/context'.
tests/cases/compiler/monorepo/core/src/usage.d.ts(2,51): error TS2307: Cannot find module '@loopback/context/src/value-promise'.


==== tests/cases/compiler/monorepo/core/src/application.d.ts (1 errors) ====
    import { Constructor } from "@loopback/context";
                                ~~~~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module '@loopback/context'.
    export declare type ControllerClass = Constructor<any>;
    
==== tests/cases/compiler/monorepo/core/src/usage.d.ts (2 errors) ====
    import { BindingKey } from '@loopback/context';
                               ~~~~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module '@loopback/context'.
    export declare const CONTROLLER_CLASS: BindingKey<import("@loopback/context/src/value-promise").Constructor<any>>;
                                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module '@loopback/context/src/value-promise'.
    
==== /.src/tests/cases/compiler/monorepo/context/src/value-promise.d.ts (0 errors) ====
    export declare type Constructor<T> = (...args: any[]) => T;
    
==== /.src/tests/cases/compiler/monorepo/context/src/bindingkey.d.ts (1 errors) ====
    import { Constructor } from "@loopback/context";
                                ~~~~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module '@loopback/context'.
    export declare class BindingKey<T> {
        readonly __type: T;
        static create<T extends Constructor<any>>(ctor: T): BindingKey<T>;
    }
    
==== /.src/tests/cases/compiler/monorepo/context/index.d.ts (0 errors) ====
    export * from "./src/value-promise";
    export * from "./src/bindingkey";
    