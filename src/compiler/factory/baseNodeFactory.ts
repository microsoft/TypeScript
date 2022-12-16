import { IdentifierObject, NodeObject, PrivateIdentifierObject, SourceFileObject, TokenObject } from "../nodeConstructors";
import {
    Node,
    SyntaxKind,
} from "../_namespaces/ts";

/**
 * A `BaseNodeFactory` is an abstraction over an `ObjectAllocator` that handles caching `Node` constructors
 * and allocating `Node` instances based on a set of predefined types.
 *
 * @internal
 */
export interface BaseNodeFactory {
    createBaseSourceFileNode(): Node;
    createBaseIdentifierNode(): Node;
    createBasePrivateIdentifierNode(): Node;
    createBaseTokenNode(kind: SyntaxKind): Node;
    createBaseNode(kind: SyntaxKind): Node;
}

/**
 * Creates a `BaseNodeFactory` which can be used to create `Node` instances from the constructors provided by the object allocator.
 *
 * @internal
 */
export function createBaseNodeFactory(): BaseNodeFactory {
    return {
        createBaseSourceFileNode,
        createBaseIdentifierNode,
        createBasePrivateIdentifierNode,
        createBaseTokenNode,
        createBaseNode
    };

    function createBaseSourceFileNode(): Node {
        return new SourceFileObject();
    }

    function createBaseIdentifierNode(): Node {
        return new IdentifierObject();
    }

    function createBasePrivateIdentifierNode(): Node {
        return new PrivateIdentifierObject();
    }

    function createBaseTokenNode(kind: SyntaxKind): Node {
        return new TokenObject(kind);
    }

    function createBaseNode(kind: SyntaxKind): Node {
        return new NodeObject(kind);
    }
}
