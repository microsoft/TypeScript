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
        fixIds: [fixId],
        getAllCodeActions: context => {
            const seenLines = createMap<true>(); // Only need to add `// @ts-ignore` for a line once.
            return codeFixAllWithTextChanges(context, errorCodes, (changes, err) => {
                if (err.start !== undefined) {
                    const { line, change } = getIgnoreCommentLocationForLocation(err.file!, err.start, getNewLineOrDefaultFromHost(context.host, context.formatContext.options));
                    if (addToSeen(seenLines, line)) {
                        changes.push(change);
                    }
                }
            });
        },
    });

    function getIgnoreCommentLocationForLocation(sourceFile: SourceFile, position: number, newLineCharacter: string): { line: number, change: TextChange } {
        const { line } = getLineAndCharacterOfPosition(sourceFile, position);
        const lineStartPosition = getStartPositionOfLine(line, sourceFile);
        const startPosition = getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);

        // First try to see if we can put the '// @ts-ignore' on the previous line.
        // We need to make sure that we are not in the middle of a string literal or a comment.
        // We also want to check if the previous line holds a comment for a node on the next line
        // if so, we do not want to separate the node from its comment if we can.
        if (!isInComment(sourceFile, startPosition) && !isInString(sourceFile, startPosition) && !isInTemplateString(sourceFile, startPosition)) {
            const token = getTouchingToken(sourceFile, startPosition, /*includeJsDocComment*/ false);
            const tokenLeadingComments = getLeadingCommentRangesOfNode(token, sourceFile);
            if (!tokenLeadingComments || !tokenLeadingComments.length || tokenLeadingComments[0].pos >= startPosition) {
                return { line, change: createTextChange(startPosition, 0, `// @ts-ignore${newLineCharacter}`) };
            }
        }

        // If all fails, add an extra new line immediately before the error span.
        return { line, change: createTextChange(position, 0, `${position === startPosition ? "" : newLineCharacter}// @ts-ignore${newLineCharacter}`) };
    }

    function createTextChange(start: number, length: number, newText: string): TextChange {
        return { span: { start, length }, newText };
    }
}
