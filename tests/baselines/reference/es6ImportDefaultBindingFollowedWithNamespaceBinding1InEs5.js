//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding1InEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.ts]

var a = 10;
export default a;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.ts]
import defaultBinding, * as nameSpaceBinding  from "./es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0";
var x: number = defaultBinding;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.js]
"use strict";
var a = 10;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.js]
"use strict";
var es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0_1 = require("./es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0"), nameSpaceBinding = es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0_1;
var x = es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0_1.default;


//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.d.ts]
declare var a: number;
export default a;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.d.ts]
