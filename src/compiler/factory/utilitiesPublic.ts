import {
    addRange,
    appendIfUnique,
} from "../core";
import {
    EmitNode,
    HasDecorators,
    HasModifiers,
    InternalEmitFlags,
    Node,
    SyntaxKind,
    TextRange,
} from "../types";
import { setTextRangePosEnd } from "../utilities";

export function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T {
    return location ? setTextRangePosEnd(range, location.pos, location.end) : range;
}

export function canHaveModifiers(node: Node): node is HasModifiers {
    const kind = node.kind;
    return kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertySignature
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.Constructor
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.IndexSignature
        || kind === SyntaxKind.ConstructorType
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.ArrowFunction
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.InterfaceDeclaration
        || kind === SyntaxKind.TypeAliasDeclaration
        || kind === SyntaxKind.EnumDeclaration
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ImportDeclaration
        || kind === SyntaxKind.ExportAssignment
        || kind === SyntaxKind.ExportDeclaration;
}

export function canHaveDecorators(node: Node): node is HasDecorators {
    const kind = node.kind;
    return kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.ClassDeclaration;
}

export function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T {
    node.original = original;
    if (original) {
        const emitNode = original.emitNode;
        if (emitNode) node.emitNode = mergeEmitNode(emitNode, node.emitNode);
    }
    return node;
}

function mergeEmitNode(sourceEmitNode: EmitNode, destEmitNode: EmitNode | undefined) {
    const {
        flags,
        internalFlags,
        leadingComments,
        trailingComments,
        commentRange,
        sourceMapRange,
        tokenSourceMapRanges,
        constantValue,
        helpers,
        startsOnNewLine,
        snippetElement,
    } = sourceEmitNode;
    if (!destEmitNode) destEmitNode = {} as EmitNode;
    // We are using `.slice()` here in case `destEmitNode.leadingComments` is pushed to later.
    if (leadingComments) destEmitNode.leadingComments = addRange(leadingComments.slice(), destEmitNode.leadingComments);
    if (trailingComments) destEmitNode.trailingComments = addRange(trailingComments.slice(), destEmitNode.trailingComments);
    if (flags) destEmitNode.flags = flags;
    if (internalFlags) destEmitNode.internalFlags = internalFlags & ~InternalEmitFlags.Immutable;
    if (commentRange) destEmitNode.commentRange = commentRange;
    if (sourceMapRange) destEmitNode.sourceMapRange = sourceMapRange;
    if (tokenSourceMapRanges) destEmitNode.tokenSourceMapRanges = mergeTokenSourceMapRanges(tokenSourceMapRanges, destEmitNode.tokenSourceMapRanges!);
    if (constantValue !== undefined) destEmitNode.constantValue = constantValue;
    if (helpers) {
        for (const helper of helpers) {
            destEmitNode.helpers = appendIfUnique(destEmitNode.helpers, helper);
        }
    }
    if (startsOnNewLine !== undefined) destEmitNode.startsOnNewLine = startsOnNewLine;
    if (snippetElement !== undefined) destEmitNode.snippetElement = snippetElement;
    return destEmitNode;
}

function mergeTokenSourceMapRanges(sourceRanges: (TextRange | undefined)[], destRanges: (TextRange | undefined)[]) {
    if (!destRanges) destRanges = [];
    for (const key in sourceRanges) {
        destRanges[key] = sourceRanges[key];
    }
    return destRanges;
}
