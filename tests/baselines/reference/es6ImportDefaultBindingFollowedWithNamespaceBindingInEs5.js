//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.ts]

export var a = 10;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.ts]
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0";

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.js]
exports.a = 10;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.js]
