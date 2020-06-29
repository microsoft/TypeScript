/* @internal */
namespace ts.refactor.convertToOptionalChainExpression {
    const refactorName = "Convert to optional chain expression";
    const convertToOptionalChainExpressionMessage = getLocaleSpecificMessage(Diagnostics.Convert_to_optional_chain_expression);

    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const info = getInfo(context, context.triggerReason === "invoked");
        if (!info) return emptyArray;
        return [{
            name: refactorName,
            description: convertToOptionalChainExpressionMessage,
            actions: [{
                name: refactorName,
                description: convertToOptionalChainExpressionMessage
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const info = getInfo(context);
        if (!info) return undefined;
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program.getTypeChecker(), t, info, actionName));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }

    interface Info {
        lastPropertyAccessChain: PropertyAccessExpression,
        firstOccurrence: PropertyAccessExpression | Identifier,
        expression: ValidExpression
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

    function getInfo(context: RefactorContext, considerEmptySpans = true): Info | undefined {
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
        if (!expression) return undefined;

        const checker = program.getTypeChecker();
        return isConditionalExpression(expression) ? getConditionalInfo(expression, checker) : getBinaryInfo(expression, checker);
    }

    function getConditionalInfo(expression: ConditionalExpression, checker: TypeChecker): Info | undefined {
        const condition = expression.condition;
        const lastPropertyAccessChain = getLastPropertyAccessChain(expression.whenTrue);
        if (!lastPropertyAccessChain || checker.isNullableType(checker.getTypeAtLocation(lastPropertyAccessChain))) return undefined;

        const firstOccurrence = (isPropertyAccessExpression(condition) || isIdentifier(condition))
            && checkMatch(condition, lastPropertyAccessChain.expression, checker) ?
            condition : isBinaryExpression(condition) ?
            getFirstOccurrenceInExpression(condition, lastPropertyAccessChain.expression, checker): undefined;

        return firstOccurrence && (isPropertyAccessExpression(firstOccurrence) || isIdentifier(firstOccurrence)) ?
            { lastPropertyAccessChain, firstOccurrence, expression } : undefined;
    }

    function getBinaryInfo(expression: BinaryExpression, checker: TypeChecker): Info | undefined {
        if (expression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken) return undefined;
        const lastPropertyAccessChain = getLastPropertyAccessChain(expression.right);
        if (!lastPropertyAccessChain) return undefined;

        const firstOccurrence = getFirstOccurrenceInExpression(expression.left, lastPropertyAccessChain.expression, checker);
        return firstOccurrence && (isPropertyAccessExpression(firstOccurrence) || isIdentifier(firstOccurrence)) ?
            { lastPropertyAccessChain, firstOccurrence, expression } : undefined;
    }

    /**
     * Gets the earliest expression or identifier in an && chain that matches the target access chain.
     * e.g. a && a.b is searched with target a.b and returns a.
     */
    function getFirstOccurrenceInExpression(expression: Expression, target: Expression, checker: TypeChecker): Expression | Identifier | undefined {
        if (isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
            const match = getFirstOccurrenceInExpression(expression.right, target, checker);
            if (!match) return undefined;
            return isPropertyAccessExpression(match) ?
                getFirstOccurrenceInExpression(expression.left, match.expression, checker) ?? expression.right : expression.right;
        }
        else {
            const match = checkMatch(expression, target, checker);
            return match ? expression : undefined;
        }
    }

    /**
     * Checks that expression matches the final identifier in a property access expression or call expression.
     */
    function checkMatch(expression: Expression, target: Expression, checker: TypeChecker): PropertyAccessExpression | Identifier | undefined {
        if (isCallExpression(target)) {
            // Recurse through the call expressions to match a.b to a.b()().
            return !isCallExpression(expression) ? checkMatch(expression, target.expression, checker) : undefined;
        }
        else if ((isPropertyAccessExpression(expression) && isPropertyAccessExpression(target)) ||
            (isIdentifier(expression) && isIdentifier(target))) {
            const symbol = checker.getSymbolAtLocation(expression);
            return symbol && !checker.isUnknownSymbol(symbol) && checker.isMatchingReference(expression, target) ? target : undefined;
        }
        return undefined;
    }

    /**
     * Find the least ancestor of the input node that is a valid type for extraction and contains the input span
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
     * Gets the right-most property access expression
     */
    function getLastPropertyAccessChain(node: Expression): PropertyAccessExpression | undefined {
        if (isBinaryExpression(node)) {
            return getLastPropertyAccessChain(node.left);
        }
        else if (isCallExpression(node)) {
            return getLastPropertyAccessChain(node.expression);
        }
        else if (isPropertyAccessExpression(node) && !isOptionalChain(node)) {
            return node;
        }
        return undefined;
    }

    /**
     * Converts a property access chain to an optional property access chain.
     */
    function convertToOptionalChain(checker: TypeChecker, toConvert: Expression, until: PropertyAccessExpression | Identifier): Expression {
        if (isCallExpression(toConvert)) {
            const chain = convertToOptionalChain(checker, toConvert.expression, until);
            return factory.createCallExpression(chain, toConvert.typeArguments, toConvert.arguments);
        }
        else if (isPropertyAccessExpression(toConvert) && !checkMatch(toConvert, until, checker)) {
            const chain = convertToOptionalChain(checker, toConvert.expression, until);
            return factory.createPropertyAccessChain(chain, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
        }
        return toConvert;
    }

    function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, info: Info, _actionName: string): void {
        const { lastPropertyAccessChain, firstOccurrence, expression } = info;
        const convertedChain = convertToOptionalChain(checker, lastPropertyAccessChain, firstOccurrence);
        if (convertedChain && isPropertyAccessExpression(convertedChain)) {
            if (isBinaryExpression(expression)) {
                changes.replaceNodeRange(sourceFile, firstOccurrence, lastPropertyAccessChain, convertedChain);
            }
            else if (isConditionalExpression(expression)) {
                changes.replaceNode(sourceFile, expression,
                    factory.createBinaryExpression(convertedChain, factory.createToken(SyntaxKind.QuestionQuestionToken), expression.whenFalse)
                );
            }
        }
    }
}
