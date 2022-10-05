import * as ts from "../_namespaces/ts";

const refactorName = "Convert to optional chain expression";
const convertToOptionalChainExpressionMessage = ts.getLocaleSpecificMessage(ts.Diagnostics.Convert_to_optional_chain_expression);

const toOptionalChainAction = {
    name: refactorName,
    description: convertToOptionalChainExpressionMessage,
    kind: "refactor.rewrite.expression.optionalChain",
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [toOptionalChainAction.kind],
    getEditsForAction: getRefactorEditsToConvertToOptionalChain,
    getAvailableActions: getRefactorActionsToConvertToOptionalChain,
});

function getRefactorActionsToConvertToOptionalChain(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
    const info = getInfo(context, context.triggerReason === "invoked");
    if (!info) return ts.emptyArray;

    if (!ts.refactor.isRefactorErrorInfo(info)) {
        return [{
            name: refactorName,
            description: convertToOptionalChainExpressionMessage,
            actions: [toOptionalChainAction],
        }];
    }

    if (context.preferences.provideRefactorNotApplicableReason) {
        return [{
            name: refactorName,
            description: convertToOptionalChainExpressionMessage,
            actions: [{ ...toOptionalChainAction, notApplicableReason: info.error }],
        }];
    }
    return ts.emptyArray;
}

function getRefactorEditsToConvertToOptionalChain(context: ts.RefactorContext, actionName: string): ts.RefactorEditInfo | undefined {
    const info = getInfo(context);
    ts.Debug.assert(info && !ts.refactor.isRefactorErrorInfo(info), "Expected applicable refactor info");
    const edits = ts.textChanges.ChangeTracker.with(context, t =>
        doChange(context.file, context.program.getTypeChecker(), t, info, actionName)
    );
    return { edits, renameFilename: undefined, renameLocation: undefined };
}

type Occurrence = ts.PropertyAccessExpression | ts.ElementAccessExpression | ts.Identifier;

interface OptionalChainInfo {
    finalExpression: ts.PropertyAccessExpression | ts.ElementAccessExpression | ts.CallExpression,
    occurrences: Occurrence[],
    expression: ValidExpression,
}

type ValidExpressionOrStatement = ValidExpression | ValidStatement;

/**
 * Types for which a "Convert to optional chain refactor" are offered.
 */
type ValidExpression = ts.BinaryExpression | ts.ConditionalExpression;

/**
 * Types of statements which are likely to include a valid expression for extraction.
 */
type ValidStatement = ts.ExpressionStatement | ts.ReturnStatement | ts.VariableStatement;

function isValidExpression(node: ts.Node): node is ValidExpression {
    return ts.isBinaryExpression(node) || ts.isConditionalExpression(node);
}

function isValidStatement(node: ts.Node): node is ValidStatement {
    return ts.isExpressionStatement(node) || ts.isReturnStatement(node) || ts.isVariableStatement(node);
}

function isValidExpressionOrStatement(node: ts.Node): node is ValidExpressionOrStatement {
    return isValidExpression(node) || isValidStatement(node);
}

function getInfo(context: ts.RefactorContext, considerEmptySpans = true): OptionalChainInfo | ts.refactor.RefactorErrorInfo | undefined {
    const { file, program } = context;
    const span = ts.getRefactorContextSpan(context);

    const forEmptySpan = span.length === 0;
    if (forEmptySpan && !considerEmptySpans) return undefined;

    // selecting fo[|o && foo.ba|]r should be valid, so adjust span to fit start and end tokens
    const startToken = ts.getTokenAtPosition(file, span.start);
    const endToken = ts.findTokenOnLeftOfPosition(file, span.start + span.length);
    const adjustedSpan = ts.createTextSpanFromBounds(startToken.pos, endToken && endToken.end >= startToken.pos ? endToken.getEnd() : startToken.getEnd());

    const parent = forEmptySpan ? getValidParentNodeOfEmptySpan(startToken) : getValidParentNodeContainingSpan(startToken, adjustedSpan);
    const expression = parent && isValidExpressionOrStatement(parent) ? getExpression(parent) : undefined;
    if (!expression) return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_convertible_access_expression) };

    const checker = program.getTypeChecker();
    return ts.isConditionalExpression(expression) ? getConditionalInfo(expression, checker) : getBinaryInfo(expression);
}

