import * as ts from "../_namespaces/ts";

const fixId = "fixUnreachableCode";
const errorCodes = [ts.Diagnostics.Unreachable_code_detected.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const syntacticDiagnostics = context.program.getSyntacticDiagnostics(context.sourceFile, context.cancellationToken);
        if (syntacticDiagnostics.length) return;
        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start, context.span.length, context.errorCode));
        return [ts.codefix.createCodeFixAction(fixId, changes, ts.Diagnostics.Remove_unreachable_code, fixId, ts.Diagnostics.Remove_all_unreachable_code)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start, diag.length, diag.code)),
});

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, start: number, length: number, errorCode: number): void {
    const token = ts.getTokenAtPosition(sourceFile, start);
    const statement = ts.findAncestor(token, ts.isStatement)!;
    if (statement.getStart(sourceFile) !== token.getStart(sourceFile)) {
        const logData = JSON.stringify({
            statementKind: ts.Debug.formatSyntaxKind(statement.kind),
            tokenKind: ts.Debug.formatSyntaxKind(token.kind),
            errorCode,
            start,
            length
        });
        ts.Debug.fail("Token and statement should start at the same point. " + logData);
    }

    const container = (ts.isBlock(statement.parent) ? statement.parent : statement).parent;
    if (!ts.isBlock(statement.parent) || statement === ts.first(statement.parent.statements)) {
        switch (container.kind) {
            case ts.SyntaxKind.IfStatement:
                if ((container as ts.IfStatement).elseStatement) {
                    if (ts.isBlock(statement.parent)) {
                        break;
                    }
                    else {
                        changes.replaceNode(sourceFile, statement, ts.factory.createBlock(ts.emptyArray));
                    }
                    return;
                }
                // falls through
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.ForStatement:
                changes.delete(sourceFile, container);
                return;
        }
    }

    if (ts.isBlock(statement.parent)) {
        const end = start + length;
        const lastStatement = ts.Debug.checkDefined(lastWhere(ts.sliceAfter(statement.parent.statements, statement), s => s.pos < end), "Some statement should be last");
        changes.deleteNodeRange(sourceFile, statement, lastStatement);
    }
    else {
        changes.delete(sourceFile, statement);
    }
}

function lastWhere<T>(a: readonly T[], pred: (value: T) => boolean): T | undefined {
    let last: T | undefined;
    for (const value of a) {
        if (!pred(value)) break;
        last = value;
    }
    return last;
}
