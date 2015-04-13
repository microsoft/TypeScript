// @target: es6
// @declaration: true
// @declaration: true

// @filename: es6ImportDefaultBindingFollowedWithNamespaceBinding_0.ts
export var a = 10;

// @filename: es6ImportDefaultBindingFollowedWithNamespaceBinding_1.ts
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBinding_0";
var x: number = nameSpaceBinding.a;