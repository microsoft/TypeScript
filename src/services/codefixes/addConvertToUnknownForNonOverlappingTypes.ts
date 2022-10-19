import * as ts from "../_namespaces/ts";

const fixId = "addConvertToUnknownForNonOverlappingTypes";
const errorCodes = [ts.Diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddConvertToUnknownForNonOverlappingTypes(context) {
        const assertion = getAssertion(context.sourceFile, context.span.start);
        if (assertion === undefined) return undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, assertion));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_unknown_conversion_for_non_overlapping_types, fixId, ts.Diagnostics.Add_unknown_to_all_conversions_of_non_overlapping_types)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const assertion = getAssertion(diag.file, diag.start);
        if (assertion) {
            makeChange(changes, diag.file, assertion);
        }
    }),
});

function makeChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, assertion: ts.AsExpression | ts.TypeAssertion) {
    const replacement = ts.isAsExpression(assertion)
        ? ts.factory.createAsExpression(assertion.expression, ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword))
        : ts.factory.createTypeAssertion(ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword), assertion.expression);
    changeTracker.replaceNode(sourceFile, assertion.expression, replacement);
}

function getAssertion(sourceFile: ts.SourceFile, pos: number): ts.AsExpression | ts.TypeAssertion | undefined {
    if (ts.isInJSFile(sourceFile)) return undefined;
    return ts.findAncestor(ts.getTokenAtPosition(sourceFile, pos), (n): n is ts.AsExpression | ts.TypeAssertion => ts.isAsExpression(n) || ts.isTypeAssertionExpression(n));
}
