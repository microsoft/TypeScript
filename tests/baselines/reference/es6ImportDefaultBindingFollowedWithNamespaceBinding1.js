//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding1.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_0.ts]

var a = 10;
export = a;

//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_1.ts]
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBinding_0";
var x: number = defaultBinding;

//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_0.js]
var a = 10;
module.exports = a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_1.js]
var x = defaultBinding;
