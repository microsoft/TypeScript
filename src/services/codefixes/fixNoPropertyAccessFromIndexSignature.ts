/* @internal */
namespace ts.codefix {
    const fixId = "fixNoPropertyAccessFromIndexSignature";
    const errorCodes = [
        Diagnostics.Property_0_comes_from_an_index_signature_so_it_must_be_accessed_with_0.code
    ];

    registerCodeFix({
        errorCodes,
        fixIds: [fixId],
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const property = getPropertyAccessExpression(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, property));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Use_element_access_for_0, property.name.text], fixId, Diagnostics.Use_element_access_for_all_undeclared_properties)];
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
