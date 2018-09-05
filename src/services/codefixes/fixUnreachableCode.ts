/* @internal */
namespace ts.codefix {
    const fixId = "fixUnreachableCode";
    const errorCodes = [Diagnostics.Unreachable_code_detected.code];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start, context.span.length));
            return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unreachable_code, fixId, Diagnostics.Remove_all_unreachable_code)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start, diag.length)),
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, start: number, length: number): void {
        const token = getTokenAtPosition(sourceFile, start);
        const statement = findAncestor(token, isStatement)!;
        Debug.assert(statement.getStart(sourceFile) === token.getStart(sourceFile));

        const container = (isBlock(statement.parent) ? statement.parent : statement).parent;
        if (!isBlock(statement.parent) || statement === first(statement.parent.statements)) {
            switch (container.kind) {
                case SyntaxKind.IfStatement:
                    if ((container as IfStatement).elseStatement) {
                        if (isBlock(statement.parent)) {
                            break;
                        }
                        else {
                            changes.replaceNode(sourceFile, statement, createBlock(emptyArray));
                        }
                        return;
                    }
                    // falls through
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                    changes.delete(sourceFile, container);
                    return;
            }
        }

        if (isBlock(statement.parent)) {
            const end = start + length;
            const lastStatement = Debug.assertDefined(lastWhere(sliceAfter(statement.parent.statements, statement), s => s.pos < end));
            changes.deleteNodeRange(sourceFile, statement, lastStatement);
        }
        else {
            changes.delete(sourceFile, statement);
        }
    }

    function lastWhere<T>(a: ReadonlyArray<T>, pred: (value: T) => boolean): T | undefined {
        let last: T | undefined;
        for (const value of a) {
            if (!pred(value)) break;
            last = value;
        }
        return last;
    }
}
