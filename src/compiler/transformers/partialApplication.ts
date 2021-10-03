/*@internal*/
namespace ts {
    export const transformPartialApplication: TransformerFactory<SourceFile> =
        (context: TransformationContext) => {
            return sourceFile => {
                const visitor = (node: Node): Node => {
                    if (node.transformFlags & TransformFlags.ContainsPartialApplication) {
                        if (isCallExpression(node) && node.arguments.some(arg => arg.kind === SyntaxKind.PartialApplicationPlaceholderElement)) {
                            const funcName = isIdentifier(node.expression)
                                ? node.expression.escapedText as string
                                : isPropertyAccessExpression(node.expression)
                                    ? node.expression.name.escapedText as string
                                    : "Wow, what do?";
                            const receiverIdentifier = isPropertyAccessExpression(node.expression) && factory.createUniqueName(`_receiver`) || undefined;
                            if (receiverIdentifier) {
                                context.hoistVariableDeclaration(receiverIdentifier);
                            }

                            const capturedFunctionIdentifier = factory.createUniqueName(`_${funcName}`);
                            context.hoistVariableDeclaration(capturedFunctionIdentifier);

                            // TODO: Get the signature and use actual argument names of the original function.
                            // Unfortunately we don't seem to have access to them here.
                            // Some tranformers (not default typescript ones) seem to have access to checker. Need more investigation.

                            // Below works for Math.pow for example, but locally defined functions don't seem to work.
                            // Could try to get the checker from a Symbol.
                            const getOrigfuncArgName = (index: number): string => {
                                const valDecl = context.getEmitResolver().getReferencedValueDeclaration(node.expression as any) as Node;
                                return (valDecl && (isFunctionLike(valDecl) && valDecl.parameters[index]?.name as any).escapedText) || `_origFuncArg${index || ""}`;
                            };
                            const args = node.arguments
                                .map((arg, index) => ({
                                    arg,
                                    isPartiallyApplied: isPartialApplicationPlaceholderElement(arg),
                                    isLiteral: isLiteralKind(arg.kind),
                                    // isCaptured: !isPartialApplicationElement(arg) || !isLiteralKind(arg.kind),
                                    argName: getOrigfuncArgName(index) === "this"
                                        ? "_this" // FIXME: It's problematic if some other param has the name _this.
                                        : getOrigfuncArgName(index),
                                }))
                                .map<{
                                    arg: Expression,
                                    argType: 'partiallyApplied',
                                    usedName: string,
                                } | {
                                    arg: Expression,
                                    argType: 'captured',
                                    identifier: Identifier,
                                } | {
                                    arg: Expression,
                                    argType: 'literal',
                                }>((arg) => arg.isPartiallyApplied
                                    ? ({
                                        ...arg,
                                        argType: 'partiallyApplied',
                                        usedName: arg.argName
                                    })
                                    : arg.isLiteral
                                        ? ({
                                            ...arg,
                                            argType: 'literal',
                                        })
                                        : ({
                                            ...arg,
                                            argType: 'captured',
                                            identifier: factory.createIdentifier(arg.argName)
                                        }),
                                );
                            const isPartiallyAppliedArg = (arg: typeof args[0]): arg is { arg: Expression, argType: 'partiallyApplied', usedName: string } => arg.argType === 'partiallyApplied';
                            const isCapturedArg = (arg: typeof args[0]): arg is { arg: Expression, argType: 'captured', identifier: Identifier } => arg.argType === 'captured';
                            // const isLiteralArg = (arg: typeof args[0]): arg is { arg: Expression, argType: 'literal' } => arg.argType === 'literal';
                            args
                                .filter(isCapturedArg)
                                .forEach(({ identifier }) => context.hoistVariableDeclaration(identifier));

                            return factory.createParenthesizedExpression(
                                factory.createCommaListExpression([ // For capturing vars
                                    ...((isPropertyAccessExpression(node.expression) && receiverIdentifier &&
                                        [factory.createBinaryExpression( // Capture the receiver
                                            receiverIdentifier,
                                            SyntaxKind.EqualsToken,
                                            visitNode(node.expression.expression, visitor)
                                        )]) || []),
                                    factory.createBinaryExpression( // Capture the function
                                        capturedFunctionIdentifier,
                                        SyntaxKind.EqualsToken,
                                        isPropertyAccessExpression(node.expression) && receiverIdentifier
                                            ? factory.createPropertyAccessExpression(receiverIdentifier, node.expression.name)
                                            : node.expression
                                    ),
                                    ...args // For capturing the non-literal arguments
                                        .filter(isCapturedArg)
                                        .map(({ arg, identifier }) => factory.createBinaryExpression(
                                            identifier,
                                            SyntaxKind.EqualsToken,
                                            visitNode(arg, visitor)
                                        )
                                    ),
                                    factory.createFunctionExpression(
                                        /*modifiers*/ undefined,
                                        /*asteriskToken*/ undefined,
                                        /*name*/ funcName,
                                        /*typeParameters*/ undefined,
                                        args
                                            .filter(isPartiallyAppliedArg)
                                            .map(({ usedName }) => factory.createParameterDeclaration(
                                                /*decorators*/ undefined,
                                                /*modifiers*/ undefined,
                                                /*dotDotDotToken*/ undefined,
                                                usedName,
                                                /*questionToken*/ undefined,
                                                /*type*/ undefined,
                                                /*initializer*/ undefined
                                            )),
                                        /*type*/ undefined,
                                        factory.createBlock([
                                            factory.createReturnStatement(
                                                factory.createCallExpression(
                                                    isPropertyAccessExpression(node.expression) && receiverIdentifier
                                                        ? factory.createPropertyAccessExpression(capturedFunctionIdentifier, 'call')
                                                        : capturedFunctionIdentifier,
                                                    /*typeArguments*/ undefined,
                                                    [
                                                        ...receiverIdentifier && [receiverIdentifier] || [],
                                                        ...args.map(arg =>
                                                        isPartiallyAppliedArg(arg)
                                                            ? factory.createIdentifier(arg.usedName)
                                                            : isCapturedArg(arg)
                                                                ? arg.identifier
                                                                : arg.arg
                                                    )]
                                                )
                                            )
                                        ])
                                    )
                                ])
                            );
                        }
                        return visitEachChild(node, visitor, context);
                    }
                    else {
                        return node;
                    }
                };

                return visitNode(sourceFile, visitor);
            };
        };
}