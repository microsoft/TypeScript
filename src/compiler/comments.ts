/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        setWriter(writer: EmitTextWriter): void;
        emitNodeWithComments(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void): void;
        emitTrailingCommentsOfPosition(pos: number): void;
        emitLeadingCommentsOfPosition(pos: number): void;
    }

    export function createCommentWriter(printerOptions: PrinterOptions, emitPos: ((pos: number) => void) | undefined): CommentWriter {
        const extendedDiagnostics = printerOptions.extendedDiagnostics;
        const newLine = getNewLineCharacter(printerOptions);
        let writer: EmitTextWriter;
        let containerPos = -1;
        let containerEnd = -1;
        let declarationListContainerEnd = -1;
        let currentSourceFile: SourceFile;
        let currentText: string;
        let currentLineMap: number[];
        let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number}[];
        let hasWrittenComment = false;
        let disabled: boolean = printerOptions.removeComments;

        return {
            reset,
            setWriter,
            setSourceFile,
            emitNodeWithComments,
            emitBodyWithDetachedComments,
            emitTrailingCommentsOfPosition,
            emitLeadingCommentsOfPosition,
        };

        function emitNodeWithComments(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            if (disabled) {
                emitCallback(hint, node);
                return;
            }

            if (node) {
                hasWrittenComment = false;

                const emitNode = node.emitNode;
                const emitFlags = emitNode && emitNode.flags;
                const { pos, end } = emitNode && emitNode.commentRange || node;
                if ((pos < 0 && end < 0) || (pos === end)) {
                    // Both pos and end are synthesized, so just emit the node without comments.
                    emitNodeWithSynthesizedComments(hint, node, emitNode, emitFlags, emitCallback);
                }
                else {
                    if (extendedDiagnostics) {
                        performance.mark("preEmitNodeWithComment");
                    }

                    const isEmittedNode = node.kind !== SyntaxKind.NotEmittedStatement;
                    const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
                    const skipTrailingComments = end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;

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
                        performance.measure("commentTime", "preEmitNodeWithComment");
                    }

                    emitNodeWithSynthesizedComments(hint, node, emitNode, emitFlags, emitCallback);

                    if (extendedDiagnostics) {
                        performance.mark("postEmitNodeWithComment");
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
                        performance.measure("commentTime", "postEmitNodeWithComment");
                    }
                }
            }
        }

        function emitNodeWithSynthesizedComments(hint: EmitHint, node: Node, emitNode: EmitNode, emitFlags: EmitFlags, emitCallback: (hint: EmitHint, node: Node) => void) {
            const leadingComments = emitNode && emitNode.leadingComments;
            if (some(leadingComments)) {
                if (extendedDiagnostics) {
                    performance.mark("preEmitNodeWithSynthesizedComments");
                }

                forEach(leadingComments, emitLeadingSynthesizedComment);

                if (extendedDiagnostics) {
                    performance.measure("commentTime", "preEmitNodeWithSynthesizedComments");
                }
            }

            emitNodeWithNestedComments(hint, node, emitFlags, emitCallback);

            const trailingComments = emitNode && emitNode.trailingComments;
            if (some(trailingComments)) {
                if (extendedDiagnostics) {
                    performance.mark("postEmitNodeWithSynthesizedComments");
                }

                forEach(trailingComments, emitTrailingSynthesizedComment);

                if (extendedDiagnostics) {
                    performance.measure("commentTime", "postEmitNodeWithSynthesizedComments");
                }
            }
        }

        function emitLeadingSynthesizedComment(comment: SynthesizedComment) {
            if (comment.kind === SyntaxKind.SingleLineCommentTrivia) {
                writer.writeLine();
            }
            writeSynthesizedComment(comment);
            if (comment.hasTrailingNewLine || comment.kind === SyntaxKind.SingleLineCommentTrivia) {
                writer.writeLine();
            }
            else {
                writer.write(" ");
            }
        }

        function emitTrailingSynthesizedComment(comment: SynthesizedComment) {
            if (!writer.isAtStartOfLine()) {
                writer.write(" ");
            }
            writeSynthesizedComment(comment);
            if (comment.hasTrailingNewLine) {
                writer.writeLine();
            }
        }

        function writeSynthesizedComment(comment: SynthesizedComment) {
            const text = formatSynthesizedComment(comment);
            const lineMap = comment.kind === SyntaxKind.MultiLineCommentTrivia ? computeLineStarts(text) : undefined;
            writeCommentRange(text, lineMap, writer, 0, text.length, newLine);
        }

        function formatSynthesizedComment(comment: SynthesizedComment) {
            return comment.kind === SyntaxKind.MultiLineCommentTrivia
                ? `/*${comment.text}*/`
                : `//${comment.text}`;
        }

        function emitNodeWithNestedComments(hint: EmitHint, node: Node, emitFlags: EmitFlags, emitCallback: (hint: EmitHint, node: Node) => void) {
            if (emitFlags & EmitFlags.NoNestedComments) {
                disabled = true;
                emitCallback(hint, node);
                disabled = false;
            }
            else {
                emitCallback(hint, node);
            }
        }

        function emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void) {
            if (extendedDiagnostics) {
                performance.mark("preEmitBodyWithDetachedComments");
            }

            const { pos, end } = detachedRange;
            const emitFlags = getEmitFlags(node);
            const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
            const skipTrailingComments = disabled || end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;

            if (!skipLeadingComments) {
                emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
            }

            if (extendedDiagnostics) {
                performance.measure("commentTime", "preEmitBodyWithDetachedComments");
            }

            if (emitFlags & EmitFlags.NoNestedComments && !disabled) {
                disabled = true;
                emitCallback(node);
                disabled = false;
            }
            else {
                emitCallback(node);
            }

            if (extendedDiagnostics) {
                performance.mark("beginEmitBodyWithDetachedCommetns");
            }

            if (!skipTrailingComments) {
                emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
                if (hasWrittenComment && !writer.isAtStartOfLine()) {
                    writer.writeLine();
                }
            }

            if (extendedDiagnostics) {
                performance.measure("commentTime", "beginEmitBodyWithDetachedCommetns");
            }
        }

        function emitLeadingComments(pos: number, isEmittedNode: boolean) {
            hasWrittenComment = false;

            if (isEmittedNode) {
                forEachLeadingCommentToEmit(pos, emitLeadingComment);
            }
            else if (pos === 0) {
                // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
                // unless it is a triple slash comment at the top of the file.
                // For Example:
                //      /// <reference-path ...>
                //      declare var x;
                //      /// <reference-path ...>
                //      interface F {}
                //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
                forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
            }
        }

        function emitTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
            if (isTripleSlashComment(commentPos, commentEnd)) {
                emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
            }
        }

        function emitLeadingComment(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
            if (!hasWrittenComment) {
                emitNewLineBeforeLeadingCommentOfPosition(currentLineMap, writer, rangePos, commentPos);
                hasWrittenComment = true;
            }

            // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
            if (emitPos) emitPos(commentPos);
            writeCommentRange(currentText, currentLineMap, writer, commentPos, commentEnd, newLine);
            if (emitPos) emitPos(commentEnd);

            if (hasTrailingNewLine) {
                writer.writeLine();
            }
            else {
                writer.write(" ");
            }
        }

        function emitLeadingCommentsOfPosition(pos: number) {
            if (disabled || pos === -1) {
                return;
            }

            emitLeadingComments(pos, /*isEmittedNode*/ true);
        }

        function emitTrailingComments(pos: number) {
            forEachTrailingCommentToEmit(pos, emitTrailingComment);
        }

        function emitTrailingComment(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean) {
            // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment2*/
            if (!writer.isAtStartOfLine()) {
                writer.write(" ");
            }

            if (emitPos) emitPos(commentPos);
            writeCommentRange(currentText, currentLineMap, writer, commentPos, commentEnd, newLine);
            if (emitPos) emitPos(commentEnd);

            if (hasTrailingNewLine) {
                writer.writeLine();
            }
        }

        function emitTrailingCommentsOfPosition(pos: number) {
            if (disabled) {
                return;
            }

            if (extendedDiagnostics) {
                performance.mark("beforeEmitTrailingCommentsOfPosition");
            }

            forEachTrailingCommentToEmit(pos, emitTrailingCommentOfPosition);

            if (extendedDiagnostics) {
                performance.measure("commentTime", "beforeEmitTrailingCommentsOfPosition");
            }
        }

        function emitTrailingCommentOfPosition(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean) {
            // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

            if (emitPos) emitPos(commentPos);
            writeCommentRange(currentText, currentLineMap, writer, commentPos, commentEnd, newLine);
            if (emitPos) emitPos(commentEnd);

            if (hasTrailingNewLine) {
                writer.writeLine();
            }
            else {
                writer.write(" ");
            }
        }

        function forEachLeadingCommentToEmit(pos: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
            // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
            if (containerPos === -1 || pos !== containerPos) {
                if (hasDetachedComments(pos)) {
                    forEachLeadingCommentWithoutDetachedComments(cb);
                }
                else {
                    forEachLeadingCommentRange(currentText, pos, cb, /*state*/ pos);
                }
            }
        }

        function forEachTrailingCommentToEmit(end: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean) => void) {
            // Emit the trailing comments only if the container's end doesn't match because the container should take care of emitting these comments
            if (containerEnd === -1 || (end !== containerEnd && end !== declarationListContainerEnd)) {
                forEachTrailingCommentRange(currentText, end, cb);
            }
        }

        function reset() {
            currentSourceFile = undefined;
            currentText = undefined;
            currentLineMap = undefined;
            detachedCommentsInfo = undefined;
        }

        function setWriter(output: EmitTextWriter): void {
            writer = output;
        }

        function setSourceFile(sourceFile: SourceFile) {
            currentSourceFile = sourceFile;
            currentText = currentSourceFile.text;
            currentLineMap = getLineStarts(currentSourceFile);
            detachedCommentsInfo = undefined;
        }

        function hasDetachedComments(pos: number) {
            return detachedCommentsInfo !== undefined && lastOrUndefined(detachedCommentsInfo).nodePos === pos;
        }

        function forEachLeadingCommentWithoutDetachedComments(cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
            // get the leading comments from detachedPos
            const pos = lastOrUndefined(detachedCommentsInfo).detachedCommentEndPos;
            if (detachedCommentsInfo.length - 1) {
                detachedCommentsInfo.pop();
            }
            else {
                detachedCommentsInfo = undefined;
            }

            forEachLeadingCommentRange(currentText, pos, cb, /*state*/ pos);
        }

        function emitDetachedCommentsAndUpdateCommentsInfo(range: TextRange) {
            const currentDetachedCommentInfo = emitDetachedComments(currentText, currentLineMap, writer, writeComment, range, newLine, disabled);
            if (currentDetachedCommentInfo) {
                if (detachedCommentsInfo) {
                    detachedCommentsInfo.push(currentDetachedCommentInfo);
                }
                else {
                    detachedCommentsInfo = [currentDetachedCommentInfo];
                }
            }
        }

        function writeComment(text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
            if (emitPos) emitPos(commentPos);
            writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine);
            if (emitPos) emitPos(commentEnd);
        }

        /**
         * Determine if the given comment is a triple-slash
         *
         * @return true if the comment is a triple-slash comment else false
         */
        function isTripleSlashComment(commentPos: number, commentEnd: number) {
            // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
            // so that we don't end up computing comment string and doing match for all // comments
            if (currentText.charCodeAt(commentPos + 1) === CharacterCodes.slash &&
                commentPos + 2 < commentEnd &&
                currentText.charCodeAt(commentPos + 2) === CharacterCodes.slash) {
                const textSubStr = currentText.substring(commentPos, commentEnd);
                return textSubStr.match(fullTripleSlashReferencePathRegEx) ||
                    textSubStr.match(fullTripleSlashAMDReferencePathRegEx) ?
                    true : false;
            }
            return false;
        }
    }
}