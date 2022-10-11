import * as ts from "../_namespaces/ts";

const fixId = "classSuperMustPrecedeThisAccess";
const errorCodes = [ts.Diagnostics.super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const nodes = getNodes(sourceFile, span.start);
        if (!nodes) return undefined;
        const { constructor, superCall } = nodes;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, constructor, superCall));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Make_super_call_the_first_statement_in_the_constructor, fixId, ts.Diagnostics.Make_all_super_calls_the_first_statement_in_their_constructor)];
    },
    fixIds: [fixId],
    getAllCodeActions(context) {
        const { sourceFile } = context;
        const seenClasses = new ts.Map<number, true>(); // Ensure we only do this once per class.
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const nodes = getNodes(diag.file, diag.start);
            if (!nodes) return;
            const { constructor, superCall } = nodes;
            if (ts.addToSeen(seenClasses, ts.getNodeId(constructor.parent))) {
                doChange(changes, sourceFile, constructor, superCall);
            }
        });
    },
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, constructor: ts.ConstructorDeclaration, superCall: ts.ExpressionStatement): void {
    changes.insertNodeAtConstructorStart(sourceFile, constructor, superCall);
    changes.delete(sourceFile, superCall);
}

function getNodes(sourceFile: ts.SourceFile, pos: number): { readonly constructor: ts.ConstructorDeclaration, readonly superCall: ts.ExpressionStatement } | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (token.kind !== ts.SyntaxKind.ThisKeyword) return undefined;
    const constructor = ts.getContainingFunction(token) as ts.ConstructorDeclaration;
    const superCall = findSuperCall(constructor.body!);
    // figure out if the `this` access is actually inside the supercall
    // i.e. super(this.a), since in that case we won't suggest a fix
    return superCall && !superCall.expression.arguments.some(arg => ts.isPropertyAccessExpression(arg) && arg.expression === token) ? { constructor, superCall } : undefined;
}

function findSuperCall(n: ts.Node): ts.ExpressionStatement & { expression: ts.CallExpression } | undefined {
    return ts.isExpressionStatement(n) && ts.isSuperCall(n.expression)
        ? n as ts.ExpressionStatement & { expression: ts.CallExpression }
        : ts.isFunctionLike(n)
            ? undefined
            : ts.forEachChild(n, findSuperCall);
}
