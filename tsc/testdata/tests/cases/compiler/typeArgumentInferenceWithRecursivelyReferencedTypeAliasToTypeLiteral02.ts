// @target: es2015
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
