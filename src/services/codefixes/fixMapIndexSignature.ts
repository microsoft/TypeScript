/* @internal */
namespace ts.codefix {
    export const fixMapIndexSignatureFixId = "fixMapIndexSignature";
    const errorCodes: number[] = [
        Diagnostics.Element_implicitly_has_an_any_type_because_type_0_has_no_index_signature_Did_you_mean_to_call_1.code
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const info = getInfo(sourceFile, span.start, context.program.getTypeChecker());
            if (!info) return undefined;

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info.node, info.method));
            return [
                createCodeFixAction(
                    "mapIndex", changes,
                    [Diagnostics.Rewrite_index_access_as_call_to_0, info.method],
                    fixMapIndexSignatureFixId,
                    Diagnostics.Rewrite_all_invalid_index_access_expressions_as_calls_to_get_Slash_set_where_possible)
            ];
        },
        fixIds: [fixMapIndexSignatureFixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(diag.file, diag.start, context.program.getTypeChecker());
            if (info) doChange(changes, context.sourceFile, info.node, info.method);
        }),
    });

    function getInfo(sourceFile: SourceFile, pos: number, checker: TypeChecker){
        const node = getTokenAtPosition(sourceFile, pos);
        if(!isElementAccessExpression(node.parent)) return undefined;

        const targetSymbol = checker.getSymbolAtLocation(node.parent.expression);
        if(!targetSymbol) return undefined;

        const targetType = checker.getTypeOfSymbolAtLocation(targetSymbol, node.parent);
        if(!targetType) return undefined;

        const indexType = checker.getTypeAtLocation(node.parent.argumentExpression);
        if(!indexType) return undefined;
        // const target = node.parent;
        // const method = isAssignmentExpression(target.parent, /*excludeCompoundAssignment*/ true)? "set" :"get";
        const method = checker.getSuggestionForNonexistentIndexSignatureMethod(targetType, node.parent, indexType) as "get" | "set" | undefined;
        if(method !== "get" && method !== "set") return undefined;

        const property = checker.getPropertyOfType(targetType, method);
        if(!property) return undefined;

        return { node: node.parent, method, type: checker.typeToString(targetType) } as const;
    }
    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: ElementAccessExpression, method: "get" | "set"){
        if(method === "get") {
            changes.replaceNode(sourceFile, node,factory.createCallExpression(
                factory.createPropertyAccessExpression(node.expression, "get"),
                /*typeArguments*/ undefined,
                [node.argumentExpression]));
        }
        else {
            const assignment = <AssignmentExpression<EqualsToken>>node.parent;
            changes.replaceNode(sourceFile, assignment, factory.createCallExpression(
                factory.createPropertyAccessExpression(node.expression, "set"),
                /*typeArguments*/ undefined,
                [node.argumentExpression, assignment.right]));
        }
    }
}
