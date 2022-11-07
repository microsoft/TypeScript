/* @internal */
namespace ts.codefix {
const fixId = "forgottenThisPropertyAccess";
const didYouMeanStaticMemberCode = ts.Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code;
const errorCodes = [
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    ts.Diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.code,
    didYouMeanStaticMemberCode,
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const info = getInfo(sourceFile, context.span.start, context.errorCode);
        if (!info) {
            return undefined;
        }
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [ts.codefix.createCodeFixAction(fixId, changes, [ts.Diagnostics.Add_0_to_unresolved_variable, info.className || "this"], fixId, ts.Diagnostics.Add_qualifier_to_all_unresolved_variables_matching_a_member_name)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start, diag.code);
        if (info) doChange(changes, context.sourceFile, info);
    }),
});

interface Info {
    readonly node: ts.Identifier | ts.PrivateIdentifier;
    readonly className: string | undefined;
}

function getInfo(sourceFile: ts.SourceFile, pos: number, diagCode: number): Info | undefined {
    const node = ts.getTokenAtPosition(sourceFile, pos);
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
        return { node, className: diagCode === didYouMeanStaticMemberCode ? ts.getContainingClass(node)!.name!.text : undefined };
    }
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, { node, className }: Info): void {
    // TODO (https://github.com/Microsoft/TypeScript/issues/21246): use shared helper
    ts.suppressLeadingAndTrailingTrivia(node);
    changes.replaceNode(sourceFile, node, ts.factory.createPropertyAccessExpression(className ? ts.factory.createIdentifier(className) : ts.factory.createThis(), node));
}
}
