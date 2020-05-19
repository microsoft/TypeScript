/* @internal */
namespace ts.codefix {
    const fixId = "fixIncorrectNamedTupleSyntax";
    const errorCodes = [
        Diagnostics.A_labeled_tuple_element_is_declared_as_optional_with_a_question_mark_after_the_name_and_before_the_colon_rather_than_after_the_type.code,
        Diagnostics.A_labeled_tuple_element_is_declared_as_rest_with_a_before_the_name_rather_than_before_the_type.code
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span } = context;
            const namedTupleMember = getNamedTupleMember(sourceFile, span.start);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, namedTupleMember));
            return [createCodeFixAction(fixId, changes, Diagnostics.Move_labeled_tuple_element_modifiers_to_labels, fixId, Diagnostics.Move_labeled_tuple_element_modifiers_to_labels)];
        },
        fixIds: [fixId]
    });

    function getNamedTupleMember(sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos);
        return findAncestor(token, t => t.kind === SyntaxKind.NamedTupleMember) as NamedTupleMember | undefined;
    }
    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, namedTupleMember?: NamedTupleMember) {
        if (!namedTupleMember) {
            return;
        }
        let unwrappedType = namedTupleMember.type;
        let sawOptional = false;
        let sawRest = false;
        while (unwrappedType.kind === SyntaxKind.OptionalType || unwrappedType.kind === SyntaxKind.RestType || unwrappedType.kind === SyntaxKind.ParenthesizedType) {
            if (unwrappedType.kind === SyntaxKind.OptionalType) {
                sawOptional = true;
            }
            else if (unwrappedType.kind === SyntaxKind.RestType) {
                sawRest = true;
            }
            unwrappedType = (unwrappedType as OptionalTypeNode | RestTypeNode | ParenthesizedTypeNode).type;
        }
        const updated = updateNamedTupleMember(
            namedTupleMember,
            namedTupleMember.dotDotDotToken || (sawRest ? createToken(SyntaxKind.DotDotDotToken) : undefined),
            namedTupleMember.name,
            namedTupleMember.questionToken || (sawOptional ? createToken(SyntaxKind.QuestionToken) : undefined),
            unwrappedType
        );
        if (updated === namedTupleMember) {
            return;
        }
        changes.replaceNode(sourceFile, namedTupleMember, updated);
    }
}
