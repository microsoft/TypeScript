//// [recursiveTupleTypes2.ts]
interface Tree1 {
    children: [Tree1, Tree2];
}

interface Tree2 {
    children: [Tree2, Tree2];
}

let tree1: Tree1;
let tree2: Tree2;
tree1 = tree2;
tree2 = tree1;


//// [recursiveTupleTypes2.js]
var tree1;
var tree2;
tree1 = tree2;
tree2 = tree1;
