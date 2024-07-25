//// [tests/cases/compiler/module_augmentUninstantiatedModule.ts] ////

//// [module_augmentUninstantiatedModule.ts]
declare module "foo" {
   namespace M {}
   var M;
   export = M;
}

declare module "bar" {
    module "foo" {}
}

//// [module_augmentUninstantiatedModule.js]
