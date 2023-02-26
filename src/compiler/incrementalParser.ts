import {
    append,
    AssertionLevel,
} from "./core";
import { Debug } from "./debug";
import {
    fixupParentReferences,
    forEachChild,
    parseSourceFile,
} from "./parser";
import {
    CommentDirective,
    IncrementalElement,
    IncrementalNode,
    Node,
    NodeArray,
    SourceFile,
    SyntaxCursor,
    SyntaxKind,
    TextChangeRange,
} from "./types";
import {
    getLastChild,
    nodeIsMissing,
    setTextRangePosEnd,
} from "./utilities";
import {
    createTextChangeRange,
    createTextSpanFromBounds,
    hasJSDocNodes,
    textChangeRangeIsUnchanged,
    textChangeRangeNewSpan,
    textSpanEnd,
} from "./utilitiesPublic";

function getNewCommentDirectives(
    oldDirectives: CommentDirective[] | undefined,
    newDirectives: CommentDirective[] | undefined,
    changeStart: number,
    changeRangeOldEnd: number,
    delta: number,
    oldText: string,
    newText: string,
    aggressiveChecks: boolean
): CommentDirective[] | undefined {
    if (!oldDirectives) return newDirectives;
    let commentDirectives: CommentDirective[] | undefined;
    let addedNewlyScannedDirectives = false;
    for (const directive of oldDirectives) {
        const { range, type } = directive;
        // Range before the change
        if (range.end < changeStart) {
            commentDirectives = append(commentDirectives, directive);
        }
        else if (range.pos > changeRangeOldEnd) {
            addNewlyScannedDirectives();
            // Node is entirely past the change range.  We need to move both its pos and
            // end, forward or backward appropriately.
            const updatedDirective: CommentDirective = {
                range: { pos: range.pos + delta, end: range.end + delta },
                type
            };
            commentDirectives = append(commentDirectives, updatedDirective);
            if (aggressiveChecks) {
                Debug.assert(oldText.substring(range.pos, range.end) === newText.substring(updatedDirective.range.pos, updatedDirective.range.end));
            }
        }
        // Ignore ranges that fall in change range
    }
    addNewlyScannedDirectives();
    return commentDirectives;

    function addNewlyScannedDirectives() {
        if (addedNewlyScannedDirectives) return;
        addedNewlyScannedDirectives = true;
        if (!commentDirectives) {
            commentDirectives = newDirectives;
        }
        else if (newDirectives) {
            commentDirectives.push(...newDirectives);
        }
    }
}

function moveElementEntirelyPastChangeRange(element: IncrementalNode, isArray: false, delta: number, oldText: string, newText: string, aggressiveChecks: boolean): void;
function moveElementEntirelyPastChangeRange(element: IncrementalNodeArray, isArray: true, delta: number, oldText: string, newText: string, aggressiveChecks: boolean): void;
function moveElementEntirelyPastChangeRange(element: IncrementalNode | IncrementalNodeArray, isArray: boolean, delta: number, oldText: string, newText: string, aggressiveChecks: boolean) {
    if (isArray) {
        visitArray(element as IncrementalNodeArray);
    }
    else {
        visitNode(element as IncrementalNode);
    }
    return;

    function visitNode(node: IncrementalNode) {
        let text = "";
        if (aggressiveChecks && shouldCheckNode(node)) {
            text = oldText.substring(node.pos, node.end);
        }

        // Ditch any existing LS children we may have created.  This way we can avoid
        // moving them forward.
        if (node._children) {
            node._children = undefined;
        }

        setTextRangePosEnd(node, node.pos + delta, node.end + delta);

        if (aggressiveChecks && shouldCheckNode(node)) {
            Debug.assert(text === newText.substring(node.pos, node.end));
        }

        forEachChild(node, visitNode as (node: Node) => void, visitArray as (nodes: NodeArray<Node>) => void);
        if (hasJSDocNodes(node)) {
            for (const jsDocComment of node.jsDoc!) {
                visitNode(jsDocComment as Node as IncrementalNode);
            }
        }
        checkNodePositions(node, aggressiveChecks);
    }

    function visitArray(array: IncrementalNodeArray) {
        array._children = undefined;
        setTextRangePosEnd(array, array.pos + delta, array.end + delta);

        for (const node of array) {
            visitNode(node);
        }
    }
}

function shouldCheckNode(node: Node) {
    switch (node.kind) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.Identifier:
            return true;
    }

    return false;
}

