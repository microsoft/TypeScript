import { Diagnostics, ArrowFunction, Expression, ReturnStatement, RefactorContext, ApplicableRefactorInfo, emptyArray, RefactorEditInfo, ConciseBody, createReturn, createBlock, suppressLeadingAndTrailingTrivia, copyLeadingComments, SyntaxKind, createVoidZero, createParen, Debug, isBinaryExpression, isObjectLiteralExpression, SourceFile, getTokenAtPosition, getContainingFunction, isArrowFunction, rangeContainsRange, isExpression, first, isReturnStatement } from "../ts";
import { registerRefactor } from "../ts.refactor";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const refactorName = "Add or remove braces in an arrow function";
/* @internal */
const refactorDescription = Diagnostics.Add_or_remove_braces_in_an_arrow_function.message;
/* @internal */
const addBracesActionName = "Add braces to arrow function";
/* @internal */
const removeBracesActionName = "Remove braces from arrow function";
/* @internal */
const addBracesActionDescription = Diagnostics.Add_braces_to_arrow_function.message;
/* @internal */
const removeBracesActionDescription = Diagnostics.Remove_braces_from_arrow_function.message;
/* @internal */
registerRefactor(refactorName, { getEditsForAction, getAvailableActions });
/* @internal */
interface Info {
    func: ArrowFunction;
    expression: Expression | undefined;
    returnStatement?: ReturnStatement;
    addBraces: boolean;
}
/* @internal */
function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
    const { file, startPosition } = context;
    const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
    if (!info)
        return emptyArray;
    return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                info.addBraces ?
                    {
                        name: addBracesActionName,
                        description: addBracesActionDescription
                    } : {
                    name: removeBracesActionName,
                    description: removeBracesActionDescription
                }
            ]
        }];
}
/* @internal */
function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
    const { file, startPosition } = context;
    const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
    if (!info)
        return undefined;
    const { expression, returnStatement, func } = info;
    let body: ConciseBody;
    if (actionName === addBracesActionName) {
        const returnStatement = createReturn(expression);
        body = createBlock([returnStatement], /* multiLine */ true);
        suppressLeadingAndTrailingTrivia(body);
        copyLeadingComments((expression!), returnStatement, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ true);
    }
    else if (actionName === removeBracesActionName && returnStatement) {
        const actualExpression = expression || createVoidZero();
        body = needsParentheses(actualExpression) ? createParen(actualExpression) : actualExpression;
        suppressLeadingAndTrailingTrivia(body);
        copyLeadingComments(returnStatement, body, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
    }
    else {
        Debug.fail("invalid action");
    }
    const edits = ChangeTracker.with(context, t => t.replaceNode(file, func.body, body));
    return { renameFilename: undefined, renameLocation: undefined, edits };
}
/* @internal */
function needsParentheses(expression: Expression) {
    return isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.CommaToken || isObjectLiteralExpression(expression);
}
/* @internal */
function getConvertibleArrowFunctionAtPosition(file: SourceFile, startPosition: number): Info | undefined {
    const node = getTokenAtPosition(file, startPosition);
    const func = getContainingFunction(node);
    if (!func || !isArrowFunction(func) || (!rangeContainsRange(func, node) || rangeContainsRange(func.body, node)))
        return undefined;
    if (isExpression(func.body)) {
        return {
            func,
            addBraces: true,
            expression: func.body
        };
    }
    else if (func.body.statements.length === 1) {
        const firstStatement = first(func.body.statements);
        if (isReturnStatement(firstStatement)) {
            return {
                func,
                addBraces: false,
                expression: firstStatement.expression,
                returnStatement: firstStatement
            };
        }
    }
    return undefined;
}
