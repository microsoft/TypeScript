/* @internal */
namespace ts.InlineHints {
    interface HintInfo {
        text: string
        position: number
    }

    export function provideInlineHints(context: InlineHintsContext): HintInfo[] {
        const { file, program } = context;

        const checker = program.getTypeChecker();
        const result: HintInfo[] = [];

        visitor(file);

        return result;

        function visitor(node: Node): true | undefined | void {
            if (isTypeNode(node)) {
                return;
            }

            if (isCallExpression(node) || isNewExpression(node)) {
                visitCallOrNewExpression(node);
            }
            return forEachChild(node, visitor);
        }

        function visitCallOrNewExpression(expr: CallExpression | NewExpression) {
            const candidates: Signature[] = [];
            const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
            if (!signature || !candidates.length) {
                return;
            }

            getCallArgumentsHints(expr, signature);
        }

        function getCallArgumentsHints(expr: CallExpression | NewExpression, signature: Signature) {
            if (!expr.arguments || !expr.arguments.length) {
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
                            position: expr.arguments[i].getStart()
                        });
                    }
                }
            }
        }
    }
}