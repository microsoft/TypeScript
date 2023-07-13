//// [tests/cases/compiler/module_augmentUninstantiatedModule2.ts] ////

//// [module_augmentUninstantiatedModule2.ts]
declare var ng: ng.IAngularStatic;declare module ng {   export interface IModule {      name: string;   }   export interface IAngularStatic {       module: (s: string) => IModule;   }}export = ng;

//// [module_augmentUninstantiatedModule2.js]
"use strict";
module.exports = ng;
