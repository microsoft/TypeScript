/* @internal */
namespace ts.InlineHints {
    interface HintInfo {
        text: string;
        position: number;
        whitespaceBefore?: boolean;
        whitespaceAfter?: boolean;
    }

    export function provideInlineHints(context: InlineHintsContext): HintInfo[] {
        const { file, program, span, cancellationToken } = context;

        const checker = program.getTypeChecker();
        const result: HintInfo[] = [];

        visitor(file);
        return result;
        function visitor(node: Node): true | undefined | void {
            if (!node || node.getFullWidth() === 0) {
                return;
            }

            switch(node.kind) {
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.ArrowFunction:
                    cancellationToken.throwIfCancellationRequested();

                    if (!textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                        return;
                    }
            }

            if (isTypeNode(node)) {
                return;
            }

            if (isCallExpression(node) || isNewExpression(node)) {
                visitCallOrNewExpression(node);
            }
            else if (isArrowFunction(node) || isFunctionExpression(node)) {
                visitFunctionExpressionLike(node);
            }
            return forEachChild(node, visitor);
        }

        function visitCallOrNewExpression(expr: CallExpression | NewExpression) {
            if (!expr.arguments || !expr.arguments.length) {
                return;
            }

            const candidates: Signature[] = [];
            const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
            if (!signature || !candidates.length) {
                return;
            }

            for (let i = 0; i < expr.arguments.length; ++i) {
                const parameterName = checker.getParameterIdentifierNameAtPosition(signature, i);
                if (parameterName) {
                    const arg = expr.arguments[i];
                    const argumentName = isIdentifier(arg) ? arg.text : undefined;
                    if (!argumentName || argumentName !== parameterName) {
                        result.push({
                            text: `${unescapeLeadingUnderscores(parameterName)}:`,
                            position: expr.arguments[i].getStart(),
                            whitespaceAfter: true,
                        });
                    }
                }
            }
        }

        function visitFunctionExpressionLike(expr: ArrowFunction | FunctionExpression) {
            if (!expr.parameters.length || expr.parameters.every(param => param.type)) {
                return;
            }

            const contextualType = checker.getContextualType(expr);
            if (!contextualType) {
                return;
            }

            const signatures = checker.getSignaturesOfType(contextualType, SignatureKind.Call);
            const signature = firstOrUndefined(signatures);
            if (!signature) {
                return;
            }

            for (let i = 0; i < expr.parameters.length && i < signature.parameters.length; ++i) {
                const param = expr.parameters[i];
                if (param.type) {
                    continue;
                }

                const signatureParam = signature.parameters[i];
                const signatureParamType = checker.getTypeOfSymbolAtLocation(signatureParam, signatureParam.valueDeclaration);

                const valueDeclaration = signatureParam.valueDeclaration;
                if (!valueDeclaration || !isParameter(valueDeclaration) || !valueDeclaration.type) {
                    continue;
                }

                const typeDisplayString = displayPartsToString(typeToDisplayParts(checker, signatureParamType));
                if (!typeDisplayString) {
                    continue;
                }

                result.push({
                    text: `:${typeDisplayString}`,
                    position: param.end,
                    whitespaceBefore: true,
                });
            }
        }
    }
}