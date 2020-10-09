/* @internal */
namespace ts.codefix {
    const fixId = "removeTsSpecificConstructs";
    const errorCodes = [
        Diagnostics.Type_annotations_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files.code,
        Diagnostics._0_declarations_can_only_be_used_in_TypeScript_files.code,
        // Diagnostics.import_can_only_be_used_in_TypeScript_files.code,
        // Diagnostics.export_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_parameter_declarations_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.implements_clauses_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_aliases_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_arguments_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Parameter_modifiers_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Non_null_assertions_can_only_be_used_in_TypeScript_files.code,
        Diagnostics.Type_assertion_expressions_can_only_be_used_in_TypeScript_files.code,
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const container = getTypeContainer(context, context.span);
            if (!container) {
                return undefined;
            }


            const edits = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, container));
            if (edits.length > 0) {
                return [createCodeFixAction(fixId, edits, Diagnostics.Remove_unnecessary_await, fixId, Diagnostics.Remove_all_unnecessary_uses_of_await)];
            }
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const container = getTypeContainer(context, diag);
                if (!container) {
                    return undefined;
                }
                makeChange(changes, context.sourceFile, container);
            });
        },
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, container: DefinitelyHasType) {
        changeTracker.delete(sourceFile, container.type)
    }

    type DefinitelyHasType = HasType & { type: TypeNode }

    function getTypeContainer (context: CodeFixContext | CodeFixAllContext, span: TextSpan): DefinitelyHasType | undefined {
        const { sourceFile } = context;

        const currentNode = getTokenAtPosition(sourceFile, span.start);
        if (!isTypeNode(currentNode) || !hasType(currentNode.parent) || currentNode.parent.type !== currentNode) {
            return undefined;
        }
        return currentNode.parent as DefinitelyHasType;
    }
}














