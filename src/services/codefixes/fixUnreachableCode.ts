/* @internal */
namespace ts.codefix {
    const fixId = "fixUnreachableCode";
    const errorCodes = [Diagnostics.Unreachable_code_detected.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span } = context;
            const changes = textChanges.ChangeTracker.with(context, t => t.deleteNode(sourceFile, getStatement(sourceFile, span.start)));
            return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unreachable_code, fixId, Diagnostics.Remove_all_unreachable_code)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            changes.deleteNode(diag.file, getStatement(diag.file, diag.start));
        }),
    });

    function getStatement(sourceFile: SourceFile, start: number): Statement {
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
        const statement = findAncestor(token, isStatement);
        Debug.assert(statement.getStart(sourceFile) === token.getStart(sourceFile));

        const container = (isBlock(statement.parent) ? statement.parent : statement).parent;
        switch (container.kind) {
            case SyntaxKind.IfStatement:
                return (container as IfStatement).elseStatement ? statement : container as IfStatement;
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForStatement:
                return container as WhileStatement | ForStatement;
            default:
                return statement;
        }
    }
}
