//// [tests/cases/compiler/typeArgumentInferenceWithRecursivelyReferencedTypeAliasToTypeLiteral02.ts] ////

//// [typeArgumentInferenceWithRecursivelyReferencedTypeAliasToTypeLiteral02.ts]
type TreeNode = {
    name: string;
    parent: TreeNode;
}

type TreeNodeMiddleman = {
    name: string;
    parent: TreeNode;
}

var nodes: TreeNodeMiddleman[];
nodes.map(n => n.name);


//// [typeArgumentInferenceWithRecursivelyReferencedTypeAliasToTypeLiteral02.js]
var nodes;
nodes.map(n => n.name);
