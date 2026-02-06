import {
    ApplicableRefactorInfo,
    BinaryExpression,
    CallExpression,
    ConditionalExpression,
    createTextSpanFromBounds,
    Debug,
    Diagnostics,
    ElementAccessExpression,
    emptyArray,
    Expression,
    ExpressionStatement,
    factory,
    findTokenOnLeftOfPosition,
    getLocaleSpecificMessage,
    getRefactorContextSpan,
    getSingleVariableOfVariableStatement,
    getTokenAtPosition,
    Identifier,
    isBinaryExpression,
    isCallExpression,
    isConditionalExpression,
    isElementAccessExpression,
    isExpressionStatement,
    isIdentifier,
    isOptionalChain,
    isPropertyAccessExpression,
    isReturnStatement,
    isStringOrNumericLiteralLike,
    isVariableStatement,
    Node,
    PropertyAccessExpression,
    RefactorContext,
    RefactorEditInfo,
    ReturnStatement,
    skipParentheses,
    SourceFile,
    SyntaxKind,
    textChanges,
    TextSpan,
    TypeChecker,
    VariableStatement,
} from "../_namespaces/ts.js";
import {
    isRefactorErrorInfo,
    RefactorErrorInfo,
    registerRefactor,
} from "../_namespaces/ts.refactor.js";

const refactorName = "Convert to optional chain expression";
const convertToOptionalChainExpressionMessage = getLocaleSpecificMessage(Diagnostics.Convert_to_optional_chain_expression);

const toOptionalChainAction = {
    name: refactorName,
    description: convertToOptionalChainExpressionMessage,
    kind: "refactor.rewrite.expression.optionalChain",
};
registerRefactor(refactorName, {
    kinds: [toOptionalChainAction.kind],
    getEditsForAction: getRefactorEditsToConvertToOptionalChain,
    getAvailableActions: getRefactorActionsToConvertToOptionalChain,
});

function getRefactorActionsToConvertToOptionalChain(context: RefactorContext): readonly ApplicableRefactorInfo[] {
    const info = getInfo(context, context.triggerReason === "invoked");
    if (!info) return emptyArray;

    if (!isRefactorErrorInfo(info)) {
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
    return emptyArray;
}

function getRefactorEditsToConvertToOptionalChain(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
    const info = getInfo(context);
    Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");
    const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program.getTypeChecker(), t, info, actionName));
    return { edits, renameFilename: undefined, renameLocation: undefined };
}

type Occurrence = PropertyAccessExpression | ElementAccessExpression | Identifier;

interface OptionalChainInfo {
    finalExpression: PropertyAccessExpression | ElementAccessExpression | CallExpression;
    occurrences: Occurrence[];
    expression: ValidExpression;
}

type ValidExpressionOrStatement = ValidExpression | ValidStatement;

/**
 * Types for which a "Convert to optional chain refactor" are offered.
 */
type ValidExpression = BinaryExpression | ConditionalExpression;

/**
 * Types of statements which are likely to include a valid expression for extraction.
 */
type ValidStatement = ExpressionStatement | ReturnStatement | VariableStatement;

function isValidExpression(node: Node): node is ValidExpression {
    return isBinaryExpression(node) || isConditionalExpression(node);
}

function isValidStatement(node: Node): node is ValidStatement {
    return isExpressionStatement(node) || isReturnStatement(node) || isVariableStatement(node);
}

function isValidExpressionOrStatement(node: Node): node is ValidExpressionOrStatement {
    return isValidExpression(node) || isValidStatement(node);
}

