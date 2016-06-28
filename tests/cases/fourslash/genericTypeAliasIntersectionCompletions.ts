/// <reference path="fourslash.ts" />

//// type MixinCtor<A, B> = new () => A & B & { constructor: MixinCtor<A, B> };
//// function merge<A, B>(a: { prototype: A }, b: { prototype: B }): MixinCtor<A, B> {
////   let merged = function() { }
////   Object.assign(merged.prototype, a.prototype, b.prototype);
////   return <MixinCtor<A, B>><any>merged;
//// }
////
//// class TreeNode {
////   value: any;
//// }
////
//// abstract class LeftSideNode extends TreeNode {
////   abstract right(): TreeNode;
////   left(): TreeNode {
////     return null;
////   }
//// }
////
//// abstract class RightSideNode extends TreeNode {
////   abstract left(): TreeNode;
////   right(): TreeNode {
////     return null;
////   };
//// }
////
//// var obj = new (merge(LeftSideNode, RightSideNode))();
//// obj./**/

goTo.marker();
verify.completionListContains("left");
verify.completionListContains("right");
