/* @internal */
namespace ts.refactor.convertArrowFunction {
    const refactorName = "Convert arrow function";
    const refactorDescription = Diagnostics.Convert_arrow_function.message;
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

        const actions: RefactorActionInfo[] = [
            info.addBraces ?
                {
                    name: addBracesActionName,
                    description: addBracesActionDescription
                } : {
                    name: removeBracesActionName,
                    description: removeBracesActionDescription
                }
        ];

        return [{
            name: refactorName,
            description: refactorDescription,
            actions
        }];
    }

    function getEditsForAction(context: RefactorContext, _actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
        if (!info) return undefined;

        const { addBraces, expression, container } = info;
        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        updateBraces(changeTracker, file, container, expression, addBraces);

        return {
            renameFilename: undefined,
            renameLocation: undefined,
            edits: changeTracker.getChanges()
        };
    }

    function updateBraces(changeTracker: textChanges.ChangeTracker, file: SourceFile, container: ArrowFunction, expression: Expression, addBraces: boolean) {
        const body = addBraces ? createBlock([createReturn(expression)]) : expression;

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
        else if (container.body.statements.length === 1 && isReturnStatement(first(container.body.statements))) {
            return {
                container,
                addBraces: false,
                expression: (<ReturnStatement>first(container.body.statements)).expression
            };
        }
        return undefined;
    }
}