function getInfo(context: RefactorContext, considerEmptySpans = true): OptionalChainInfo | RefactorErrorInfo | undefined {
    const { file, program } = context;
    const span = getRefactorContextSpan(context);

    const forEmptySpan = span.length === 0;
    if (forEmptySpan && !considerEmptySpans) return undefined;

    // selecting fo[|o && foo.ba|]r should be valid, so adjust span to fit start and end tokens
    const startToken = getTokenAtPosition(file, span.start);
    const endToken = findTokenOnLeftOfPosition(file, span.start + span.length);
    const adjustedSpan = createTextSpanFromBounds(startToken.pos, endToken && endToken.end >= startToken.pos ? endToken.getEnd() : startToken.getEnd());

    const parent = forEmptySpan ? getValidParentNodeOfEmptySpan(startToken) : getValidParentNodeContainingSpan(startToken, adjustedSpan);
    const expression = parent && isValidExpressionOrStatement(parent) ? getExpression(parent) : undefined;
    if (!expression) return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_convertible_access_expression) };

    const checker = program.getTypeChecker();
    return isConditionalExpression(expression) ? getConditionalInfo(expression, checker) : getBinaryInfo(expression);
}

function getConditionalInfo(expression: ConditionalExpression, checker: TypeChecker): OptionalChainInfo | RefactorErrorInfo | undefined {
    const condition = expression.condition;
    const finalExpression = getFinalExpressionInChain(expression.whenTrue);

    if (!finalExpression || checker.isNullableType(checker.getTypeAtLocation(finalExpression))) {
        return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_convertible_access_expression) };
    }

    if (
        (isPropertyAccessExpression(condition) || isIdentifier(condition))
        && getMatchingStart(condition, finalExpression.expression)
    ) {
        return { finalExpression, occurrences: [condition], expression };
    }
    else if (isBinaryExpression(condition)) {
        const occurrences = getOccurrencesInExpression(finalExpression.expression, condition);
        return occurrences ? { finalExpression, occurrences, expression } :
            { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_matching_access_expressions) };
    }
}

function getBinaryInfo(expression: BinaryExpression): OptionalChainInfo | RefactorErrorInfo | undefined {
    if (expression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken) {
        return { error: getLocaleSpecificMessage(Diagnostics.Can_only_convert_logical_AND_access_chains) };
    }
    const finalExpression = getFinalExpressionInChain(expression.right);

    if (!finalExpression) return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_convertible_access_expression) };

    const occurrences = getOccurrencesInExpression(finalExpression.expression, expression.left);
    return occurrences ? { finalExpression, occurrences, expression } :
        { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_matching_access_expressions) };
}

/**
 * Gets a list of property accesses that appear in matchTo and occur in sequence in expression.
 */