function getConditionalInfo(expression: ts.ConditionalExpression, checker: ts.TypeChecker): OptionalChainInfo | ts.refactor.RefactorErrorInfo | undefined {
    const condition = expression.condition;
    const finalExpression = getFinalExpressionInChain(expression.whenTrue);

    if (!finalExpression || checker.isNullableType(checker.getTypeAtLocation(finalExpression))) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_convertible_access_expression) };
    }

    if ((ts.isPropertyAccessExpression(condition) || ts.isIdentifier(condition))
        && getMatchingStart(condition, finalExpression.expression)) {
        return { finalExpression, occurrences: [condition], expression };
    }
    else if (ts.isBinaryExpression(condition)) {
        const occurrences = getOccurrencesInExpression(finalExpression.expression, condition);
        return occurrences ? { finalExpression, occurrences, expression } :
            { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_matching_access_expressions) };
    }
}

function getBinaryInfo(expression: ts.BinaryExpression): OptionalChainInfo | ts.refactor.RefactorErrorInfo | undefined {
    if (expression.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) {
        return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Can_only_convert_logical_AND_access_chains) };
    }
    const finalExpression = getFinalExpressionInChain(expression.right);

    if (!finalExpression) return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_convertible_access_expression) };

    const occurrences = getOccurrencesInExpression(finalExpression.expression, expression.left);
    return occurrences ? { finalExpression, occurrences, expression } :
        { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_matching_access_expressions) };
}

/**
 * Gets a list of property accesses that appear in matchTo and occur in sequence in expression.
 */
function getOccurrencesInExpression(matchTo: ts.Expression, expression: ts.Expression): Occurrence[] | undefined {
    const occurrences: Occurrence[] = [];
    while (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
        const match = getMatchingStart(ts.skipParentheses(matchTo), ts.skipParentheses(expression.right));
        if (!match) {
            break;
        }
        occurrences.push(match);
        matchTo = match;
        expression = expression.left;
    }
    const finalMatch = getMatchingStart(matchTo, expression);
    if (finalMatch) {
        occurrences.push(finalMatch);
    }
    return occurrences.length > 0 ? occurrences: undefined;
}

/**
 * Returns subchain if chain begins with subchain syntactically.
 */
function getMatchingStart(chain: ts.Expression, subchain: ts.Expression): ts.PropertyAccessExpression | ts.ElementAccessExpression | ts.Identifier | undefined {
    if (!ts.isIdentifier(subchain) && !ts.isPropertyAccessExpression(subchain) && !ts.isElementAccessExpression(subchain)) {
        return undefined;
    }
    return chainStartsWith(chain, subchain) ? subchain : undefined;
}

/**
 * Returns true if chain begins with subchain syntactically.
 */
function chainStartsWith(chain: ts.Node, subchain: ts.Node): boolean {
    // skip until we find a matching identifier.
    while (ts.isCallExpression(chain) || ts.isPropertyAccessExpression(chain) || ts.isElementAccessExpression(chain)) {
        if (getTextOfChainNode(chain) === getTextOfChainNode(subchain)) break;
        chain = chain.expression;
    }
    // check that the chains match at each access. Call chains in subchain are not valid.
    while ((ts.isPropertyAccessExpression(chain) && ts.isPropertyAccessExpression(subchain)) ||
           (ts.isElementAccessExpression(chain) && ts.isElementAccessExpression(subchain))) {
        if (getTextOfChainNode(chain) !== getTextOfChainNode(subchain)) return false;
        chain = chain.expression;
        subchain = subchain.expression;
    }
    // check if we have reached a final identifier.
    return ts.isIdentifier(chain) && ts.isIdentifier(subchain) && chain.getText() === subchain.getText();
}

function getTextOfChainNode(node: ts.Node): string | undefined {
    if (ts.isIdentifier(node) || ts.isStringOrNumericLiteralLike(node)) {
        return node.getText();
    }
    if (ts.isPropertyAccessExpression(node)) {
        return getTextOfChainNode(node.name);
    }
    if (ts.isElementAccessExpression(node)) {
        return getTextOfChainNode(node.argumentExpression);
    }
    return undefined;
}

/**
 * Find the least ancestor of the input node that is a valid type for extraction and contains the input span.
 */
