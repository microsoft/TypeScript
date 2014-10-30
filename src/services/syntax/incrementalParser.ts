///<reference path="references.ts" />

module TypeScript.IncrementalParser {
    interface IParserRewindPoint {
        // Information used by the incremental parser source.
        oldSourceUnitCursor: SyntaxCursor;
        changeDelta: number;
        changeRange: TextChangeRange;
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
        var fileName = oldSyntaxTree.fileName();
        var languageVersion = oldSyntaxTree.languageVersion();

        // The underlying source that we will use to scan tokens from any new text, or any tokens 
        // from the old tree that we decide we can't use for any reason.  We will also continue 
        // scanning tokens from this source until we've decided that we're resynchronized and can
        // read in subsequent data from the old tree.
        //
        // This parser source also keeps track of the absolute position in the text that we're in,
        // and any token diagnostics produced.  That way we dont' have to track that ourselves.
        var _scannerParserSource: Scanner.IScannerParserSource;

        // The range of text in the *original* text that was changed, and the new length of it after
        // the change.
        var _changeRange: TextChangeRange;

        // Cached value of _changeRange.newSpan().  Cached for performance.
        var _changeRangeNewSpan: TextSpan;

        // This number represents how our position in the old tree relates to the position we're 
        // pointing at in the new text.  If it is 0 then our positions are in sync and we can read
        // nodes or tokens from the old tree.  If it is non-zero, then our positions are not in 
        // sync and we cannot use nodes or tokens from the old tree.
        //
        // Now, changeDelta could be negative or positive.  Negative means 'the position we're at
        // in the original tree is behind the position we're at in the text'.  In this case we 
        // keep throwing out old nodes or tokens (and thus move forward in the original tree) until
        // changeDelta becomes 0 again or positive.  If it becomes 0 then we are resynched and can
        // read nodes or tokesn from the tree.
        //
        // If changeDelta is positive, that means the current node or token we're pointing at in 
        // the old tree is at a further ahead position than the position we're pointing at in the
        // new text.  In this case we have no choice but to scan tokens from teh new text.  We will
        // continue to do so until, again, changeDelta becomes 0 and we've resynced, or change delta
        // becomes negative and we need to skip nodes or tokes in the original tree.
        var _changeDelta: number = 0;

        // The cursor we use to navigate through and retrieve nodes and tokens from the old tree.
        var _oldSourceUnitCursor = getSyntaxCursor();
        var oldSourceUnit = oldSyntaxTree.sourceUnit();

        var _outstandingRewindPointCount = 0;

        // Start the cursor pointing at the first element in the source unit (if it exists).
        if (oldSourceUnit.moduleElements.length > 0) {
            _oldSourceUnitCursor.pushElement(childAt(oldSourceUnit.moduleElements, 0), /*indexInParent:*/ 0);
        }

        // In general supporting multiple individual edits is just not that important.  So we 
        // just collapse this all down to a single range to make the code here easier.  The only
        // time this could be problematic would be if the user made a ton of discontinuous edits.
        // For example, doing a column select on a *large* section of a code.  If this is a 
        // problem, we can always update this code to handle multiple changes.
        _changeRange = extendToAffectedRange(textChangeRange, oldSourceUnit);
        _changeRangeNewSpan = _changeRange.newSpan();

        // The old tree's length, plus whatever length change was caused by the edit
        // Had better equal the new text's length!
        if (Debug.shouldAssert(AssertionLevel.Aggressive)) {
            Debug.assert((fullWidth(oldSourceUnit) - _changeRange.span().length() + _changeRange.newLength()) === text.length());
        }

        // Set up a scanner so that we can scan tokens out of the new text.
        _scannerParserSource = Scanner.createParserSource(oldSyntaxTree.fileName(), text, oldSyntaxTree.languageVersion());

        function release() {
            _scannerParserSource.release();
            _scannerParserSource = undefined;
            _oldSourceUnitCursor = undefined;
            _outstandingRewindPointCount = 0;
        }