function adjustIntersectingElement(element: IncrementalElement, changeStart: number, changeRangeOldEnd: number, changeRangeNewEnd: number, delta: number) {
    Debug.assert(element.end >= changeStart, "Adjusting an element that was entirely before the change range");
    Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");
    Debug.assert(element.pos <= element.end);

    // We have an element that intersects the change range in some way.  It may have its
    // start, or its end (or both) in the changed range.  We want to adjust any part
    // that intersects such that the final tree is in a consistent state.  i.e. all
    // children have spans within the span of their parent, and all siblings are ordered
    // properly.

    // We may need to update both the 'pos' and the 'end' of the element.

    // If the 'pos' is before the start of the change, then we don't need to touch it.
    // If it isn't, then the 'pos' must be inside the change.  How we update it will
    // depend if delta is positive or negative. If delta is positive then we have
    // something like:
    //
    //  -------------------AAA-----------------
    //  -------------------BBBCCCCCCC-----------------
    //
    // In this case, we consider any node that started in the change range to still be
    // starting at the same position.
    //
    // however, if the delta is negative, then we instead have something like this:
    //
    //  -------------------XXXYYYYYYY-----------------
    //  -------------------ZZZ-----------------
    //
    // In this case, any element that started in the 'X' range will keep its position.
    // However any element that started after that will have their pos adjusted to be
    // at the end of the new range.  i.e. any node that started in the 'Y' range will
    // be adjusted to have their start at the end of the 'Z' range.
    //
    // The element will keep its position if possible.  Or Move backward to the new-end
    // if it's in the 'Y' range.
    const pos = Math.min(element.pos, changeRangeNewEnd);

    // If the 'end' is after the change range, then we always adjust it by the delta
    // amount.  However, if the end is in the change range, then how we adjust it
    // will depend on if delta is positive or negative.  If delta is positive then we
    // have something like:
    //
    //  -------------------AAA-----------------
    //  -------------------BBBCCCCCCC-----------------
    //
    // In this case, we consider any node that ended inside the change range to keep its
    // end position.
    //
    // however, if the delta is negative, then we instead have something like this:
    //
    //  -------------------XXXYYYYYYY-----------------
    //  -------------------ZZZ-----------------
    //
    // In this case, any element that ended in the 'X' range will keep its position.
    // However any element that ended after that will have their pos adjusted to be
    // at the end of the new range.  i.e. any node that ended in the 'Y' range will
    // be adjusted to have their end at the end of the 'Z' range.
    const end = element.end >= changeRangeOldEnd ?
        // Element ends after the change range.  Always adjust the end pos.
        element.end + delta :
        // Element ends in the change range.  The element will keep its position if
        // possible. Or Move backward to the new-end if it's in the 'Y' range.
        Math.min(element.end, changeRangeNewEnd);

    Debug.assert(pos <= end);
    if (element.parent) {
        Debug.assertGreaterThanOrEqual(pos, element.parent.pos);
        Debug.assertLessThanOrEqual(end, element.parent.end);
    }

    setTextRangePosEnd(element, pos, end);
}

function checkNodePositions(node: Node, aggressiveChecks: boolean) {
    if (aggressiveChecks) {
        let pos = node.pos;
        const visitNode = (child: Node) => {
            Debug.assert(child.pos >= pos);
            pos = child.end;
        };
        if (hasJSDocNodes(node)) {
            for (const jsDocComment of node.jsDoc!) {
                visitNode(jsDocComment);
            }
        }
        forEachChild(node, visitNode);
        Debug.assert(pos <= node.end);
    }
}

