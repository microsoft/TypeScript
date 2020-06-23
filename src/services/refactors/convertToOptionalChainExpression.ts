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
        firstOccurrence: Node,
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
        const endToken = getTokenAtPosition(file, span.start + span.length);
        const adjustedSpan = createTextSpanFromNode(startToken, file, endToken);

        const parent = forEmptySpan ? getParentForEmptySpanStartToken(startToken) : getParentNodeInSpan(startToken, file, adjustedSpan);
        const expression = parent && isValidExpressionOrStatement(parent) ? getExpression(parent) : undefined;
        if (!expression) return undefined;

        const checker = program.getTypeChecker();

        if (isBinaryExpression(expression)) {
            const lastPropertyAccessChain = getLastPropertyAccessChain(expression.right);
            if (!lastPropertyAccessChain) return undefined;
            const firstOccurrence = getFirstOccurrence(expression, lastPropertyAccessChain, checker);
            return firstOccurrence ? { lastPropertyAccessChain, firstOccurrence, expression } : undefined;
        }

        if (isConditionalExpression(expression)) {
            const whenTrue = expression.whenTrue;
            const condition = expression.condition;
            if ((isIdentifier(condition) || isPropertyAccessExpression(condition)) &&
                isPropertyAccessExpression(whenTrue) && checker.isMatchingReference(whenTrue.expression, condition)) {
                // The ternary expression and nullish coalescing would result in different return values if c is nullish so do not offer a refactor
                const type = checker.getTypeAtLocation(whenTrue.name);
                return !checker.isNullableType(type) ? { lastPropertyAccessChain: whenTrue, firstOccurrence: condition, expression } : undefined;
            }
        }
        return undefined;
    }

    function getFirstOccurrence(expression: BinaryExpression, lastPropertyAccessChain: PropertyAccessExpression, checker: TypeChecker): PropertyAccessExpression | Identifier | undefined {
        if (expression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken && expression.operatorToken.pos <= lastPropertyAccessChain.pos) return undefined;
        // ensure that each sequential operand in range matches the longest access chain
        let checkNode = expression.left;
        let firstOccurrence: PropertyAccessExpression | Identifier = lastPropertyAccessChain;
        while (isBinaryExpression(checkNode) && checkNode.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken &&
            (isPropertyAccessExpression(checkNode.right) || isIdentifier(checkNode.right))) {
            const previousReference = isPropertyAccessExpression(firstOccurrence) ? firstOccurrence.expression : firstOccurrence;
            if (!checker.isMatchingReference(previousReference, checkNode.right)) {
                return undefined;
            }
            firstOccurrence = checkNode.right;
            checkNode = checkNode.left;
        }
        // check final LHS node
        if (isIdentifier(checkNode) || isPropertyAccessExpression(checkNode)) {
            const previousReference = isPropertyAccessExpression(firstOccurrence) ? firstOccurrence.expression : firstOccurrence;
            if (isPropertyAccessExpression(firstOccurrence) && checker.isMatchingReference(previousReference, checkNode)) {
                firstOccurrence = checkNode;
            }
        }
        return firstOccurrence;
    }

    function getParentForEmptySpanStartToken(start: Node): ValidExpressionOrStatement | undefined {
        return findAncestor<ValidExpressionOrStatement>(start, (node): node is ValidExpressionOrStatement => {
            return node.parent &&
                (isValidExpression(node) && !isValidExpression(node.parent) ||
                isValidStatement(node) && !isValidStatement(node.parent));
        });
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

    function getRightHandSidePropertyAccess(node: BinaryExpression | CallExpression): PropertyAccessExpression | undefined {
        // && binary expressions are left-heavy so for most cases we just need to check if the last property access chain is on the RHS of a
        // binary expression with an operator if higher precedence. We may want to add recursion for more complex cases like a && a.b()()() == 1;
        if (isCallExpression(node) && isPropertyAccessExpression(node.expression)) {
            // a && a.b();
            return node.expression;
        }
        else if (isBinaryExpression(node)) {
            if (isPropertyAccessExpression(node.left)) {
                // a && a.b == 1;
                return node.left;
            }
            else if (isCallExpression(node.left) && isPropertyAccessExpression(node.left.expression)) {
                // a && a.b() == 1;
                return node.left.expression;
            }
        }
        return undefined;
    }

    function getLastPropertyAccessChain(node: Expression): PropertyAccessExpression | undefined {
        return isBinaryExpression(node) || isCallExpression(node) ? getRightHandSidePropertyAccess(node)
            : isPropertyAccessExpression(node) && !isOptionalChain(node) ? node
            : undefined;
    }

    function convertPropertyAccessToOptionalChain(checker: TypeChecker, toConvert: PropertyAccessExpression, until: Identifier | PrivateIdentifier): PropertyAccessExpression {
        if (isPropertyAccessExpression(toConvert.expression) && checker.getSymbolAtLocation(toConvert.expression.name) !== checker.getSymbolAtLocation(until)) {
            return factory.createPropertyAccessChain(convertPropertyAccessToOptionalChain(checker, toConvert.expression, until), factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
        }
        return factory.createPropertyAccessChain(toConvert.expression, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
    }

    function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, info: Info, _actionName: string): void {
        const { lastPropertyAccessChain, firstOccurrence, expression } = info;
        const until = isPropertyAccessExpression(firstOccurrence) ? firstOccurrence.name : isIdentifier(firstOccurrence) ? firstOccurrence : lastPropertyAccessChain.name;
        if (isBinaryExpression(expression)) {
            changes.replaceNodeRange(sourceFile, firstOccurrence, lastPropertyAccessChain, convertPropertyAccessToOptionalChain(checker, lastPropertyAccessChain, until));
        }
        else if (isConditionalExpression(expression)) {
            changes.replaceNode(sourceFile, expression, factory.createBinaryExpression(convertPropertyAccessToOptionalChain(checker, lastPropertyAccessChain, until), factory.createToken(SyntaxKind.QuestionQuestionToken), expression.whenFalse));
        }
    }
}
