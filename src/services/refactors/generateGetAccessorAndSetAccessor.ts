/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, { getEditsForAction: codefix.getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        if (!codefix.getConvertibleFieldAtPosition(context)) return emptyArray;

        return [{
            name: actionName,
            description: actionDescription,
            actions: [
                {
                    name: actionName,
                    description: actionDescription
                }
            ]
        }];
    }
}
