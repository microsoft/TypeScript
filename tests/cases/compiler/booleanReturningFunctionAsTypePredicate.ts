// @strict: true

interface Node {
    kind: number;
}

interface Expression extends Node {
    kind: 1234;
}


declare const notATypeGuard: (node: Node) => boolean;
declare const isExpression: (node: Node) => node is Expression;


declare function visitNode<T extends Node>(node: Node, test?: (node: Node) => node is T): T;

declare const aNode: Node;


const x = visitNode(aNode);
const y = visitNode(aNode, isExpression);
const z = visitNode(aNode, notATypeGuard);
