/// <reference path="references.ts" />

module TypeScript.IncrementalParser {
    interface SyntaxCursorPiece {
        element: ISyntaxElement;
        indexInParent: number
    }

    function createSyntaxCursorPiece(element: ISyntaxElement, indexInParent: number) {
        return { element: element, indexInParent: indexInParent };
    }

    // Pool syntax cursors so we don't churn too much memory when we need temporary cursors.  
    // i.e. when we're speculatively parsing, we can cheaply get a pooled cursor and then
    // return it when we no longer need it.
    var syntaxCursorPool: SyntaxCursor[] = [];
    var syntaxCursorPoolCount: number = 0;

    export function returnSyntaxCursor(cursor: SyntaxCursor): void {
        // Make sure the cursor isn't holding onto any syntax elements.  We don't want to leak 
        // them when we return the cursor to the pool.
        cursor.clean();

        syntaxCursorPool[syntaxCursorPoolCount] = cursor;
        syntaxCursorPoolCount++;
    }

    export function getSyntaxCursor(): SyntaxCursor {
        // Get an existing cursor from the pool if we have one.  Or create a new one if we don't.
        var cursor = syntaxCursorPoolCount > 0
            ? syntaxCursorPool[syntaxCursorPoolCount - 1]
            : createSyntaxCursor();

        if (syntaxCursorPoolCount > 0) {
            // If we reused an existing cursor, take it out of the pool so no one else uses it.
            syntaxCursorPoolCount--;
            syntaxCursorPool[syntaxCursorPoolCount] = undefined;
        }

        return cursor;
    }

    export function cloneSyntaxCursor(cursor: SyntaxCursor): SyntaxCursor {
        var newCursor = getSyntaxCursor();

        // Make the new cursor a *deep* copy of the cursor passed in.  This ensures each cursor can
        // be moved without affecting the other.
        newCursor.deepCopyFrom(cursor);

        return newCursor;
    }

    interface SyntaxCursor {
        pieces: SyntaxCursorPiece[];

        clean(): void;
        isFinished(): boolean;
        moveToFirstChild(): void;
        moveToFirstToken(): void;
        moveToNextSibling(): void;
        currentNodeOrToken(): ISyntaxNodeOrToken;
        currentNode(): ISyntaxNode;
        currentToken(): ISyntaxToken;
        pushElement(element: ISyntaxElement, indexInParent: number): void;
        deepCopyFrom(other: SyntaxCursor): void;
    }

