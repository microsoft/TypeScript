import { Diagnostics, Identifier, PrivateIdentifier, SourceFile, getTokenAtPosition, isIdentifier, getContainingClass, suppressLeadingAndTrailingTrivia, createPropertyAccess, createIdentifier, createThis } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixId = "forgottenThisPropertyAccess";
/* @internal */
const didYouMeanStaticMemberCode = Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code;
/* @internal */
const errorCodes = [
    Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies.code,
    didYouMeanStaticMemberCode,
];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const info = getInfo(sourceFile, context.span.start, context.errorCode);
        if (!info) {
            return undefined;
        }
        const changes = ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Add_0_to_unresolved_variable, info.className || "this"], fixId, Diagnostics.Add_qualifier_to_all_unresolved_variables_matching_a_member_name)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
        const info = getInfo(diag.file, diag.start, diag.code);
        if (info)
            doChange(changes, context.sourceFile, info);
    }),
});
/* @internal */
interface Info {
    readonly node: Identifier | PrivateIdentifier;
    readonly className: string | undefined;
}
/* @internal */
function getInfo(sourceFile: SourceFile, pos: number, diagCode: number): Info | undefined {
    const node = getTokenAtPosition(sourceFile, pos);
    if (isIdentifier(node)) {
        return { node, className: diagCode === didYouMeanStaticMemberCode ? getContainingClass(node)!.name!.text : undefined };
    }
}
/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, { node, className }: Info): void {
    // TODO (https://github.com/Microsoft/TypeScript/issues/21246): use shared helper
    suppressLeadingAndTrailingTrivia(node);
    changes.replaceNode(sourceFile, node, createPropertyAccess(className ? createIdentifier(className) : createThis(), node));
}
