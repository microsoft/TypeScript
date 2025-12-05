// @module: commonjs
// @moduleResolution: bundler


// @fileName: app.ts
import ng = require("angular");
import "./moduleAugmentation";

var x: number = ng.getNumber();

// @filename: moduleAugmentation.ts
import * as ng from "angular"
declare module "angular" {
    export interface IAngularStatic {
        getNumber: () => number;
    }
}

// @filename: node_modules/angular/index.d.ts
declare var ng: ng.IAngularStatic;

declare namespace ng {
   export interface IModule {
      name: string;
   }

   export interface IAngularStatic {
       module: (s: string) => IModule;
   }
}

export = ng;

