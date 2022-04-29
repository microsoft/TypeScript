declare module "foo" {
   namespace M {}
   var M;
   export = M;
}

declare module "bar" {
    module "foo" {}
}