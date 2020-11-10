/* @internal */
namespace ts.refactor.generateGetAccessorAndSetAccessor {
    const actionName = "Generate 'get' and 'set' accessors";
    const actionDescription = Diagnostics.Generate_get_and_set_accessors.message;
    registerRefactor(actionName, {
        getEditsForAction(context, actionName) {
            if (!context.endPosition) return undefined;
            const info = codefix.getAccessorConvertiblePropertyAtPosition(context.file, context.program, context.startPosition, context.endPosition);
            if (!info || !info.info) return undefined;
            const edits = codefix.generateAccessorFromProperty(context.file, context.program, context.startPosition, context.endPosition, context, actionName);
            if (!edits) return undefined;

            const renameFilename = context.file.fileName;
            const nameNeedRename = info.info.renameAccessor ? info.info.accessorName : info.info.fieldName;
            const renameLocationOffset = isIdentifier(nameNeedRename) ? 0 : -1;
            const renameLocation = renameLocationOffset + getRenameLocation(edits, renameFilename, nameNeedRename.text, /*preferLastLocation*/ isParameter(info.info.declaration));

            return { renameFilename, renameLocation, edits };
        },
        getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
            if (!context.endPosition) return emptyArray;
            const info = codefix.getAccessorConvertiblePropertyAtPosition(context.file, context.program, context.startPosition, context.endPosition, context.triggerReason === "invoked");
            if (!info) return emptyArray;

            if (!info.error) {
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

            if (context.preferences.provideRefactorNotApplicableReason) {
                return [{
                    name: actionName,
                    description: actionDescription,
                    actions: [{
                        name: actionName,
                        description: actionDescription,
                        notApplicableReason: info.error
                    }]
                }];
            }

            return emptyArray;
        }
    });
}
