/* @internal */
namespace ts.codefix {
const fixId = "fixNoPropertyAccessFromIndexSignature";
const errorCodes = [
    ts.Diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0.code
];

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span, preferences } = context;
        const property = getPropertyAccessExpression(sourceFile, span.start);
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, property, preferences));
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Use_element_access_for_0, property.name.text], fixId, ts.Diagnostics.Use_element_access_for_all_undeclared_properties)];
    },
    getAllCodeActions: context =>
        ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getPropertyAccessExpression(diag.file, diag.start), context.preferences))
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, node: ts.PropertyAccessExpression, preferences: ts.UserPreferences): void {
    const quotePreference = ts.getQuotePreference(sourceFile, preferences);
    const argumentsExpression = ts.factory.createStringLiteral(node.name.text, quotePreference === ts.QuotePreference.Single);
    changes.replaceNode(
        sourceFile,
        node,
        ts.isPropertyAccessChain(node) ?
            ts.factory.createElementAccessChain(node.expression, node.questionDotToken, argumentsExpression) :
            ts.factory.createElementAccessExpression(node.expression, argumentsExpression)
    );
}

function getPropertyAccessExpression(sourceFile: ts.SourceFile, pos: number): ts.PropertyAccessExpression {
    return ts.cast(ts.getTokenAtPosition(sourceFile, pos).parent, ts.isPropertyAccessExpression);
}
}
