/* @internal */
namespace ts.codefix {
const fixId = "fixPropertyAssignment";
const errorCodes = [
    ts.Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.code
];

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const property = getProperty(sourceFile, span.start);
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, property));
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Change_0_to_1, "=", ":"], fixId, [ts.Diagnostics.Switch_each_misused_0_to_1, "=", ":"])];
    },
    getAllCodeActions: context =>
        ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getProperty(diag.file, diag.start)))
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, node: ts.ShorthandPropertyAssignment): void {
    changes.replaceNode(sourceFile, node, ts.factory.createPropertyAssignment(node.name, node.objectAssignmentInitializer as ts.Expression));
}

function getProperty(sourceFile: ts.SourceFile, pos: number): ts.ShorthandPropertyAssignment {
    return ts.cast(ts.getTokenAtPosition(sourceFile, pos).parent, ts.isShorthandPropertyAssignment);
}
}
