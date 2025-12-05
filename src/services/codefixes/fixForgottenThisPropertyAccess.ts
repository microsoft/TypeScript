import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    getContainingClass,
    getTokenAtPosition,
    Identifier,
    isIdentifier,
    isPrivateIdentifier,
    PrivateIdentifier,
    SourceFile,
    suppressLeadingAndTrailingTrivia,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "forgottenThisPropertyAccess";
const didYouMeanStaticMemberCode = Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code;
const errorCodes = [
    Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    Diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.code,
    didYouMeanStaticMemberCode,
];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const info = getInfo(sourceFile, context.span.start, context.errorCode);
        if (!info) {
            return undefined;
        }
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [createCodeFixAction(fixId, changes, [Diagnostics.Add_0_to_unresolved_variable, info.className || "this"], fixId, Diagnostics.Add_qualifier_to_all_unresolved_variables_matching_a_member_name)];
    },
    fixIds: [fixId],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start, diag.code);
            if (info) doChange(changes, context.sourceFile, info);
        }),
});

interface Info {
    readonly node: Identifier | PrivateIdentifier;
    readonly className: string | undefined;
}

function getInfo(sourceFile: SourceFile, pos: number, diagCode: number): Info | undefined {
    const node = getTokenAtPosition(sourceFile, pos);
    if (isIdentifier(node) || isPrivateIdentifier(node)) {
        return { node, className: diagCode === didYouMeanStaticMemberCode ? getContainingClass(node)!.name!.text : undefined };
    }
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { node, className }: Info): void {
    // TODO (https://github.com/Microsoft/TypeScript/issues/21246): use shared helper
    suppressLeadingAndTrailingTrivia(node);
    changes.replaceNode(sourceFile, node, factory.createPropertyAccessExpression(className ? factory.createIdentifier(className) : factory.createThis(), node));
}
