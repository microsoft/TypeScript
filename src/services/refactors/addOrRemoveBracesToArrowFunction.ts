import {
    ApplicableRefactorInfo,
    ArrowFunction,
    ConciseBody,
    copyLeadingComments,
    copyTrailingAsLeadingComments,
    copyTrailingComments,
    Debug,
    Diagnostics,
    emptyArray,
    Expression,
    factory,
    first,
    getContainingFunction,
    getLeftmostExpression,
    getLocaleSpecificMessage,
    getTokenAtPosition,
    isArrowFunction,
    isBlock,
    isExpression,
    isObjectLiteralExpression,
    isReturnStatement,
    needsParentheses,
    rangeContainsRange,
    RefactorContext,
    RefactorEditInfo,
    ReturnStatement,
    SourceFile,
    SyntaxKind,
    textChanges,
} from "../_namespaces/ts.js";
import {
    isRefactorErrorInfo,
    RefactorErrorInfo,
    refactorKindBeginsWith,
    registerRefactor,
} from "../_namespaces/ts.refactor.js";

const refactorName = "Add or remove braces in an arrow function";
const refactorDescription = getLocaleSpecificMessage(Diagnostics.Add_or_remove_braces_in_an_arrow_function);

const addBracesAction = {
    name: "Add braces to arrow function",
    description: getLocaleSpecificMessage(Diagnostics.Add_braces_to_arrow_function),
    kind: "refactor.rewrite.arrow.braces.add",
};
const removeBracesAction = {
    name: "Remove braces from arrow function",
    description: getLocaleSpecificMessage(Diagnostics.Remove_braces_from_arrow_function),
    kind: "refactor.rewrite.arrow.braces.remove",
};
registerRefactor(refactorName, {
    kinds: [removeBracesAction.kind],
    getEditsForAction: getRefactorEditsToRemoveFunctionBraces,
    getAvailableActions: getRefactorActionsToRemoveFunctionBraces,
});

interface FunctionBracesInfo {
    func: ArrowFunction;
    expression: Expression | undefined;
    returnStatement?: ReturnStatement;
    addBraces: boolean;
}

function getRefactorActionsToRemoveFunctionBraces(context: RefactorContext): readonly ApplicableRefactorInfo[] {
    const { file, startPosition, triggerReason } = context;
    const info = getConvertibleArrowFunctionAtPosition(file, startPosition, triggerReason === "invoked");
    if (!info) return emptyArray;

    if (!isRefactorErrorInfo(info)) {
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                info.addBraces ? addBracesAction : removeBracesAction,
            ],
        }];
    }

    if (context.preferences.provideRefactorNotApplicableReason) {
        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                { ...addBracesAction, notApplicableReason: info.error },
                { ...removeBracesAction, notApplicableReason: info.error },
            ],
        }];
    }

    return emptyArray;
}

function getRefactorEditsToRemoveFunctionBraces(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
    const { file, startPosition } = context;
    const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
    Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");

    const { expression, returnStatement, func } = info;

    let body: ConciseBody;

    if (actionName === addBracesAction.name) {
        const returnStatement = factory.createReturnStatement(expression);
        body = factory.createBlock([returnStatement], /*multiLine*/ true);
        copyLeadingComments(expression!, returnStatement, file, SyntaxKind.MultiLineCommentTrivia, /*hasTrailingNewLine*/ true);
    }
    else if (actionName === removeBracesAction.name && returnStatement) {
        const actualExpression = expression || factory.createVoidZero();
        body = needsParentheses(actualExpression) ? factory.createParenthesizedExpression(actualExpression) : actualExpression;
        copyTrailingAsLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /*hasTrailingNewLine*/ false);
        copyLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /*hasTrailingNewLine*/ false);
        copyTrailingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /*hasTrailingNewLine*/ false);
    }
    else {
        Debug.fail("invalid action");
    }

    const edits = textChanges.ChangeTracker.with(context, t => {
        t.replaceNode(file, func.body, body);
    });

    return { renameFilename: undefined, renameLocation: undefined, edits };
}

function getConvertibleArrowFunctionAtPosition(file: SourceFile, startPosition: number, considerFunctionBodies = true, kind?: string): FunctionBracesInfo | RefactorErrorInfo | undefined {
    const node = getTokenAtPosition(file, startPosition);
    const func = getContainingFunction(node);

    if (!func) {
        return {
            error: getLocaleSpecificMessage(Diagnostics.Could_not_find_a_containing_arrow_function),
        };
    }

    if (!isArrowFunction(func)) {
        return {
            error: getLocaleSpecificMessage(Diagnostics.Containing_function_is_not_an_arrow_function),
        };
    }

    if ((!rangeContainsRange(func, node) || rangeContainsRange(func.body, node) && !considerFunctionBodies)) {
        return undefined;
    }

    if (refactorKindBeginsWith(addBracesAction.kind, kind) && isExpression(func.body)) {
        return { func, addBraces: true, expression: func.body };
    }
    else if (refactorKindBeginsWith(removeBracesAction.kind, kind) && isBlock(func.body) && func.body.statements.length === 1) {
        const firstStatement = first(func.body.statements);
        if (isReturnStatement(firstStatement)) {
            const expression = firstStatement.expression && isObjectLiteralExpression(getLeftmostExpression(firstStatement.expression, /*stopAtCallExpressions*/ false)) ? factory.createParenthesizedExpression(firstStatement.expression) : firstStatement.expression;
            return { func, addBraces: false, expression, returnStatement: firstStatement };
        }
    }
    return undefined;
}
