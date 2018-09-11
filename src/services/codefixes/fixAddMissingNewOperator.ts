/* @internal */
namespace ts.codefix {
    const fixId = "addMissingNewOperator";
    const errorCodes = [Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const missingNewExpression = getMissingNewExpression(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => addMissingNewOperator(t, sourceFile, missingNewExpression));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_missing_new_operator_to_call, fixId, Diagnostics.Add_missing_new_operator_to_all_calls)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) =>
            addMissingNewOperator(changes, context.sourceFile, getMissingNewExpression(diag.file, diag.start))),
    });

    function getMissingNewExpression(sourceFile: SourceFile, pos: number): Expression {
        const token = getTokenAtPosition(sourceFile, pos);
        Debug.assert(isCallExpression(token.parent));
        return <Expression>token;
    }

    function addMissingNewOperator(changes: textChanges.ChangeTracker, sourceFile: SourceFile, missingNewExpression: Expression): void {
        const newTypeNode = createNew(missingNewExpression, /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
        changes.replaceNode(sourceFile, missingNewExpression, newTypeNode);
    }
}
