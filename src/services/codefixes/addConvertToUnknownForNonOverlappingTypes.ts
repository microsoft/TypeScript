import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    AsExpression,
    Diagnostics,
    factory,
    findAncestor,
    getTokenAtPosition,
    isAsExpression,
    isInJSFile,
    isTypeAssertionExpression,
    SourceFile,
    SyntaxKind,
    textChanges,
    TypeAssertion,
} from "../_namespaces/ts.js";

const fixId = "addConvertToUnknownForNonOverlappingTypes";
const errorCodes = [Diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first.code];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToAddConvertToUnknownForNonOverlappingTypes(context) {
        const assertion = getAssertion(context.sourceFile, context.span.start);
        if (assertion === undefined) return undefined;
        const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, assertion));
        return [createCodeFixAction(fixId, changes, Diagnostics.Add_unknown_conversion_for_non_overlapping_types, fixId, Diagnostics.Add_unknown_to_all_conversions_of_non_overlapping_types)];
    },
    fixIds: [fixId],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const assertion = getAssertion(diag.file, diag.start);
            if (assertion) {
                makeChange(changes, diag.file, assertion);
            }
        }),
});

function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, assertion: AsExpression | TypeAssertion) {
    const replacement = isAsExpression(assertion)
        ? factory.createAsExpression(assertion.expression, factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword))
        : factory.createTypeAssertion(factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword), assertion.expression);
    changeTracker.replaceNode(sourceFile, assertion.expression, replacement);
}

function getAssertion(sourceFile: SourceFile, pos: number): AsExpression | TypeAssertion | undefined {
    if (isInJSFile(sourceFile)) return undefined;
    return findAncestor(getTokenAtPosition(sourceFile, pos), (n): n is AsExpression | TypeAssertion => isAsExpression(n) || isTypeAssertionExpression(n));
}
