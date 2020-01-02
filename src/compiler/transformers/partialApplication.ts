/*@internal*/
namespace ts {
    export const transformPartialApplication: ts.TransformerFactory<ts.SourceFile> =
        (context: ts.TransformationContext) => {
            const getPropertyAccessString = (node: PropertyAccessExpression): string =>
                `${ts.isPropertyAccessExpression(node.expression)
                    ? getPropertyAccessString(node.expression)
                    : node.name.escapedText
                }.${node.name.escapedText}`;
            return sourceFile => {
                const visitor = (node: ts.Node): ts.Node => {
                    if (ts.isCallExpression(node)) {
                        if (node.arguments.some(arg => arg.kind === SyntaxKind.PartialApplicationElement)) {
                            const capturedFunctionIdentifier = ts.createIdentifier(`_${
                                ts.isIdentifier(node.expression)
                                    ? node.expression.escapedText
                                    : ts.isPropertyAccessExpression(node.expression)
                                        ? node.expression.name.escapedText
                                        : 'Wow, what do?'
                            }`);
                            // TODO: Get the signature and use actual argument names of the original function.
                            // Unfortunately we don't seem to have access to them here.
                            // Some tranformers (not default typescript ones) seem to have access to checker. Need more investigation.

                            // Below works for Math.pow for example, but locally defined functions don't seem to work.
                            // Could try to get the checker from a Symbol.
                            const getOrigfuncArgName = (index: number): string => {
                                const valDecl = context.getEmitResolver().getReferencedValueDeclaration(node.expression as any) as Node;
                                return ((ts.isMethodSignature(valDecl) && valDecl.parameters[index]?.name as any).escapedText) ?? `_origFuncArg${index || ''}`;
                            }
                            const isCapturedArg = (arg: typeof args[0]): arg is { arg: Expression, identifier: Identifier } => arg.identifier !== undefined;
                            const args = node.arguments
                                .map((arg, index) => ({
                                    arg,
                                    // index,
                                    identifier: (
                                        isPartialApplicationElement(arg)
                                            ? createIdentifier(getOrigfuncArgName(index))
                                            : !ts.isLiteralKind(arg.kind) && createIdentifier(getOrigfuncArgName(index))
                                        ) || undefined
                                }));
                            args
                                .filter(isCapturedArg)
                                .filter(({ arg }) => !isPartialApplicationElement(arg))
                                .forEach(({ identifier }) => context.hoistVariableDeclaration(identifier));

                            context.hoistVariableDeclaration(capturedFunctionIdentifier);
                            return ts.parenthesizeDefaultExpression(
                                createCommaList([ // For capturing vars
                                    ts.createBinary( // Capture the function
                                        capturedFunctionIdentifier,
                                        SyntaxKind.EqualsToken,
                                        node.expression
                                    ),
                                    ...args
                                        .filter(isCapturedArg)
                                        .filter(({ arg }) => !isPartialApplicationElement(arg))
                                        .map(({ arg, identifier }) => ts.createBinary(
                                            identifier,
                                            SyntaxKind.EqualsToken,
                                            arg
                                        )
                                    ),
                                    ts.createFunctionExpression(
                                        undefined,
                                        undefined,
                                        undefined, // Anonymous
                                        undefined,
                                        node.arguments
                                            .map<[Expression, number]>((arg, i) => [arg, i])
                                            .filter(([arg]) => isPartialApplicationElement(arg))
                                            .map(([_arg, i]) => createParameter(undefined, undefined, undefined, getOrigfuncArgName(i), undefined, undefined, undefined)),
                                        undefined,
                                        ts.createBlock([
                                            ts.createReturn(
                                                ts.createCall(
                                                    capturedFunctionIdentifier,
                                                    undefined,
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
                    }
                    return ts.visitEachChild(node, visitor, context);
                };

                return ts.visitNode(sourceFile, visitor);
            };
        };
}