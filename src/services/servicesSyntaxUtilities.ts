// These utilities are common to multiple language service features.
module ts.ServicesSyntaxUtilities {
    export function findNextToken(previousToken: Node, parent: Node): Node {
        return find(parent);

        function find(n: Node): Node {
            if (isToken(n) && n.pos === previousToken.end) {
                // this is token that starts at the end of previous token - return it
                return n;
            }

            var children = n.getChildren();
            for (var i = 0, len = children.length; i < len; ++i) {
                var child = children[i];
                var shouldDiveInChildNode =
                    // previous token is enclosed somewhere in the child
                    (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                    // previous token ends exactly at the beginning of child
                    (child.pos === previousToken.end);

                if (shouldDiveInChildNode && nodeHasTokens(child)) {
                    return find(child);
                }
            }

            return undefined;
        }
    }

    export function findPrecedingToken(position: number, sourceFile: SourceFile): Node {
        return find(sourceFile);

        function findRightmostToken(n: Node): Node {
            if (isToken(n)) {
                return n;
            }

            var children = n.getChildren();
            var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
            return candidate && findRightmostToken(candidate);

        }

        function find(n: Node): Node {
            if (isToken(n)) {
                return n;
            }

            var children = n.getChildren();
            for (var i = 0, len = children.length; i < len; ++i) {
                var child = children[i];
                if (nodeHasTokens(child)) {
                    if (position < child.end) {
                        if (child.getStart(sourceFile) >= position) {
                            // actual start of the node is past the position - previous token should be at the end of previous child
                            var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i);
                            return candidate && findRightmostToken(candidate)
                        }
                        else {
                            // candidate should be in this node
                            return find(child);
                        }
                    }
                }
            }

            Debug.assert(n.kind === SyntaxKind.SourceFile);

            // Here we know that none of child token nodes embrace the position, 
            // the only known case is when position is at the end of the file.
            // Try to find the rightmost token in the file without filtering.
            // Namely we are skipping the check: 'position < node.end'
            if (children.length) {
                var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                return candidate && findRightmostToken(candidate);
            }
        }

        /// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
        function findRightmostChildNodeWithTokens(children: Node[], exclusiveStartPosition: number): Node {
            for (var i = exclusiveStartPosition - 1; i >= 0; --i) {
                if (nodeHasTokens(children[i])) {
                    return children[i];
                }
            }
        }
    }

    function nodeHasTokens(n: Node): boolean {
        if (n.kind === SyntaxKind.ExpressionStatement) {
            return nodeHasTokens((<ExpressionStatement>n).expression);
        }

        if (n.kind === SyntaxKind.EndOfFileToken || n.kind === SyntaxKind.OmittedExpression || n.kind === SyntaxKind.Missing) {
            return false;
        }

        // SyntaxList is already realized so getChildCount should be fast and non-expensive
        return n.kind !== SyntaxKind.SyntaxList || n.getChildCount() !== 0;
    }

    function isToken(n: Node): boolean {
        return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
    }
}