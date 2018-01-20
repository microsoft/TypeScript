/* @internal */
namespace ts.codefix {
    const fixId = "disableJsDiagnostics";
    const errorCodes = mapDefined(Object.keys(Diagnostics), key => {
        const diag = (Diagnostics as MapLike<DiagnosticMessage>)[key];
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
                changes: [createFileTextChanges(sourceFile.fileName, [getIgnoreCommentLocationForLocation(sourceFile, span.start, newLineCharacter)])],
                fixId,
            },
            {
                description: getLocaleSpecificMessage(Diagnostics.Disable_checking_for_this_file),
                changes: [createFileTextChanges(sourceFile.fileName, [{
                    span: {
                        start: sourceFile.checkJsDirective ? sourceFile.checkJsDirective.pos : 0,
                        length: sourceFile.checkJsDirective ? sourceFile.checkJsDirective.end - sourceFile.checkJsDirective.pos : 0
                    },
                    newText: `// @ts-nocheck${newLineCharacter}`
                }])],
                // fixId unnecessary because adding `// @ts-nocheck` even once will ignore every error in the file.
                fixId: undefined,
            }];
        },
        fixIds: [fixId], // No point applying as a group, doing it once will fix all errors
        getAllCodeActions: context => codeFixAllWithTextChanges(context, errorCodes, (changes, err) => {
            if (err.start !== undefined) {
                changes.push(getIgnoreCommentLocationForLocation(err.file!, err.start, getNewLineOrDefaultFromHost(context.host, context.formatContext.options)));
            }
        }),
    });

    function getIgnoreCommentLocationForLocation(sourceFile: SourceFile, position: number, newLineCharacter: string): TextChange {
        const { line } = getLineAndCharacterOfPosition(sourceFile, position);
        const lineStartPosition = getStartPositionOfLine(line, sourceFile);
        const startPosition = getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);

        // First try to see if we can put the '// @ts-ignore' on the previous line.
        // We need to make sure that we are not in the middle of a string literal or a comment.
        // We also want to check if the previous line holds a comment for a node on the next line
        // if so, we do not want to separate the node from its comment if we can.
        if (!isInComment(sourceFile, startPosition) && !isInString(sourceFile, startPosition) && !isInTemplateString(sourceFile, startPosition)) {
            const token = getTouchingToken(sourceFile, startPosition, /*includeJsDocComment*/ false);
            const tokenLeadingCommnets = getLeadingCommentRangesOfNode(token, sourceFile);
            if (!tokenLeadingCommnets || !tokenLeadingCommnets.length || tokenLeadingCommnets[0].pos >= startPosition) {
                return {
                    span: { start: startPosition, length: 0 },
                    newText: `// @ts-ignore${newLineCharacter}`
                };
            }
        }

        // If all fails, add an extra new line immediately before the error span.
        return {
            span: { start: position, length: 0 },
            newText: `${position === startPosition ? "" : newLineCharacter}// @ts-ignore${newLineCharacter}`
        };
    }
}
