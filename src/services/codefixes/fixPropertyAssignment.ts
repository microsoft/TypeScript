/* @internal */
namespace ts.codefix {
    const fixId = "fixPropertyAssignment";
    const errorCodes = [
        Diagnostics.Did_you_mean_to_use_a_Colon_When_following_property_names_in_an_object_literal_implies_a_destructuring_assignment.code
    ];

    registerCodeFix({
        errorCodes,
        fixIds: [fixId],
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const property = getProperty(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, property));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Change_0_to_1, "=", ":"], fixId, [Diagnostics.Switch_each_misused_0_to_1, "=", ":"])];
        },
        getAllCodeActions: context =>
            codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getProperty(diag.file, diag.start)))
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: ShorthandPropertyAssignment): void {
        changes.replaceNode(sourceFile, node, factory.createPropertyAssignment(node.name, node.objectAssignmentInitializer as Expression));
    }

    function getProperty(sourceFile: SourceFile, pos: number): ShorthandPropertyAssignment {
        return cast(getTokenAtPosition(sourceFile, pos).parent, isShorthandPropertyAssignment);
    }
}
