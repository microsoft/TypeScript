/* @internal */
namespace ts.codefix {
    const fixId = "fixPedanticPropertyLookup";
    const errorCodes = [
        Diagnostics.Access_property_0_by_index_signature_is_disallowed.code
    ];

    registerCodeFix({
        errorCodes,
        fixIds: [fixId],
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const property = getPropertyAccessExpression(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, property));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Use_element_access_for_0, property.name.text], fixId, Diagnostics.Use_element_access_for_all_property_access)];
        },
        getAllCodeActions: context =>
            codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getPropertyAccessExpression(diag.file, diag.start)))
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: PropertyAccessExpression): void {
        const argumentsExpression = factory.createStringLiteral(node.name.text);
        changes.replaceNode(
            sourceFile,
            node,
            isPropertyAccessChain(node) ?
                factory.createElementAccessChain(node.expression, node.questionDotToken, argumentsExpression) :
                factory.createElementAccessExpression(node.expression, argumentsExpression)
        );
    }

    function getPropertyAccessExpression(sourceFile: SourceFile, pos: number): PropertyAccessExpression {
        return cast(getTokenAtPosition(sourceFile, pos).parent, isPropertyAccessExpression);
    }
}
