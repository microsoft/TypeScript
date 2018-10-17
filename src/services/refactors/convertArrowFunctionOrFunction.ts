/* @internal */
namespace ts.refactor.convertArrowFunctionOrFunction {
    const refactorName = "Convert arrow function or anonymous function";
    const refactorDescription = Diagnostics.Convert_arrow_function_or_anonymous_function.message;

    const toAnonymousFunctionActionName = "Convert to anonymous function";
    const toNamedFunctionActionName = "Convert to named function";
    const toArrowFunctionActionName = "Convert to arrow function";

    const toAnonymousFunctionActionDescription = Diagnostics.Convert_to_anonymous_function.message;
    const toNamedFunctionActionDescription = Diagnostics.Convert_to_named_function.message;
    const toArrowFunctionActionDescription = Diagnostics.Convert_to_arrow_function.message;

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {

        const { file, startPosition } = context;

        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);
        if (!func || !(isFunctionExpression(func) || isArrowFunction(func)) || rangeContainsRange(func.body, node)) return undefined;

        const possibleActions: RefactorActionInfo[] = [];

        if (isArrowFunction(func)) {
            if (isVariableDeclaration(func.parent)) {
                possibleActions.push({
                        name: toNamedFunctionActionName,
                        description: toNamedFunctionActionDescription
                    });
            }

            possibleActions.push({
                    name: toAnonymousFunctionActionName,
                    description: toAnonymousFunctionActionDescription
                });
        }
        else {
            possibleActions.push({
                name: toArrowFunctionActionName,
                description: toArrowFunctionActionDescription
            });
        }

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: possibleActions
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        context;
        actionName;
        return undefined;
    }

}
