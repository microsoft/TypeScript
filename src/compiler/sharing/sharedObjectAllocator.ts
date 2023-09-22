import { Identifier, Node, NodeArray, PrivateIdentifier, SourceFile, SyntaxKind, Token } from "../types";
import { ObjectAllocator, objectAllocator } from "../utilities";
import { getSharedConstructorForKind } from "./sharedNode";
import { SharedNodeArray } from "./sharedNodeArray";

function NodeArray(items: readonly any[], hasTrailingComma?: boolean) {
    const array = new SharedNodeArray();
    array.items = new SharedArray(items.length);
    for (let i = 0; i < items.length; i++) {
        array.items[i] = items[i];
    }
    array.hasTrailingComma = !!hasTrailingComma;
    return array;
}

function Node(kind: SyntaxKind, pos: number, end: number) {
    const SharedNode = getSharedConstructorForKind(kind);
    const node = new SharedNode();
    node.kind = kind;
    node.pos = pos;
    node.end = end;
    return node;
}

/** @internal */
export function getSharedObjectAllocator(): ObjectAllocator {
    return {
        ...objectAllocator,
        getNodeArrayConstructor: () => NodeArray as unknown as new <T extends Node>(items: readonly T[], hasTrailingComma?: boolean | undefined) => NodeArray<T>,
        getNodeConstructor: () => Node as unknown as new (kind: SyntaxKind, pos: number, end: number) => Node,
        getTokenConstructor: () => Node as unknown as new <Kind extends SyntaxKind>(kind: Kind, pos: number, end: number) => Token<Kind>,
        getIdentifierConstructor: () => Node as unknown as new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier,
        getPrivateIdentifierConstructor: () => Node as unknown as new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier,
        getSourceFileConstructor: () => Node as unknown as new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile,
        // getSymbolConstructor: () => SymbolConstructor,
    };
}
