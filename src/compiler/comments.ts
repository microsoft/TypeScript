/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        getLeadingComments(range: Node, getAdditionalRange?: (range: Node) => Node): CommentRange[];
        getLeadingComments(range: TextRange): CommentRange[];
        getLeadingCommentsOfPosition(pos: number): CommentRange[];
        getTrailingComments(range: Node, getAdditionalRange?: (range: Node) => Node): CommentRange[];
        getTrailingComments(range: TextRange): CommentRange[];
        getTrailingCommentsOfPosition(pos: number): CommentRange[];
        emitLeadingComments(range: TextRange, comments?: CommentRange[]): void;
        emitTrailingComments(range: TextRange, comments?: CommentRange[]): void;
        emitDetachedComments(range: TextRange): void;
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
                getLeadingComments(range: TextRange, getAdditionalRange?: (range: TextRange) => TextRange): CommentRange[] { return undefined; },
                getLeadingCommentsOfPosition(pos: number): CommentRange[] { return undefined; },
                getTrailingComments(range: TextRange, getAdditionalRange?: (range: TextRange) => TextRange): CommentRange[] { return undefined; },
                getTrailingCommentsOfPosition(pos: number): CommentRange[] { return undefined; },
                emitLeadingComments(range: TextRange, comments?: CommentRange[]): void { },
                emitTrailingComments(range: TextRange, comments?: CommentRange[]): void { },
                emitDetachedComments,
            };

            function emitDetachedComments(node: TextRange): void {
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
                emitDetachedComments,
            };

            function getLeadingComments(range: TextRange | Node, getAdditionalRange?: (range: Node) => Node) {
                let comments = getLeadingCommentsOfPosition(range.pos);
                if (getAdditionalRange) {
                    let additionalRange = getAdditionalRange(<Node>range);
                    while (additionalRange) {
                        comments = concatenate(
                            getLeadingCommentsOfPosition(additionalRange.pos),
                            comments
                        );

                        additionalRange = getAdditionalRange(additionalRange);
                    }
                }

                return comments;
            }

            function getTrailingComments(range: TextRange | Node, getAdditionalRange?: (range: Node) => Node) {
                let comments = getTrailingCommentsOfPosition(range.end);
                if (getAdditionalRange) {
                    let additionalRange = getAdditionalRange(<Node>range);
                    while (additionalRange) {
                        comments = concatenate(
                            comments,
                            getTrailingCommentsOfPosition(additionalRange.end)
                        );

                        additionalRange = getAdditionalRange(additionalRange);
                    }
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

            function emitLeadingComments(range: TextRange, comments = getLeadingComments(range)) {
                emitNewLineBeforeLeadingComments(currentLineMap, writer, range, comments);

                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentText, currentLineMap, writer, comments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitTrailingComments(range: TextRange, comments = getTrailingComments(range)) {
                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                emitComments(currentText, currentLineMap, writer, comments, /*leadingSeparator*/ true, /*trailingSeparator*/ false, newLine, writeComment);
            }

            function emitDetachedComments(range: TextRange) {
                emitDetachedCommentsAndUpdateCommentsInfo(range, /*removeComments*/ false);
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