    function createSyntaxCursor(): SyntaxCursor {
        // Our list of path pieces.  The piece pointed to by 'currentPieceIndex' must be a node or
        // token.  However, pieces earlier than that may point to list nodes.
        //
        // For perf we reuse pieces as much as possible.  i.e. instead of popping items off the 
        // list, we just will change currentPieceIndex so we can reuse that piece later.
        var pieces: SyntaxCursorPiece[] = [];
        var currentPieceIndex: number = -1;

        // Cleans up this cursor so that it doesn't have any references to actual syntax nodes.
        // This sould be done before returning the cursor to the pool so that the Parser module
        // doesn't unnecessarily keep old syntax trees alive.
        function clean(): void {
            for (var i = 0, n = pieces.length; i < n; i++) {
                var piece = pieces[i];

                if (piece.element === undefined) {
                    break;
                }

                piece.element = undefined;
                piece.indexInParent = -1;
            }

            currentPieceIndex = -1;
        }

        // Makes this cursor into a deep copy of the cursor passed in.
        function deepCopyFrom(other: SyntaxCursor): void {
            for (var i = 0, n = other.pieces.length; i < n; i++) {
                var piece = other.pieces[i];

                if (piece.element === undefined) {
                    break;
                }

                pushElement(piece.element, piece.indexInParent);
            }
        }

        function isFinished(): boolean {
            return currentPieceIndex < 0;
        }

        function currentNodeOrToken(): ISyntaxNodeOrToken {
            if (isFinished()) {
                return undefined;
            }

            var result = pieces[currentPieceIndex].element;

            // The current element must always be a node or a token.
            return <ISyntaxNodeOrToken>result;
        }

        function currentNode(): ISyntaxNode {
            var element = currentNodeOrToken();
            return isNode(element) ? <ISyntaxNode>element : undefined;
        }

        function isEmptyList(element: ISyntaxElement) {
            return isList(element) && (<ISyntaxNodeOrToken[]>element).length === 0;
        }

        function moveToFirstChild() {
            var nodeOrToken = currentNodeOrToken();
            if (nodeOrToken === undefined) {
                return;
            }

            if (isToken(nodeOrToken)) {
                // If we're already on a token, there's nothing to do.
                return;
            }

            // Either the node has some existent child, then move to it.  if it doesn't, then it's
            // an empty node.  Conceptually the first child of an empty node is really just the 
            // next sibling of the empty node.
            for (var i = 0, n = childCount(nodeOrToken); i < n; i++) {
                var child = childAt(nodeOrToken, i);
                if (child && !isEmptyList(child)) {
                    // Great, we found a real child.  Push that.
                    pushElement(child, /*indexInParent:*/ i);

                    // If it was a list, make sure we're pointing at its first element.  We know we
                    // must have one because this is a non-shared list.
                    moveToFirstChildIfList();
                    return;
                }
            }

            // This element must have been an empty node.  Moving to its 'first child' is equivalent to just
            // moving to the next sibling.
            moveToNextSibling();
        }

        function moveToNextSibling(): void {
            while (!isFinished()) {
                // first look to our parent and see if it has a sibling of us that we can move to.
                var currentPiece = pieces[currentPieceIndex];
                var parent = currentPiece.element.parent;

                // We start searching at the index one past our own index in the parent.
                for (var i = currentPiece.indexInParent + 1, n = childCount(parent); i < n; i++) {
                    var sibling = childAt(parent, i);

                    if (sibling && !isEmptyList(sibling)) {
                        // We found a good sibling that we can move to.  Just reuse our existing piece
                        // so we don't have to push/pop.
                        currentPiece.element = sibling;
                        currentPiece.indexInParent = i;

                        // The sibling might have been a list.  Move to it's first child.
                        moveToFirstChildIfList();
                        return;
                    }
                }

                // Didn't have a sibling for this element.  Go up to our parent and get its sibling.

                // Clear the data from the old piece.  We don't want to keep any elements around
                // unintentionally.
                currentPiece.element = undefined;
                currentPiece.indexInParent = -1;

                // Point at the parent.  if we move past the top of the path, then we're finished.
                currentPieceIndex--;
            }
        }

        function moveToFirstChildIfList(): void {
            var element = pieces[currentPieceIndex].element;

            if (isList(element)) {
                // We cannot ever get an empty list in our piece path.  Empty lists are 'shared' and
                // we make sure to filter that out before pushing any children.
                pushElement(childAt(element, 0), /*indexInParent:*/ 0);
            }
        }

        function pushElement(element: ISyntaxElement, indexInParent: number): void {
            currentPieceIndex++;

            // Reuse an existing piece if we have one.  Otherwise, push a new piece to our list.
            if (currentPieceIndex === pieces.length) {
                pieces.push(createSyntaxCursorPiece(element, indexInParent));
            }
            else {
                var piece = pieces[currentPieceIndex];
                piece.element = element;
                piece.indexInParent = indexInParent;
            }
        }

        function moveToFirstToken(): void {
            while (!isFinished()) {
                var element = pieces[currentPieceIndex].element;
                if (isNode(element)) {
                    moveToFirstChild();
                    continue;
                }

                return;
            }
        }

        function currentToken(): ISyntaxToken {
            moveToFirstToken();

            var element = currentNodeOrToken();
            return <ISyntaxToken>element;
        }

        return {
            pieces: pieces,
            clean: clean,
            isFinished: isFinished,
            moveToFirstChild: moveToFirstChild,
            moveToFirstToken: moveToFirstToken,
            moveToNextSibling: moveToNextSibling,
            currentNodeOrToken: currentNodeOrToken,
            currentNode: currentNode,
            currentToken: currentToken,
            pushElement: pushElement,
            deepCopyFrom: deepCopyFrom
        };
    }
}