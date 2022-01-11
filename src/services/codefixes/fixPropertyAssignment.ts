import { Diagnostics, SourceFile, ShorthandPropertyAssignment, factory, Expression, cast, getTokenAtPosition, isShorthandPropertyAssignment } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "fixPropertyAssignment";
/* @internal */
const errorCodes = [
    Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.code
];

/* @internal */
registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const property = getProperty(sourceFile, span.start);
        const changes = ChangeTracker.with(context, t => doChange(t, context.sourceFile, property));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Change_0_to_1, "=", ":"], fixId, [Diagnostics.Switch_each_misused_0_to_1, "=", ":"])];
    },
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getProperty(diag.file, diag.start)))
});

/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, node: ShorthandPropertyAssignment): void {
    changes.replaceNode(sourceFile, node, factory.createPropertyAssignment(node.name, node.objectAssignmentInitializer as Expression));
}

/* @internal */
function getProperty(sourceFile: SourceFile, pos: number): ShorthandPropertyAssignment {
    return cast(getTokenAtPosition(sourceFile, pos).parent, isShorthandPropertyAssignment);
}
