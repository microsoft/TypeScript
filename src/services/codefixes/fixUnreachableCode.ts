import {
    emptyArray,
    first,
} from "../../compiler/core";
import * as Debug from "../../compiler/debug";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import { isBlock } from "../../compiler/factory/nodeTests";
import {
    IfStatement,
    SourceFile,
    SyntaxKind,
} from "../../compiler/types";
import { sliceAfter } from "../../compiler/utilities";
import {
    findAncestor,
    isStatement,
} from "../../compiler/utilitiesPublic";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import { getTokenAtPosition } from "../utilities";

const fixId = "fixUnreachableCode";
const errorCodes = [Diagnostics.Unreachable_code_detected.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const syntacticDiagnostics = context.program.getSyntacticDiagnostics(context.sourceFile, context.cancellationToken);
        if (syntacticDiagnostics.length) return;
        const changes = ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.span.start, context.span.length, context.errorCode));
        return [createCodeFixAction(fixId, changes, Diagnostics.Remove_unreachable_code, fixId, Diagnostics.Remove_all_unreachable_code)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => doChange(changes, diag.file, diag.start, diag.length, diag.code)),
});

function doChange(changes: ChangeTracker, sourceFile: SourceFile, start: number, length: number, errorCode: number): void {
    const token = getTokenAtPosition(sourceFile, start);
    const statement = findAncestor(token, isStatement)!;
    if (statement.getStart(sourceFile) !== token.getStart(sourceFile)) {
        const logData = JSON.stringify({
            statementKind: Debug.formatSyntaxKind(statement.kind),
            tokenKind: Debug.formatSyntaxKind(token.kind),
            errorCode,
            start,
            length
        });
        Debug.fail("Token and statement should start at the same point. " + logData);
    }

    const container = (isBlock(statement.parent) ? statement.parent : statement).parent;
    if (!isBlock(statement.parent) || statement === first(statement.parent.statements)) {
        switch (container.kind) {
            case SyntaxKind.IfStatement:
                if ((container as IfStatement).elseStatement) {
                    if (isBlock(statement.parent)) {
                        break;
                    }
                    else {
                        changes.replaceNode(sourceFile, statement, factory.createBlock(emptyArray));
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
        const lastStatement = Debug.checkDefined(lastWhere(sliceAfter(statement.parent.statements, statement), s => s.pos < end), "Some statement should be last");
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