function updateTokenPositionsAndMarkElements(
    sourceFile: IncrementalNode,
    changeStart: number,
    changeRangeOldEnd: number,
    changeRangeNewEnd: number,
    delta: number,
    oldText: string,
    newText: string,
    aggressiveChecks: boolean): void {

    visitNode(sourceFile);
    return;

    function visitNode(child: IncrementalNode) {
        Debug.assert(child.pos <= child.end);
        if (child.pos > changeRangeOldEnd) {
            // Node is entirely past the change range.  We need to move both its pos and
            // end, forward or backward appropriately.
            moveElementEntirelyPastChangeRange(child, /*isArray*/ false, delta, oldText, newText, aggressiveChecks);
            return;
        }

        // Check if the element intersects the change range.  If it does, then it is not
        // reusable.  Also, we'll need to recurse to see what constituent portions we may
        // be able to use.
        const fullEnd = child.end;
        if (fullEnd >= changeStart) {
            child.intersectsChange = true;
            child._children = undefined;

            // Adjust the pos or end (or both) of the intersecting element accordingly.
            adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
            forEachChild(child, visitNode as (node: Node) => void, visitArray as (nodes: NodeArray<Node>) => void);
            if (hasJSDocNodes(child)) {
                for (const jsDocComment of child.jsDoc!) {
                    visitNode(jsDocComment as Node as IncrementalNode);
                }
            }
            checkNodePositions(child, aggressiveChecks);
            return;
        }

        // Otherwise, the node is entirely before the change range.  No need to do anything with it.
        Debug.assert(fullEnd < changeStart);
    }

    function visitArray(array: IncrementalNodeArray) {
        Debug.assert(array.pos <= array.end);
        if (array.pos > changeRangeOldEnd) {
            // Array is entirely after the change range.  We need to move it, and move any of
            // its children.
            moveElementEntirelyPastChangeRange(array, /*isArray*/ true, delta, oldText, newText, aggressiveChecks);
            return;
        }

        // Check if the element intersects the change range.  If it does, then it is not
        // reusable.  Also, we'll need to recurse to see what constituent portions we may
        // be able to use.
        const fullEnd = array.end;
        if (fullEnd >= changeStart) {
            array.intersectsChange = true;
            array._children = undefined;

            // Adjust the pos or end (or both) of the intersecting array accordingly.
            adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
            for (const node of array) {
                visitNode(node);
            }
            return;
        }

        // Otherwise, the array is entirely before the change range.  No need to do anything with it.
        Debug.assert(fullEnd < changeStart);
    }
}

function extendToAffectedRange(sourceFile: SourceFile, changeRange: TextChangeRange): TextChangeRange {
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
    const maxLookahead = 1;

    let start = changeRange.span.start;

    // the first iteration aligns us with the change start. subsequent iteration move us to
    // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
    // start of the tree.
    for (let i = 0; start > 0 && i <= maxLookahead; i++) {
        const nearestNode = findNearestNodeStartingBeforeOrAtPosition(sourceFile, start);
        Debug.assert(nearestNode.pos <= start);
        const position = nearestNode.pos;

        start = Math.max(0, position - 1);
    }

    const finalSpan = createTextSpanFromBounds(start, textSpanEnd(changeRange.span));
    const finalLength = changeRange.newLength + (changeRange.span.start - start);

    return createTextChangeRange(finalSpan, finalLength);
}

function findNearestNodeStartingBeforeOrAtPosition(sourceFile: SourceFile, position: number): Node {
    let bestResult: Node = sourceFile;
    let lastNodeEntirelyBeforePosition: Node | undefined;

    forEachChild(sourceFile, visit);

    if (lastNodeEntirelyBeforePosition) {
        const lastChildOfLastEntireNodeBeforePosition = getLastDescendant(lastNodeEntirelyBeforePosition);
        if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
            bestResult = lastChildOfLastEntireNodeBeforePosition;
        }
    }

    return bestResult;

    function getLastDescendant(node: Node): Node {
        while (true) {
            const lastChild = getLastChild(node);
            if (lastChild) {
                node = lastChild;
            }
            else {
                return node;
            }
        }
    }

    function visit(child: Node) {
        if (nodeIsMissing(child)) {
            // Missing nodes are effectively invisible to us.  We never even consider them
            // When trying to find the nearest node before us.
            return;
        }

        // If the child intersects this position, then this node is currently the nearest
        // node that starts before the position.
        if (child.pos <= position) {
            if (child.pos >= bestResult.pos) {
                // This node starts before the position, and is closer to the position than
                // the previous best node we found.  It is now the new best node.
                bestResult = child;
            }

            // Now, the node may overlap the position, or it may end entirely before the
            // position.  If it overlaps with the position, then either it, or one of its
            // children must be the nearest node before the position.  So we can just
            // recurse into this child to see if we can find something better.
            if (position < child.end) {
                // The nearest node is either this child, or one of the children inside
                // of it.  We've already marked this child as the best so far.  Recurse
                // in case one of the children is better.
                forEachChild(child, visit);

                // Once we look at the children of this node, then there's no need to
                // continue any further.
                return true;
            }
            else {
                Debug.assert(child.end <= position);
                // The child ends entirely before this position.  Say you have the following
                // (where $ is the position)
                //
                //      <complex expr 1> ? <complex expr 2> $ : <...> <...>
                //
                // We would want to find the nearest preceding node in "complex expr 2".
                // To support that, we keep track of this node, and once we're done searching
                // for a best node, we recurse down this node to see if we can find a good
                // result in it.
                //
                // This approach allows us to quickly skip over nodes that are entirely
                // before the position, while still allowing us to find any nodes in the
                // last one that might be what we want.
                lastNodeEntirelyBeforePosition = child;
            }
        }
        else {
            Debug.assert(child.pos > position);
            // We're now at a node that is entirely past the position we're searching for.
            // This node (and all following nodes) could never contribute to the result,
            // so just skip them by returning 'true' here.
            return true;
        }
    }
}

