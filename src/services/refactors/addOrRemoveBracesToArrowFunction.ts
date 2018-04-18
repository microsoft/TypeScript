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
        expression: Expression;
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

        const { expression, func } = info;
        const changeTracker = textChanges.ChangeTracker.fromContext(context);

        let body: ConciseBody;
        if (actionName === addBracesActionName) {
            const returnStatement = createReturn(expression);
            body = createBlock([returnStatement]);
            copyComments(expression, returnStatement, file, SyntaxKind.SingleLineCommentTrivia, true);
        }
        else if (actionName === removeBracesActionName) {
            const returnStatement = <ReturnStatement>expression.parent;
            body = needsParentheses(expression) ? createParen(expression) : expression;
            copyComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, false);
        }
        else {
            Debug.fail('invalid action');
        }

        updateBody(changeTracker, file, func, body);

        return {
            renameFilename: undefined,
            renameLocation: undefined,
            edits: changeTracker.getChanges()
        };
    }

    function needsParentheses(expression: Expression) {
        if (isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.CommaToken) return true;
        if (isObjectLiteralExpression(expression)) return true;
        return false;
    }

    function updateBody(changeTracker: textChanges.ChangeTracker, file: SourceFile, container: ArrowFunction, body: ConciseBody) {
        const arrowFunction = updateArrowFunction(
            container,
            container.modifiers,
            container.typeParameters,
            container.parameters,
            container.type,
            body);
        changeTracker.replaceNode(file, container, arrowFunction);
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
                    expression: firstStatement.expression
                };
            }
        }
        return undefined;
    }
}
