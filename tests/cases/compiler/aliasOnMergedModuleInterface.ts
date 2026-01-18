//@module: commonjs
// @Filename: aliasOnMergedModuleInterface_0.ts
declare module "foo"
{
    namespace B {
        export interface A {
        }
    }
    interface B {
        bar(name: string): B.A;
    }
    export = B;
}

// @Filename: aliasOnMergedModuleInterface_1.ts
///<reference path='aliasOnMergedModuleInterface_0.ts' />
import foo = require("foo")
declare var z: foo;
z.bar("hello"); // This should be ok
var x: foo.A = foo.bar("hello"); // foo.A should be ok but foo.bar should be error
