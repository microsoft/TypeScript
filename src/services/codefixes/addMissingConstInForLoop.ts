/* @internal */
namespace ts.codefix {
    const fixId = "addMissingConstInForLoop";
    const errorCodes = [Diagnostics.Cannot_find_name_0.code];

    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const changes = textChanges.ChangeTracker.with(context, t => makeChange(t, context.sourceFile, context.span.start));
            if (changes.length > 0) {
                return [createCodeFixAction(fixId, changes, Diagnostics.Add_const_to_unresolved_variable, fixId, Diagnostics.Add_const_to_all_unresolved_variables)];
            }
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const fixedNodes = new NodeSet();
            return codeFixAll(context, errorCodes, (changes, diag) => makeChange(changes, diag.file, diag.start, fixedNodes));
        },
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number, fixedNodes?: NodeSet<Node>) {
        const forInitializer = findAncestor(getTokenAtPosition(sourceFile, pos), node =>
            isForInOrOfStatement(node.parent) ? node.parent.initializer === node
                : isPossiblyPartOfDestructuring(node) ? false : "quit");
        if (!forInitializer) return;
        if (!fixedNodes || fixedNodes.tryAdd(forInitializer)) {
            changeTracker.insertNodeBefore(sourceFile, forInitializer, createToken(SyntaxKind.ConstKeyword));
        }
    }

    function isPossiblyPartOfDestructuring(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
                return true;
            default:
                return false;
        }
    }
}
