/// <reference path='fourslash.ts'/>

//// type Node/*N*/<T> = {
////     value: T;
////     left: Node<T> | undefined;
////     right: Node<T> | undefined;
//// }
//// const n/*n*/: Node<number> = {
////     value: 1,
////     left: undefined,
////     right: undefined,
//// }
//// interface Orange {
////     name: string;
//// }
//// type TreeNode/*t*/<T> = {
////     value: T;
////     left: TreeNode<T> | undefined;
////     right: TreeNode<T> | undefined;
////     orange?: Orange;
//// }
//// const m/*m*/: TreeNode<number> = {
////     value: 1,
////     left: undefined,
////     right: undefined,
////     orange: { name: "orange" },
//// }

verify.baselineQuickInfo({
    "N": [0],
    "n": [0, 1],
    "t": [0, 1],
    "m": [0, 1, 2],
});