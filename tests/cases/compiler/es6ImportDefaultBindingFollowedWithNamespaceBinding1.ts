// @target: es6
// @declaration: true

// @filename: es6ImportDefaultBindingFollowedWithNamespaceBinding_0.ts
var a = 10;
export default a;

// @filename: es6ImportDefaultBindingFollowedWithNamespaceBinding_1.ts
import defaultBinding, * as nameSpaceBinding  from "es6ImportDefaultBindingFollowedWithNamespaceBinding_0";
var x: number = defaultBinding;