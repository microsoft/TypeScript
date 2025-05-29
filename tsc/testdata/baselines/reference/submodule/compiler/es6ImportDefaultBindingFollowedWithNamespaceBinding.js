//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamespaceBinding.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_0.ts]
export var a = 10;

//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_1.ts]
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBinding_0";
var x: number = nameSpaceBinding.a;

//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_0.js]
export var a = 10;
//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_1.js]
import * as nameSpaceBinding from "es6ImportDefaultBindingFollowedWithNamespaceBinding_0";
var x = nameSpaceBinding.a;


//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_0.d.ts]
export declare var a: number;
//// [es6ImportDefaultBindingFollowedWithNamespaceBinding_1.d.ts]
export {};
