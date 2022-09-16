/* @internal */
namespace ts.codefix {
const fixId = "fixAwaitInSyncFunction";
const errorCodes = [
    ts.Diagnostics.await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
    ts.Diagnostics.for_await_loops_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
    ts.Diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function.code
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const nodes = getNodes(sourceFile, span.start);
        if (!nodes) return undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, nodes));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Add_async_modifier_to_containing_function, fixId, ts.Diagnostics.Add_all_missing_async_modifiers)];
    },
    fixIds: [fixId],
    getAllCodeActions: function getAllCodeActionsToFixAwaitInSyncFunction(context) {
        const seen = new ts.Map<number, true>();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const nodes = getNodes(diag.file, diag.start);
            if (!nodes || !ts.addToSeen(seen, ts.getNodeId(nodes.insertBefore))) return;
            doChange(changes, context.sourceFile, nodes);
        });
    },
});

function getReturnType(expr: ts.FunctionDeclaration | ts.MethodDeclaration | ts.FunctionExpression | ts.ArrowFunction) {
    if (expr.type) {
        return expr.type;
    }
    if (ts.isVariableDeclaration(expr.parent) &&
        expr.parent.type &&
        ts.isFunctionTypeNode(expr.parent.type)) {
        return expr.parent.type.type;
    }
}

function getNodes(sourceFile: ts.SourceFile, start: number): { insertBefore: ts.Node, returnType: ts.TypeNode | undefined } | undefined {
    const token = ts.getTokenAtPosition(sourceFile, start);
    const containingFunction = ts.getContainingFunction(token);
    if (!containingFunction) {
        return;
    }

    let insertBefore: ts.Node | undefined;
    switch (containingFunction.kind) {
        case ts.SyntaxKind.MethodDeclaration:
            insertBefore = containingFunction.name;
            break;
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
            insertBefore = ts.findChildOfKind(containingFunction, ts.SyntaxKind.FunctionKeyword, sourceFile);
            break;
        case ts.SyntaxKind.ArrowFunction:
            const kind = containingFunction.typeParameters ? ts.SyntaxKind.LessThanToken : ts.SyntaxKind.OpenParenToken;
            insertBefore = ts.findChildOfKind(containingFunction, kind, sourceFile) || ts.first(containingFunction.parameters);
            break;
        default:
            return;
    }

    return insertBefore && {
        insertBefore,
        returnType: getReturnType(containingFunction)
    };
}

function doChange(
    changes: ts.textChanges.ChangeTracker,
    sourceFile: ts.SourceFile,
    { insertBefore, returnType }: { insertBefore: ts.Node, returnType: ts.TypeNode | undefined }): void {

    if (returnType) {
        const entityName = ts.getEntityNameFromTypeNode(returnType);
        if (!entityName || entityName.kind !== ts.SyntaxKind.Identifier || entityName.text !== "Promise") {
            changes.replaceNode(sourceFile, returnType, ts.factory.createTypeReferenceNode("Promise", ts.factory.createNodeArray([returnType])));
        }
    }
    changes.insertModifierBefore(sourceFile, ts.SyntaxKind.AsyncKeyword, insertBefore);
}
}
