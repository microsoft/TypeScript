/* @internal */
namespace ts {
/**
 * A `BaseNodeFactory` is an abstraction over an `ObjectAllocator` that handles caching `Node` constructors
 * and allocating `Node` instances based on a set of predefined types.
 */
/* @internal */
export interface BaseNodeFactory {
    createBaseSourceFileNode(kind: ts.SyntaxKind): ts.Node;
    createBaseIdentifierNode(kind: ts.SyntaxKind): ts.Node;
    createBasePrivateIdentifierNode(kind: ts.SyntaxKind): ts.Node;
    createBaseTokenNode(kind: ts.SyntaxKind): ts.Node;
    createBaseNode(kind: ts.SyntaxKind): ts.Node;
}

/**
 * Creates a `BaseNodeFactory` which can be used to create `Node` instances from the constructors provided by the object allocator.
 */
export function createBaseNodeFactory(): BaseNodeFactory {
    let NodeConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
    let TokenConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
    let IdentifierConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
    let PrivateIdentifierConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
    let SourceFileConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;

    return {
        createBaseSourceFileNode,
        createBaseIdentifierNode,
        createBasePrivateIdentifierNode,
        createBaseTokenNode,
        createBaseNode
    };

    function createBaseSourceFileNode(kind: ts.SyntaxKind): ts.Node {
        return new (SourceFileConstructor || (SourceFileConstructor = ts.objectAllocator.getSourceFileConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseIdentifierNode(kind: ts.SyntaxKind): ts.Node {
        return new (IdentifierConstructor || (IdentifierConstructor = ts.objectAllocator.getIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBasePrivateIdentifierNode(kind: ts.SyntaxKind): ts.Node {
        return new (PrivateIdentifierConstructor || (PrivateIdentifierConstructor = ts.objectAllocator.getPrivateIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseTokenNode(kind: ts.SyntaxKind): ts.Node {
        return new (TokenConstructor || (TokenConstructor = ts.objectAllocator.getTokenConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }

    function createBaseNode(kind: ts.SyntaxKind): ts.Node {
        return new (NodeConstructor || (NodeConstructor = ts.objectAllocator.getNodeConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
    }
}
}
