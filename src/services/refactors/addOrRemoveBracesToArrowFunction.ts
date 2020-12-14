/* @internal */
namespace ts.refactor.addOrRemoveBracesToArrowFunction {
    const refactorName = "Add or remove braces in an arrow function";
    const refactorDescription = Diagnostics.Add_or_remove_braces_in_an_arrow_function.message;
    const addBracesActionName = "Add braces to arrow function";
    const removeBracesActionName = "Remove braces from arrow function";
    const addBracesActionDescription = Diagnostics.Add_braces_to_arrow_function.message;
    const removeBracesActionDescription = Diagnostics.Remove_braces_from_arrow_function.message;

    const rewriteArrowBracesRemoveKind = "refactor.rewrite.arrow.braces.remove";
    const rewriteArrowBracesAddKind = "refactor.rewrite.arrow.braces.add";
    const refactorKinds = [
        rewriteArrowBracesAddKind,
        rewriteArrowBracesRemoveKind
    ];

    registerRefactor(refactorName, { refactorKinds, getEditsForAction, getAvailableActions });

    interface Info {
        func: ArrowFunction;
        expression: Expression | undefined;
        returnStatement?: ReturnStatement;
        addBraces: boolean;
    }

    type InfoOrError = {
        info: Info,
        error?: never
    } | {
        info?: never,
        error: string
    };

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, triggerReason } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition, triggerReason === "invoked");
        if (!info) return emptyArray;

        if (info.error === undefined) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [
                    info.info.addBraces ?
                        {
                            name: addBracesActionName,
                            description: addBracesActionDescription,
                            refactorKind: rewriteArrowBracesAddKind
                        } : {
                            name: removeBracesActionName,
                            description: removeBracesActionDescription,
                            refactorKind: rewriteArrowBracesRemoveKind
                        }
                ]
            }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: refactorDescription,
                actions: [{
                    name: addBracesActionName,
                    description: addBracesActionDescription,
                    notApplicableReason: info.error,
                    refactorKind: rewriteArrowBracesAddKind
                }, {
                    name: removeBracesActionName,
                    description: removeBracesActionDescription,
                    notApplicableReason: info.error,
                    refactorKind: rewriteArrowBracesRemoveKind
                }]
            }];
        }

        return emptyArray;
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info || !info.info) return undefined;

        const { expression, returnStatement, func } = info.info;

        let body: ConciseBody;

        if (actionName === addBracesActionName) {
            const returnStatement = factory.createReturnStatement(expression);
            body = factory.createBlock([returnStatement], /* multiLine */ true);
            suppressLeadingAndTrailingTrivia(body);
            copyLeadingComments(expression!, returnStatement, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ true);
        }
        else if (actionName === removeBracesActionName && returnStatement) {
            const actualExpression = expression || factory.createVoidZero();
            body = needsParentheses(actualExpression) ? factory.createParenthesizedExpression(actualExpression) : actualExpression;
            suppressLeadingAndTrailingTrivia(body);
            copyTrailingAsLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
            copyLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
            copyTrailingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        }
        else {
            Debug.fail("invalid action");
        }

        const edits = textChanges.ChangeTracker.with(context, t => {
            t.replaceNode(file, func.body, body);
        });

        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function getConvertibleArrowFunctionAtPosition(file: SourceFile, startPosition: number, considerFunctionBodies = true, refactorKind?: string): InfoOrError | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);

        if (!func) {
            return {
                error: getLocaleSpecificMessage(Diagnostics.Could_not_find_a_containing_arrow_function)
            };
        }

        if (!isArrowFunction(func)) {
            return {
                error: getLocaleSpecificMessage(Diagnostics.Containing_function_is_not_an_arrow_function)
            };
        }

        if ((!rangeContainsRange(func, node) || rangeContainsRange(func.body, node) && !considerFunctionBodies)) {
            return undefined;
        }

        if (refactorKindBeginsWith(rewriteArrowBracesAddKind, refactorKind) && isExpression(func.body)) {
            return { info: { func, addBraces: true, expression: func.body } };
        }
        else if (refactorKindBeginsWith(rewriteArrowBracesRemoveKind, refactorKind) && isBlock(func.body) && func.body.statements.length === 1) {
            const firstStatement = first(func.body.statements);
            if (isReturnStatement(firstStatement)) {
                return { info: { func, addBraces: false, expression: firstStatement.expression, returnStatement: firstStatement } };
            }
        }
        return undefined;
    }
}
