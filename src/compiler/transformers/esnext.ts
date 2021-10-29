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

            // tracker.add(this);
            const track = factory.createExpressionStatement(
                factory.createCallExpression(
                    factory.createPropertyAccessExpression(
                        currentClassHasInstanceTracker,
                        "add"
                    ),
                    /** generics */ undefined,
                    [factory.createThis()]
                )
            );

            const originalConstructor = getFirstConstructorWithBody(node);
            let updatedConstructor: ConstructorDeclaration =
                originalConstructor ||
                createDefaultConstructor(isClassExtended(node), [track]);
            if (originalConstructor) {
                const body = updatedConstructor.body!;
                const updatedBody = isClassExtended(node)
                    ? // extended class, add track after super()
                      visitEachChild(
                          body,
                          function visitor(node): VisitResult<Node> {
                              if (
                                  node.kind === SyntaxKind.ClassDeclaration ||
                                  node.kind === SyntaxKind.ClassExpression ||
                                  node.kind ===
                                      SyntaxKind.FunctionDeclaration ||
                                  node.kind === SyntaxKind.FunctionExpression
                              ) {
                                  return node;
                              }
                              if (
                                  isCallExpression(node) &&
                                  node.expression.kind ===
                                      SyntaxKind.SuperKeyword
                              ) {
                                  return factory.createCommaListExpression([
                                      node,
                                      track.expression,
                                      factory.createThis(),
                                  ]);
                              }
                              return visitEachChild(node, visitor, context);
                          },
                          context
                      )
                    : // plain class, add track at the top
                      factory.updateBlock(body, [track, ...body.statements]);
                updatedConstructor = factory.updateConstructorDeclaration(
                    updatedConstructor,
                    updatedConstructor.modifiers,
                    updatedConstructor.parameters,
                    updatedBody
                );
            }

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
            const trackerDotHas = factory.createPropertyAccessChain(
                currentClassHasInstanceTracker,
                /** ?. */ undefined,
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
    function createDefaultConstructor(
        isExtended: boolean,
        additionalStatements: Statement[]
    ) {
        const params: ParameterDeclaration[] = [];
        const statements: Statement[] = [];
        if (isExtended) {
            const rest = factory.createTempVariable(noop);
            const param = factory.createParameterDeclaration(
                /** mod */ undefined,
                factory.createToken(SyntaxKind.DotDotDotToken),
                rest
            );
            params.push(param);
            statements.push(
                factory.createExpressionStatement(
                    factory.createCallExpression(
                        factory.createSuper(),
                        /** generics */ undefined,
                        [factory.createSpreadElement(rest)]
                    )
                )
            );
        }
        statements.push(...additionalStatements);
        return factory.createConstructorDeclaration(
            /** modifiers */ undefined,
            params,
            factory.createBlock(statements)
        );
    }
}
