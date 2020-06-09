/*@internal*/
namespace ts {
    export function transformES2020(context: TransformationContext) {
        const {
            hoistVariableDeclaration,
        } = context;

        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsES2020) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.CallExpression:
                    if (node.flags & NodeFlags.OptionalChain) {
                        const updated = visitOptionalExpression(node as OptionalChain, /*captureThisArg*/ false, /*isDelete*/ false);
                        Debug.assertNotNode(updated, isSyntheticReference);
                        return updated;
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.BinaryExpression:
                    if ((<BinaryExpression>node).operatorToken.kind === SyntaxKind.QuestionQuestionToken) {
                        return transformNullishCoalescingExpression(<BinaryExpression>node);
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.DeleteExpression:
                    return visitDeleteExpression(node as DeleteExpression);
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

        function visitNonOptionalParenthesizedExpression(node: ParenthesizedExpression, captureThisArg: boolean, isDelete: boolean): Expression {
            const expression = visitNonOptionalExpression(node.expression, captureThisArg, isDelete);
            if (isSyntheticReference(expression)) {
                // `(a.b)` -> { expression `((_a = a).b)`, thisArg: `_a` }
                // `(a[b])` -> { expression `((_a = a)[b])`, thisArg: `_a` }
                return createSyntheticReferenceExpression(updateParen(node, expression.expression), expression.thisArg);
            }
            return updateParen(node, expression);
        }

        function visitNonOptionalPropertyOrElementAccessExpression(node: AccessExpression, captureThisArg: boolean, isDelete: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg, isDelete);
            }

            let expression: Expression = visitNode(node.expression, visitor, isExpression);
            Debug.assertNotNode(expression, isSyntheticReference);

            let thisArg: Expression | undefined;
            if (captureThisArg) {
                if (!isSimpleCopiableExpression(expression)) {
                    thisArg = createTempVariable(hoistVariableDeclaration);
                    expression = createAssignment(thisArg, expression);
                    // if (inParameterInitializer) tempVariableInParameter = true;
                }
                else {
                    thisArg = expression;
                }
            }

            expression = node.kind === SyntaxKind.PropertyAccessExpression
                ? updatePropertyAccess(node, expression, visitNode(node.name, visitor, isIdentifier))
                : updateElementAccess(node, expression, visitNode(node.argumentExpression, visitor, isExpression));
            return thisArg ? createSyntheticReferenceExpression(expression, thisArg) : expression;
        }

        function visitNonOptionalCallExpression(node: CallExpression, captureThisArg: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg, /*isDelete*/ false);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitNonOptionalExpression(node: Expression, captureThisArg: boolean, isDelete: boolean): Expression {
            switch (node.kind) {
                case SyntaxKind.ParenthesizedExpression: return visitNonOptionalParenthesizedExpression(node as ParenthesizedExpression, captureThisArg, isDelete);
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression: return visitNonOptionalPropertyOrElementAccessExpression(node as AccessExpression, captureThisArg, isDelete);
                case SyntaxKind.CallExpression: return visitNonOptionalCallExpression(node as CallExpression, captureThisArg);
                default: return visitNode(node, visitor, isExpression);
            }
        }

        function visitOptionalExpression(node: OptionalChain, captureThisArg: boolean, isDelete: boolean): Expression {
            const { expression, chain } = flattenChain(node);
            const left = visitNonOptionalExpression(expression, isCallChain(chain[0]), /*isDelete*/ false);
            const leftThisArg = isSyntheticReference(left) ? left.thisArg : undefined;
            let leftExpression = isSyntheticReference(left) ? left.expression : left;
            let capturedLeft: Expression = leftExpression;
            if (!isSimpleCopiableExpression(leftExpression)) {
                capturedLeft = createTempVariable(hoistVariableDeclaration);
                leftExpression = createAssignment(capturedLeft, leftExpression);
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
                                thisArg = createTempVariable(hoistVariableDeclaration);
                                rightExpression = createAssignment(thisArg, rightExpression);
                                // if (inParameterInitializer) tempVariableInParameter = true;
                            }
                            else {
                                thisArg = rightExpression;
                            }
                        }
                        rightExpression = segment.kind === SyntaxKind.PropertyAccessExpression
                            ? createPropertyAccess(rightExpression, visitNode(segment.name, visitor, isIdentifier))
                            : createElementAccess(rightExpression, visitNode(segment.argumentExpression, visitor, isExpression));
                        break;
                    case SyntaxKind.CallExpression:
                        if (i === 0 && leftThisArg) {
                            rightExpression = createFunctionCall(
                                rightExpression,
                                leftThisArg.kind === SyntaxKind.SuperKeyword ? createThis() : leftThisArg,
                                visitNodes(segment.arguments, visitor, isExpression)
                            );
                        }
                        else {
                            rightExpression = createCall(
                                rightExpression,
                                /*typeArguments*/ undefined,
                                visitNodes(segment.arguments, visitor, isExpression)
                            );
                        }
                        break;
                }
                setOriginalNode(rightExpression, segment);
            }

            const target = isDelete
                ? createConditional(createNotNullCondition(leftExpression, capturedLeft, /*invert*/ true), createTrue(), createDelete(rightExpression))
                : createConditional(createNotNullCondition(leftExpression, capturedLeft, /*invert*/ true), createVoidZero(), rightExpression);
            return thisArg ? createSyntheticReferenceExpression(target, thisArg) : target;
        }

        function createNotNullCondition(left: Expression, right: Expression, invert?: boolean) {
            return createBinary(
                createBinary(
                    left,
                    createToken(invert ? SyntaxKind.EqualsEqualsEqualsToken : SyntaxKind.ExclamationEqualsEqualsToken),
                    createNull()
                ),
                createToken(invert ? SyntaxKind.BarBarToken : SyntaxKind.AmpersandAmpersandToken),
                createBinary(
                    right,
                    createToken(invert ? SyntaxKind.EqualsEqualsEqualsToken : SyntaxKind.ExclamationEqualsEqualsToken),
                    createVoidZero()
                )
            );
        }

        function transformNullishCoalescingExpression(node: BinaryExpression) {
            let left = visitNode(node.left, visitor, isExpression);
            let right = left;
            if (!isSimpleCopiableExpression(left)) {
                right = createTempVariable(hoistVariableDeclaration);
                left = createAssignment(right, left);
                // if (inParameterInitializer) tempVariableInParameter = true;
            }
            return createConditional(
                createNotNullCondition(left, right),
                right,
                visitNode(node.right, visitor, isExpression),
            );
        }

        function visitDeleteExpression(node: DeleteExpression) {
            return isOptionalChain(skipParentheses(node.expression))
                ? setOriginalNode(visitNonOptionalExpression(node.expression, /*captureThisArg*/ false, /*isDelete*/ true), node)
                : updateDelete(node, visitNode(node.expression, visitor, isExpression));
        }
    }
}
