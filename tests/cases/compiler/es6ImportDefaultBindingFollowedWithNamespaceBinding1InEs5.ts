// @target: es5
// @module: commonjs
// @declaration: true

// @filename: es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0.ts
var a = 10;
export default a;

// @filename: es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_1.ts
import defaultBinding, * as nameSpaceBinding  from "./es6ImportDefaultBindingFollowedWithNamespaceBindingInEs5_0";
var x: number = defaultBinding;