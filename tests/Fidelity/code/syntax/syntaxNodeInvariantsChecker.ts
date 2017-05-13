///<reference path='references.ts' />

// A debug class that we use to make sure a syntax node is valid.  Currently, this simply verifies
// that the same token does not appear in the tree multiple times.  This is important for 
// subsystems that want to map between tokens and positions.  If a token shows up multiple times in
// the node, then it will not have a unique position, previous token, etc. etc. and that can screw
// many algorithms.  For this reason, when generating trees, it is important that nodes that are 
// reused are cloned before insertion.
module TypeScript {
    export class SyntaxNodeInvariantsChecker extends SyntaxWalker {
        private tokenTable = Collections.createHashTable(Collections.DefaultHashTableCapacity, Collections.identityHashCode);

        public static checkInvariants(node: ISyntaxNode): void {
            visitNodeOrToken(new SyntaxNodeInvariantsChecker(), node);
        }

        public visitNode(node: ISyntaxNode): void {
            Debug.assert(node.kind === SyntaxKind.SourceUnit || node.parent);
            super.visitNode(node);
        }

        public visitList(list: ISyntaxNodeOrToken[]): void {
            Debug.assert(isShared(list) || list.parent);
            super.visitList(list);
        }

        public visitSeparatedList(list: ISyntaxNodeOrToken[]): void {
            Debug.assert(isShared(list) || list.parent);
            super.visitSeparatedList(list);
        }

        public visitToken(token: ISyntaxToken): void {
            // We're calling 'add', so the table will throw if we try to put the same token in multiple
            // times. 
            Debug.assert(token.parent);
            this.tokenTable.add(token, token);
        }
    }
}