///<reference path="references.ts" />

module TypeScript.IncrementalParser {
    interface IParserRewindPoint {
        // Information used by the incremental parser source.
        oldSourceUnitCursor: SyntaxCursor;
    }

    interface ISyntaxElementInternal extends ISyntaxElement {
        intersectsChange: boolean;
    }

    // Parser source used in incremental scenarios. This parser source wraps an old tree, text 
    // change and new text, and uses all three to provide nodes and tokens to the parser.  In
    // general, nodes from the old tree are returned as long as they do not intersect with the text 
    // change.  Then, once the text change is reached, tokens from the old tree are returned as 
    // long as they do not intersect with the text change.  Then, the text that is actually changed
    // will be scanned using a normal scanner.  Then, once the new text is scanned, the source will
    // attempt to sync back up with nodes or tokens that started where the new tokens end. Once it
    // can do that, then all subsequent data will come from the original tree.
    //
    // This allows for an enormous amount of tree reuse in common scenarios.  Situations that 
    // prevent this level of reuse include substantially destructive operations like introducing
    // "/*" without a "*/" nearby to terminate the comment.
    function createParserSource(oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, text: ISimpleText): Parser.IParserSource {
        // The underlying source that we will use to scan tokens from any new text, or any tokens 
        // from the old tree that we decide we can't use for any reason.  We will also continue 
        // scanning tokens from this source until we've decided that we're resynchronized and can
        // read in subsequent data from the old tree.
        //
        // This parser source also keeps track of the absolute position in the text that we're in,
        // and any token diagnostics produced.  That way we dont' have to track that ourselves.
        var _scannerParserSource = Scanner.createParserSource(oldSyntaxTree.fileName(), text, oldSyntaxTree.languageVersion());

        // The cursor we use to navigate through and retrieve nodes and tokens from the old tree.
        var oldSourceUnit = oldSyntaxTree.sourceUnit();

        var _outstandingRewindPointCount = 0;

        // Start the cursor pointing at the first element in the source unit (if it exists).
        var _oldSourceUnitCursor = getSyntaxCursor();
        if (oldSourceUnit.moduleElements.length > 0) {
            _oldSourceUnitCursor.pushElement(childAt(oldSourceUnit.moduleElements, 0), /*indexInParent:*/ 0);
        }

        // In general supporting multiple individual edits is just not that important.  So we 
        // just collapse this all down to a single range to make the code here easier.  The only
        // time this could be problematic would be if the user made a ton of discontinuous edits.
        // For example, doing a column select on a *large* section of a code.  If this is a 
        // problem, we can always update this code to handle multiple changes.
        var _changeRange = extendToAffectedRange(textChangeRange, oldSourceUnit);

        // Cached value of _changeRange.newSpan().  Cached for performance.
        var _changeRangeNewSpan = _changeRange.newSpan();

        // The old tree's length, plus whatever length change was caused by the edit
        // Had better equal the new text's length!
        if (Debug.shouldAssert(AssertionLevel.Aggressive)) {
            Debug.assert((fullWidth(oldSourceUnit) - _changeRange.span().length() + _changeRange.newLength()) === text.length());
        }

        var delta = _changeRange.newSpan().length() - _changeRange.span().length();
        // If we added or removed characters during the edit, then we need to go and adjust all
        // the nodes after the edit.  Those nodes may move forward down (if we inserted chars)
        // or they may move backward (if we deleted chars).
        //
        // Doing this helps us out in two ways.  First, it means that any nodes/tokens we want
        // to reuse are already at the appropriate position in the new text.  That way when we
        // reuse them, we don't have to figure out if they need to be adjusted.  Second, it makes
        // it very easy to determine if we can reuse a node.  If the node's position is at where
        // we are in the text, then we can reuse it.  Otherwise we can't.  If hte node's position
        // is ahead of us, then we'll need to rescan tokens.  If the node's position is behind
        // us, then we'll need to skip it or crumble it as appropriate
        //
        // Also, mark any syntax elements that intersect the changed span.  We know, up front,
        // that we cannot reuse these elements.
        updateTokenPositionsAndMarkElements(<ISyntaxElementInternal><ISyntaxElement>oldSourceUnit,
            _changeRange.span().start(), _changeRange.span().end(), delta, /*fullStart:*/ 0);

        function release() {
            _scannerParserSource.release();
            _scannerParserSource = undefined;
            _oldSourceUnitCursor = undefined;
            _outstandingRewindPointCount = 0;
        }

        function extendToAffectedRange(changeRange: TextChangeRange, sourceUnit: SourceUnitSyntax): TextChangeRange {
            // Consider the following code:
            //      void foo() { /; }
            //
            // If the text changes with an insertion of / just before the semicolon then we end up with:
            //      void foo() { //; }
            //
            // If we were to just use the changeRange a is, then we would not rescan the { token 
            // (as it does not intersect the actual original change range).  Because an edit may
            // change the token touching it, we actually need to look back *at least* one token so
            // that the prior token sees that change.  
            var maxLookahead = 1;

            var start = changeRange.span().start();

            // the first iteration aligns us with the change start. subsequent iteration move us to
            // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
            // start of the tree.
            for (var i = 0; start > 0 && i <= maxLookahead; i++) {
                var token = findToken(sourceUnit, start);
                var position = token.fullStart();

                start = Math.max(0, position - 1);
            }

            var finalSpan = TextSpan.fromBounds(start, changeRange.span().end());
            var finalLength = changeRange.newLength() + (changeRange.span().start() - start);

            return new TextChangeRange(finalSpan, finalLength);
        }

        function absolutePosition() {
            return _scannerParserSource.absolutePosition();
        }

        function tokenDiagnostics(): Diagnostic[] {
            return _scannerParserSource.tokenDiagnostics();
        }

        function getRewindPoint() {
            // Get a rewind point for our new text reader and for our old source unit cursor.
            var rewindPoint = <IParserRewindPoint>_scannerParserSource.getRewindPoint();

            // Clone our cursor.  That way we can restore to that point if the parser needs to rewind.
            rewindPoint.oldSourceUnitCursor = cloneSyntaxCursor(_oldSourceUnitCursor);

            _outstandingRewindPointCount++;
            return rewindPoint;
        }

        function rewind(rewindPoint: IParserRewindPoint): void {
            // Restore our state to the values when the rewind point was created.

            // Reset the cursor to what it was when we got the rewind point.  Make sure to return 
            // our existing cursor to the pool so it can be reused.
            returnSyntaxCursor(_oldSourceUnitCursor);
            _oldSourceUnitCursor = rewindPoint.oldSourceUnitCursor;

            // Clear the cursor that the rewind point points to.  This way we don't try
            // to return it in 'releaseRewindPoint'.
            rewindPoint.oldSourceUnitCursor = undefined;

            _scannerParserSource.rewind(rewindPoint);
        }

        function releaseRewindPoint(rewindPoint: IParserRewindPoint): void {
            if (rewindPoint.oldSourceUnitCursor) {
                returnSyntaxCursor(rewindPoint.oldSourceUnitCursor);
            }

            _scannerParserSource.releaseRewindPoint(rewindPoint);
            _outstandingRewindPointCount--;
            Debug.assert(_outstandingRewindPointCount >= 0);
        }

        function isPinned() {
            return _outstandingRewindPointCount > 0;
        }

        function trySynchronizeCursorToPosition() {
            // If we're currently pinned, then do not want to touch the cursor.  Here's why.  First,
            // recall that we're 'pinned' when we're speculatively parsing.  So say we were to allow
            // returning old nodes/tokens while speculatively parsing. Then, the parser might start
            // mutating the nodes and tokens we returned (i.e. by setting their parents).   Then, 
            // when we rewound, those nodes and tokens would still have those updated parents.  
            // Parents which we just decided we did *not* want to parse (hence why we rewound).  For
            // Example, say we have something like:
            //
            //          var v = f<a,b,c>e;  // note: this is not generic.
            //
            // When incrementally parsing, we will need to speculatively parse to determine if the
            // above is generic.  This will cause us to reuse the "a, b, c" tokens, and set their 
            // parent to a new type argument list.  A type argument list we will then throw away once
            // we decide that it isn't actually generic.  We will have now 'broken' the original tree.
            //
            // As such, the rule is simple.  We only return nodes/tokens from teh original tree if
            // we know the parser will accept and consume them and never rewind back before them.
            if (isPinned()) {
                return false;
            }

            var absolutePos = absolutePosition();
            while (true) {
                if (_oldSourceUnitCursor.isFinished()) {
                    // Can't synchronize the cursor to the current position if the cursor is finished.
                    return false;
                }

                // Start with the current node or token the cursor is pointing at.
                var currentNodeOrToken = _oldSourceUnitCursor.currentNodeOrToken();

                // Node, move the cursor past any nodes or tokens that intersect the change range
                // 1) they are never reusable.
                // 2) their positions are wacky as they refer to the original text.
                //
                // We consider these nodes and tokens essentially invisible to all further parts
                // of the incremental algorithm.
                if ((<ISyntaxElementInternal><ISyntaxElement>currentNodeOrToken).intersectsChange) {
                    if (isNode(currentNodeOrToken)) {
                        _oldSourceUnitCursor.moveToFirstChild();
                    }
                    else {
                        _oldSourceUnitCursor.moveToNextSibling();
                    }
                    continue;
                }

                var currentNodeOrTokenFullStart = fullStart(currentNodeOrToken);
                if (currentNodeOrTokenFullStart === absolutePos) {
                    // We were able to synchronize the cursor to the current position.  We can
                    // read from the cursor
                    return true;
                }

                if (currentNodeOrTokenFullStart > absolutePos) {
                    // The node or token is ahead of the current position. We'll need to rescan 
                    // tokens until we catch up.
                    return false;
                }

                // The node or is behind the current position we're at in the text.

                var currentNodeOrTokenFullWidth = fullWidth(currentNodeOrToken);
                var currentNodeOrTokenFullEnd = currentNodeOrTokenFullStart + currentNodeOrTokenFullWidth;

                // If we're pointing at a node, and that node ends before our current position, we
                // can just skip the node entirely.  Or, if we're pointing at a token, we won't be
                // able to break up that token any further and we should just move to the next 
                // token.  
                if (currentNodeOrTokenFullEnd <= absolutePos || isToken(currentNodeOrToken)) {
                    _oldSourceUnitCursor.moveToNextSibling();
                }
                else {
                    // We have a node, and it started before our absolute pos, and ended after our 
                    // pos. Try to crumble this node to see if we'll be able to skip the first node 
                    // or token contained within.
                    _oldSourceUnitCursor.moveToFirstChild();
                }
            }
        }

        function currentNode(): ISyntaxNode {
            if (trySynchronizeCursorToPosition()) {
                // Try to read a node.  If we can't then our caller will call back in and just try
                // to get a token.
                var node = tryGetNodeFromOldSourceUnit();
                if (node) {
                    return node;
                }
            }

            // Either we were ahead of the old text, or we were pinned.  No node can be read here.
            return undefined;
        }

        function currentToken(): ISyntaxToken {
            if (trySynchronizeCursorToPosition()) {
                var token = tryGetTokenFromOldSourceUnit();
                if (token) {
                    return token;
                }
            }

            // Either we couldn't read from the old source unit, or we weren't able to successfully
            // get a token from it.  In this case we need to read a token from the underlying text.
            return _scannerParserSource.currentToken();
        }

        function currentContextualToken(): ISyntaxToken {
            // Just delegate to the underlying source to handle 
            return _scannerParserSource.currentContextualToken();
        }

        function tryGetNodeFromOldSourceUnit(): ISyntaxNode {
            // Keep moving the cursor down to the first node that is safe to return.  A node is 
            // safe to return if:
            //  a) it does not contain skipped text.
            //  b) it does not have any zero width tokens in it.
            //  c) it does not have a regex token in it.
            //  d) we are still in the same strict or non-strict state that the node was originally parsed in.
            while (true) {
                var node = _oldSourceUnitCursor.currentNode();
                if (node === undefined) {
                    // Couldn't even read a node, nothing to return.
                    return undefined;
                }

                if (!TypeScript.isIncrementallyUnusable(node)) {
                    // Didn't contain anything that would make it unusable.  Awesome.  This is
                    // a node we can reuse.
                    return node;
                }

                // We couldn't use currentNode. Try to move to its first child (in case that's a 
                // node).  If it is we can try using that.  Otherwise we'll just bail out in the
                // next iteration of the loop.
                _oldSourceUnitCursor.moveToFirstChild();
            }
        }

        function canReuseTokenFromOldSourceUnit(token: ISyntaxToken): boolean {
            // A token is safe to return if:
            //  a) it did not intersect the change range.
            //  b) it does not contain skipped text.
            //  c) it is not zero width.
            //  d) it is not a contextual parser token.
            //
            // NOTE: It is safe to get a token regardless of what our strict context was/is.  That's 
            // because the strict context doesn't change what tokens are scanned, only how the 
            // parser reacts to them.
            //
            // NOTE: we don't mark a keyword that was converted to an identifier as 'incrementally 
            // unusable.  This is because we don't want to mark it's containing parent node as 
            // unusable.  i.e. if i have this:  "public Foo(string: Type) { }", then that *entire* node 
            // is reusuable even though "string" was converted to an identifier.  However, we still
            // need to make sure that if that the parser asks for a *token* we don't return it.  
            // Converted identifiers can't ever be created by the scanner, and as such, should not 
            // be returned by this source.
            return token &&
                !(<ISyntaxElementInternal><ISyntaxElement>token).intersectsChange &&
                !token.isIncrementallyUnusable() &&
                !Scanner.isContextualToken(token);
        }

        function tryGetTokenFromOldSourceUnit(): ISyntaxToken {
            // get the current token that the cursor is pointing at.
            var token = _oldSourceUnitCursor.currentToken();

            return canReuseTokenFromOldSourceUnit(token) ? token : undefined;
        }

        function peekToken(n: number): ISyntaxToken {
            if (trySynchronizeCursorToPosition()) {
                var token = tryPeekTokenFromOldSourceUnit(n);
                if (token) {
                    return token;
                }
            }

            // Couldn't peek this far in the old tree.  Get the token from the new text.
            return _scannerParserSource.peekToken(n);
        }

        function tryPeekTokenFromOldSourceUnit(n: number): ISyntaxToken {
            // clone the existing cursor so we can move it forward and then restore ourselves back
            // to where we started from.

            var cursorClone = cloneSyntaxCursor(_oldSourceUnitCursor);

            var token = tryPeekTokenFromOldSourceUnitWorker(n);

            returnSyntaxCursor(_oldSourceUnitCursor);
            _oldSourceUnitCursor = cursorClone;

            return token;
        }

        function tryPeekTokenFromOldSourceUnitWorker(n: number): ISyntaxToken {
            // First, make sure the cursor is pointing at a token.
            _oldSourceUnitCursor.moveToFirstToken();

            // Now, keep walking forward to successive tokens.
            for (var i = 0; i < n; i++) {
                var interimToken = _oldSourceUnitCursor.currentToken();

                if (!canReuseTokenFromOldSourceUnit(interimToken)) {
                    return undefined;
                }

                _oldSourceUnitCursor.moveToNextSibling();
            }

            var token = _oldSourceUnitCursor.currentToken();
            return canReuseTokenFromOldSourceUnit(token) ? token : undefined;
        }

        function consumeNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {
            _scannerParserSource.consumeNodeOrToken(nodeOrToken);
        }

        return {
            text: text,
            fileName: oldSyntaxTree.fileName(),
            languageVersion: oldSyntaxTree.languageVersion(),
            absolutePosition: absolutePosition,
            currentNode: currentNode,
            currentToken: currentToken,
            currentContextualToken: currentContextualToken,
            peekToken: peekToken,
            consumeNodeOrToken: consumeNodeOrToken,
            getRewindPoint: getRewindPoint,
            rewind: rewind,
            releaseRewindPoint: releaseRewindPoint,
            tokenDiagnostics: tokenDiagnostics,
            release: release
        };
    }

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

