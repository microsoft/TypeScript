import { SyntaxKind } from "#enums/syntaxKind";
import type {
    Node,
    NodeArray,
    NumericLiteral,
    ReadonlyTextRange,
    StringLiteral,
} from "./ast.ts";
import {
    cloneNode,
    createNodeArray,
    createNumericLiteral,
    createStringLiteral,
} from "./factory.generated.ts";
import { visitEachChild } from "./visitor.ts";

function isArray(value: any): value is readonly unknown[] {
    // See: https://github.com/microsoft/TypeScript/issues/17002
    return Array.isArray(value);
}

function forEachChildRecursively<T>(rootNode: Node, cbNode: (node: Node, parent: Node) => T | "skip" | undefined, cbNodes?: (nodes: NodeArray<Node>, parent: Node) => T | "skip" | undefined): T | undefined {
    const queue: (Node | NodeArray<Node>)[] = gatherPossibleChildren(rootNode);
    const parents: Node[] = []; // tracks parent references for elements in queue
    while (parents.length < queue.length) {
        parents.push(rootNode);
    }
    while (queue.length !== 0) {
        const current = queue.pop()!;
        const parent = parents.pop()!;
        if (isArray(current)) {
            if (cbNodes) {
                const res = cbNodes(current, parent);
                if (res) {
                    if (res === "skip") continue;
                    return res;
                }
            }
            for (let i = current.length - 1; i >= 0; --i) {
                queue.push(current[i]);
                parents.push(parent);
            }
        }
        else {
            const res = cbNode(current, parent);
            if (res) {
                if (res === "skip") continue;
                return res;
            }
            if (current.kind >= SyntaxKind.FirstNode) {
                // add children in reverse order to the queue, so popping gives the first child
                for (const child of gatherPossibleChildren(current)) {
                    queue.push(child);
                    parents.push(current);
                }
            }
        }
    }
}

function gatherPossibleChildren(node: Node) {
    const children: (Node | NodeArray<Node>)[] = [];
    node.forEachChild(addWorkItem, addWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
    return children;

    function addWorkItem(n: Node | NodeArray<Node>) {
        children.unshift(n);
    }
}

function setParentRecursive<T extends Node>(rootNode: T | undefined): T | undefined {
    if (rootNode === undefined) return rootNode;
    forEachChildRecursively(rootNode, (child, parent) => {
        (child as any).parent = parent;
        return undefined;
    });
    return rootNode;
}

function setTextRange<T extends Node>(node: T, range: ReadonlyTextRange | undefined): T {
    if (range) {
        (node as any).pos = range.pos;
        (node as any).end = range.end;
    }
    return node;
}

/**
 * Creates a deep clone of a node and its subtree, synthesizing new nodes for every child.
 * The resulting tree has fully set parent pointers.
 *
 * @param node The node to clone.
 * @param includeTrivia Whether to preserve the text range (pos/end) on the clone.
 */
export function getSynthesizedDeepClone<T extends Node>(node: T, includeTrivia?: boolean): T;
export function getSynthesizedDeepClone<T extends Node>(node: T | undefined, includeTrivia?: boolean): T | undefined;
export function getSynthesizedDeepClone<T extends Node>(node: T | undefined, includeTrivia = true): T | undefined {
    const clone = node && getSynthesizedDeepCloneWorker(node);
    if (clone && !includeTrivia) {
        (clone as any).pos = -1;
        (clone as any).end = -1;
    }
    return setParentRecursive(clone);
}

/**
 * Creates deep clones of a NodeArray and all its elements.
 */
export function getSynthesizedDeepClones<T extends Node>(nodes: NodeArray<T>, includeTrivia?: boolean): NodeArray<T>;
export function getSynthesizedDeepClones<T extends Node>(nodes: NodeArray<T> | undefined, includeTrivia?: boolean): NodeArray<T> | undefined;
export function getSynthesizedDeepClones<T extends Node>(nodes: NodeArray<T> | undefined, includeTrivia = true): NodeArray<T> | undefined {
    if (nodes) {
        const cloned = createNodeArray(
            nodes.map(n => getSynthesizedDeepClone(n, includeTrivia)),
            nodes.pos,
            nodes.end,
        );
        return cloned;
    }
    return nodes;
}

function getSynthesizedDeepCloneWorker<T extends Node>(node: T): T {
    const visited = visitEachChild(node, n => getSynthesizedDeepCloneWorker(n));

    if (visited === node) {
        // Leaf node — visitEachChild returned the same node since there are no children.
        // We need to explicitly clone it.
        const clone = node.kind === SyntaxKind.StringLiteral
            ? createStringLiteral((node as Node as StringLiteral).text, (node as Node as StringLiteral).tokenFlags) as Node as T
            : node.kind === SyntaxKind.NumericLiteral
            ? createNumericLiteral((node as Node as NumericLiteral).text, (node as Node as NumericLiteral).tokenFlags) as Node as T
            : cloneNode(node);
        return setTextRange(clone, node);
    }

    // visitEachChild already created a new node with visited children.
    // Clear the parent since setParentRecursive will set it later.
    (visited as any).parent = undefined!;
    return visited;
}
