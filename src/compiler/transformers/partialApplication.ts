/*@internal*/
namespace ts {
    export const transformPartialApplication: TransformerFactory<SourceFile> =
        (context: TransformationContext) => {
            return sourceFile => {
                const visitor = (node: Node): Node => {
                    if (node.transformFlags & TransformFlags.ContainsPartialApplication) {
                        if (isCallExpression(node) && node.arguments.some(arg => arg.kind === SyntaxKind.PartialApplicationElement)) {
                            const capturedFunctionIdentifier = createUniqueName(`_${
                                isIdentifier(node.expression)
                                    ? node.expression.escapedText
                                    : isPropertyAccessExpression(node.expression)
                                        ? node.expression.name.escapedText
                                        : "Wow, what do?"
                            }`);
                            // TODO: Get the signature and use actual argument names of the original function.
                            // Unfortunately we don't seem to have access to them here.
                            // Some tranformers (not default typescript ones) seem to have access to checker. Need more investigation.

                            // Below works for Math.pow for example, but locally defined functions don't seem to work.
                            // Could try to get the checker from a Symbol.
                            const getOrigfuncArgName = (index: number): string => {
                                const valDecl = context.getEmitResolver().getReferencedValueDeclaration(node.expression as any) as Node;
                                return ((isMethodSignature(valDecl) && valDecl.parameters[index]?.name as any).escapedText) ?? `_origFuncArg${index || ""}`;
                            };
                            const isCapturedArg = (arg: typeof args[0]): arg is { arg: Expression, identifier: Identifier } => arg.identifier !== undefined;
                            const args = node.arguments
                                .map((arg, index) => ({
                                    arg,
                                    // index,
                                    identifier: (
                                        isPartialApplicationElement(arg)
                                            ? createIdentifier(getOrigfuncArgName(index))
                                            : !isLiteralKind(arg.kind) && createUniqueName(getOrigfuncArgName(index))
                                        ) || undefined
                                }));
                            args
                                .filter(isCapturedArg)
                                .filter(({ arg }) => !isPartialApplicationElement(arg))
                                .forEach(({ identifier }) => context.hoistVariableDeclaration(identifier));

                            context.hoistVariableDeclaration(capturedFunctionIdentifier);
                            return parenthesizeDefaultExpression(
                                createCommaList([ // For capturing vars
                                    createBinary( // Capture the function
                                        capturedFunctionIdentifier,
                                        SyntaxKind.EqualsToken,
                                        node.expression
                                    ),
                                    ...args
                                        .filter(isCapturedArg)
                                        .filter(({ arg }) => !isPartialApplicationElement(arg))
                                        .map(({ arg, identifier }) => createBinary(
                                            identifier,
                                            SyntaxKind.EqualsToken,
                                            arg
                                        )
                                    ),
                                    createFunctionExpression(
                                        /*modifiers*/ undefined,
                                        /*asteriskToken*/ undefined,
                                        /*name*/ undefined /* Anonymous */,
                                        /*typeParameters*/ undefined,
                                        node.arguments
                                            .map<[Expression, number]>((arg, i) => [arg, i])
                                            .filter(([arg]) => isPartialApplicationElement(arg))
                                            .map(([_arg, i]) => createParameter(
                                                /*decorators*/ undefined,
                                                /*modifiers*/ undefined,
                                                /*dotDotDotToken*/ undefined,
                                                getOrigfuncArgName(i),
                                                /*questionToken*/ undefined,
                                                /*type*/ undefined,
                                                /*initializer*/ undefined
                                            )),
                                        /*type*/ undefined,
                                        createBlock([
                                            createReturn(
                                                createCall(
                                                    capturedFunctionIdentifier,
                                                    /*typeArguments*/ undefined,
                                                    args.map(arg =>
                                                            isCapturedArg(arg)
                                                                ? arg.identifier
                                                                : arg.arg
                                                    )
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