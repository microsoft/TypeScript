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

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info.replacementNode, {
                [info.id]: info.method
            }));
            return [
                createCodeFixAction(
                    "mapIndex", changes,
                    [Diagnostics.Rewrite_index_access_as_call_to_0, info.method],
                    fixMapIndexSignatureFixId,
                    Diagnostics.Rewrite_all_invalid_index_access_expressions_as_calls_to_get_Slash_set_where_possible)
            ];
        },
        fixIds: [fixMapIndexSignatureFixId],
        getAllCodeActions: context => {
            const changes = textChanges.ChangeTracker.with(context, changes =>{
                const diags: DiagnosticWithLocation[] = [];
                const typeChecker = context.program.getTypeChecker();
                eachDiagnostic(context, errorCodes, diag =>diags.push(diag));
                const allInfo = map(diags, d => getInfo(d.file, d.start, typeChecker)!).filter(a => a);
                const normalized = stableSort(allInfo, (a, b) => (a.replacementNode.pos - b.replacementNode.pos) || (a.replacementNode.end - b.replacementNode.end));

                let replacements: Record<number, "get" | "set"> = {};
                let replacementNode: Node | undefined;
                for (let i = 0; i < normalized.length; i++) {
                    const current = normalized[i];
                    replacements[current.id] = current.method;
                    replacementNode = replacementNode || current.replacementNode;
                    // If ranges overlap, batch them together
                    if (i + 1 === normalized.length || current.replacementNode.end <= normalized[i + 1].replacementNode.pos) {
                        doChange(changes, context.sourceFile, replacementNode, replacements);
                        replacementNode = undefined;
                        replacements = {};
                    }
                }
            });
            return createCombinedCodeActions(changes);
        },
    });

    function getInfo(sourceFile: SourceFile, pos: number, checker: TypeChecker){
        const node = getTokenAtPosition(sourceFile, pos);
        if(!isElementAccessExpression(node.parent)) return undefined;

        const targetType = checker.getTypeAtLocation(node);
        if(!targetType) return undefined;

        const indexType = checker.getTypeAtLocation(node.parent.argumentExpression);
        if(!indexType) return undefined;

        const method = checker.getSuggestionForNonexistentIndexSignatureMethod(targetType, node.parent, indexType) as "get" | "set" | undefined;
        if(method !== "get" && method !== "set") return undefined;

        const property = checker.getPropertyOfType(targetType, method);
        if(!property) return undefined;
        const replacementNode = method === "set" ? node.parent.parent: node.parent;
        return {
            replacementNode,
            method,
            type: checker.typeToString(targetType),
            id: getNodeId(replacementNode)
        };
    }
    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: Node, replacementNodes: Record<number, "get" | "set">){
        const newNode = visitNode(node, function visitor<T extends Node>(n: T): T {
            const method = replacementNodes[getNodeId(n)];
            if (method) {

                if (method === "get") {
                    Debug.assert(isElementAccessExpression(n));

                    const transformedArgument =
                        visitEachChild(n.argumentExpression, visitor, nullTransformationContext);
                    const transformedExpression =
                        visitEachChild(n.expression, visitor, nullTransformationContext);


                    return factory.createCallExpression(
                        factory.createPropertyAccessExpression(transformedExpression, "get"),
                        /*typeArguments*/ undefined,
                        [transformedArgument]) as Node as T;
                }
                else {

                    Debug.assert(isAssignmentExpression(n));
                    Debug.assert(isElementAccessExpression(n.left));
                    const accessExpr = n.left;
                    const transformedArgument = visitor(accessExpr.argumentExpression);
                    const transformedExpression = visitor(accessExpr.expression);

                    const transformedRight = visitor(n.right);

                    return factory.createCallExpression(
                        factory.createPropertyAccessExpression(transformedExpression, "set"),
                        /*typeArguments*/ undefined,
                        [transformedArgument, transformedRight]) as Node as T;
                }
            }
            else {
                return visitEachChild(n, visitor, nullTransformationContext);
            }
        });
        changes.replaceNode(sourceFile, node, newNode);
    }
}
