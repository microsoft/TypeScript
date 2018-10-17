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
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                    {
                        name: toAnonymousFunctionActionName,
                        description: toAnonymousFunctionActionDescription
                    },
                    {
                        name: toNamedFunctionActionName,
                        description: toNamedFunctionActionDescription
                    },
                    {
                        name: toArrowFunctionActionName,
                        description: toArrowFunctionActionDescription
                    }
            ]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        return undefined;
    }

}
