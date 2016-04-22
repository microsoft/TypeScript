/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        getLeadingComments(range: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange): CommentRange[];
        getLeadingComments(range: TextRange): CommentRange[];
        getLeadingCommentsOfPosition(pos: number): CommentRange[];
        getTrailingComments(range: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange): CommentRange[];
        getTrailingComments(range: TextRange): CommentRange[];
        getTrailingCommentsOfPosition(pos: number): CommentRange[];
        emitLeadingComments(range: TextRange, comments: CommentRange[]): void;
        emitTrailingComments(range: TextRange, comments: CommentRange[]): void;
        emitLeadingDetachedComments(range: TextRange): void;
        emitLeadingDetachedComments(range: TextRange, contextNode: Node, shouldSkipCommentsForNodeCallback: (node: Node) => boolean): void;
        emitTrailingDetachedComments(range: TextRange): void;
        emitTrailingDetachedComments(range: TextRange, contextNode: Node, shouldSkipCommentsForNodeCallback: (node: Node) => boolean): void;
    }

    export function createCommentWriter(host: EmitHost, writer: EmitTextWriter, sourceMap: SourceMapWriter): CommentWriter {
        const compilerOptions = host.getCompilerOptions();
        const newLine = host.getNewLine();
        const { emitPos } = sourceMap;

        let currentSourceFile: SourceFile;
        let currentText: string;
        let currentLineMap: number[];
        let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number}[];

        // This maps start->end for a comment range. See `hasConsumedCommentRange` and
        // `consumeCommentRange` for usage.
        let consumedCommentRanges: number[];
        let leadingCommentRangePositions: boolean[];
        let trailingCommentRangePositions: boolean[];

        return compilerOptions.removeComments
            ? createCommentRemovingWriter()
            : createCommentPreservingWriter();

        function createCommentRemovingWriter(): CommentWriter {
            return {
                reset,
                setSourceFile,
                getLeadingComments(range: TextRange, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange): CommentRange[] { return undefined; },
                getLeadingCommentsOfPosition(pos: number): CommentRange[] { return undefined; },
                getTrailingComments(range: TextRange, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange): CommentRange[] { return undefined; },
                getTrailingCommentsOfPosition(pos: number): CommentRange[] { return undefined; },
                emitLeadingComments(range: TextRange, comments: CommentRange[]): void { },
                emitTrailingComments(range: TextRange, comments: CommentRange[]): void { },
                emitLeadingDetachedComments,
                emitTrailingDetachedComments(node: TextRange, contextNode?: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean): void {}
            };

            function emitLeadingDetachedComments(node: TextRange, contextNode?: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean): void {
                if (shouldSkipCommentsForNodeCallback && shouldSkipCommentsForNodeCallback(contextNode)) {
                    return;
                }

                emitDetachedCommentsAndUpdateCommentsInfo(node, /*removeComments*/ true);
            }
        }

        function createCommentPreservingWriter(): CommentWriter {
            const noComments: CommentRange[] = [];
            return {
                reset,
                setSourceFile,
                getLeadingComments,
                getLeadingCommentsOfPosition,
                getTrailingComments,
                getTrailingCommentsOfPosition,
                emitLeadingComments,
                emitTrailingComments,
                emitLeadingDetachedComments,
                emitTrailingDetachedComments
            };

            function getLeadingComments(range: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange): CommentRange[];
            function getLeadingComments(range: TextRange): CommentRange[];
            function getLeadingComments(range: TextRange | Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange) {
                if (shouldSkipCommentsForNodeCallback && shouldSkipCommentsForNodeCallback(<Node>range)) {
                    // If the node will not be emitted in JS, remove all the comments (normal,
                    // pinned and `///`) associated with the node, unless it is a triple slash
                    // comment at the top of the file.
                    //
                    // For Example:
                    //      /// <reference-path ...>
                    //      declare var x;
                    //      /// <reference-path ...>
                    //      interface F {}
                    //
                    // The first `///` will NOT be removed while the second one will be removed
                    // even though both nodes will not be emitted.
                    if (range.pos === 0) {
                        return filter(getLeadingCommentsOfPosition(0), isTripleSlashComment);
                    }

                    return undefined;
                }

                if (getCustomCommentRangeForNodeCallback) {
                    range = getCustomCommentRangeForNodeCallback(<Node>range) || range;
                }

                return getLeadingCommentsOfPosition(range.pos);
            }

            /**
             * Determine if the given comment is a triple-slash
             **/
            function isTripleSlashComment(comment: CommentRange) {
                // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
                // so that we don't end up computing comment string and doing match for all // comments
                if (currentText.charCodeAt(comment.pos + 1) === CharacterCodes.slash &&
                    comment.pos + 2 < comment.end &&
                    currentText.charCodeAt(comment.pos + 2) === CharacterCodes.slash) {
                    const textSubStr = currentText.substring(comment.pos, comment.end);
                    return fullTripleSlashReferencePathRegEx.test(textSubStr)
                        || fullTripleSlashAMDReferencePathRegEx.test(textSubStr);
                }
                return false;
            }

            function getTrailingComments(range: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange): CommentRange[];
            function getTrailingComments(range: TextRange): CommentRange[];
            function getTrailingComments(range: TextRange | Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean, getCustomCommentRangeForNodeCallback?: (node: Node) => TextRange) {
                if (shouldSkipCommentsForNodeCallback && shouldSkipCommentsForNodeCallback(<Node>range)) {
                    return undefined;
                }

                if (getCustomCommentRangeForNodeCallback) {
                    range = getCustomCommentRangeForNodeCallback(<Node>range) || range;
                }

                return getTrailingCommentsOfPosition(range.end);
            }

            function getLeadingCommentsOfPosition(pos: number) {
                if (positionIsSynthesized(pos) || leadingCommentRangePositions[pos]) {
                    return undefined;
                }

                leadingCommentRangePositions[pos] = true;
                const comments = hasDetachedComments(pos)
                    ? getLeadingCommentsWithoutDetachedComments()
                    : getLeadingCommentRanges(currentText, pos);
                return consumeCommentRanges(comments);
            }

            function getTrailingCommentsOfPosition(pos: number) {
                if (positionIsSynthesized(pos) || trailingCommentRangePositions[pos]) {
                    return undefined;
                }

                trailingCommentRangePositions[pos] = true;
                const comments = getTrailingCommentRanges(currentText, pos);
                return consumeCommentRanges(comments);
            }

            function emitLeadingComments(range: TextRange, comments: CommentRange[]) {
                emitNewLineBeforeLeadingComments(currentLineMap, writer, range, comments);

                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentText, currentLineMap, writer, comments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitTrailingComments(range: TextRange, comments: CommentRange[]) {
                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                emitComments(currentText, currentLineMap, writer, comments, /*leadingSeparator*/ true, /*trailingSeparator*/ false, newLine, writeComment);
            }

            function emitLeadingDetachedComments(range: TextRange, contextNode?: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean): void {
                if (shouldSkipCommentsForNodeCallback && shouldSkipCommentsForNodeCallback(contextNode)) {
                    return;
                }

                emitDetachedCommentsAndUpdateCommentsInfo(range, /*removeComments*/ false);
            }

            function emitTrailingDetachedComments(range: TextRange, contextNode?: Node, shouldSkipCommentsForNodeCallback?: (node: Node) => boolean): void {
                if (shouldSkipCommentsForNodeCallback && shouldSkipCommentsForNodeCallback(contextNode)) {
                    return;
                }

                range = collapseRangeToEnd(range);
                emitLeadingComments(range, getLeadingComments(range));
            }

            function hasConsumedCommentRange(comment: CommentRange) {
                return comment.end === consumedCommentRanges[comment.pos];
            }

            function consumeCommentRange(comment: CommentRange) {
                if (!hasConsumedCommentRange(comment)) {
                    consumedCommentRanges[comment.pos] = comment.end;
                    return true;
                }

                return false;
            }

            function consumeCommentRanges(comments: CommentRange[]) {
                let consumed: CommentRange[];
                if (comments) {
                    let commentsSkipped = 0;
                    let commentsConsumed = 0;
                    for (let i = 0; i < comments.length; i++) {
                        const comment = comments[i];
                        if (consumeCommentRange(comment)) {
                            commentsConsumed++;
                            if (commentsSkipped !== 0) {
                                if (consumed === undefined) {
                                    consumed = [comment];
                                }
                                else {
                                    consumed.push(comment);
                                }
                            }
                        }
                        else {
                            commentsSkipped++;
                            if (commentsConsumed !== 0 && consumed === undefined) {
                                consumed = comments.slice(0, i);
                            }
                        }
                    }

                    if (commentsConsumed) {
                        return consumed || comments;
                    }
                }

                return noComments;
            }
        }

        function reset() {
            currentSourceFile = undefined;
            currentText = undefined;
            currentLineMap = undefined;
            detachedCommentsInfo = undefined;
            consumedCommentRanges = undefined;
            trailingCommentRangePositions = undefined;
            leadingCommentRangePositions = undefined;
        }

        function setSourceFile(sourceFile: SourceFile) {
            currentSourceFile = sourceFile;
            currentText = sourceFile.text;
            currentLineMap = getLineStarts(sourceFile);
            detachedCommentsInfo = undefined;
            consumedCommentRanges = [];
            leadingCommentRangePositions = [];
            trailingCommentRangePositions = [];
        }

        function hasDetachedComments(pos: number) {
            return detachedCommentsInfo !== undefined && lastOrUndefined(detachedCommentsInfo).nodePos === pos;
        }

        function getLeadingCommentsWithoutDetachedComments() {
            // get the leading comments from detachedPos
            const pos = lastOrUndefined(detachedCommentsInfo).detachedCommentEndPos;
            const leadingComments = getLeadingCommentRanges(currentText, pos);
            if (detachedCommentsInfo.length - 1) {
                detachedCommentsInfo.pop();
            }
            else {
                detachedCommentsInfo = undefined;
            }

            return leadingComments;
        }

        function emitDetachedCommentsAndUpdateCommentsInfo(node: TextRange, removeComments: boolean) {
            const currentDetachedCommentInfo = emitDetachedComments(currentText, currentLineMap, writer, writeComment, node, newLine, removeComments);

            if (currentDetachedCommentInfo) {
                if (detachedCommentsInfo) {
                    detachedCommentsInfo.push(currentDetachedCommentInfo);
                }
                else {
                    detachedCommentsInfo = [currentDetachedCommentInfo];
                }
            }
        }

        function writeComment(text: string, lineMap: number[], writer: EmitTextWriter, comment: CommentRange, newLine: string) {
            emitPos(comment.pos);
            writeCommentRange(text, lineMap, writer, comment, newLine);
            emitPos(comment.end);
        }
    }
}