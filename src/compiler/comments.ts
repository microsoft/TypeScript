/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        emitNodeWithComments(node: Node, emitCallback: (node: Node) => void): void;
        emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void): void;
        emitTrailingCommentsOfPosition(pos: number): void;
    }

    export function createCommentWriter(host: EmitHost, writer: EmitTextWriter, sourceMap: SourceMapWriter): CommentWriter {
        const compilerOptions = host.getCompilerOptions();
        const extendedDiagnostics = compilerOptions.extendedDiagnostics;
        const newLine = host.getNewLine();
        const { emitPos } = sourceMap;

        let containerPos = -1;
        let containerEnd = -1;
        let declarationListContainerEnd = -1;
        let currentSourceFile: SourceFile;
        let currentText: string;
        let currentLineMap: number[];
        let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number}[];

        // Tracks comment ranges that have already been consumed.
        let consumedCommentRanges: Map<boolean>;

        return {
            reset,
            setSourceFile,
            emitNodeWithComments,
            emitBodyWithDetachedComments,
            emitTrailingCommentsOfPosition,
        };

        function emitNodeWithComments(node: Node, emitCallback: (node: Node) => void) {
            if (compilerOptions.removeComments) {
                emitCallback(node);
                return;
            }

            if (node) {
                const { pos, end } = node.commentRange || node;
                if ((pos < 0 && end < 0) || (pos === end)) {
                    // Both pos and end are synthesized, so just emit the node without comments.
                    emitCallback(node);
                }
                else {
                    let commentStart: number;
                    if (extendedDiagnostics) {
                        commentStart = performance.mark();
                    }

                    const emitFlags = node.emitFlags;
                    const isEmittedNode = node.kind !== SyntaxKind.NotEmittedStatement;
                    const skipLeadingComments = pos < 0 || (emitFlags & NodeEmitFlags.NoLeadingComments) !== 0;
                    const skipTrailingComments = end < 0 || (emitFlags & NodeEmitFlags.NoTrailingComments) !== 0;

                    // Emit leading comments if the position is not synthesized and the node
                    // has not opted out from emitting leading comments.
                    if (!skipLeadingComments) {
                        emitLeadingComments(pos, isEmittedNode);
                    }

                    // Save current container state on the stack.
                    const savedContainerPos = containerPos;
                    const savedContainerEnd = containerEnd;
                    const savedDeclarationListContainerEnd = declarationListContainerEnd;

                    if (!skipLeadingComments) {
                        containerPos = pos;
                    }

                    if (!skipTrailingComments) {
                        containerEnd = end;

                        // To avoid invalid comment emit in a down-level binding pattern, we
                        // keep track of the last declaration list container's end
                        if (node.kind === SyntaxKind.VariableDeclarationList) {
                            declarationListContainerEnd = end;
                        }
                    }

                    if (extendedDiagnostics) {
                        performance.measure("commentTime", commentStart);
                        emitCallback(node);
                        commentStart = performance.mark();
                    }
                    else {
                        emitCallback(node);
                    }

                    // Restore previous container state.
                    containerPos = savedContainerPos;
                    containerEnd = savedContainerEnd;
                    declarationListContainerEnd = savedDeclarationListContainerEnd;

                    // Emit trailing comments if the position is not synthesized and the node
                    // has not opted out from emitting leading comments and is an emitted node.
                    if (!skipTrailingComments && isEmittedNode) {
                        emitTrailingComments(end);
                    }

                    if (extendedDiagnostics) {
                        performance.measure("commentTime", commentStart);
                    }
                }
            }
        }

        function emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void) {
            let commentStart: number;
            if (extendedDiagnostics) {
                commentStart = performance.mark();
            }

            const { pos, end } = detachedRange;
            const emitFlags = node.emitFlags;
            const skipLeadingComments = pos < 0 || (emitFlags & NodeEmitFlags.NoLeadingComments) !== 0;
            const skipTrailingComments = end < 0 || (emitFlags & NodeEmitFlags.NoTrailingComments) !== 0 || compilerOptions.removeComments;

            if (!skipLeadingComments) {
                emitDetachedCommentsAndUpdateCommentsInfo(detachedRange, compilerOptions.removeComments);
            }

            if (extendedDiagnostics) {
                performance.measure("commentTime", commentStart);
                emitCallback(node);
                commentStart = performance.mark();
            }
            else {
                emitCallback(node);
            }

            if (!skipTrailingComments) {
                emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
            }

            if (extendedDiagnostics) {
                performance.measure("commentTime", commentStart);
            }
        }

        function emitLeadingComments(pos: number, isEmittedNode: boolean) {
            let leadingComments: CommentRange[];
            if (isEmittedNode) {
                leadingComments = getLeadingCommentsToEmit(pos);
            }
            else {
                // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
                // unless it is a triple slash comment at the top of the file.
                // For Example:
                //      /// <reference-path ...>
                //      declare var x;
                //      /// <reference-path ...>
                //      interface F {}
                //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
                if (pos === 0) {
                    leadingComments = filter(getLeadingCommentsToEmit(pos), isTripleSlashComment);
                }
            }

            emitNewLineBeforeLeadingCommentsOfPosition(currentLineMap, writer, pos, leadingComments);

            // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
            emitComments(currentText, currentLineMap, writer, leadingComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
        }

        function emitTrailingComments(pos: number) {
            const trailingComments = getTrailingCommentsToEmit(pos);

            // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
            emitComments(currentText, currentLineMap, writer, trailingComments, /*leadingSeparator*/ true, /*trailingSeparator*/ false, newLine, writeComment);
        }

        function emitTrailingCommentsOfPosition(pos: number) {
            if (compilerOptions.removeComments) {
                return;
            }

            let commentStart: number;
            if (extendedDiagnostics) {
                commentStart = performance.mark();
            }

            const trailingComments = getTrailingCommentsToEmit(pos);

            // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space
            emitComments(currentText, currentLineMap, writer, trailingComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);

            if (extendedDiagnostics) {
                performance.measure("commentTime", commentStart);
            }
        }

        function getLeadingCommentsToEmit(pos: number) {
            // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
            if (containerPos === -1 || pos !== containerPos) {
                return hasDetachedComments(pos)
                    ? getLeadingCommentsWithoutDetachedComments()
                    : getLeadingCommentRanges(currentText, pos);
            }
        }

        function getTrailingCommentsToEmit(end: number) {
            // Emit the trailing comments only if the container's end doesn't match because the container should take care of emitting these comments
            if (containerEnd === -1 || (end !== containerEnd && end !== declarationListContainerEnd)) {
                return getTrailingCommentRanges(currentText, end);
            }
        }

        /**
         * Determine if the given comment is a triple-slash
         *
         * @return true if the comment is a triple-slash comment else false
         **/
        function isTripleSlashComment(comment: CommentRange) {
            // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
            // so that we don't end up computing comment string and doing match for all // comments
            if (currentText.charCodeAt(comment.pos + 1) === CharacterCodes.slash &&
                comment.pos + 2 < comment.end &&
                currentText.charCodeAt(comment.pos + 2) === CharacterCodes.slash) {
                const textSubStr = currentText.substring(comment.pos, comment.end);
                return textSubStr.match(fullTripleSlashReferencePathRegEx) ||
                    textSubStr.match(fullTripleSlashAMDReferencePathRegEx) ?
                    true : false;
            }
            return false;
        }

        function reset() {
            currentSourceFile = undefined;
            currentText = undefined;
            currentLineMap = undefined;
            detachedCommentsInfo = undefined;
            consumedCommentRanges = undefined;
        }

        function setSourceFile(sourceFile: SourceFile) {
            currentSourceFile = sourceFile;
            currentText = currentSourceFile.text;
            currentLineMap = getLineStarts(currentSourceFile);
            detachedCommentsInfo = undefined;
            consumedCommentRanges = {};
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