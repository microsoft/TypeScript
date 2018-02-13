/// <reference path="sourcemap.ts" />

/* @internal */
namespace ts {
    export interface CommentWriter {
        reset(): void;
        setSourceFile(sourceFile: SourceFile): void;
        setWriter(writer: EmitTextWriter): void;
        emitLeadingCommentsOfNode(node: Node | undefined): void;
        emitTrailingCommentsOfNode(node: Node | undefined): void;
        emitLeadingDetachedCommentsOfBody(node: Node, detachedRange: TextRange): void;
        emitTrailingDetachedCommentsOfBody(node: Node, detachedRange: TextRange): void;
        emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean): void;
        emitLeadingCommentsOfPosition(pos: number): void;
    }

    export function createCommentWriter(printerOptions: PrinterOptions, emitPos: ((pos: number) => void) | undefined): CommentWriter {
        const extendedDiagnostics = printerOptions.extendedDiagnostics;
        const newLine = getNewLineCharacter(printerOptions);
        const containerPosStack: number[] = [];
        const containerEndStack: number[] = [];
        const declarationListContainerEndStack: number[] = [];
        let writer: EmitTextWriter;
        let containerPos = -1;
        let containerEnd = -1;
        let declarationListContainerEnd = -1;
        let currentSourceFile: SourceFile;
        let currentText: string;
        let currentLineMap: ReadonlyArray<number>;
        let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number}[];
        let hasWrittenComment = false;
        let disabled: number = printerOptions.removeComments ? -1 : 0;

        return {
            reset,
            setWriter,
            setSourceFile,
            emitLeadingCommentsOfNode,
            emitTrailingCommentsOfNode,
            emitLeadingDetachedCommentsOfBody,
            emitTrailingDetachedCommentsOfBody,
            emitTrailingCommentsOfPosition,
            emitLeadingCommentsOfPosition,
        };

        function emitLeadingCommentsOfNode(node: Node | undefined) {
            if (!node) return;

            const emitFlags = getEmitFlags(node);
            if (!disabled) {
                if (extendedDiagnostics) performance.mark("emitLeadingCommentsOfNode");

                hasWrittenComment = false;
                const commentRange = getCommentRange(node);
                if (!isSynthesized(commentRange)) {
                    const skipLeadingComments = shouldSkipLeadingComments(node.kind, commentRange, emitFlags);
                    const skipTrailingComments = shouldSkipTrailingComments(node.kind, commentRange, emitFlags);

                    // Emit leading comments if the position is not synthesized and the node
                    // has not opted out from emitting leading comments.
                    if (!skipLeadingComments) {
                        emitLeadingComments(commentRange.pos, node.kind !== SyntaxKind.NotEmittedStatement);
                    }

                    pushContainer(node.kind, commentRange, skipLeadingComments, skipTrailingComments);
                }

                forEach(getSyntheticLeadingComments(node), emitLeadingSynthesizedComment);

                if (extendedDiagnostics) performance.measure("commentTime", "emitLeadingCommentsOfNode");
            }

            pushDisabledState(emitFlags);
        }

        function emitTrailingCommentsOfNode(node: Node | undefined) {
            if (!node) return;

            const emitFlags = getEmitFlags(node);
            popDisabledState(emitFlags);

            if (!disabled) {
                if (extendedDiagnostics) performance.mark("emitTrailingCommentsOfNode");

                forEach(getSyntheticTrailingComments(node), emitTrailingSynthesizedComment);

                const commentRange = getCommentRange(node);
                if (!isSynthesized(commentRange)) {
                    const skipLeadingComments = shouldSkipLeadingComments(node.kind, commentRange, emitFlags);
                    const skipTrailingComments = shouldSkipTrailingComments(node.kind, commentRange, emitFlags);
                    popContainer(node.kind, skipLeadingComments, skipTrailingComments);

                    // Emit trailing comments if the position is not synthesized and the node
                    // has not opted out from emitting leading comments and is an emitted node.
                    if (!skipTrailingComments && node.kind !== SyntaxKind.NotEmittedStatement) {
                        emitTrailingComments(commentRange.end);
                    }
                }

                if (extendedDiagnostics) performance.measure("commentTime", "emitTrailingCommentsOfNode");
            }
        }

        function shouldSkipLeadingComments(kind: SyntaxKind, commentRange: TextRange, emitFlags: EmitFlags) {
            // We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
            // It is expensive to walk entire tree just to set one kind of node to have no comments.
            return kind === SyntaxKind.JsxText || commentRange.pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
        }

        function shouldSkipTrailingComments(kind: SyntaxKind, commentRange: TextRange, emitFlags: EmitFlags) {
            // We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
            // It is expensive to walk entire tree just to set one kind of node to have no comments.
            return kind === SyntaxKind.JsxText || commentRange.end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;
        }

        function isSynthesized(range: TextRange) {
            return range.pos < 0 && range.end < 0 || range.pos === range.end;
        }

        function pushDisabledState(emitFlags: EmitFlags) {
            if (disabled >= 0 && emitFlags & EmitFlags.NoNestedComments) {
                disabled++;
            }
        }

        function popDisabledState(emitFlags: EmitFlags) {
            if (disabled > 0 && emitFlags & EmitFlags.NoNestedComments) {
                disabled--;
            }
        }

        function pushContainer(kind: SyntaxKind, commentRange: TextRange, skipLeadingComments: boolean, skipTrailingComments: boolean) {
            // Save current container state on the stack.
            if (!skipLeadingComments) {
                containerPosStack.push(containerPos);
                containerPos = commentRange.pos;
            }

            if (!skipTrailingComments) {
                containerEndStack.push(containerEnd);
                containerEnd = commentRange.end;

                // To avoid invalid comment emit in a down-level binding pattern, we
                // keep track of the last declaration list container's end
                if (kind === SyntaxKind.VariableDeclarationList) {
                    declarationListContainerEndStack.push(declarationListContainerEnd);
                    declarationListContainerEnd = commentRange.end;
                }
            }
        }

        function popContainer(kind: SyntaxKind, skipLeadingComments: boolean, skipTrailingComments: boolean) {
            if (!skipLeadingComments) {
                containerPos = containerPosStack.pop();
            }

            if (!skipTrailingComments) {
                containerEnd = containerEndStack.pop();
                if (kind === SyntaxKind.VariableDeclarationList) {
                    declarationListContainerEnd = declarationListContainerEndStack.pop();
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

        function emitLeadingDetachedCommentsOfBody(node: Node, detachedRange: TextRange) {
            if (extendedDiagnostics) performance.mark("emitLeadingDetachedCommentsOfBody");

            const emitFlags = getEmitFlags(node);
            const skipLeadingComments = detachedRange.pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;

            if (!skipLeadingComments) {
                emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
            }

            if (extendedDiagnostics) performance.measure("commentTime", "emitLeadingDetachedCommentsOfBody");
            pushDisabledState(emitFlags);
        }

        function emitTrailingDetachedCommentsOfBody(node: Node, detachedRange: TextRange) {
            if (extendedDiagnostics) performance.mark("emitTrailingDetachedCommentsOfBody");

            const emitFlags = getEmitFlags(node);
            popDisabledState(emitFlags);

            const skipTrailingComments = disabled || detachedRange.end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;

            if (!skipTrailingComments) {
                emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
                if (hasWrittenComment && !writer.isAtStartOfLine()) {
                    writer.writeLine();
                }
            }

            if (extendedDiagnostics) performance.measure("commentTime", "emitTrailingDetachedCommentsOfBody");
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

        function emitLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
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
            else if (kind === SyntaxKind.MultiLineCommentTrivia) {
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

        function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean) {
            if (disabled) {
                return;
            }

            if (extendedDiagnostics) {
                performance.mark("beforeEmitTrailingCommentsOfPosition");
            }

            forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : emitTrailingCommentOfPosition);

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
            const currentDetachedCommentInfo = emitDetachedComments(currentText, currentLineMap, writer, writeComment, range, newLine, !!disabled);
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
            return isRecognizedTripleSlashComment(currentText, commentPos, commentEnd);
        }
    }
}