    function returnSyntaxCursor(cursor: SyntaxCursor): void {
        // Make sure the cursor isn't holding onto any syntax elements.  We don't want to leak 
        // them when we return the cursor to the pool.
        cursor.clean();

        syntaxCursorPool[syntaxCursorPoolCount] = cursor;
        syntaxCursorPoolCount++;
    }

    function getSyntaxCursor(): SyntaxCursor {
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

    function cloneSyntaxCursor(cursor: SyntaxCursor): SyntaxCursor {
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

    // A simple walker we use to hit all the tokens of a node and update their positions when they
    // are reused in a different location because of an incremental parse.

    class TokenCollectorWalker extends SyntaxWalker {
        public tokens: ISyntaxToken[] = [];

        public visitToken(token: ISyntaxToken): void {
            this.tokens.push(token);
        }
    }

    var tokenCollectorWalker = new TokenCollectorWalker();
    function updateTokenPositionsAndMarkElements(element: ISyntaxElement, changeStart: number, changeRangeOldEnd: number, delta: number, fullStart: number): void {
            // First, try to skip past any elements that we dont' need to move.  We don't need to 
            // move any elements that don't start after the end of the change range.  
        if (fullStart > changeRangeOldEnd) {
            // Note, we only move elements that are truly after the end of the change range.
            // We consider elements that are touching the end of the change range to be unusable.
            forceUpdateTokenPositionsForElement(element, delta);
        }
        else {
            // Check if the element intersects the change range.  If it does, then it is not
            // reusable.  Also, we'll need to recurse to see what constituent portions we may
            // be able to use.
            var fullEnd = fullStart + fullWidth(element);
            if (fullEnd >= changeStart) {
                (<ISyntaxElementInternal>element).intersectsChange = true;

                if (isList(element)) {
                    var list = <ISyntaxNodeOrToken[]>element;
                    for (var i = 0, n = list.length; i < n; i++) {
                        var child: ISyntaxElement = list[i];
                        updateTokenPositionsAndMarkElements(child, changeStart, changeRangeOldEnd, delta, fullStart);
                        fullStart += fullWidth(child);
                    }
                }
                else if (isNode(element)) {
                    var node = <ISyntaxNode>element;
                    for (var i = 0, n = node.childCount; i < n; i++) {
                        var child = node.childAt(i);
                        if (child) {
                            updateTokenPositionsAndMarkElements(child, changeStart, changeRangeOldEnd, delta, fullStart);
                            fullStart += fullWidth(child);
                        }
                    }
                }
            }
            // else {
            // This element ended strictly before the edited range.  We don't need to do anything 
            // with it.
            // }
        }
    }

    function forceUpdateTokenPositionsForElement(element: ISyntaxElement, delta: number) {
        // No need to move anything if the delta is 0.
        if (delta !== 0) {
            if (isList(element)) {
                var list = <ISyntaxNodeOrToken[]>element;
                for (var i = 0, n = list.length; i < n; i++) {
                    forceUpdateTokenPositionForNodeOrToken(list[i], delta);
                }
            }
            else {
                forceUpdateTokenPositionForNodeOrToken(<ISyntaxNodeOrToken>element, delta);
            }
        }
    }

    function forceUpdateTokenPosition(token: ISyntaxToken, delta: number) {
        token.setFullStart(token.fullStart() + delta);
    }

    function forceUpdateTokenPositionForNodeOrToken(nodeOrToken: ISyntaxNodeOrToken, delta: number) {
        if (isToken(nodeOrToken)) {
            forceUpdateTokenPosition(<ISyntaxToken>nodeOrToken, delta);
        }
        else {
            var node = <ISyntaxNode>nodeOrToken;
            var tokens = getTokens(node);
            for (var i = 0, n = tokens.length; i < n; i++) {
                forceUpdateTokenPosition(tokens[i], delta);
            }
        }
    }

    function getTokens(node: ISyntaxNode): ISyntaxToken[] {
        var tokens = node.__cachedTokens;
        if (!tokens) {
            tokens = [];
            tokenCollectorWalker.tokens = tokens;

            visitNodeOrToken(tokenCollectorWalker, node);

            node.__cachedTokens = tokens;
            tokenCollectorWalker.tokens = undefined;
        }

        return tokens;
    }

    export function parse(oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree {
        if (textChangeRange.isUnchanged()) {
            return oldSyntaxTree;
        }

        return Parser.parseSource(createParserSource(oldSyntaxTree, textChangeRange, newText), oldSyntaxTree.isDeclaration());
    }
}