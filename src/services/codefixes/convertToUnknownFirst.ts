/* @internal */
namespace ts.codefix {
    const fixId = "convertToUnknownFirst";

    const errorCodes = [Diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first];
    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const changes = textChanges.ChangeTracker.with(context, t => changeInferToUnknown(t, context.sourceFile, context.token));
            return [createCodeFixAction(fixId, changes, Diagnostics.Replace_infer_0_with_unknown, fixId, Diagnostics.Replace_all_unused_infer_with_unknown];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => changeInferToUnknown(changes, diag.file, diag.start)),
    });


    // TODO how does codefix know which scenario to fire?
    function changeInferToUnknown(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node): void {
        changes.replaceNode(sourceFile, token.parent, createKeywordTypeNode(SyntaxKind.UnknownKeyword));
    }
}
