/**
 * Hand-written visitor implementations for nodes with runtime-dependent
 * child ordering. Generated code in visitor.generated.ts and factory.generated.ts
 * delegates to these functions.
 */

import { SyntaxKind } from "#enums/syntaxKind";
import type {
    JSDocComment,
    JSDocParameterOrPropertyTag,
    JSDocParameterTag,
    JSDocPropertyTag,
    Node,
    NodeArray,
} from "./ast.ts";
import {
    updateJSDocParameterTag,
    updateJSDocPropertyTag,
} from "./factory.generated.ts";
import {
    isEntityName,
    isIdentifier,
    isTypeNode,
} from "./is.ts";
import type { Visitor } from "./visitor.generated.ts";
import {
    visitNode,
    visitNodes,
} from "./visitor.generated.ts";

export type { Visitor };
export { visitEachChild, visitNode, visitNodes, visitNodesArray } from "./visitor.generated.ts";

// ── forEachChild helpers (same signature as forEachChildTable entries) ──

function visitNodeForEachChild<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {
    return node ? cbNode(node) : undefined;
}

function visitNodesForEachChild<T>(cbNode: (node: Node) => T, cbNodes: ((nodes: NodeArray<Node>) => T) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {
    if (!nodes) return undefined;
    if (cbNodes) return cbNodes(nodes);
    for (const node of nodes) {
        const result = cbNode(node);
        if (result) return result;
    }
    return undefined;
}

// ── forEachChild implementations ──

function forEachChildOfJSDocParameterOrPropertyTag<T>(data: any, cbNode: (node: Node) => T, cbNodes: ((nodes: NodeArray<Node>) => T) | undefined): T | undefined {
    return visitNodeForEachChild(cbNode, data.tagName) ||
        (data.isNameFirst
            ? visitNodeForEachChild(cbNode, data.name) || visitNodeForEachChild(cbNode, data.typeExpression)
            : visitNodeForEachChild(cbNode, data.typeExpression) || visitNodeForEachChild(cbNode, data.name)) ||
        visitNodesForEachChild(cbNode, cbNodes, data.comment);
}

export { forEachChildOfJSDocParameterOrPropertyTag as forEachChildOfJSDocParameterTag, forEachChildOfJSDocParameterOrPropertyTag as forEachChildOfJSDocPropertyTag };

// ── visitEachChild implementations ──

function visitEachChildOfJSDocParameterOrPropertyTag(node: JSDocParameterOrPropertyTag, visitor: Visitor): JSDocParameterOrPropertyTag {
    const _tagName = visitNode(node.tagName, visitor, isIdentifier);
    const _name = visitNode(node.name, visitor, isEntityName);
    const _typeExpression = visitNode(node.typeExpression, visitor, isTypeNode);
    const _comment = visitNodes(node.comment, visitor);
    return node.kind === SyntaxKind.JSDocParameterTag
        ? updateJSDocParameterTag(node, _tagName, _name, _typeExpression, _comment)
        : updateJSDocPropertyTag(node, _tagName, _name, _typeExpression, _comment);
}

export { visitEachChildOfJSDocParameterOrPropertyTag as visitEachChildOfJSDocParameterTag, visitEachChildOfJSDocParameterOrPropertyTag as visitEachChildOfJSDocPropertyTag };
