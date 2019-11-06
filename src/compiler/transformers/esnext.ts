/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
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
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }
            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.CallExpression:
                    if (node.flags & NodeFlags.OptionalChain) {
                        const updated = visitOptionalExpression(node as OptionalChain, /*captureThisArg*/ false);
                        Debug.assertNotNode(updated, isSyntheticReference);
                        return updated;
                    }
                    return visitEachChild(node, visitor, context);
                case SyntaxKind.BinaryExpression:
                    if ((<BinaryExpression>node).operatorToken.kind === SyntaxKind.QuestionQuestionToken) {
                        return transformNullishCoalescingExpression(<BinaryExpression>node);
                    }
                    return visitEachChild(node, visitor, context);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function flattenChain(chain: OptionalChain) {
            const links: OptionalChain[] = [chain];
            while (!chain.questionDotToken && !isTaggedTemplateExpression(chain)) {
                chain = cast(chain.expression, isOptionalChain);
                links.unshift(chain);
            }
            return { expression: chain.expression, chain: links };
        }

        function visitNonOptionalParenthesizedExpression(node: ParenthesizedExpression, captureThisArg: boolean): Expression {
            const expression = visitNonOptionalExpression(node.expression, captureThisArg);
            if (isSyntheticReference(expression)) {
                // `(a.b)` -> { expression `((_a = a).b)`, thisArg: `_a` }
                // `(a[b])` -> { expression `((_a = a)[b])`, thisArg: `_a` }
                return createSyntheticReferenceExpression(updateParen(node, expression.expression), expression.thisArg);
            }
            return updateParen(node, expression);
        }

        function visitNonOptionalPropertyAccessExpression(node: PropertyAccessExpression, captureThisArg: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg);
            }

            let expression: Expression = visitNode(node.expression, visitor, isExpression);
            Debug.assertNotNode(expression, isSyntheticReference);

            let thisArg: Expression | undefined;
            if (captureThisArg) {
                ({expression, variable: thisArg} = maybeCaptureInTempVariable(expression));
            }

            expression = updatePropertyAccess(node, expression, visitNode(node.name, visitor, isIdentifier));
            return thisArg ? createSyntheticReferenceExpression(expression, thisArg) : expression;
        }

        function visitNonOptionalElementAccessExpression(node: ElementAccessExpression, captureThisArg: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg);
            }

            let expression: Expression = visitNode(node.expression, visitor, isExpression);
            Debug.assertNotNode(expression, isSyntheticReference);

            let thisArg: Expression | undefined;
            if (captureThisArg) {
                ({expression, variable: thisArg} = maybeCaptureInTempVariable(expression));
            }

            expression = updateElementAccess(node, expression, visitNode(node.argumentExpression, visitor, isExpression));
            return thisArg ? createSyntheticReferenceExpression(expression, thisArg) : expression;
        }

        function visitNonOptionalCallExpression(node: CallExpression, captureThisArg: boolean): Expression {
            if (isOptionalChain(node)) {
                // If `node` is an optional chain, then it is the outermost chain of an optional expression.
                return visitOptionalExpression(node, captureThisArg);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitNonOptionalExpression(node: Expression, captureThisArg: boolean): Expression {
            switch (node.kind) {
                case SyntaxKind.ParenthesizedExpression: return visitNonOptionalParenthesizedExpression(node as ParenthesizedExpression, captureThisArg);
                case SyntaxKind.PropertyAccessExpression: return visitNonOptionalPropertyAccessExpression(node as PropertyAccessExpression, captureThisArg);
                case SyntaxKind.ElementAccessExpression: return visitNonOptionalElementAccessExpression(node as ElementAccessExpression, captureThisArg);
                case SyntaxKind.CallExpression: return visitNonOptionalCallExpression(node as CallExpression, captureThisArg);
                default: return visitNode(node, visitor, isExpression);
            }
        }

        function visitOptionalExpression(node: OptionalChain, captureThisArg: boolean): Expression {
            const { expression, chain } = flattenChain(node);
            const left = visitNonOptionalExpression(expression, isCallChain(chain[0]));
            const leftThisArg = isSyntheticReference(left) ? left.thisArg : undefined;
            const leftExpression = isSyntheticReference(left) ? left.expression : left;
            const capturedLeft = maybeCaptureInTempVariable(leftExpression);
            let rightExpression: Expression = capturedLeft.variable;
            let thisArg: Expression | undefined;
            for (let i = 0; i < chain.length; i++) {
                const segment = chain[i];
                switch (segment.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                        if (i === chain.length - 1 && captureThisArg) {
                            ({expression: rightExpression, variable: thisArg} = maybeCaptureInTempVariable(rightExpression));
                        }
                        rightExpression = createPropertyAccess(
                            rightExpression,
                            visitNode(segment.name, visitor, isIdentifier)
                        );
                        break;
                    case SyntaxKind.ElementAccessExpression:
                        if (i === chain.length - 1 && captureThisArg) {
                            ({expression: rightExpression, variable: thisArg} = maybeCaptureInTempVariable(rightExpression));
                        }
                        rightExpression = createElementAccess(
                            rightExpression,
                            visitNode(segment.argumentExpression, visitor, isExpression)
                        );
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

            const target = createConditional(
                createNotNullCondition(capturedLeft),
                rightExpression,
                createVoidZero(),
            );
            return thisArg ? createSyntheticReferenceExpression(target, thisArg) : target;
        }

        function createNotNullCondition(expression: CapturedExpression) {
            return createBinary(
                createBinary(
                    expression.expression,
                    createToken(SyntaxKind.ExclamationEqualsEqualsToken),
                    createNull()
                ),
                createToken(SyntaxKind.AmpersandAmpersandToken),
                createBinary(
                    expression.variable,
                    createToken(SyntaxKind.ExclamationEqualsEqualsToken),
                    createVoidZero()
                )
            );
        }

        function transformNullishCoalescingExpression(node: BinaryExpression) {
            const captured = maybeCaptureInTempVariable(visitNode(node.left, visitor, isExpression));
            return createConditional(
                createNotNullCondition(captured),
                captured.variable,
                visitNode(node.right, visitor, isExpression),
            );
        }

        interface CapturedExpression {
            expression: Expression;
            variable: Expression;
        }

        function maybeCaptureInTempVariable(expression: Expression): CapturedExpression {
            // don't capture identifiers and `this` in a temporary variable
            // `super` cannot be captured as it's no real variable
            if (isIdentifier(expression) || expression.kind === SyntaxKind.ThisKeyword || expression.kind === SyntaxKind.SuperKeyword) {
                return {
                    expression,
                    variable: expression,
                };
            }
            const variable = createTempVariable(hoistVariableDeclaration);
            expression = createAssignment(variable, expression);
            return {
                expression,
                variable,
            };
        }
    }
}
