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
            const { sourceFile, program, span, host, formatContext } = context;

            if (!isInJavaScriptFile(sourceFile) || !isCheckJsEnabledForFile(sourceFile, program.getCompilerOptions())) {
                return undefined;
            }

            const fixes: CodeFixAction[] = [
                {
                    description: getLocaleSpecificMessage(Diagnostics.Disable_checking_for_this_file),
                    changes: [createFileTextChanges(sourceFile.fileName, [
                        createTextChange(sourceFile.checkJsDirective
                            ? createTextSpanFromBounds(sourceFile.checkJsDirective.pos, sourceFile.checkJsDirective.end)
                            : createTextSpan(0, 0), `// @ts-nocheck${getNewLineOrDefaultFromHost(host, formatContext.options)}`),
                    ])],
                    // fixId unnecessary because adding `// @ts-nocheck` even once will ignore every error in the file.
                    fixId: undefined,
                }];

            if (isValidSuppressLocation(sourceFile, span.start)) {
                fixes.unshift({
                    description: getLocaleSpecificMessage(Diagnostics.Ignore_this_error_message),
                    changes: textChanges.ChangeTracker.with(context, t => makeChange(t, sourceFile, span.start)),
                    fixId,
                });
            }

            return fixes;
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const seenLines = createMap<true>();
            return codeFixAll(context, errorCodes, (changes, diag) => {
                if (isValidSuppressLocation(diag.file!, diag.start!)) {
                    makeChange(changes, diag.file!, diag.start!, seenLines);
                }
            });
        },
    });

    function isValidSuppressLocation(sourceFile: SourceFile, position: number) {
        return !isInComment(sourceFile, position) && !isInString(sourceFile, position) && !isInTemplateString(sourceFile, position);
    }

    function makeChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, position: number, seenLines?: Map<true>) {
        const { line: lineNumber } = getLineAndCharacterOfPosition(sourceFile, position);

        // Only need to add `// @ts-ignore` for a line once.
        if (seenLines && !addToSeen(seenLines, lineNumber)) {
            return;
        }

        const lineStartPosition = getStartPositionOfLine(lineNumber, sourceFile);
        const startPosition = getFirstNonSpaceCharacterPosition(sourceFile.text, lineStartPosition);

        // First try to see if we can put the '// @ts-ignore' on the previous line.
        // We need to make sure that we are not in the middle of a string literal or a comment.
        // If so, we do not want to separate the node from its comment if we can.
        // Otherwise, add an extra new line immediately before the error span.
        const insertAtLineStart = isValidSuppressLocation(sourceFile, startPosition);

        const token = getTouchingToken(sourceFile, insertAtLineStart ? startPosition : position, /*includeJsDocComment*/ false);
        const clone = setStartsOnNewLine(getSynthesizedDeepClone(token), true);
        addSyntheticLeadingComment(clone, SyntaxKind.SingleLineCommentTrivia, " @ts-ignore");
        changes.replaceNode(sourceFile, token, clone, { preserveLeadingWhitespace: true, prefix: insertAtLineStart ? undefined : changes.newLineCharacter });
    }
}
