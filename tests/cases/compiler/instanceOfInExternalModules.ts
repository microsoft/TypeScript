// @module: amd
// @Filename: instanceOfInExternalModules_require.ts
export class Foo { foo: string; }

// @Filename: instanceOfInExternalModules_1.ts
///<reference path='instanceOfInExternalModules_require.ts'/>
import Bar = require("instanceOfInExternalModules_require");
function IsFoo(value: any): boolean {
    return value instanceof Bar.Foo;
}
