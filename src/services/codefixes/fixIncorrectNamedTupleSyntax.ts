/* @internal */
namespace ts.codefix {
const fixId = "fixIncorrectNamedTupleSyntax";
const errorCodes = [
    ts.Diagnostics.A_labeled_tuple_element_is_declared_as_optional_with_a_question_mark_after_the_name_and_before_the_colon_rather_than_after_the_type.code,
    ts.Diagnostics.A_labeled_tuple_element_is_declared_as_rest_with_a_before_the_name_rather_than_before_the_type.code
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixIncorrectNamedTupleSyntax(context) {
        const { sourceFile, span } = context;
        const namedTupleMember = getNamedTupleMember(sourceFile, span.start);
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, namedTupleMember));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Move_labeled_tuple_element_modifiers_to_labels, fixId, ts.Diagnostics.Move_labeled_tuple_element_modifiers_to_labels)];
    },
    fixIds: [fixId]
});

function getNamedTupleMember(sourceFile: ts.SourceFile, pos: number) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    return ts.findAncestor(token, t => t.kind === ts.SyntaxKind.NamedTupleMember) as ts.NamedTupleMember | undefined;
}
function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, namedTupleMember?: ts.NamedTupleMember) {
    if (!namedTupleMember) {
        return;
    }
    let unwrappedType = namedTupleMember.type;
    let sawOptional = false;
    let sawRest = false;
    while (unwrappedType.kind === ts.SyntaxKind.OptionalType || unwrappedType.kind === ts.SyntaxKind.RestType || unwrappedType.kind === ts.SyntaxKind.ParenthesizedType) {
        if (unwrappedType.kind === ts.SyntaxKind.OptionalType) {
            sawOptional = true;
        }
        else if (unwrappedType.kind === ts.SyntaxKind.RestType) {
            sawRest = true;
        }
        unwrappedType = (unwrappedType as ts.OptionalTypeNode | ts.RestTypeNode | ts.ParenthesizedTypeNode).type;
    }
    const updated = ts.factory.updateNamedTupleMember(
        namedTupleMember,
        namedTupleMember.dotDotDotToken || (sawRest ? ts.factory.createToken(ts.SyntaxKind.DotDotDotToken) : undefined),
        namedTupleMember.name,
        namedTupleMember.questionToken || (sawOptional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined),
        unwrappedType
    );
    if (updated === namedTupleMember) {
        return;
    }
    changes.replaceNode(sourceFile, namedTupleMember, updated);
}
}
