//// [a.ts]
/// <reference path="b.ts" />
import ITest = require('ITest');
var testData: ITest[];
var p = testData[0].name;
 

//// [b.js]
//// [a.js]
define(["require", "exports"], function(require, exports) {
    var testData;
    var p = testData[0].name;
});
