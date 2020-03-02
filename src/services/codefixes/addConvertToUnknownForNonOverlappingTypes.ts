import { Diagnostics, SourceFile, getTokenAtPosition, Debug, findAncestor, AsExpression, TypeAssertion, isAsExpression, isTypeAssertion, createAsExpression, createKeywordTypeNode, SyntaxKind, createTypeAssertion } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "addConvertToUnknownForNonOverlappingTypes";
/* @internal */
const errorCodes = [Diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: (context) => {
        const changes = ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_unknown_conversion_for_non_overlapping_types, fixId, Diagnostics.Add_unknown_to_all_conversions_of_non_overlapping_types)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start)),
});
/* @internal */
function makeChange(changeTracker: ChangeTracker, sourceFile: SourceFile, pos: number) {
    const token = getTokenAtPosition(sourceFile, pos);
    const assertion = Debug.checkDefined(findAncestor(token, (n): n is AsExpression | TypeAssertion => isAsExpression(n) || isTypeAssertion(n)), "Expected to find an assertion expression");
    const replacement = isAsExpression(assertion)
        ? createAsExpression(assertion.expression, createKeywordTypeNode(SyntaxKind.UnknownKeyword))
        : createTypeAssertion(createKeywordTypeNode(SyntaxKind.UnknownKeyword), assertion.expression);
    changeTracker.replaceNode(sourceFile, assertion.expression, replacement);
}
