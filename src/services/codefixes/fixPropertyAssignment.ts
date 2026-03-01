import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    cast,
    Diagnostics,
    Expression,
    factory,
    getTokenAtPosition,
    isShorthandPropertyAssignment,
    ShorthandPropertyAssignment,
    SourceFile,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "fixPropertyAssignment";
const errorCodes = [
    Diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.code,
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
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, getProperty(diag.file, diag.start))),
});

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: ShorthandPropertyAssignment): void {
    changes.replaceNode(sourceFile, node, factory.createPropertyAssignment(node.name, node.objectAssignmentInitializer as Expression));
}

function getProperty(sourceFile: SourceFile, pos: number): ShorthandPropertyAssignment {
    return cast(getTokenAtPosition(sourceFile, pos).parent, isShorthandPropertyAssignment);
}