function getValidParentNodeContainingSpan(node: ts.Node, span: ts.TextSpan): ValidExpressionOrStatement | undefined {
    while (node.parent) {
        if (isValidExpressionOrStatement(node) && span.length !== 0 && node.end >= span.start + span.length) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/**
 * Finds an ancestor of the input node that is a valid type for extraction, skipping subexpressions.
 */
function getValidParentNodeOfEmptySpan(node: ts.Node): ValidExpressionOrStatement | undefined {
    while (node.parent) {
        if (isValidExpressionOrStatement(node) && !isValidExpressionOrStatement(node.parent)) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/**
 * Gets an expression of valid extraction type from a valid statement or expression.
 */
function getExpression(node: ValidExpressionOrStatement): ValidExpression | undefined {
    if (isValidExpression(node)) {
        return node;
    }
    if (ts.isVariableStatement(node)) {
        const variable = ts.getSingleVariableOfVariableStatement(node);
        const initializer = variable?.initializer;
        return initializer && isValidExpression(initializer) ? initializer : undefined;
    }
    return node.expression && isValidExpression(node.expression) ? node.expression : undefined;
}

/**
 * Gets a property access expression which may be nested inside of a binary expression. The final
 * expression in an && chain will occur as the right child of the parent binary expression, unless
 * it is followed by a different binary operator.
 * @param node the right child of a binary expression or a call expression.
 */
function getFinalExpressionInChain(node: ts.Expression): ts.CallExpression | ts.PropertyAccessExpression | ts.ElementAccessExpression | undefined {
    // foo && |foo.bar === 1|; - here the right child of the && binary expression is another binary expression.
    // the rightmost member of the && chain should be the leftmost child of that expression.
    node = ts.skipParentheses(node);
    if (ts.isBinaryExpression(node)) {
        return getFinalExpressionInChain(node.left);
    }
    // foo && |foo.bar()()| - nested calls are treated like further accesses.
    else if ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) || ts.isCallExpression(node)) && !ts.isOptionalChain(node)) {
        return node;
    }
    return undefined;
}

/**
 * Creates an access chain from toConvert with '?.' accesses at expressions appearing in occurrences.
 */
function convertOccurrences(checker: ts.TypeChecker, toConvert: ts.Expression, occurrences: Occurrence[]): ts.Expression {
    if (ts.isPropertyAccessExpression(toConvert) || ts.isElementAccessExpression(toConvert) || ts.isCallExpression(toConvert)) {
        const chain = convertOccurrences(checker, toConvert.expression, occurrences);
        const lastOccurrence = occurrences.length > 0 ? occurrences[occurrences.length - 1] : undefined;
        const isOccurrence = lastOccurrence?.getText() === toConvert.expression.getText();
        if (isOccurrence) occurrences.pop();
        if (ts.isCallExpression(toConvert)) {
            return isOccurrence ?
                ts.factory.createCallChain(chain, ts.factory.createToken(ts.SyntaxKind.QuestionDotToken), toConvert.typeArguments, toConvert.arguments) :
                ts.factory.createCallChain(chain, toConvert.questionDotToken, toConvert.typeArguments, toConvert.arguments);
        }
        else if (ts.isPropertyAccessExpression(toConvert)) {
            return isOccurrence ?
                ts.factory.createPropertyAccessChain(chain, ts.factory.createToken(ts.SyntaxKind.QuestionDotToken), toConvert.name) :
                ts.factory.createPropertyAccessChain(chain, toConvert.questionDotToken, toConvert.name);
        }
        else if (ts.isElementAccessExpression(toConvert)) {
            return isOccurrence ?
                ts.factory.createElementAccessChain(chain, ts.factory.createToken(ts.SyntaxKind.QuestionDotToken), toConvert.argumentExpression) :
                ts.factory.createElementAccessChain(chain, toConvert.questionDotToken, toConvert.argumentExpression);
        }
    }
    return toConvert;
}

function doChange(sourceFile: ts.SourceFile, checker: ts.TypeChecker, changes: ts.textChanges.ChangeTracker, info: OptionalChainInfo, _actionName: string): void {
    const { finalExpression, occurrences, expression } = info;
    const firstOccurrence = occurrences[occurrences.length - 1];
    const convertedChain = convertOccurrences(checker, finalExpression, occurrences);
    if (convertedChain && (ts.isPropertyAccessExpression(convertedChain) || ts.isElementAccessExpression(convertedChain) || ts.isCallExpression(convertedChain))) {
        if (ts.isBinaryExpression(expression)) {
            changes.replaceNodeRange(sourceFile, firstOccurrence, finalExpression, convertedChain);
        }
        else if (ts.isConditionalExpression(expression)) {
            changes.replaceNode(sourceFile, expression,
                ts.factory.createBinaryExpression(convertedChain, ts.factory.createToken(ts.SyntaxKind.QuestionQuestionToken), expression.whenFalse)
            );
        }
    }
}
