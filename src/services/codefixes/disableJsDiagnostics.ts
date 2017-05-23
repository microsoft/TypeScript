/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: getApplicableDiagnosticCodes(),
        getCodeActions: getDisableJsDiagnosticsCodeActions
    });

    function getApplicableDiagnosticCodes(): number[] {
        const allDiagnostcs = <MapLike<DiagnosticMessage>>Diagnostics;
        return Object.keys(allDiagnostcs)
            .filter(d => allDiagnostcs[d] && allDiagnostcs[d].category === DiagnosticCategory.Error)
            .map(d => allDiagnostcs[d].code);
    }

    function getIgnoreCommentLocationForLocation(sourceFile: SourceFile, position: number, newLineCharacter: string) {
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

        // If all fails, add an extra new line immediatlly before the error span.
        return {
            span: { start: position, length: 0 },
            newText: `${position === startPosition ? "" : newLineCharacter}// @ts-ignore${newLineCharacter}`
        };
    }

    function getDisableJsDiagnosticsCodeActions(context: CodeFixContext): CodeAction[] | undefined {
        const { sourceFile, program, newLineCharacter, span } = context;

        if (!isInJavaScriptFile(sourceFile) || !isCheckJsEnabledForFile(sourceFile, program.getCompilerOptions())) {
            return undefined;
        }

        return [{
            description: getLocaleSpecificMessage(Diagnostics.Ignore_this_error_message),
            changes: [{
                fileName: sourceFile.fileName,
                textChanges: [getIgnoreCommentLocationForLocation(sourceFile, span.start, newLineCharacter)]
            }]
        },
        {
            description: getLocaleSpecificMessage(Diagnostics.Disable_checking_for_this_file),
            changes: [{
                fileName: sourceFile.fileName,
                textChanges: [{
                    span: {
                        start: sourceFile.checkJsDirective ? sourceFile.checkJsDirective.pos : 0,
                        length: sourceFile.checkJsDirective ? sourceFile.checkJsDirective.end - sourceFile.checkJsDirective.pos : 0
                    },
                    newText: `// @ts-nocheck${newLineCharacter}`
                }]
            }]
        }];
    }
}