        function extendToAffectedRange(changeRange: TextChangeRange,
            sourceUnit: SourceUnitSyntax): TextChangeRange {
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
            //
            // Note: i believe (outside of regex tokens) max lookahead is just one token for 
            // TypeScript.  However, if this turns out to be wrong, we may have to increase how much
            // futher we look back. 
            //
            // Note: lookahead handling for regex characters is handled specially in during 
            // incremental parsing, and does not need to be handled here.

            var maxLookahead = 1;

            var start = changeRange.span().start();

            // the first iteration aligns us with the change start. subsequent iteration move us to
            // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
            // start of the tree.
            for (var i = 0; start > 0 && i <= maxLookahead; i++) {
                var token = findToken(sourceUnit, start);

                // Debug.assert(token.kind !== SyntaxKind.None);
                // Debug.assert(token.kind() === SyntaxKind.EndOfFileToken || token.fullWidth() > 0);

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

            // Clone our cursor.  That way we can restore to that point if hte parser needs to rewind.
            var oldSourceUnitCursorClone = cloneSyntaxCursor(_oldSourceUnitCursor);

            // Store where we were when the rewind point was created.
            rewindPoint.changeDelta = _changeDelta;
            rewindPoint.changeRange = _changeRange;
            rewindPoint.oldSourceUnitCursor = _oldSourceUnitCursor;

            _oldSourceUnitCursor = oldSourceUnitCursorClone;

            // Debug.assert(rewindPoint.pinCount === _oldSourceUnitCursor.pinCount());

            _outstandingRewindPointCount++;
            return rewindPoint;
        }

        function rewind(rewindPoint: IParserRewindPoint): void {
            // Restore our state to the values when the rewind point was created.
            _changeRange = rewindPoint.changeRange;
            _changeDelta = rewindPoint.changeDelta;

            // Reset the cursor to what it was when we got the rewind point.  Make sure to return 
            // our existing cursor to the pool so it can be reused.
            returnSyntaxCursor(_oldSourceUnitCursor);
            _oldSourceUnitCursor = rewindPoint.oldSourceUnitCursor;

            // Null out the cursor that the rewind point points to.  This way we don't try
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

        function canReadFromOldSourceUnit() {
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

            // If our current absolute position is in the middle of the changed range in the new text
            // then we definitely can't read from the old source unit right now.
            if (_changeRange && _changeRangeNewSpan.intersectsWithPosition(absolutePosition())) {
                return false;
            }

            // First, try to sync up with the new text if we're behind.
            syncCursorToNewTextIfBehind();

            // Now, if we're synced up *and* we're not currently pinned in the new text scanner,
            // then we can read a node from the cursor.  If we're pinned in the scanner then we
            // can't read a node from the cursor because we will mess up the pinned scanner when
            // we try to move it forward past this node.
            return _changeDelta === 0 &&
                !_oldSourceUnitCursor.isFinished();
        }

        function updateTokens(nodeOrToken: ISyntaxNodeOrToken): void {
            // If we got a node or token, and we're past the range of edited text, then walk its
            // constituent tokens, making sure all their positions are correct.  We don't need to
            // do this for the tokens before the edited range (since their positions couldn't have 
            // been affected by the edit), and we don't need to do this for the tokens in the 
            // edited range, as their positions will be correct when the underlying parser source 
            // creates them.

            var position = absolutePosition();
            var tokenWasMoved = isPastChangeRange() && fullStart(nodeOrToken) !== position;

            if (tokenWasMoved) {
                setTokenFullStartWalker.position = position;

                visitNodeOrToken(setTokenFullStartWalker, nodeOrToken);
            }
        }

        function currentNode(): ISyntaxNode {
            if (canReadFromOldSourceUnit()) {
                // Try to read a node.  If we can't then our caller will call back in and just try
                // to get a token.
                var node = tryGetNodeFromOldSourceUnit();
                if (node) {
                    // Make sure the positions for the tokens in this node are correct.
                    updateTokens(node);
                    return node;
                }
            }

            // Either we were ahead of the old text, or we were pinned.  No node can be read here.
            return undefined;
        }

        function currentToken(): ISyntaxToken {
            if (canReadFromOldSourceUnit()) {
                var token = tryGetTokenFromOldSourceUnit();
                if (token) {
                    // Make sure the token's position/text is correct.
                    updateTokens(token);
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

        function syncCursorToNewTextIfBehind() {
            while (true) {
                if (_oldSourceUnitCursor.isFinished()) {
                    // Can't sync up if the cursor is finished.
                    break;
                }

                if (_changeDelta >= 0) {
                    // Nothing to do if we're synced up or ahead of the text.
                    break;
                }

                // We're behind in the original tree.  Throw out a node or token in an attempt to 
                // catch up to the position we're at in the new text.

                var currentNodeOrToken = _oldSourceUnitCursor.currentNodeOrToken();

                // If we're pointing at a node, and that node's width is less than our delta,
                // then we can just skip that node.  Otherwise, if we're pointing at a node
                // whose width is greater than the delta, then crumble it and try again.
                // Otherwise, we must be pointing at a token.  Just skip it and try again.

                if (isNode(currentNodeOrToken) && (fullWidth(currentNodeOrToken) > Math.abs(_changeDelta))) {
                    // We were pointing at a node whose width was more than changeDelta.  Crumble the 
                    // node and try again.  Note: we haven't changed changeDelta.  So the callers loop
                    // will just repeat this until we get to a node or token that we can skip over.
                    _oldSourceUnitCursor.moveToFirstChild();
                }
                else {
                    _oldSourceUnitCursor.moveToNextSibling();

                    // Get our change delta closer to 0 as we skip past this item.
                    _changeDelta += fullWidth(currentNodeOrToken);

                    // If this was a node, then our changeDelta is 0 or negative.  If this was a 
                    // token, then we could still be negative (and we have to read another token),
                    // we could be zero (we're done), or we could be positive (we've moved ahead
                    // of the new text).  Only if we're negative will we continue looping.
                }
            }

            // At this point, we must be either:
            //   a) done with the cursor
            //   b) (ideally) caught up to the new text position.
            //   c) ahead of the new text position.
            // In case 'b' we can try to reuse a node from teh old tree.
            // Debug.assert(_oldSourceUnitCursor.isFinished() || _changeDelta >= 0);
        }

        function intersectsWithChangeRangeSpanInOriginalText(start: number, length: number) {
            return !isPastChangeRange() && _changeRange.span().intersectsWith(start, length);
        }

        function tryGetNodeFromOldSourceUnit(): ISyntaxNode {
            // Debug.assert(canReadFromOldSourceUnit());

            // Keep moving the cursor down to the first node that is safe to return.  A node is 
            // safe to return if:
            //  a) it does not intersect the changed text.
            //  b) it does not contain skipped text.
            //  c) it does not have any zero width tokens in it.
            //  d) it does not have a regex token in it.
            //  e) we are still in the same strict or non-strict state that the node was originally parsed in.
            while (true) {
                var node = _oldSourceUnitCursor.currentNode();
                if (node === undefined) {
                    // Couldn't even read a node, nothing to return.
                    return undefined;
                }

                if (!intersectsWithChangeRangeSpanInOriginalText(absolutePosition(), fullWidth(node))) {
                    // Didn't intersect with the change range.
                    var isIncrementallyUnusuable = TypeScript.isIncrementallyUnusable(node);
                    if (!isIncrementallyUnusuable) {

                        // Didn't contain anything that would make it unusable.  Awesome.  This is
                        // a node we can reuse.
                        return node;
                    }
                }

                // We couldn't use currentNode. Try to move to its first child (in case that's a 
                // node).  If it is we can try using that.  Otherwise we'll just bail out in the
                // next iteration of the loop.
                _oldSourceUnitCursor.moveToFirstChild();
            }
        }

        function canReuseTokenFromOldSourceUnit(position: number, token: ISyntaxToken): boolean {
            // A token is safe to return if:
            //  a) it does not intersect the changed text.
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
            if (token) {
                if (!intersectsWithChangeRangeSpanInOriginalText(position, token.fullWidth())) {
                    // Didn't intersect with the change range.
                    if (!token.isIncrementallyUnusable() && !Scanner.isContextualToken(token)) {

                        // Didn't contain anything that would make it unusable.  Awesome.  This is
                        // a token we can reuse.
                        return true;
                    }
                }
            }

            return false;
        }

        function tryGetTokenFromOldSourceUnit(): ISyntaxToken {
            // Debug.assert(canReadFromOldSourceUnit());

            // get the current token that the cursor is pointing at.
            var token = _oldSourceUnitCursor.currentToken();

            return canReuseTokenFromOldSourceUnit(absolutePosition(), token)
                ? token : undefined;
        }

        function peekToken(n: number): ISyntaxToken {
            if (canReadFromOldSourceUnit()) {
                var token = tryPeekTokenFromOldSourceUnit(n);
                if (token) {
                    return token;
                }
            }

            // Couldn't peek this far in the old tree.  Get the token from the new text.
            return _scannerParserSource.peekToken(n);
        }

        function tryPeekTokenFromOldSourceUnit(n: number): ISyntaxToken {
            // Debug.assert(canReadFromOldSourceUnit());

            // clone the existing cursor so we can move it forward and then restore ourselves back
            // to where we started from.

            var cursorClone = cloneSyntaxCursor(_oldSourceUnitCursor);

            var token = tryPeekTokenFromOldSourceUnitWorker(n);

            returnSyntaxCursor(_oldSourceUnitCursor);
            _oldSourceUnitCursor = cursorClone;

            return token;
        }

        function tryPeekTokenFromOldSourceUnitWorker(n: number): ISyntaxToken {
            // In order to peek the 'nth' token we need all the tokens up to that point.  That way
            // we know we know position that the nth token is at.  The position is necessary so 
            // that we can test if this token (or any that precede it cross the change range).
            var currentPosition = absolutePosition();

            // First, make sure the cursor is pointing at a token.
            _oldSourceUnitCursor.moveToFirstToken();

            // Now, keep walking forward to successive tokens.
            for (var i = 0; i < n; i++) {
                var interimToken = _oldSourceUnitCursor.currentToken();

                if (!canReuseTokenFromOldSourceUnit(currentPosition, interimToken)) {
                    return undefined;
                }

                currentPosition += interimToken.fullWidth();
                _oldSourceUnitCursor.moveToNextSibling();
            }

            var token = _oldSourceUnitCursor.currentToken();
            return canReuseTokenFromOldSourceUnit(currentPosition, token)
                ? token : undefined;
        }

        function consumeNode(node: ISyntaxNode): void {
            // A node could have only come from the old source unit cursor.  Update it and our 
            // current state.
            // Debug.assert(_changeDelta === 0);
            // Debug.assert(currentNode() === node);

            _oldSourceUnitCursor.moveToNextSibling();

            // Update the underlying source with where it should now be currently pointin.
            var _absolutePosition = absolutePosition() + fullWidth(node);
            _scannerParserSource.resetToPosition(_absolutePosition);

            // Debug.assert(previousToken !== undefined);
            // Debug.assert(previousToken.width() > 0);

            //if (!isPastChangeRange()) {
            //    // If we still have a change range, then this node must have ended before the 
            //    // change range starts.  Thus, we don't need to call 'skipPastChanges'.
            //    Debug.assert(absolutePosition() < _changeRange.span().start());
            //}
        }

        function consumeToken(currentToken: ISyntaxToken): void {
            // This token may have come from the old source unit, or from the new text.  Handle
            // both accordingly.

            if (_oldSourceUnitCursor.currentToken() === currentToken) {
                // The token came from the old source unit.  So our tree and text must be in sync.
                // Debug.assert(_changeDelta === 0);

                // Move the cursor past this token.
                _oldSourceUnitCursor.moveToNextSibling();

                // Debug.assert(!_normalParserSource.isPinned());

                // Update the underlying source with where it should now be currently pointing. We 
                // don't need to do this when the token came from the new text as the source will
                // automatically be placed in the right position.
                var _absolutePosition = absolutePosition() + currentToken.fullWidth();
                _scannerParserSource.resetToPosition(_absolutePosition);

                // Debug.assert(previousToken !== undefined);
                // Debug.assert(previousToken.width() > 0);

                //if (!isPastChangeRange()) {
                //    // If we still have a change range, then this token must have ended before the 
                //    // change range starts.  Thus, we don't need to call 'skipPastChanges'.
                //    Debug.assert(absolutePosition() < _changeRange.span().start());
                //}
            }
            else {
                // the token came from the new text.  That means the normal source moved forward,
                // while the syntax cursor stayed in the same place.  Thus our delta moves even 
                // further back.
                _changeDelta -= currentToken.fullWidth();

                // Move our underlying source forward.
                _scannerParserSource.consumeToken(currentToken);

                // Because we read a token from the new text, we may have moved ourselves past the
                // change range.  If we did, then we may also have to update our change delta to
                // compensate for the length change between the old and new text.
                if (!isPastChangeRange()) {
                    // var changeEndInNewText = _changeRange.span().start() + _changeRange.newLength();
                    if (absolutePosition() >= _changeRangeNewSpan.end()) {
                        _changeDelta += _changeRange.newLength() - _changeRange.span().length();

                        // Once we're past the change range, we no longer need it.  Null it out.
                        // From now on we can check if we're past the change range just by seeing
                        // if this is undefined.
                        _changeRange = undefined;
                    }
                }
            }
        }

        function isPastChangeRange(): boolean {
            return _changeRange === undefined;
        }

        return {
            text: text,
            fileName: fileName,
            languageVersion: languageVersion,
            currentNode: currentNode,
            currentToken: currentToken,
            currentContextualToken: currentContextualToken,
            peekToken: peekToken,
            consumeNode: consumeNode,
            consumeToken: consumeToken,
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
            // Debug.assert(currentPieceIndex === -1);
            for (var i = 0, n = other.pieces.length; i < n; i++) {
                var piece = other.pieces[i];

                if (piece.element === undefined) {
                    break;
                }

                pushElement(piece.element, piece.indexInParent);
            }

            // Debug.assert(currentPieceIndex === other.currentPieceIndex);
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
            // Debug.assert(result !== undefined);
            // Debug.assert(result.isNode() || result.isToken());

            return <ISyntaxNodeOrToken>result;
        }

        function currentNode(): ISyntaxNode {
            var element = currentNodeOrToken();
            return isNode(element) ? <ISyntaxNode>element : undefined;
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

            // The last element must be a token or a node.
            // Debug.assert(isNode(nodeOrToken));

            // Either the node has some existent child, then move to it.  if it doesn't, then it's
            // an empty node.  Conceptually the first child of an empty node is really just the 
            // next sibling of the empty node.
            for (var i = 0, n = childCount(nodeOrToken); i < n; i++) {
                var child = childAt(nodeOrToken, i);
                if (child && !isShared(child)) {
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

            // Debug.assert(fullWidth(nodeOrToken) === 0);
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

                    if (sibling && !isShared(sibling)) {
                        // We found a good sibling that we can move to.  Just reuse our existing piece
                        // so we don't have to push/pop.
                        currentPiece.element = sibling;
                        currentPiece.indexInParent = i;

                        // The sibling might have been a list.  Move to it's first child.  it must have
                        // one since this was a non-shared element.
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

            if (isList(element) || isSeparatedList(element)) {
                // We cannot ever get an empty list in our piece path.  Empty lists are 'shared' and
                // we make sure to filter that out before pushing any children.
                // Debug.assert(childCount(element) > 0);

                pushElement(childAt(element, 0), /*indexInParent:*/ 0);
            }
        }

        function pushElement(element: ISyntaxElement, indexInParent: number): void {
            // Debug.assert(element !== undefined);
            // Debug.assert(indexInParent >= 0);
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

                // Debug.assert(isToken(element));
                return;
            }
        }

        function currentToken(): ISyntaxToken {
            moveToFirstToken();

            var element = currentNodeOrToken();
            // Debug.assert(element === undefined || element.isToken());
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

    class SetTokenFullStartWalker extends SyntaxWalker {
        public position: number;

        public visitToken(token: ISyntaxToken): void {
            var position = this.position;
            token.setFullStart(position);

            this.position = position + token.fullWidth();
        }
    }

    var setTokenFullStartWalker = new SetTokenFullStartWalker();

    export function parse(oldSyntaxTree: SyntaxTree, textChangeRange: TextChangeRange, newText: ISimpleText): SyntaxTree {
        Debug.assert(oldSyntaxTree.isConcrete(), "Can only incrementally parse a concrete syntax tree.");
        if (textChangeRange.isUnchanged()) {
            return oldSyntaxTree;
        }

        return Parser.parseSource(createParserSource(oldSyntaxTree, textChangeRange, newText), oldSyntaxTree.isDeclaration());
    }
}