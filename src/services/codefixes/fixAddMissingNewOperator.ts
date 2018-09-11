/* @internal */
namespace ts.codefix {
    const fixId = "addMissingNewOperator";
    const errorCodes = [Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const identifierWithoutNew = getIdentifier(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => addMissingNewOperator(t, sourceFile, identifierWithoutNew));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_new_operator_to_caller, fixId, Diagnostics.Add_missing_new_operator_to_all_callers)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) =>
            addMissingNewOperator(changes, context.sourceFile, getIdentifier(diag.file, diag.start))),
    });

    function getIdentifier(sourceFile: SourceFile, pos: number): Identifier {
        const token = getTokenAtPosition(sourceFile, pos);
        Debug.assert(token.kind === SyntaxKind.Identifier);
        Debug.assert(isCallExpression(token.parent));
        return <Identifier>token;
    }

    function addMissingNewOperator(changes: textChanges.ChangeTracker, sourceFile: SourceFile, identifierWithoutNew: Identifier): void {
        const newTypeNode = createNew(identifierWithoutNew, /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
        changes.replaceNode(sourceFile, identifierWithoutNew, newTypeNode);
    }
}
