//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding1InEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.ts]

var a = 10;
export = a;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.ts]
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0";
var x: number = defaultBinding;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.js]
var a = 10;
module.exports = a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.js]
var defaultBinding = require("es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0");
var x = defaultBinding;


//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.d.ts]
declare var a: number;
export = a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.d.ts]
