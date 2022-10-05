import * as ts from "../_namespaces/ts";

const refactorName = "Add or remove braces in an arrow function";
const refactorDescription = ts.Diagnostics.Add_or_remove_braces_in_an_arrow_function.message;

const addBracesAction = {
    name: "Add braces to arrow function",
    description: ts.Diagnostics.Add_braces_to_arrow_function.message,
    kind: "refactor.rewrite.arrow.braces.add",
};
const removeBracesAction = {
    name: "Remove braces from arrow function",
    description: ts.Diagnostics.Remove_braces_from_arrow_function.message,
    kind: "refactor.rewrite.arrow.braces.remove"
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [removeBracesAction.kind],
    getEditsForAction: getRefactorEditsToRemoveFunctionBraces,
    getAvailableActions: getRefactorActionsToRemoveFunctionBraces
});

interface FunctionBracesInfo {
    func: ts.ArrowFunction;
    expression: ts.Expression | undefined;
    returnStatement?: ts.ReturnStatement;
    addBraces: boolean;
}

function getRefactorActionsToRemoveFunctionBraces(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
    const { file, startPosition, triggerReason } = context;
    const info = getConvertibleArrowFunctionAtPosition(file, startPosition, triggerReason === "invoked");
    if (!info) return ts.emptyArray;

    if (!ts.refactor.isRefactorErrorInfo(info)) {
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                info.addBraces ? addBracesAction : removeBracesAction
            ]
        }];
    }

    if (context.preferences.provideRefactorNotApplicableReason) {
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                { ...addBracesAction, notApplicableReason: info.error },
                { ...removeBracesAction, notApplicableReason: info.error },
            ]
        }];
    }

    return ts.emptyArray;
}

function getRefactorEditsToRemoveFunctionBraces(context: ts.RefactorContext, actionName: string): ts.RefactorEditInfo | undefined {
    const { file, startPosition } = context;
    const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
    ts.Debug.assert(info && !ts.refactor.isRefactorErrorInfo(info), "Expected applicable refactor info");

    const { expression, returnStatement, func } = info;

    let body: ts.ConciseBody;

    if (actionName === addBracesAction.name) {
        const returnStatement = ts.factory.createReturnStatement(expression);
        body = ts.factory.createBlock([returnStatement], /* multiLine */ true);
        ts.copyLeadingComments(expression!, returnStatement, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ true);
    }
    else if (actionName === removeBracesAction.name && returnStatement) {
        const actualExpression = expression || ts.factory.createVoidZero();
        body = ts.needsParentheses(actualExpression) ? ts.factory.createParenthesizedExpression(actualExpression) : actualExpression;
        ts.copyTrailingAsLeadingComments(returnStatement, body, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        ts.copyLeadingComments(returnStatement, body, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        ts.copyTrailingComments(returnStatement, body, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
    }
    else {
        ts.Debug.fail("invalid action");
    }

    const edits = ts.textChanges.ChangeTracker.with(context, t => {
        t.replaceNode(file, func.body, body);
    });

    return { renameFilename: undefined, renameLocation: undefined, edits };
}

function getConvertibleArrowFunctionAtPosition(file: ts.SourceFile, startPosition: number, considerFunctionBodies = true, kind?: string): FunctionBracesInfo | ts.refactor.RefactorErrorInfo | undefined {
    const node = ts.getTokenAtPosition(file, startPosition);
    const func = ts.getContainingFunction(node);

    if (!func) {
        return {
            error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_a_containing_arrow_function)
        };
    }

    if (!ts.isArrowFunction(func)) {
        return {
            error: ts.getLocaleSpecificMessage(ts.Diagnostics.Containing_function_is_not_an_arrow_function)
        };
    }

    if ((!ts.rangeContainsRange(func, node) || ts.rangeContainsRange(func.body, node) && !considerFunctionBodies)) {
        return undefined;
    }

    if (ts.refactor.refactorKindBeginsWith(addBracesAction.kind, kind) && ts.isExpression(func.body)) {
        return { func, addBraces: true, expression: func.body };
    }
    else if (ts.refactor.refactorKindBeginsWith(removeBracesAction.kind, kind) && ts.isBlock(func.body) && func.body.statements.length === 1) {
        const firstStatement = ts.first(func.body.statements);
        if (ts.isReturnStatement(firstStatement)) {
            return { func, addBraces: false, expression: firstStatement.expression, returnStatement: firstStatement };
        }
    }
    return undefined;
}
