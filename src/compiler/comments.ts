/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        getLeadingCommentsToEmit(node: TextRange): CommentRange[];
        getTrailingCommentsToEmit(node: TextRange): CommentRange[];
        emitDetachedComments(node: TextRange): void;
        emitLeadingComments(node: TextRange, comments?: CommentRange[]): void;
        emitTrailingComments(node: TextRange, comments?: CommentRange[]): void;
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
        let leadingCommentRangeNodeStarts: boolean[];
        let trailingCommentRangeNodeEnds: boolean[];

        return compilerOptions.removeComments
            ? createCommentRemovingWriter()
            : createCommentPreservingWriter();

        function createCommentRemovingWriter(): CommentWriter {
            return {
                reset,
                setSourceFile,
                getLeadingCommentsToEmit(node: TextRange): CommentRange[] { return undefined; },
                getTrailingCommentsToEmit(node: TextRange): CommentRange[]  { return undefined; },
                emitDetachedComments,
                emitLeadingComments(node: TextRange, comments?: CommentRange[]): void { },
                emitTrailingComments(node: TextRange, comments?: CommentRange[]): void { },
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
                getLeadingCommentsToEmit,
                getTrailingCommentsToEmit,
                emitDetachedComments,
                emitLeadingComments,
                emitTrailingComments,
            };

            function getLeadingCommentsToEmit(node: TextRange) {
                if (nodeIsSynthesized(node)) {
                    return;
                }

                if (!leadingCommentRangeNodeStarts[node.pos]) {
                    leadingCommentRangeNodeStarts[node.pos] = true;
                    const comments = hasDetachedComments(node.pos)
                        ? getLeadingCommentsWithoutDetachedComments()
                        : getLeadingCommentRanges(currentText, node.pos);
                    return consumeCommentRanges(comments);
                }

                return noComments;
            }

            function getTrailingCommentsToEmit(node: TextRange) {
                if (nodeIsSynthesized(node)) {
                    return;
                }

                if (!trailingCommentRangeNodeEnds[node.end]) {
                    trailingCommentRangeNodeEnds[node.end] = true;
                    const comments = getTrailingCommentRanges(currentText, node.end);
                    return consumeCommentRanges(comments);
                }

                return noComments;
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

            function emitLeadingComments(range: TextRange, leadingComments: CommentRange[] = getLeadingCommentsToEmit(range)) {
                emitNewLineBeforeLeadingComments(currentLineMap, writer, range, leadingComments);

                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentText, currentLineMap, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitTrailingComments(range: TextRange, trailingComments = getTrailingCommentsToEmit(range)) {
                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                emitComments(currentText, currentLineMap, writer, trailingComments, /*trailingSeparator*/ false, newLine, writeComment);
            }

            function emitDetachedComments(range: TextRange) {
                emitDetachedCommentsAndUpdateCommentsInfo(range, /*removeComments*/ false);
            }
        }

        function reset() {
            currentSourceFile = undefined;
            currentText = undefined;
            currentLineMap = undefined;
            detachedCommentsInfo = undefined;
            consumedCommentRanges = undefined;
            trailingCommentRangeNodeEnds = undefined;
            leadingCommentRangeNodeStarts = undefined;
        }

        function setSourceFile(sourceFile: SourceFile) {
            currentSourceFile = sourceFile;
            currentText = sourceFile.text;
            currentLineMap = getLineStarts(sourceFile);
            detachedCommentsInfo = undefined;
            consumedCommentRanges = [];
            leadingCommentRangeNodeStarts = [];
            trailingCommentRangeNodeEnds = [];
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