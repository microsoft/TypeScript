/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        getLeadingComments(range: TextRange): CommentRange[];
        getLeadingComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (contextNode: Node) => boolean, getTextRangeCallback: (contextNode: Node) => TextRange): CommentRange[];
        getTrailingComments(range: TextRange): CommentRange[];
        getTrailingComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (contextNode: Node) => boolean, getTextRangeCallback: (contextNode: Node) => TextRange): CommentRange[];
        getTrailingCommentsOfPosition(pos: number): CommentRange[];
        emitLeadingComments(range: TextRange, comments: CommentRange[]): void;
        emitLeadingComments(range: TextRange, comments: CommentRange[], contextNode: Node, getTextRangeCallback: (contextNode: Node) => TextRange): void;
        emitTrailingComments(range: TextRange, comments: CommentRange[]): void;
        emitLeadingDetachedComments(range: TextRange): void;
        emitLeadingDetachedComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (contextNode: Node) => boolean): void;
        emitTrailingDetachedComments(range: TextRange): void;
        emitTrailingDetachedComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (contextNode: Node) => boolean): void;
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
        let consumedCommentRanges: Map<number>;
        let leadingCommentRangePositions: Map<boolean>;
        let trailingCommentRangePositions: Map<boolean>;

        const commentWriter = compilerOptions.removeComments
            ? createCommentRemovingWriter()
            : createCommentPreservingWriter();

        return compilerOptions.extendedDiagnostics
            ? createCommentWriterWithExtendedDiagnostics(commentWriter)
            : commentWriter;

        function createCommentRemovingWriter(): CommentWriter {
            return {
                reset,
                setSourceFile,
                getLeadingComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean, getTextRangeCallback?: (contextNode: Node) => TextRange): CommentRange[] { return undefined; },
                getTrailingComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean, getTextRangeCallback?: (contextNode: Node) => TextRange): CommentRange[] { return undefined; },
                getTrailingCommentsOfPosition(pos: number): CommentRange[] { return undefined; },
                emitLeadingComments(range: TextRange, comments: CommentRange[], contextNode?: Node, getTextRangeCallback?: (contextNode: Node) => TextRange): void { },
                emitTrailingComments(range: TextRange, comments: CommentRange[]): void { },
                emitLeadingDetachedComments,
                emitTrailingDetachedComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean): void {}
            };

            function emitLeadingDetachedComments(node: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean): void {
                if (ignoreNodeCallback && ignoreNodeCallback(contextNode)) {
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
                getTrailingComments,
                getTrailingCommentsOfPosition,
                emitLeadingComments,
                emitTrailingComments,
                emitLeadingDetachedComments,
                emitTrailingDetachedComments
            };

            function getLeadingComments(range: TextRange): CommentRange[];
            function getLeadingComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (contextNode: Node) => boolean, getTextRangeCallback: (contextNode: Node) => TextRange): CommentRange[];
            function getLeadingComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean, getTextRangeCallback?: (contextNode: Node) => TextRange) {
                if (contextNode) {
                    range = getTextRangeCallback(contextNode) || range;
                    if (ignoreNodeCallback(contextNode)) {
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

                        return;
                    }
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

            function getTrailingComments(range: TextRange): CommentRange[];
            function getTrailingComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (contextNode: Node) => boolean, getTextRangeCallback: (contextNode: Node) => TextRange): CommentRange[];
            function getTrailingComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean, getTextRangeCallback?: (contextNode: Node) => TextRange) {
                let ignored = false;
                if (contextNode) {
                    if (ignoreNodeCallback(contextNode)) {
                        ignored = true;
                    }
                    else {
                        range = getTextRangeCallback(contextNode) || range;
                    }
                }

                let comments: CommentRange[];
                if (!ignored) {
                    comments = getTrailingCommentsOfPosition(range.end);
                }
                return comments;
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

            function emitLeadingComments(range: TextRange, comments: CommentRange[]): void;
            function emitLeadingComments(range: TextRange, comments: CommentRange[], contextNode: Node, getTextRangeCallback: (contextNode: Node) => TextRange): void;
            function emitLeadingComments(range: TextRange, comments: CommentRange[], contextNode?: Node, getTextRangeCallback?: (contextNode: Node) => TextRange) {
                if (comments && comments.length > 0) {
                    if (contextNode) {
                        range = getTextRangeCallback(contextNode) || range;
                    }

                    emitNewLineBeforeLeadingComments(currentLineMap, writer, range, comments);

                    // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                    emitComments(currentText, currentLineMap, writer, comments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                }
            }

            function emitTrailingComments(range: TextRange, comments: CommentRange[]) {
                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                emitComments(currentText, currentLineMap, writer, comments, /*leadingSeparator*/ true, /*trailingSeparator*/ false, newLine, writeComment);
            }

            function emitLeadingDetachedComments(range: TextRange): void;
            function emitLeadingDetachedComments(range: TextRange, contextNode: Node, ignoreNodeCallback: (node: Node) => boolean): void;
            function emitLeadingDetachedComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean): void {
                if (contextNode && ignoreNodeCallback(contextNode)) {
                    return;
                }

                emitDetachedCommentsAndUpdateCommentsInfo(range, /*removeComments*/ false);
            }

            function emitTrailingDetachedComments(range: TextRange): void;
            function emitTrailingDetachedComments(range: TextRange, contextNode: Node, ignoreNodeCallback?: (node: Node) => boolean): void;
            function emitTrailingDetachedComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (node: Node) => boolean): void {
                if (contextNode && ignoreNodeCallback(contextNode)) {
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

        function createCommentWriterWithExtendedDiagnostics(writer: CommentWriter): CommentWriter {
            const {
                reset,
                setSourceFile,
                getLeadingComments,
                getTrailingComments,
                getTrailingCommentsOfPosition,
                emitLeadingComments,
                emitTrailingComments,
                emitLeadingDetachedComments,
                emitTrailingDetachedComments
            } = writer;

            return {
                reset,
                setSourceFile,
                getLeadingComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean, getTextRangeCallback?: (contextNode: Node) => TextRange): CommentRange[] {
                    const commentStart = performance.mark();
                    const comments = getLeadingComments(range, contextNode, ignoreNodeCallback, getTextRangeCallback);
                    performance.measure("commentTime", commentStart);
                    return comments;
                },
                getTrailingComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean, getTextRangeCallback?: (contextNode: Node) => TextRange): CommentRange[] {
                    const commentStart = performance.mark();
                    const comments = getTrailingComments(range, contextNode, ignoreNodeCallback, getTextRangeCallback);
                    performance.measure("commentTime", commentStart);
                    return comments;
                },
                getTrailingCommentsOfPosition(pos: number): CommentRange[] {
                    const commentStart = performance.mark();
                    const comments = getTrailingCommentsOfPosition(pos);
                    performance.measure("commentTime", commentStart);
                    return comments;
                },
                emitLeadingComments(range: TextRange, comments: CommentRange[], contextNode?: Node, getTextRangeCallback?: (contextNode: Node) => TextRange): void {
                    const commentStart = performance.mark();
                    emitLeadingComments(range, comments, contextNode, getTextRangeCallback);
                    performance.measure("commentTime", commentStart);
                },
                emitTrailingComments(range: TextRange, comments: CommentRange[]): void {
                    const commentStart = performance.mark();
                    emitLeadingComments(range, comments);
                    performance.measure("commentTime", commentStart);
                },
                emitLeadingDetachedComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean): void {
                    const commentStart = performance.mark();
                    emitLeadingDetachedComments(range, contextNode, ignoreNodeCallback);
                    performance.measure("commentTime", commentStart);
                },
                emitTrailingDetachedComments(range: TextRange, contextNode?: Node, ignoreNodeCallback?: (contextNode: Node) => boolean): void {
                    const commentStart = performance.mark();
                    emitTrailingDetachedComments(range, contextNode, ignoreNodeCallback);
                    performance.measure("commentTime", commentStart);
                }
            };
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
            currentText = currentSourceFile.text;
            currentLineMap = getLineStarts(currentSourceFile);
            detachedCommentsInfo = undefined;
            consumedCommentRanges = {};
            leadingCommentRangePositions = {};
            trailingCommentRangePositions = {};
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