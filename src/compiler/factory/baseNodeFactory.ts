/* @internal */
namespace ts {
    /* @internal */
    export interface BaseNodeFactory {
        createBaseSourceFileNode(kind: SyntaxKind): Node;
        createBaseIdentifierNode(kind: SyntaxKind): Node;
        createBaseTokenNode(kind: SyntaxKind): Node;
        createBaseNode(kind: SyntaxKind): Node;
    }

    /**
     * Creates a `BaseNodeFactory` which can be used to create `Nodes` from the constructors provided by the object allocator.
     */
    export function createBaseNodeFactory(): BaseNodeFactory {
        // tslint:disable variable-name
        let NodeConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        let TokenConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        let IdentifierConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        let SourceFileConstructor: new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        // tslint:enable variable-name

        return {
            createBaseSourceFileNode,
            createBaseIdentifierNode,
            createBaseTokenNode,
            createBaseNode
        };

        function createBaseSourceFileNode(kind: SyntaxKind): Node {
            return new (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
        }

        function createBaseIdentifierNode(kind: SyntaxKind): Node {
            return new (IdentifierConstructor || (IdentifierConstructor = objectAllocator.getIdentifierConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
        }

        function createBaseTokenNode(kind: SyntaxKind): Node {
            return new (TokenConstructor || (TokenConstructor = objectAllocator.getTokenConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
        }

        function createBaseNode(kind: SyntaxKind): Node {
            return new (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()))(kind, /*pos*/ -1, /*end*/ -1);
        }
    }
}