function checkChangeRange(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks: boolean) {
    const oldText = sourceFile.text;
    if (textChangeRange) {
        Debug.assert((oldText.length - textChangeRange.span.length + textChangeRange.newLength) === newText.length);

        if (aggressiveChecks || Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
            const oldTextPrefix = oldText.substr(0, textChangeRange.span.start);
            const newTextPrefix = newText.substr(0, textChangeRange.span.start);
            Debug.assert(oldTextPrefix === newTextPrefix);

            const oldTextSuffix = oldText.substring(textSpanEnd(textChangeRange.span), oldText.length);
            const newTextSuffix = newText.substring(textSpanEnd(textChangeRangeNewSpan(textChangeRange)), newText.length);
            Debug.assert(oldTextSuffix === newTextSuffix);
        }
    }
}

const enum InvalidPosition {
    Value = -1
}

interface IncrementalNodeArray extends NodeArray<IncrementalNode>, IncrementalElement {
    length: number;
}

export function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks: boolean): SourceFile {
    aggressiveChecks = aggressiveChecks || Debug.shouldAssert(AssertionLevel.Aggressive);

    checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks);
    if (textChangeRangeIsUnchanged(textChangeRange)) {
        // if the text didn't change, then we can just return our current source file as-is.
        return sourceFile;
    }

    if (sourceFile.statements.length === 0) {
        // If we don't have any statements in the current source file, then there's no real
        // way to incrementally parse.  So just do a full parse instead.
        return parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, /*syntaxCursor*/ undefined, /*setParentNodes*/ true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator);
    }

    // Make sure we're not trying to incrementally update a source file more than once.  Once
    // we do an update the original source file is considered unusable from that point onwards.
    //
    // This is because we do incremental parsing in-place.  i.e. we take nodes from the old
    // tree and give them new positions and parents.  From that point on, trusting the old
    // tree at all is not possible as far too much of it may violate invariants.
    const incrementalSourceFile = sourceFile as Node as IncrementalNode;
    Debug.assert(!incrementalSourceFile.hasBeenIncrementallyParsed);
    incrementalSourceFile.hasBeenIncrementallyParsed = true;
    fixupParentReferences(incrementalSourceFile);
    const oldText = sourceFile.text;
    const syntaxCursor = createSyntaxCursor(sourceFile);

    // Make the actual change larger so that we know to reparse anything whose lookahead
    // might have intersected the change.
    const changeRange = extendToAffectedRange(sourceFile, textChangeRange);
    checkChangeRange(sourceFile, newText, changeRange, aggressiveChecks);

    // Ensure that extending the affected range only moved the start of the change range
    // earlier in the file.
    Debug.assert(changeRange.span.start <= textChangeRange.span.start);
    Debug.assert(textSpanEnd(changeRange.span) === textSpanEnd(textChangeRange.span));
    Debug.assert(textSpanEnd(textChangeRangeNewSpan(changeRange)) === textSpanEnd(textChangeRangeNewSpan(textChangeRange)));

    // The is the amount the nodes after the edit range need to be adjusted.  It can be
    // positive (if the edit added characters), negative (if the edit deleted characters)
    // or zero (if this was a pure overwrite with nothing added/removed).
    const delta = textChangeRangeNewSpan(changeRange).length - changeRange.span.length;

    // If we added or removed characters during the edit, then we need to go and adjust all
    // the nodes after the edit.  Those nodes may move forward (if we inserted chars) or they
    // may move backward (if we deleted chars).
    //
    // Doing this helps us out in two ways.  First, it means that any nodes/tokens we want
    // to reuse are already at the appropriate position in the new text.  That way when we
    // reuse them, we don't have to figure out if they need to be adjusted.  Second, it makes
    // it very easy to determine if we can reuse a node.  If the node's position is at where
    // we are in the text, then we can reuse it.  Otherwise we can't.  If the node's position
    // is ahead of us, then we'll need to rescan tokens.  If the node's position is behind
    // us, then we'll need to skip it or crumble it as appropriate
    //
    // We will also adjust the positions of nodes that intersect the change range as well.
    // By doing this, we ensure that all the positions in the old tree are consistent, not
    // just the positions of nodes entirely before/after the change range.  By being
    // consistent, we can then easily map from positions to nodes in the old tree easily.
    //
    // Also, mark any syntax elements that intersect the changed span.  We know, up front,
    // that we cannot reuse these elements.
    updateTokenPositionsAndMarkElements(incrementalSourceFile,
        changeRange.span.start, textSpanEnd(changeRange.span), textSpanEnd(textChangeRangeNewSpan(changeRange)), delta, oldText, newText, aggressiveChecks);

    // Now that we've set up our internal incremental state just proceed and parse the
    // source file in the normal fashion.  When possible the parser will retrieve and
    // reuse nodes from the old tree.
    //
    // Note: passing in 'true' for setNodeParents is very important.  When incrementally
    // parsing, we will be reusing nodes from the old tree, and placing it into new
    // parents.  If we don't set the parents now, we'll end up with an observably
    // inconsistent tree.  Setting the parents on the new tree should be very fast.  We
    // will immediately bail out of walking any subtrees when we can see that their parents
    // are already correct.
    const result = parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, syntaxCursor, /*setParentNodes*/ true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator);
    result.commentDirectives = getNewCommentDirectives(
        sourceFile.commentDirectives,
        result.commentDirectives,
        changeRange.span.start,
        textSpanEnd(changeRange.span),
        delta,
        oldText,
        newText,
        aggressiveChecks
    );
    result.impliedNodeFormat = sourceFile.impliedNodeFormat;
    return result;
}

