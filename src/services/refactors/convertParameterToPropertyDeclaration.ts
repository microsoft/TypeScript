/* @internal */
namespace ts.refactor.convertParameterToPropertyDeclaration {
    const actionName = "Convert parameter property to property declaration";
    registerRefactor(actionName, {
        getEditsForAction(context) {
            const info = codefix.getConvertParameterPropertyToPropertyInfo(context.file, context.startPosition, context.endPosition);
            if (!info) return undefined;

            const edits = textChanges.ChangeTracker.with(context, changeTracker => codefix.getConvertParameterPropertyToPropertyChanges(changeTracker, context.file, info));
            if (!edits) return undefined;

            return { renameFilename: undefined, renameLocation: undefined, edits };
        },
        getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
            const info = codefix.getConvertParameterPropertyToPropertyInfo(context.file, context.startPosition, context.endPosition);
            if (!info) return emptyArray;

            return [{
                name: actionName,
                description: actionName,
                actions: [
                    {
                        name: actionName,
                        description: actionName
                    }
                ]
            }];
        }
    });
}