function getOccurrencesInExpression(matchTo: Expression, expression: Expression): Occurrence[] | undefined {
    const occurrences: Occurrence[] = [];
    while (isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
        const match = getMatchingStart(skipParentheses(matchTo), skipParentheses(expression.right));
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
    return occurrences.length > 0 ? occurrences : undefined;
}

/**
 * Returns subchain if chain begins with subchain syntactically.
 */
function getMatchingStart(chain: Expression, subchain: Expression): PropertyAccessExpression | ElementAccessExpression | Identifier | undefined {
    if (!isIdentifier(subchain) && !isPropertyAccessExpression(subchain) && !isElementAccessExpression(subchain)) {
        return undefined;
    }
    return chainStartsWith(chain, subchain) ? subchain : undefined;
}

/**
 * Returns true if chain begins with subchain syntactically.
 */
function chainStartsWith(chain: Node, subchain: Node): boolean {
    // skip until we find a matching identifier.
    while (isCallExpression(chain) || isPropertyAccessExpression(chain) || isElementAccessExpression(chain)) {
        if (getTextOfChainNode(chain) === getTextOfChainNode(subchain)) break;
        chain = chain.expression;
    }
    // check that the chains match at each access. Call chains in subchain are not valid.
    while (
        (isPropertyAccessExpression(chain) && isPropertyAccessExpression(subchain)) ||
        (isElementAccessExpression(chain) && isElementAccessExpression(subchain))
    ) {
        if (getTextOfChainNode(chain) !== getTextOfChainNode(subchain)) return false;
        chain = chain.expression;
        subchain = subchain.expression;
    }
    // check if we have reached a final identifier.
    return isIdentifier(chain) && isIdentifier(subchain) && chain.getText() === subchain.getText();
}

function getTextOfChainNode(node: Node): string | undefined {
    if (isIdentifier(node) || isStringOrNumericLiteralLike(node)) {
        return node.getText();
    }
    if (isPropertyAccessExpression(node)) {
        return getTextOfChainNode(node.name);
    }
    if (isElementAccessExpression(node)) {
        return getTextOfChainNode(node.argumentExpression);
    }
    return undefined;
}

/**
 * Find the least ancestor of the input node that is a valid type for extraction and contains the input span.
 */
function getValidParentNodeContainingSpan(node: Node, span: TextSpan): ValidExpressionOrStatement | undefined {
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
function getValidParentNodeOfEmptySpan(node: Node): ValidExpressionOrStatement | undefined {
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
    if (isVariableStatement(node)) {
        const variable = getSingleVariableOfVariableStatement(node);
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
function getFinalExpressionInChain(node: Expression): CallExpression | PropertyAccessExpression | ElementAccessExpression | undefined {
    // foo && |foo.bar === 1|; - here the right child of the && binary expression is another binary expression.
    // the rightmost member of the && chain should be the leftmost child of that expression.
    node = skipParentheses(node);
    if (isBinaryExpression(node)) {
        return getFinalExpressionInChain(node.left);
    }
    // foo && |foo.bar()()| - nested calls are treated like further accesses.
    else if ((isPropertyAccessExpression(node) || isElementAccessExpression(node) || isCallExpression(node)) && !isOptionalChain(node)) {
        return node;
    }
    return undefined;
}

/**
 * Creates an access chain from toConvert with '?.' accesses at expressions appearing in occurrences.
 */
function convertOccurrences(checker: TypeChecker, toConvert: Expression, occurrences: Occurrence[]): Expression {
    if (isPropertyAccessExpression(toConvert) || isElementAccessExpression(toConvert) || isCallExpression(toConvert)) {
        const chain = convertOccurrences(checker, toConvert.expression, occurrences);
        const lastOccurrence = occurrences.length > 0 ? occurrences[occurrences.length - 1] : undefined;
        const isOccurrence = lastOccurrence?.getText() === toConvert.expression.getText();
        if (isOccurrence) occurrences.pop();
        if (isCallExpression(toConvert)) {
            return isOccurrence ?
                factory.createCallChain(chain, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.typeArguments, toConvert.arguments) :
                factory.createCallChain(chain, toConvert.questionDotToken, toConvert.typeArguments, toConvert.arguments);
        }
        else if (isPropertyAccessExpression(toConvert)) {
            return isOccurrence ?
                factory.createPropertyAccessChain(chain, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name) :
                factory.createPropertyAccessChain(chain, toConvert.questionDotToken, toConvert.name);
        }
        else if (isElementAccessExpression(toConvert)) {
            return isOccurrence ?
                factory.createElementAccessChain(chain, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.argumentExpression) :
                factory.createElementAccessChain(chain, toConvert.questionDotToken, toConvert.argumentExpression);
        }
    }
    return toConvert;
}

function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, info: OptionalChainInfo, _actionName: string): void {
    const { finalExpression, occurrences, expression } = info;
    const firstOccurrence = occurrences[occurrences.length - 1];
    const convertedChain = convertOccurrences(checker, finalExpression, occurrences);
    if (convertedChain && (isPropertyAccessExpression(convertedChain) || isElementAccessExpression(convertedChain) || isCallExpression(convertedChain))) {
        if (isBinaryExpression(expression)) {
            changes.replaceNodeRange(sourceFile, firstOccurrence, finalExpression, convertedChain);
        }
        else if (isConditionalExpression(expression)) {
            changes.replaceNode(sourceFile, expression, factory.createBinaryExpression(convertedChain, factory.createToken(SyntaxKind.QuestionQuestionToken), expression.whenFalse));
        }
    }
}
