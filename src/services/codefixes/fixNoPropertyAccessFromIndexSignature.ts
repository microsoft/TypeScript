import { Diagnostics, SourceFile, PropertyAccessExpression, UserPreferences, getQuotePreference, factory, QuotePreference, isPropertyAccessChain, cast, getTokenAtPosition, isPropertyAccessExpression } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "fixNoPropertyAccessFromIndexSignature";
/* @internal */
const errorCodes = [
    Diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0.code
];

/* @internal */
registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span, preferences } = context;
        const property = getPropertyAccessExpression(sourceFile, span.start);
        const changes = ChangeTracker.with(context, t => doChange(t, context.sourceFile, property, preferences));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Use_element_access_for_0, property.name.text], fixId, Diagnostics.Use_element_access_for_all_undeclared_properties)];
    },
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getPropertyAccessExpression(diag.file, diag.start), context.preferences))
});

/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, node: PropertyAccessExpression, preferences: UserPreferences): void {
    const quotePreference = getQuotePreference(sourceFile, preferences);
    const argumentsExpression = factory.createStringLiteral(node.name.text, quotePreference === QuotePreference.Single);
    changes.replaceNode(sourceFile, node, isPropertyAccessChain(node) ?
            factory.createElementAccessChain(node.expression, node.questionDotToken, argumentsExpression) :
        factory.createElementAccessExpression(node.expression, argumentsExpression));
}

/* @internal */
function getPropertyAccessExpression(sourceFile: SourceFile, pos: number): PropertyAccessExpression {
    return cast(getTokenAtPosition(sourceFile, pos).parent, isPropertyAccessExpression);
}
