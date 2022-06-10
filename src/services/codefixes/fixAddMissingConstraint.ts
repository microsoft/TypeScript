/* @internal */
namespace ts.codefix {
    const fixId = "addMissingConstraint";
    const errorCodes = [
        // We want errors this could be attached to:
        // Diagnostics.This_type_parameter_probably_needs_an_extends_0_constraint
        Diagnostics.Type_0_is_not_comparable_to_type_1.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
        Diagnostics.Type_0_is_not_assignable_to_type_1.code,
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
        Diagnostics.Property_0_is_incompatible_with_index_signature.code,
        Diagnostics.Property_0_in_type_1_is_not_assignable_to_type_2.code,
        Diagnostics.Type_0_does_not_satisfy_the_constraint_1.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span, program } = context;
            const related = getDiagnosticRelatedInfo(program, sourceFile, span);
            if (!related) {
                return;
            }
            const changes = textChanges.ChangeTracker.with(context, t => addMissingConstraint(t, related));
            return [createCodeFixAction(fixId, changes, Diagnostics.Add_extends_constraint, fixId, Diagnostics.Add_extends_constraint_to_all_type_parameters)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getDiagnosticRelatedInfo(context.program, context.sourceFile, diag);
            if (!info) return;
            return addMissingConstraint(changes, info);
        }),
    });

    function getDiagnosticRelatedInfo(program: Program, sourceFile: SourceFile, span: TextSpan) {
        const diag = find(program.getSemanticDiagnostics(sourceFile), diag => diag.start === span.start && diag.length === span.length);
        if (!diag || !diag.relatedInformation) return;
        const related = find(diag.relatedInformation, related => related.code === Diagnostics.This_type_parameter_might_need_an_extends_0_constraint.code);
        if (!related) return;
        return related;
    }

    function addMissingConstraint(changes: textChanges.ChangeTracker, related: DiagnosticRelatedInformation): void {
        let decl = findAncestorMatchingSpan(related.file!, related as TextSpan);
        if (!decl) return;
        if (isIdentifier(decl) && isTypeParameterDeclaration(decl.parent)) {
            decl = decl.parent;
        }
        if (!isTypeParameterDeclaration(decl) || isMappedTypeNode(decl.parent)) return; // should only issue fix on type parameters written using `extends`
        const newConstraint = flattenDiagnosticMessageText(related.messageText, "\n", 0).match(/`extends (.*)`/);
        if (!newConstraint) return;
        const newConstraintText = newConstraint[1];

        changes.insertText(related.file!, related.start! + related.length!, ` extends ${newConstraintText}`);
    }

    function findAncestorMatchingSpan(sourceFile: SourceFile, span: TextSpan): Node {
        let token = getTokenAtPosition(sourceFile, span.start);
        const end = textSpanEnd(span);
        while (token.end < end) {
            token = token.parent;
        }
        return token;
    }
}
