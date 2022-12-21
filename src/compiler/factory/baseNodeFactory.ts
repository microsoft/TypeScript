import {
    Node,
    objectAllocator,
    SyntaxKind,
} from "../_namespaces/ts";

/**
 * A `BaseNodeFactory` is an abstraction over an `ObjectAllocator` that handles caching `Node` constructors
 * and allocating `Node` instances based on a set of predefined types.
 *
 * @internal
 */
export interface BaseNodeFactory {
    createBaseSourceFileNode(kind: SyntaxKind): Node;
    createBaseIdentifierNode(kind: SyntaxKind): Node;
    createBasePrivateIdentifierNode(kind: SyntaxKind): Node;
    createBaseTokenNode(kind: SyntaxKind): Node;
    createBaseNode(kind: SyntaxKind): Node;
}

/**
 * Creates a `BaseNodeFactory` which can be used to create `Node` instances from the constructors provided by the object allocator.
 *
 * @internal
 */
export function createBaseNodeFactory(): BaseNodeFactory {
    let NodeConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
    let TokenConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
    let IdentifierConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
    let PrivateIdentifierConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
    let SourceFileConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;

    return {
        createBaseSourceFileNode,
        createBaseIdentifierNode,
        createBasePrivateIdentifierNode,
        createBaseTokenNode,
        createBaseNode
    };

    function createBaseSourceFileNode(kind: SyntaxKind): Node {
        return new (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseIdentifierNode(kind: SyntaxKind): Node {
        return new (IdentifierConstructor || (IdentifierConstructor = objectAllocator.getIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBasePrivateIdentifierNode(kind: SyntaxKind): Node {
        return new (PrivateIdentifierConstructor || (PrivateIdentifierConstructor = objectAllocator.getPrivateIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseTokenNode(kind: SyntaxKind): Node {
        return new (TokenConstructor || (TokenConstructor = objectAllocator.getTokenConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseNode(kind: SyntaxKind): Node {
        return new (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }
}
