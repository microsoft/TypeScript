//// [typeArgumentInferenceWithRecursivelyReferencedTypeAliasToTypeLiteral01.ts]
type TreeNode = {
    name: string;
    parent: TreeNode;
}

var nodes: TreeNode[];
nodes.map(n => n.name);


//// [typeArgumentInferenceWithRecursivelyReferencedTypeAliasToTypeLiteral01.js]
var nodes;
nodes.map(function (n) { return n.name; });
