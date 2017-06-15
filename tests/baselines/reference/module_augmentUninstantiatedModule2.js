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
exports.__esModule = true;
//// [app.js]
"use strict";
exports.__esModule = true;
var ng = require("angular");
require("./moduleAugmentation");
var x = ng.getNumber();
