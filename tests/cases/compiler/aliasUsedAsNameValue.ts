// @module: commonjs
// @Filename: aliasUsedAsNameValue_0.ts
export var id: number;

// @Filename: aliasUsedAsNameValue_1.ts
export function b(a: any): any { return null; }

// @Filename: aliasUsedAsNameValue_2.ts
///<reference path='aliasUsedAsNameValue_0.ts' />
///<reference path='aliasUsedAsNameValue_1.ts' />
import mod = require("./aliasUsedAsNameValue_0");
import b = require("./aliasUsedAsNameValue_1");
 
export var a = function () {
    //var x = mod.id; // TODO needed hack that mod is loaded
    b.b(mod);
}
