/* @internal */
namespace ts.refactor {
    const refactorName = "Introduce Destruction";
    const actionNameIntroduceObjectDestruction = "Convert property access to Object destruction";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile) return emptyArray;

        const functionDeclaration = getFunctionDeclarationAtPosition(file, startPosition, context.program.getTypeChecker());
        if (!functionDeclaration) return emptyArray;

        const description = getLocaleSpecificMessage(Diagnostics.Convert_parameters_to_destructured_object);
        return [{
            name: refactorName,
            description,
            actions: [{
                name: refactorName,
                description
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined { 
        return undefined;
    }
}