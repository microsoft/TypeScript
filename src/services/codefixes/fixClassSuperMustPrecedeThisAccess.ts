import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    addToSeen,
    CallExpression,
    ConstructorDeclaration,
    Diagnostics,
    ExpressionStatement,
    forEachChild,
    getContainingFunction,
    getNodeId,
    getTokenAtPosition,
    isExpressionStatement,
    isFunctionLike,
    isPropertyAccessExpression,
    isSuperCall,
    Node,
    SourceFile,
    SyntaxKind,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "classSuperMustPrecedeThisAccess";
const errorCodes = [Diagnostics.super_must_be_called_before_accessing_this_in_the_constructor_of_a_derived_class.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const nodes = getNodes(sourceFile, span.start);
        if (!nodes) return undefined;
        const { constructor, superCall } = nodes;
        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, constructor, superCall));
        return [createCodeFixAction(fixId, changes, Diagnostics.Make_super_call_the_first_statement_in_the_constructor, fixId, Diagnostics.Make_all_super_calls_the_first_statement_in_their_constructor)];
    },
    fixIds: [fixId],
    getAllCodeActions(context) {
        const { sourceFile } = context;
        const seenClasses = new Set<number>(); // Ensure we only do this once per class.
        return codeFixAll(context, errorCodes, (changes, diag) => {
            const nodes = getNodes(diag.file, diag.start);
            if (!nodes) return;
            const { constructor, superCall } = nodes;
            if (addToSeen(seenClasses, getNodeId(constructor.parent))) {
                doChange(changes, sourceFile, constructor, superCall);
            }
        });
    },
});

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, constructor: ConstructorDeclaration, superCall: ExpressionStatement): void {
    changes.insertNodeAtConstructorStart(sourceFile, constructor, superCall);
    changes.delete(sourceFile, superCall);
}

function getNodes(sourceFile: SourceFile, pos: number): { readonly constructor: ConstructorDeclaration; readonly superCall: ExpressionStatement; } | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    if (token.kind !== SyntaxKind.ThisKeyword) return undefined;
    const constructor = getContainingFunction(token) as ConstructorDeclaration;
    const superCall = findSuperCall(constructor.body!);
    // figure out if the `this` access is actually inside the supercall
    // i.e. super(this.a), since in that case we won't suggest a fix
    return superCall && !superCall.expression.arguments.some(arg => isPropertyAccessExpression(arg) && arg.expression === token) ? { constructor, superCall } : undefined;
}

function findSuperCall(n: Node): ExpressionStatement & { expression: CallExpression; } | undefined {
    return isExpressionStatement(n) && isSuperCall(n.expression)
        ? n as ExpressionStatement & { expression: CallExpression; }
        : isFunctionLike(n)
        ? undefined
        : forEachChild(n, findSuperCall);
}
