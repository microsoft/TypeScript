//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.ts]
export var a = 10;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.ts]
import defaultBinding, * as nameSpaceBinding  from "./es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0";
var x: number = nameSpaceBinding.a;

//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
//// [es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nameSpaceBinding = require("./es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0");
var x = nameSpaceBinding.a;
