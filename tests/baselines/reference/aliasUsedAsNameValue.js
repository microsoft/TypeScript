//// [aliasUsedAsNameValue_2.ts]
///<reference path='aliasUsedAsNameValue_0.ts' />
///<reference path='aliasUsedAsNameValue_1.ts' />
import mod = require("aliasUsedAsNameValue_0");
import b = require("aliasUsedAsNameValue_1");
 
export var a = function () {
    //var x = mod.id; // TODO needed hack that mod is loaded
    b.b(mod);
}


//// [aliasUsedAsNameValue_0.js]
exports.id;
//// [aliasUsedAsNameValue_1.js]
function b(a) {
    return null;
}
exports.b = b;
//// [aliasUsedAsNameValue_2.js]
///<reference path='aliasUsedAsNameValue_0.ts' />
///<reference path='aliasUsedAsNameValue_1.ts' />
var mod = require("aliasUsedAsNameValue_0");
var b = require("aliasUsedAsNameValue_1");

exports.a = function () {
    //var x = mod.id; // TODO needed hack that mod is loaded
    b.b(mod);
};
