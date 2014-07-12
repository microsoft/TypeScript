//// [aliasOnMergedModuleInterface_0.js]
//// [aliasOnMergedModuleInterface_1.js]
///<reference path='aliasOnMergedModuleInterface_0.ts' />
var foo = require("foo");
var z;
z.bar("hello"); // This should be ok
var x = foo.bar("hello");
