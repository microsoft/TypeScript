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
        container: ArrowFunction;
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

    function getEditsForAction(context: RefactorContext, _actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info) return undefined;

        const { expression, container } = info;
        const changeTracker = textChanges.ChangeTracker.fromContext(context);

        if (_actionName === addBracesActionName) {
            addBraces(changeTracker, file, container, expression);
        }
        else if (_actionName === removeBracesActionName) {
            removeBraces(changeTracker, file, container, expression);
        }
        else {
            Debug.fail("invalid action");
        }

        return {
            renameFilename: undefined,
            renameLocation: undefined,
            edits: changeTracker.getChanges()
        };
    }

    function addBraces(changeTracker: textChanges.ChangeTracker, file: SourceFile, container: ArrowFunction, expression: Expression) {
        updateBraces(changeTracker, file, container, createBlock([createReturn(expression)]));
    }

    function removeBraces(changeTracker: textChanges.ChangeTracker, file: SourceFile, container: ArrowFunction, expression: Expression) {
        if (!isLiteralExpression(expression) && !isIdentifier(expression) && !isParenthesizedExpression(expression) && expression.kind !== SyntaxKind.NullKeyword) {
            expression = createParen(expression);
        }
        updateBraces(changeTracker, file, container, expression);
    }

    function updateBraces(changeTracker: textChanges.ChangeTracker, file: SourceFile, container: ArrowFunction, body: ConciseBody) {
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
        const container = getContainingFunction(node);
        if (!container || !isArrowFunction(container)) return undefined;

        if (isExpression(container.body)) {
            return {
                container,
                addBraces: true,
                expression: container.body
            };
        }
        else if (container.body.statements.length === 1) {
            const firstStatement = first(container.body.statements);
            if (isReturnStatement(firstStatement)) {
                return {
                    container,
                    addBraces: false,
                    expression: firstStatement.expression
                };
            }
        }
        return undefined;
    }
}
