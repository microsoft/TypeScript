//// [tests/cases/compiler/module_augmentUninstantiatedModule2.ts] ////

//// [app.ts]
import ng = require("angular");
import "./moduleAugmentation";

var x: number = ng.getNumber();

//// [moduleAugmentation.ts]
import * as ng from "angular"
declare module "angular" {
    export interface IAngularStatic {
        getNumber: () => number;
    }
}

//// [index.d.ts]
declare var ng: ng.IAngularStatic;

declare module ng {
   export interface IModule {
      name: string;
   }

   export interface IAngularStatic {
       module: (s: string) => IModule;
   }
}

export = ng;



//// [moduleAugmentation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ng = require("angular");
require("./moduleAugmentation");
var x = ng.getNumber();
