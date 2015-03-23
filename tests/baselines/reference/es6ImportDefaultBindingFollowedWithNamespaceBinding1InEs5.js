//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding1InEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.ts]

var a = 10;
export default a;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.ts]
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0";
var x: number = defaultBinding;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.js]
var a = 10;
exports.default = a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.js]
var _es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0 = require("es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0"), nameSpaceBinding = _es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0;
var x = _es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.default;


//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.d.ts]
declare var a: number;
export default a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.d.ts]
