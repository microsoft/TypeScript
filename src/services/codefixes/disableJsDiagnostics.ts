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

    function shouldCheckJsFile(sourceFile: SourceFile, compilerOptions: CompilerOptions) {
        return sourceFile.checkJsDirective ? sourceFile.checkJsDirective.enabled : compilerOptions.checkJs;
    }

    function getSuppressCommentLocationForLocation(sourceFile: SourceFile, position: number, newLineCharacter: string) {
        let { line } = getLineAndCharacterOfPosition(sourceFile, position);
        const lineStartPosition = getStartPositionOfLine(line, sourceFile);
        const startPosition = getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);
        if (!isInComment(sourceFile, startPosition) && !isInString(sourceFile, startPosition) && !isInTemplateString(sourceFile, startPosition)) {
            const token = getTouchingToken(sourceFile, startPosition);
            const tokenLeadingCommnets = getLeadingCommentRangesOfNode(token, sourceFile)
            if (!tokenLeadingCommnets || !tokenLeadingCommnets.length || tokenLeadingCommnets[0].pos >= startPosition) {
                return {
                    span: { start: startPosition, length: 0 },
                    newText: `// @ts-suppress${newLineCharacter}`
                };
            }
        }
        return {
            span: { start: position, length: 0 },
            newText: `${position === startPosition ? "" : newLineCharacter}// @ts-suppress${newLineCharacter}`
        };
    }

    function getDisableJsDiagnosticsCodeActions(context: CodeFixContext): CodeAction[] | undefined {
        const { sourceFile, program, newLineCharacter, span } = context;

        if (!isInJavaScriptFile(sourceFile) || !shouldCheckJsFile(sourceFile, program.getCompilerOptions())) {
            return undefined;
        }

        return [{
            description: getLocaleSpecificMessage(Diagnostics.Suppress_this_error_message),
            changes: [{
                fileName: sourceFile.fileName,
                textChanges: [getSuppressCommentLocationForLocation(sourceFile, span.start, newLineCharacter)]
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