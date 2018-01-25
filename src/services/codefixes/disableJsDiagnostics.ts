/* @internal */
namespace ts.codefix {
    const fixId = "disableJsDiagnostics";
    const errorCodes = mapDefined(Object.keys(Diagnostics) as ReadonlyArray<keyof typeof Diagnostics>, key => {
        const diag = Diagnostics[key];
        return diag.category === DiagnosticCategory.Error ? diag.code : undefined;
    });

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, program, span } = context;

            if (!isInJavaScriptFile(sourceFile) || !isCheckJsEnabledForFile(sourceFile, program.getCompilerOptions())) {
                return undefined;
            }

            const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Ignore_this_error_message),
                changes: [createFileTextChanges(sourceFile.fileName, [getIgnoreCommentLocationForLocation(sourceFile, span.start, newLineCharacter).change])],
                fixId,
            },
            {
                description: getLocaleSpecificMessage(Diagnostics.Disable_checking_for_this_file),
                changes: [createFileTextChanges(sourceFile.fileName, [
                    createTextChange(sourceFile.checkJsDirective ? createTextSpanFromBounds(sourceFile.checkJsDirective.pos, sourceFile.checkJsDirective.end) : createTextSpan(0, 0), `// @ts-nocheck${newLineCharacter}`),
                ])],
                // fixId unnecessary because adding `// @ts-nocheck` even once will ignore every error in the file.
                fixId: undefined,
            }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const seenLines = createMap<true>(); // Only need to add `// @ts-ignore` for a line once.
            return codeFixAllWithTextChanges(context, errorCodes, (changes, err) => {
                if (err.start !== undefined) {
                    const { lineNumber, change } = getIgnoreCommentLocationForLocation(err.file!, err.start, getNewLineOrDefaultFromHost(context.host, context.formatContext.options));
                    if (addToSeen(seenLines, lineNumber)) {
                        changes.push(change);
                    }
                }
            });
        },
    });

    function getIgnoreCommentLocationForLocation(sourceFile: SourceFile, position: number, newLineCharacter: string): { lineNumber: number, change: TextChange } {
        const { line: lineNumber } = getLineAndCharacterOfPosition(sourceFile, position);
        const lineStartPosition = getStartPositionOfLine(lineNumber, sourceFile);
        const startPosition = getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);

        // First try to see if we can put the '// @ts-ignore' on the previous line.
        // We need to make sure that we are not in the middle of a string literal or a comment.
        // We also want to check if the previous line holds a comment for a node on the next line
        // if so, we do not want to separate the node from its comment if we can.
        if (!isInComment(sourceFile, startPosition) && !isInString(sourceFile, startPosition) && !isInTemplateString(sourceFile, startPosition)) {
            const token = getTouchingToken(sourceFile, startPosition, /*includeJsDocComment*/ false);
            const tokenLeadingComments = getLeadingCommentRangesOfNode(token, sourceFile);
            if (!tokenLeadingComments || !tokenLeadingComments.length || tokenLeadingComments[0].pos >= startPosition) {
                return { lineNumber, change: createTextChangeFromStartLength(startPosition, 0, `// @ts-ignore${newLineCharacter}`) };
            }
        }

        // If all fails, add an extra new line immediately before the error span.
        return { lineNumber, change: createTextChangeFromStartLength(position, 0, `${position === startPosition ? "" : newLineCharacter}// @ts-ignore${newLineCharacter}`) };
    }
}
