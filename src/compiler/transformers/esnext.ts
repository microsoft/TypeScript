/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        let currentClassHasInstanceTracker: Identifier | undefined;
        return chainBundle(context, transformSourceFile);

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
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    return visitClassLike(
                        node as ClassDeclaration | ClassExpression
                    );
                case SyntaxKind.CallExpression:
                    return visitCallExpression(node as CallExpression);
                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitClassLike(node: ClassDeclaration | ClassExpression) {
            const oldClassHasInstanceTracker = currentClassHasInstanceTracker;
            currentClassHasInstanceTracker = undefined;
            // visit children first so currentClassHasInstanceTracker will be set on demand.
            const updated = visitEachChild(node, visitor, context);
            if (!currentClassHasInstanceTracker) {
                currentClassHasInstanceTracker = oldClassHasInstanceTracker;
                return updated;
            }

            // var tracker; tracker = new WeakSet();
            context.hoistVariableDeclaration(currentClassHasInstanceTracker);
            context.addInitializationStatement(
                factory.createExpressionStatement(
                    factory.createAssignment(
                        currentClassHasInstanceTracker,
                        factory.createNewExpression(
                            factory.createIdentifier("WeakSet"),
                            /** generics */ undefined,
                            /** args */ undefined
                        )
                    )
                )
            );

            const originalConstructor = getFirstConstructorWithBody(node);
            const updatedConstructor =
                getConstructorWithClassHasInstanceTracker(
                    originalConstructor,
                    isClassExtended(node),
                    currentClassHasInstanceTracker
                );
            const updatedMembers = originalConstructor
                ? updated.members.map((element) =>
                      element === originalConstructor
                          ? updatedConstructor
                          : element
                  )
                : [updatedConstructor, ...updated.members];

            currentClassHasInstanceTracker = oldClassHasInstanceTracker;
            if (isClassDeclaration(updated)) {
                return factory.updateClassDeclaration(
                    updated,
                    updated.modifiers,
                    updated.name,
                    updated.typeParameters,
                    updated.heritageClauses,
                    updatedMembers
                );
            }
            else {
                return factory.updateClassExpression(
                    updated,
                    updated.modifiers,
                    updated.name,
                    updated.typeParameters,
                    updated.heritageClauses,
                    updatedMembers
                );
            }
        }

        function visitCallExpression(node: CallExpression) {
            const lhs = node.expression as MetaProperty;
            if (
                lhs.kind !== SyntaxKind.MetaProperty ||
                lhs.keywordToken !== SyntaxKind.ClassKeyword
            ) {
                return visitEachChild(node, visitor, context);
            }
            if (!currentClassHasInstanceTracker) {
                currentClassHasInstanceTracker = factory.createTempVariable(
                    noop,
                    /** reserveNested */ true
                );
            }
            // tracker.has()
            const trackerDotHas = factory.createPropertyAccessExpression(
                currentClassHasInstanceTracker,
                "has"
            );
            const arg0 = visitEachChild(
                node.arguments[0] || factory.createNull(),
                visitor,
                context
            );
            return factory.createCallExpression(
                trackerDotHas,
                /** generics */ undefined,
                [arg0]
            );
        }
    }
    function isClassExtended(node: ClassLikeDeclaration) {
        return some(
            node.heritageClauses,
            (node) => node.token === SyntaxKind.ExtendsKeyword
        );
    }
    type ClassConstructor = ConstructorDeclaration & { body: Block };

    function getConstructorWithClassHasInstanceTracker(
        oldConstructor: ClassConstructor | undefined,
        isExtended: boolean,
        tracker: Identifier
    ) {
        let oldBody = oldConstructor?.body;
        if (!oldBody) {
            const defaultBody: Statement[] = [];
            if (isExtended) {
                defaultBody.push(
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            factory.createSuper(),
                            /** generics */ undefined,
                            [
                                factory.createSpreadElement(
                                    factory.createIdentifier("arguments")
                                ),
                            ]
                        )
                    )
                );
            }
            oldBody = factory.createBlock(defaultBody);
        }
        const hasErrorWhenConstructingTracker =
            factory.createTempVariable(noop);
        const catchErrVariable = factory.createTempVariable(noop);
        const newBody = factory.createBlock([
            // var _a
            factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList([
                    factory.createVariableDeclaration(
                        hasErrorWhenConstructingTracker
                    ),
                ])
            ),
            // try { original_statements } catch(_err) { _a = true; throw err; } finally { if (!_a) tracker.add(this); }
            factory.createTryStatement(
                // original_statements
                oldBody,
                // catch(_err) { _a = true; throw err; }
                factory.createCatchClause(
                    catchErrVariable,
                    factory.createBlock([
                        factory.createExpressionStatement(
                            factory.createAssignment(
                                hasErrorWhenConstructingTracker,
                                factory.createTrue()
                            )
                        ),
                        factory.createThrowStatement(catchErrVariable),
                    ])
                ),
                // finally { if (!_a) tracker.add(this); }
                factory.createBlock([
                    factory.createIfStatement(
                        factory.createPrefixUnaryExpression(
                            SyntaxKind.ExclamationToken,
                            hasErrorWhenConstructingTracker
                        ),
                        factory.createExpressionStatement(
                            factory.createCallExpression(
                                factory.createPropertyAccessExpression(
                                    tracker,
                                    "add"
                                ),
                                /** generics */ undefined,
                                [factory.createThis()]
                            )
                        )
                    ),
                ])
            ),
        ]);
        return factory.createConstructorDeclaration(
            oldConstructor?.modifiers,
            oldConstructor?.parameters || [],
            newBody
        );
    }
}
