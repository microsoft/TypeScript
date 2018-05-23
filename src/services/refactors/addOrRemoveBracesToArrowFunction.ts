/* @internal */
namespace ts.refactor.addOrRemoveBracesToArrowFunction {
    const refactorName = "Add or remove braces in an arrow function";
    const refactorDescription = Diagnostics.Add_or_remove_braces_in_an_arrow_function.message;
    const addBracesActionName = "Add braces to arrow function";
    const removeBracesActionName = "Remove braces from arrow function";
    const addBracesActionDescription = Diagnostics.Add_braces_to_arrow_function.message;
    const removeBracesActionDescription = Diagnostics.Remove_braces_from_arrow_function.message;
    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    interface Info {
        func: ArrowFunction;
        expression: Expression | undefined;
        returnStatement?: ReturnStatement;
        addBraces: boolean;
    }

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info) return undefined;

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                info.addBraces ?
                    {
                        name: addBracesActionName,
                        description: addBracesActionDescription
                    } : {
                        name: removeBracesActionName,
                        description: removeBracesActionDescription
                    }
            ]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info) return undefined;

        const { expression, returnStatement, func } = info;

        let body: ConciseBody;
        if (actionName === addBracesActionName) {
            const returnStatement = createReturn(expression);
            body = createBlock([returnStatement], /* multiLine */ true);
            suppressLeadingAndTrailingTrivia(body);
            copyComments(expression!, returnStatement, file, SyntaxKind.MultiLineCommentTrivia, /* explicitHtnl */ true);
        }
        else if (actionName === removeBracesActionName && returnStatement) {
            const actualExpression = expression || createVoidZero();
            body = needsParentheses(actualExpression) ? createParen(actualExpression) : actualExpression;
            suppressLeadingAndTrailingTrivia(body);
            copyComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* explicitHtnl */ false);
        }
        else {
            Debug.fail("invalid action");
        }

        const edits = textChanges.ChangeTracker.with(context, t => updateBody(t, file, func, body));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function needsParentheses(expression: Expression) {
        return isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.CommaToken || isObjectLiteralExpression(expression);
    }

    function updateBody(changeTracker: textChanges.ChangeTracker, file: SourceFile, container: ArrowFunction, body: ConciseBody) {
        changeTracker.replaceNode(file, container.body, body);
    }

    function getConvertibleArrowFunctionAtPosition(file: SourceFile, startPosition: number): Info | undefined {
        const node = getTokenAtPosition(file, startPosition, /*includeJsDocComment*/ false);
        const func = getContainingFunction(node);
        if (!func || !isArrowFunction(func)) return undefined;

        if (isExpression(func.body)) {
            return {
                func,
                addBraces: true,
                expression: func.body
            };
        }
        else if (func.body.statements.length === 1) {
            const firstStatement = first(func.body.statements);
            if (isReturnStatement(firstStatement)) {
                return {
                    func,
                    addBraces: false,
                    expression: firstStatement.expression,
                    returnStatement: firstStatement
                };
            }
        }
        return undefined;
    }
}
