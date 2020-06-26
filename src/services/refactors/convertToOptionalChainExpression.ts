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
        expression: BinaryExpression | ConditionalExpression
    }

    type ValidExpressionOrStatement = ValidExpression | ValidStatement;
    type ValidExpression = BinaryExpression | ConditionalExpression;
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

        const parent = forEmptySpan ? getParentNodeForEmptySpan(startToken) : getParentNodeContainingSpan(startToken, adjustedSpan);
        const expression = parent && isValidExpressionOrStatement(parent) ? getExpression(parent) : undefined;
        if (!expression) return undefined;

        const checker = program.getTypeChecker();
        return getExpressionInfo(expression, checker);
    }

    function getConditionalInfo(expression: ConditionalExpression, checker: TypeChecker): Info | undefined {
        const whenTrue = expression.whenTrue;
        const condition = expression.condition;
        if((isIdentifier(condition) || isPropertyAccessExpression(condition)) &&
            isPropertyAccessExpression(whenTrue) && checker.isMatchingReference(whenTrue.expression, condition)) {
            // The ternary expression and nullish coalescing would result in different return values if c is nullish so do not offer a refactor
            const type = checker.getTypeAtLocation(whenTrue.name);
            return !checker.isNullableType(type) ? { lastPropertyAccessChain: whenTrue, firstOccurrence: condition, expression } : undefined;
        }
        return undefined;
    }

    function getExpressionInfo(expression: ValidExpression, checker: TypeChecker): Info | undefined {
        // todo need to do the nullcheck for conditional here too
        if (isConditionalExpression(expression) && !isBinaryExpression(expression.condition)) {
            return getConditionalInfo(expression, checker);
        }
        if (isBinaryExpression(expression) && expression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken) {
            return undefined;
        }
        const lastPropertyAccessChain = isConditionalExpression(expression) ?
            getLastPropertyAccessChain(expression.whenTrue) : getLastPropertyAccessChain(expression.right);
        if (!lastPropertyAccessChain) return undefined;

        let checkNode = isConditionalExpression(expression) ? expression.condition : expression.left;
        let firstOccurrence: Expression = lastPropertyAccessChain;
        let toCheck: Expression = lastPropertyAccessChain;
        while (isBinaryExpression(checkNode) && toCheck && (isPropertyAccessExpression(toCheck) ||
            isCallExpression(toCheck)) && checkNode.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
            const match = checkMatch(checkNode.right, toCheck.expression, checker);
            if (!match) {
                break;
            }
            toCheck = match;
            firstOccurrence = checkNode.right;
            checkNode = checkNode.left;
        }
        const lastMatch = isCallExpression(toCheck) || isPropertyAccessExpression(toCheck) ? checkMatch(checkNode, toCheck.expression, checker) : undefined;
        if (lastMatch) {
            firstOccurrence = checkNode;
        }
        return firstOccurrence !== lastPropertyAccessChain && (isPropertyAccessExpression(firstOccurrence) || isIdentifier(firstOccurrence)) ?
            { lastPropertyAccessChain, firstOccurrence, expression } : undefined;
    }

    function checkMatch(expression: Expression | Identifier | PrivateIdentifier, target: Expression | Identifier | PrivateIdentifier, checker: TypeChecker): PropertyAccessExpression | Identifier | undefined {
        if (isCallExpression(target)) {
            // Recurse through the call expressions to match a.b to a.b()().
            return !isCallExpression(expression) ? checkMatch(expression, target.expression, checker) : undefined;
        }
        else if ((isPropertyAccessExpression(expression) && isPropertyAccessExpression(target)) ||
            (isIdentifier(expression) && isIdentifier(target))) {
            // we shouldn't offer a refactor for a.b && a.b().c && a.b.c().d so we need to check that the entire access chain matches.
            return checker.isMatchingReference(expression, target) ? expression : undefined;
        }
        return undefined;
    }

    function getParentNodeContainingSpan(node: Node, span: TextSpan): ValidExpressionOrStatement | undefined {
        while (node.parent) {
            if (isValidExpressionOrStatement(node) && span.length !== 0 && node.end >= span.start + span.length) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

    function getParentNodeForEmptySpan(node: Node): ValidExpressionOrStatement | undefined {
        while (node.parent) {
            if (isValidExpressionOrStatement(node) && !isValidExpressionOrStatement(node.parent)) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

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

    function getRightHandSidePropertyAccess(node: Expression): PropertyAccessExpression | Identifier | undefined {
        // && binary expressions are left-heavy so for most cases we just need to check if the last property access chain is on the RHS of a
        // binary expression with an operator of higher precedence.
        if (isPropertyAccessExpression(node) || isIdentifier(node)) {
            return node;
        }
        else if (isCallExpression(node)) {
            // cases
            // a && a.b();
            // a && a.b()();
            return getRightHandSidePropertyAccess(node.expression);
        }
        else if (isBinaryExpression(node)) {
            // cases
            // a && a.b == 1;
            // a && a.b() == 1;
            return getRightHandSidePropertyAccess(node.left);
        }
        return undefined;
    }

    function getLastPropertyAccessChain(node: Expression): PropertyAccessExpression | undefined {
        if (isBinaryExpression(node) || isCallExpression(node)) {
            const rhs = getRightHandSidePropertyAccess(node);
            return rhs && isPropertyAccessExpression(rhs) ? rhs : undefined;
        }
        else if (isPropertyAccessExpression(node) && !isOptionalChain(node)) {
            return node;
        }
        return undefined;
    }

    function convertToOptionalChain(checker: TypeChecker, toConvert: Expression, until: PropertyAccessExpression | Identifier | PrivateIdentifier): Expression {
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
