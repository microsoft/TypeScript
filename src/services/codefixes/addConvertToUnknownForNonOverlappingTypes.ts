/* @internal */
namespace ts.codefix {
    const fixId = "addConvertToUnknownForNonOverlappingTypes";
    const errorCodes = [Diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: function getCodeActionsToAddConvertToUnknownForNonOverlappingTypes(context) {
            const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_unknown_conversion_for_non_overlapping_types, fixId, Diagnostics.Add_unknown_to_all_conversions_of_non_overlapping_types)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos);
        const assertion = Debug.checkDefined(findAncestor(token, (n): n is AsExpression | TypeAssertion => isAsExpression(n) || isTypeAssertionExpression(n)), "Expected to find an assertion expression");
        const replacement = isAsExpression(assertion)
            ? factory.createAsExpression(assertion.expression, factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword))
            : factory.createTypeAssertion(factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword), assertion.expression);
        changeTracker.replaceNode(sourceFile, assertion.expression, replacement);
    }
}
