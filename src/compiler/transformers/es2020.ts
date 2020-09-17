/*@internal*/
namespace ts {
    export function transformES2020(context: TransformationContext) {
        const {
            factory,
            hoistVariableDeclaration,
        } = context;

        return chainBundle(context, transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitorExpressionStatement(node: Node): VisitResult<Node> {
          return visitorWorker(node, /*isExpressionStatement*/ true);
        }

        function visitor(node: Node): VisitResult<Node> {
          return visitorWorker(node, /*isExpressionStatement*/ false);
        }

        function visitorWorker(node: Node, isExpressionStatement: boolean): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsES2020) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.ExpressionStatement:
                    return visitEachChild(node, visitorExpressionStatement, context);
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.CallExpression:
                  return visitCallExpression(node, isExpressionStatement);
                case SyntaxKind.BinaryExpression:
                    if ((<BinaryExpression>node).operatorToken.kind === SyntaxKind.QuestionQuestionToken) {
                        return transformNullishCoalescingExpression(<BinaryExpression>node);
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.DeleteExpression:
                    return visitDeleteExpression(node as DeleteExpression, isExpressionStatement);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function flattenChain(chain: OptionalChain) {
            Debug.assertNotNode(chain, isNonNullChain);
            const links: OptionalChain[] = [chain];
            while (!chain.questionDotToken && !isTaggedTemplateExpression(chain)) {
                chain = cast(skipPartiallyEmittedExpressions(chain.expression), isOptionalChain);
                Debug.assertNotNode(chain, isNonNullChain);
                links.unshift(chain);
            }
            return { expression: chain.expression, chain: links };
        }

        function visitCallExpression(node: Node, isExpressionStatement: boolean): VisitResult<Node> {
          if (node.flags & NodeFlags.OptionalChain) {
              const updated = visitOptionalExpression(node as OptionalChain, /*captureThisArg*/ false, /*isDelete*/ false, /*isExpressionStatement*/ isExpressionStatement);
              Debug.assertNotNode(updated, isSyntheticReference);
              return updated;
          }
          return visitEachChild(node, visitor, context);
        }

        function visitNonOptionalParenthesizedExpression(node: ParenthesizedExpression, captureThisArg: boolean, isDelete: boolean, isExpressionStatement: boolean): Expression {
            const expression = visitNonOptionalExpression(node.expression, captureThisArg, isDelete, isExpressionStatement);
            if (isSyntheticReference(expression)) {
                // `(a.b)` -> { expression `((_a = a).b)`, thisArg: `_a` }
                // `(a[b])` -> { expression `((_a = a)[b])`, thisArg: `_a` }
                return factory.createSyntheticReferenceExpression(factory.updateParenthesizedExpression(node, expression.expression), expression.thisArg);
            }
            return factory.updateParenthesizedExpression(node, expression);
        }

        function visitNonOptionalPropertyOrElementAccessExpression(node: AccessExpression, captureThisArg: boolean, isDelete: boolean, isExpressionStatement: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg, isDelete, /*isExpressionStatement*/ isExpressionStatement);
            }

            let expression: Expression = visitNode(node.expression, visitor, isExpression);
            Debug.assertNotNode(expression, isSyntheticReference);

            let thisArg: Expression | undefined;
            if (captureThisArg) {
                if (!isSimpleCopiableExpression(expression)) {
                    thisArg = factory.createTempVariable(hoistVariableDeclaration);
                    expression = factory.createAssignment(thisArg, expression);
                    // if (inParameterInitializer) tempVariableInParameter = true;
                }
                else {
                    thisArg = expression;
                }
            }

            expression = node.kind === SyntaxKind.PropertyAccessExpression
                ? factory.updatePropertyAccessExpression(node, expression, visitNode(node.name, visitor, isIdentifier))
                : factory.updateElementAccessExpression(node, expression, visitNode(node.argumentExpression, visitor, isExpression));
            return thisArg ? factory.createSyntheticReferenceExpression(expression, thisArg) : expression;
        }

        function visitNonOptionalCallExpression(node: CallExpression, captureThisArg: boolean, isExpressionStatement: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg, /*isDelete*/ false, /*isExpressionStatement*/ isExpressionStatement);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitNonOptionalExpression(node: Expression, captureThisArg: boolean, isDelete: boolean, isExpressionStatement: boolean): Expression {
            switch (node.kind) {
                case SyntaxKind.ParenthesizedExpression: return visitNonOptionalParenthesizedExpression(node as ParenthesizedExpression, captureThisArg, isDelete, isExpressionStatement);
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression: return visitNonOptionalPropertyOrElementAccessExpression(node as AccessExpression, captureThisArg, isDelete, isExpressionStatement);
                case SyntaxKind.CallExpression: return visitNonOptionalCallExpression(node as CallExpression, captureThisArg, isExpressionStatement);
                default: return visitNode(node, visitor, isExpression);
            }
        }