// Allows finding nodes in the source file at a certain position in an efficient manner.
// The implementation takes advantage of the calling pattern it knows the parser will
// make in order to optimize finding nodes as quickly as possible.
export function createSyntaxCursor(sourceFile: SourceFile): SyntaxCursor {
    let currentArray: NodeArray<Node> = sourceFile.statements;
    let currentArrayIndex = 0;

    Debug.assert(currentArrayIndex < currentArray.length);
    let current = currentArray[currentArrayIndex];
    let lastQueriedPosition = InvalidPosition.Value;

    return {
        currentNode(position: number) {
            // Only compute the current node if the position is different than the last time
            // we were asked.  The parser commonly asks for the node at the same position
            // twice.  Once to know if can read an appropriate list element at a certain point,
            // and then to actually read and consume the node.
            if (position !== lastQueriedPosition) {
                // Much of the time the parser will need the very next node in the array that
                // we just returned a node from.So just simply check for that case and move
                // forward in the array instead of searching for the node again.
                if (current && current.end === position && currentArrayIndex < (currentArray.length - 1)) {
                    currentArrayIndex++;
                    current = currentArray[currentArrayIndex];
                }

                // If we don't have a node, or the node we have isn't in the right position,
                // then try to find a viable node at the position requested.
                if (!current || current.pos !== position) {
                    findHighestListElementThatStartsAtPosition(position);
                }
            }

            // Cache this query so that we don't do any extra work if the parser calls back
            // into us.  Note: this is very common as the parser will make pairs of calls like
            // 'isListElement -> parseListElement'.  If we were unable to find a node when
            // called with 'isListElement', we don't want to redo the work when parseListElement
            // is called immediately after.
            lastQueriedPosition = position;

            // Either we don'd have a node, or we have a node at the position being asked for.
            Debug.assert(!current || current.pos === position);
            return current as IncrementalNode;
        }
    };

    // Finds the highest element in the tree we can find that starts at the provided position.
    // The element must be a direct child of some node list in the tree.  This way after we
    // return it, we can easily return its next sibling in the list.
    function findHighestListElementThatStartsAtPosition(position: number) {
        // Clear out any cached state about the last node we found.
        currentArray = undefined!;
        currentArrayIndex = InvalidPosition.Value;
        current = undefined!;

        // Recurse into the source file to find the highest node at this position.
        forEachChild(sourceFile, visitNode, visitArray);
        return;

        function visitNode(node: Node) {
            if (position >= node.pos && position < node.end) {
                // Position was within this node.  Keep searching deeper to find the node.
                forEachChild(node, visitNode, visitArray);

                // don't proceed any further in the search.
                return true;
            }

            // position wasn't in this node, have to keep searching.
            return false;
        }

        function visitArray(array: NodeArray<Node>) {
            if (position >= array.pos && position < array.end) {
                // position was in this array.  Search through this array to see if we find a
                // viable element.
                for (let i = 0; i < array.length; i++) {
                    const child = array[i];
                    if (child) {
                        if (child.pos === position) {
                            // Found the right node.  We're done.
                            currentArray = array;
                            currentArrayIndex = i;
                            current = child;
                            return true;
                        }
                        else {
                            if (child.pos < position && position < child.end) {
                                // Position in somewhere within this child.  Search in it and
                                // stop searching in this array.
                                forEachChild(child, visitNode, visitArray);
                                return true;
                            }
                        }
                    }
                }
            }

            // position wasn't in this array, have to keep searching.
            return false;
        }
    }
}
