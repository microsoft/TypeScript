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
        fullPropertyAccess: PropertyAccessExpression,
        firstOccurrence: Node,
        expression: BinaryExpression | ConditionalExpression
    }

    function getInfo(context: RefactorContext, considerEmptySpans = true): Info | undefined {
        const { file, program } = context;
        const span = getRefactorContextSpan(context);

        const forEmptySpan = span.length === 0;
        if (forEmptySpan && !considerEmptySpans) return undefined;

        const startToken = getTokenAtPosition(file, span.start);

        const containingNode = forEmptySpan ? findAncestor(startToken, (node) => { return isExpressionStatement(node) && (isBinaryExpression(node.expression) || isConditionalExpression(node.expression)); }) : getParentNodeInSpan(startToken, file, span);
        const expression = containingNode && isExpressionStatement(containingNode) ? containingNode.expression : containingNode;
        if (!expression) return undefined;

        const checker = program.getTypeChecker();


        if (isBinaryExpression(expression)) {
            const start = forEmptySpan ? expression.pos : startToken.pos;

            const fullPropertyAccess = getFullPropertyAccessChain(expression);
            if (!fullPropertyAccess) return undefined;
            if (expression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken && expression.operatorToken.pos <= fullPropertyAccess.pos) return undefined;

            // ensure that each sequential operand in range matches the longest acceess chain
            let checkNode = expression.left;
            let firstOccurrence: PropertyAccessExpression | Identifier = fullPropertyAccess;
            while (isBinaryExpression(checkNode) && checkNode.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken && (isPropertyAccessExpression(checkNode.right) || isIdentifier(checkNode.right)) && checkNode.right.pos >= start) {
                if (!checker.containsMatchingReference(fullPropertyAccess, checkNode.right)) {
                    return undefined;
                }
                firstOccurrence = checkNode.right;
                checkNode = checkNode.left;
            }
            // check final identifier
            if ((isIdentifier(checkNode) || isPropertyAccessExpression(checkNode)) && checker.containsMatchingReference(fullPropertyAccess, checkNode) && checkNode.pos >= start) {
                firstOccurrence = checkNode;
            }
            return firstOccurrence ? { fullPropertyAccess, firstOccurrence, expression } : undefined;
        }

        if (isConditionalExpression(expression)) {
            const whenTrue = expression.whenTrue;
            const condition = expression.condition;
            if ((isIdentifier(condition) || isPropertyAccessExpression(condition)) && isPropertyAccessExpression(whenTrue) && checker.containsMatchingReference(whenTrue, condition)) {
                // The ternary expression and nullish coalescing would result in different return values if c is nullish so do not offer a refactor
                const type = checker.getTypeAtLocation(whenTrue.name);
                if (checker.isNullableType(type) || type.flags & TypeFlags.Any) {
                    return undefined;
                }
                return { fullPropertyAccess: whenTrue, firstOccurrence: condition, expression };
            }
        }
        return undefined;
    }

    function getRightHandSidePropertyAccess(node: BinaryExpression | CallExpression): PropertyAccessExpression | undefined {
        if (isCallExpression(node) && isPropertyAccessExpression(node.expression)) {
            // a && |a.b|();
            return node.expression;
        }
        else if (isBinaryExpression(node)) {
            if (isPropertyAccessExpression(node.left)) {
                // a && |a.b| == 1;
                return node.left;
            }
            else if (isCallExpression(node.left) && isPropertyAccessExpression(node.left.expression)) {
                // a && |a.b|() == 1;
                return node.left.expression;
            }
        }
        return undefined;
    }

    function getFullPropertyAccessChain(node: BinaryExpression): PropertyAccessExpression | undefined {
        return isBinaryExpression(node.right) || isCallExpression(node.right)
            ? getRightHandSidePropertyAccess(node.right) : node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken && isPropertyAccessExpression(node.right) && !isOptionalChain(node.right)
                ? node.right : undefined;
    }

    function convertPropertyAccessToOptionalChain(checker: TypeChecker, toConvert: PropertyAccessExpression, until: Identifier | PrivateIdentifier): PropertyAccessExpression {
        if (isPropertyAccessExpression(toConvert.expression) && checker.getSymbolAtLocation(toConvert.expression.name) !== checker.getSymbolAtLocation(until)) {
            return factory.createPropertyAccessChain(convertPropertyAccessToOptionalChain(checker, toConvert.expression, until), factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
        }
        return factory.createPropertyAccessChain(toConvert.expression, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
    }

    function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, info: Info, _actionName: string): void {
        const { fullPropertyAccess, firstOccurrence, expression } = info;
        const until = isPropertyAccessExpression(firstOccurrence) ? firstOccurrence.name : isIdentifier(firstOccurrence) ? firstOccurrence : fullPropertyAccess.name;
        if (isBinaryExpression(expression)) {
            changes.replaceNodeRange(sourceFile, firstOccurrence, fullPropertyAccess, convertPropertyAccessToOptionalChain(checker, fullPropertyAccess, until));
        }
        else if (isConditionalExpression(expression)) {
            changes.replaceNode(sourceFile, expression, factory.createBinaryExpression(convertPropertyAccessToOptionalChain(checker, fullPropertyAccess, until), factory.createToken(SyntaxKind.QuestionQuestionToken), expression.whenFalse));
        }
    }
}
