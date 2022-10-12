/*@internal*/
namespace ts {
export function transformES2020(context: ts.TransformationContext) {
    const {
        factory,
        hoistVariableDeclaration,
    } = context;

    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if ((node.transformFlags & ts.TransformFlags.ContainsES2020) === 0) {
            return node;
        }
        switch (node.kind) {
            case ts.SyntaxKind.CallExpression: {
                const updated = visitNonOptionalCallExpression(node as ts.CallExpression, /*captureThisArg*/ false);
                ts.Debug.assertNotNode(updated, ts.isSyntheticReference);
                return updated;
            }
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
                if (ts.isOptionalChain(node)) {
                    const updated = visitOptionalExpression(node, /*captureThisArg*/ false, /*isDelete*/ false);
                    ts.Debug.assertNotNode(updated, ts.isSyntheticReference);
                    return updated;
                }
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.BinaryExpression:
                if ((node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
                    return transformNullishCoalescingExpression(node as ts.BinaryExpression);
                }
                return ts.visitEachChild(node, visitor, context);
            case ts.SyntaxKind.DeleteExpression:
                return visitDeleteExpression(node as ts.DeleteExpression);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function flattenChain(chain: ts.OptionalChain) {
        ts.Debug.assertNotNode(chain, ts.isNonNullChain);
        const links: ts.OptionalChain[] = [chain];
        while (!chain.questionDotToken && !ts.isTaggedTemplateExpression(chain)) {
            chain = ts.cast(ts.skipPartiallyEmittedExpressions(chain.expression), ts.isOptionalChain);
            ts.Debug.assertNotNode(chain, ts.isNonNullChain);
            links.unshift(chain);
        }
        return { expression: chain.expression, chain: links };
    }

    function visitNonOptionalParenthesizedExpression(node: ts.ParenthesizedExpression, captureThisArg: boolean, isDelete: boolean): ts.Expression {
        const expression = visitNonOptionalExpression(node.expression, captureThisArg, isDelete);
        if (ts.isSyntheticReference(expression)) {
            // `(a.b)` -> { expression `((_a = a).b)`, thisArg: `_a` }
            // `(a[b])` -> { expression `((_a = a)[b])`, thisArg: `_a` }
            return factory.createSyntheticReferenceExpression(factory.updateParenthesizedExpression(node, expression.expression), expression.thisArg);
        }
        return factory.updateParenthesizedExpression(node, expression);
    }

    function visitNonOptionalPropertyOrElementAccessExpression(node: ts.AccessExpression, captureThisArg: boolean, isDelete: boolean): ts.Expression {
        if (ts.isOptionalChain(node)) {
            // If `node` is an optional chain, then it is the outermost chain of an optional expression.
            return visitOptionalExpression(node, captureThisArg, isDelete);
        }

        let expression: ts.Expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        ts.Debug.assertNotNode(expression, ts.isSyntheticReference);

        let thisArg: ts.Expression | undefined;
        if (captureThisArg) {
            if (!ts.isSimpleCopiableExpression(expression)) {
                thisArg = factory.createTempVariable(hoistVariableDeclaration);
                expression = factory.createAssignment(thisArg, expression);
            }
            else {
                thisArg = expression;
            }
        }

        expression = node.kind === ts.SyntaxKind.PropertyAccessExpression
            ? factory.updatePropertyAccessExpression(node, expression, ts.visitNode(node.name, visitor, ts.isIdentifier))
            : factory.updateElementAccessExpression(node, expression, ts.visitNode(node.argumentExpression, visitor, ts.isExpression));
        return thisArg ? factory.createSyntheticReferenceExpression(expression, thisArg) : expression;
    }

    function visitNonOptionalCallExpression(node: ts.CallExpression, captureThisArg: boolean): ts.Expression {
        if (ts.isOptionalChain(node)) {
            // If `node` is an optional chain, then it is the outermost chain of an optional expression.
            return visitOptionalExpression(node, captureThisArg, /*isDelete*/ false);
        }
        if (ts.isParenthesizedExpression(node.expression) && ts.isOptionalChain(ts.skipParentheses(node.expression))) {
            // capture thisArg for calls of parenthesized optional chains like `(foo?.bar)()`
            const expression = visitNonOptionalParenthesizedExpression(node.expression, /*captureThisArg*/ true, /*isDelete*/ false);
            const args = ts.visitNodes(node.arguments, visitor, ts.isExpression);
            if (ts.isSyntheticReference(expression)) {
                return ts.setTextRange(factory.createFunctionCallCall(expression.expression, expression.thisArg, args), node);
            }
            return factory.updateCallExpression(node, expression, /*typeArguments*/ undefined, args);
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function visitNonOptionalExpression(node: ts.Expression, captureThisArg: boolean, isDelete: boolean): ts.Expression {
        switch (node.kind) {
            case ts.SyntaxKind.ParenthesizedExpression: return visitNonOptionalParenthesizedExpression(node as ts.ParenthesizedExpression, captureThisArg, isDelete);
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression: return visitNonOptionalPropertyOrElementAccessExpression(node as ts.AccessExpression, captureThisArg, isDelete);
            case ts.SyntaxKind.CallExpression: return visitNonOptionalCallExpression(node as ts.CallExpression, captureThisArg);
            default: return ts.visitNode(node, visitor, ts.isExpression);
        }
    }

    function visitOptionalExpression(node: ts.OptionalChain, captureThisArg: boolean, isDelete: boolean): ts.Expression {
        const { expression, chain } = flattenChain(node);
        const left = visitNonOptionalExpression(ts.skipPartiallyEmittedExpressions(expression), ts.isCallChain(chain[0]), /*isDelete*/ false);
        let leftThisArg = ts.isSyntheticReference(left) ? left.thisArg : undefined;
        let capturedLeft = ts.isSyntheticReference(left) ? left.expression : left;
        let leftExpression = factory.restoreOuterExpressions(expression, capturedLeft, ts.OuterExpressionKinds.PartiallyEmittedExpressions);
        if (!ts.isSimpleCopiableExpression(capturedLeft)) {
            capturedLeft = factory.createTempVariable(hoistVariableDeclaration);
            leftExpression = factory.createAssignment(capturedLeft, leftExpression);
        }
        let rightExpression = capturedLeft;
        let thisArg: ts.Expression | undefined;
        for (let i = 0; i < chain.length; i++) {
            const segment = chain[i];
            switch (segment.kind) {
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.ElementAccessExpression:
                    if (i === chain.length - 1 && captureThisArg) {
                        if (!ts.isSimpleCopiableExpression(rightExpression)) {
                            thisArg = factory.createTempVariable(hoistVariableDeclaration);
                            rightExpression = factory.createAssignment(thisArg, rightExpression);
                        }
                        else {
                            thisArg = rightExpression;
                        }
                    }
                    rightExpression = segment.kind === ts.SyntaxKind.PropertyAccessExpression
                        ? factory.createPropertyAccessExpression(rightExpression, ts.visitNode(segment.name, visitor, ts.isIdentifier))
                        : factory.createElementAccessExpression(rightExpression, ts.visitNode(segment.argumentExpression, visitor, ts.isExpression));
                    break;
                case ts.SyntaxKind.CallExpression:
                    if (i === 0 && leftThisArg) {
                        if (!ts.isGeneratedIdentifier(leftThisArg)) {
                            leftThisArg = factory.cloneNode(leftThisArg);
                            ts.addEmitFlags(leftThisArg, ts.EmitFlags.NoComments);
                        }
                        rightExpression = factory.createFunctionCallCall(
                            rightExpression,
                            leftThisArg.kind === ts.SyntaxKind.SuperKeyword ? factory.createThis() : leftThisArg,
                            ts.visitNodes(segment.arguments, visitor, ts.isExpression)
                        );
                    }
                    else {
                        rightExpression = factory.createCallExpression(
                            rightExpression,
                            /*typeArguments*/ undefined,
                            ts.visitNodes(segment.arguments, visitor, ts.isExpression)
                        );
                    }
                    break;
            }
            ts.setOriginalNode(rightExpression, segment);
        }

        const target = isDelete
            ? factory.createConditionalExpression(createNotNullCondition(leftExpression, capturedLeft, /*invert*/ true), /*questionToken*/ undefined, factory.createTrue(), /*colonToken*/ undefined, factory.createDeleteExpression(rightExpression))
            : factory.createConditionalExpression(createNotNullCondition(leftExpression, capturedLeft, /*invert*/ true), /*questionToken*/ undefined, factory.createVoidZero(), /*colonToken*/ undefined, rightExpression);
        ts.setTextRange(target, node);
        return thisArg ? factory.createSyntheticReferenceExpression(target, thisArg) : target;
    }

    function createNotNullCondition(left: ts.Expression, right: ts.Expression, invert?: boolean) {
        return factory.createBinaryExpression(
            factory.createBinaryExpression(
                left,
                factory.createToken(invert ? ts.SyntaxKind.EqualsEqualsEqualsToken : ts.SyntaxKind.ExclamationEqualsEqualsToken),
                factory.createNull()
            ),
            factory.createToken(invert ? ts.SyntaxKind.BarBarToken : ts.SyntaxKind.AmpersandAmpersandToken),
            factory.createBinaryExpression(
                right,
                factory.createToken(invert ? ts.SyntaxKind.EqualsEqualsEqualsToken : ts.SyntaxKind.ExclamationEqualsEqualsToken),
                factory.createVoidZero()
            )
        );
    }

    function transformNullishCoalescingExpression(node: ts.BinaryExpression) {
        let left = ts.visitNode(node.left, visitor, ts.isExpression);
        let right = left;
        if (!ts.isSimpleCopiableExpression(left)) {
            right = factory.createTempVariable(hoistVariableDeclaration);
            left = factory.createAssignment(right, left);
        }
        return ts.setTextRange(factory.createConditionalExpression(
            createNotNullCondition(left, right),
            /*questionToken*/ undefined,
            right,
            /*colonToken*/ undefined,
            ts.visitNode(node.right, visitor, ts.isExpression),
        ), node);
    }

    function visitDeleteExpression(node: ts.DeleteExpression) {
        return ts.isOptionalChain(ts.skipParentheses(node.expression))
            ? ts.setOriginalNode(visitNonOptionalExpression(node.expression, /*captureThisArg*/ false, /*isDelete*/ true), node)
            : factory.updateDeleteExpression(node, ts.visitNode(node.expression, visitor, ts.isExpression));
    }
}
}