        function visitOptionalExpression(node: OptionalChain, captureThisArg: boolean, isDelete: boolean, isExpressionStatement: boolean): Expression {
            const { expression, chain } = flattenChain(node);
            const left = visitNonOptionalExpression(expression, isCallChain(chain[0]), /*isDelete*/ false, isExpressionStatement);
            const leftThisArg = isSyntheticReference(left) ? left.thisArg : undefined;
            let leftExpression = isSyntheticReference(left) ? left.expression : left;
            let capturedLeft: Expression = leftExpression;
            if (!isSimpleCopiableExpression(leftExpression)) {
                capturedLeft = factory.createTempVariable(hoistVariableDeclaration);
                leftExpression = factory.createAssignment(capturedLeft, leftExpression);
                // if (inParameterInitializer) tempVariableInParameter = true;
            }
            let rightExpression = capturedLeft;
            let thisArg: Expression | undefined;
            for (let i = 0; i < chain.length; i++) {
                const segment = chain[i];
                switch (segment.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.ElementAccessExpression:
                        if (i === chain.length - 1 && captureThisArg) {
                            if (!isSimpleCopiableExpression(rightExpression)) {
                                thisArg = factory.createTempVariable(hoistVariableDeclaration);
                                rightExpression = factory.createAssignment(thisArg, rightExpression);
                                // if (inParameterInitializer) tempVariableInParameter = true;
                            }
                            else {
                                thisArg = rightExpression;
                            }
                        }
                        rightExpression = segment.kind === SyntaxKind.PropertyAccessExpression
                            ? factory.createPropertyAccessExpression(rightExpression, visitNode(segment.name, visitor, isIdentifier))
                            : factory.createElementAccessExpression(rightExpression, visitNode(segment.argumentExpression, visitor, isExpression));
                        break;
                    case SyntaxKind.CallExpression:
                        if (i === 0 && leftThisArg) {
                            rightExpression = factory.createFunctionCallCall(
                                rightExpression,
                                leftThisArg.kind === SyntaxKind.SuperKeyword ? factory.createThis() : leftThisArg,
                                visitNodes(segment.arguments, visitor, isExpression)
                            );
                        }
                        else {
                            rightExpression = factory.createCallExpression(
                                rightExpression,
                                /*typeArguments*/ undefined,
                                visitNodes(segment.arguments, visitor, isExpression)
                            );
                        }
                        break;
                }
                setOriginalNode(rightExpression, segment);
            }

            const notNull = createNotNullCondition(leftExpression, capturedLeft, /*invert*/ !isExpressionStatement);
            let target;
            if (hasUnusedOrFalsyResultisExpressionStatement) {
                target = isDelete
                    ? factory.createLogicalAnd(notNull, factory.createDeleteExpression(rightExpression))
                    : factory.createLogicalAnd(notNull, rightExpression);
            }
            else {
                target = isDelete
                    ? factory.createConditionalExpression(notNull, /*questionToken*/ undefined, factory.createTrue(), /*colonToken*/ undefined, factory.createDeleteExpression(rightExpression))
                    : factory.createConditionalExpression(notNull, /*questionToken*/ undefined, factory.createVoidZero(), /*colontoken*/ undefined, rightExpression);
            }

            return thisArg ? factory.createSyntheticReferenceExpression(target, thisArg) : target;
        }

        function createNotNullCondition(left: Expression, right: Expression, invert?: boolean) {
            return factory.createBinaryExpression(
                factory.createBinaryExpression(
                    left,
                    factory.createToken(invert ? SyntaxKind.EqualsEqualsEqualsToken : SyntaxKind.ExclamationEqualsEqualsToken),
                    factory.createNull()
                ),
                factory.createToken(invert ? SyntaxKind.BarBarToken : SyntaxKind.AmpersandAmpersandToken),
                factory.createBinaryExpression(
                    right,
                    factory.createToken(invert ? SyntaxKind.EqualsEqualsEqualsToken : SyntaxKind.ExclamationEqualsEqualsToken),
                    factory.createVoidZero()
                )
            );
        }

        function transformNullishCoalescingExpression(node: BinaryExpression) {
            let left = visitNode(node.left, visitor, isExpression);
            let right = left;
            if (!isSimpleCopiableExpression(left)) {
                right = factory.createTempVariable(hoistVariableDeclaration);
                left = factory.createAssignment(right, left);
                // if (inParameterInitializer) tempVariableInParameter = true;
            }
            return factory.createConditionalExpression(
                createNotNullCondition(left, right),
                /*questionToken*/ undefined,
                right,
                /*colonToken*/ undefined,
                visitNode(node.right, visitor, isExpression),
            );
        }

        function visitDeleteExpression(node: DeleteExpression, isExpressionStatement: boolean) {
            return isOptionalChain(skipParentheses(node.expression))
                ? setOriginalNode(visitNonOptionalExpression(node.expression, /*captureThisArg*/ false, /*isDelete*/ true, isExpressionStatement), node)
                : factory.updateDeleteExpression(node, visitNode(node.expression, visitor, isExpression));
        }
    }
}
