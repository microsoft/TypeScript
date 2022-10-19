/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
const actionName = "Generate 'get' and 'set' accessors";
const actionDescription = ts.Diagnostics.Generate_get_and_set_accessors.message;

const generateGetSetAction = {
    name: actionName,
    description: actionDescription,
    kind: "refactor.rewrite.property.generateAccessors",
};
ts.refactor.registerRefactor(actionName, {
    kinds: [generateGetSetAction.kind],
    getEditsForAction: function getRefactorActionsToGenerateGetAndSetAccessors(context, actionName) {
        if (!context.endPosition) return undefined;
        const info = ts.codefix.getAccessorConvertiblePropertyAtPosition(context.file, context.program, context.startPosition, context.endPosition);
        ts.Debug.assert(info && !ts.refactor.isRefactorErrorInfo(info), "Expected applicable refactor info");
        const edits = ts.codefix.generateAccessorFromProperty(context.file, context.program, context.startPosition, context.endPosition, context, actionName);
        if (!edits) return undefined;

        const renameFilename = context.file.fileName;
        const nameNeedRename = info.renameAccessor ? info.accessorName : info.fieldName;
        const renameLocationOffset = ts.isIdentifier(nameNeedRename) ? 0 : -1;
        const renameLocation = renameLocationOffset + ts.getRenameLocation(edits, renameFilename, nameNeedRename.text, /*preferLastLocation*/ ts.isParameter(info.declaration));

        return { renameFilename, renameLocation, edits };
    },
    getAvailableActions(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
        if (!context.endPosition) return ts.emptyArray;
        const info = ts.codefix.getAccessorConvertiblePropertyAtPosition(context.file, context.program, context.startPosition, context.endPosition, context.triggerReason === "invoked");
        if (!info) return ts.emptyArray;

        if (!ts.refactor.isRefactorErrorInfo(info)) {
            return [{
                name: actionName,
                description: actionDescription,
                actions: [generateGetSetAction],
            }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{
                name: actionName,
                description: actionDescription,
                actions: [{ ...generateGetSetAction, notApplicableReason: info.error }],
            }];
        }

        return ts.emptyArray;
    }
});
}
