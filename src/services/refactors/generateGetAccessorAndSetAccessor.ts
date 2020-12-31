/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;

    const generateGetSetAction = {
        name: actionName,
        description: actionDescription,
        kind: "refactor.rewrite.property.generateAccessors",
    };
    registerRefactor(actionName, {
        kinds: [generateGetSetAction.kind],
        getEditsForAction(context, actionName) {
            if (!context.endPosition) return undefined;
            const info = codefix.getAccessorConvertiblePropertyAtPosition(context.file, context.program, context.startPosition, context.endPosition);
            Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");
            const edits = codefix.generateAccessorFromProperty(context.file, context.program, context.startPosition, context.endPosition, context, actionName);
            if (!edits) return undefined;

            const renameFilename = context.file.fileName;
            const nameNeedRename = info.renameAccessor ? info.accessorName : info.fieldName;
            const renameLocationOffset = isIdentifier(nameNeedRename) ? 0 : -1;
            const renameLocation = renameLocationOffset + getRenameLocation(edits, renameFilename, nameNeedRename.text, /*preferLastLocation*/ isParameter(info.declaration));

            return { renameFilename, renameLocation, edits };
        },
        getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
            if (!context.endPosition) return emptyArray;
            const info = codefix.getAccessorConvertiblePropertyAtPosition(context.file, context.program, context.startPosition, context.endPosition, context.triggerReason === "invoked");
            if (!info) return emptyArray;

            if (!isRefactorErrorInfo(info)) {
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

            return emptyArray;
        }
    });
}
