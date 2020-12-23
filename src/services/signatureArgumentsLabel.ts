/* @internal */
namespace ts.SignatureArgumentsLabel {
    interface ArgumentsInfo {
        name: string
        position: number
    }

    export function provideSignatureArgumentsLabel(context: SignatureArgumentsLabelContext): ArgumentsInfo[] {
        const { file, program } = context;

        const checker = program.getTypeChecker();
        const result: ArgumentsInfo[] = [];

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
            if (!signature || !candidates.length || !expr.arguments || !expr.arguments.length) {
                return;
            }

            for (let i = 0; i < expr.arguments.length; ++i) {
                const name = checker.getParameterNameAtPosition(signature, i);
                result.push({
                    name,
                    position: expr.arguments[i].pos
                });
            }
        }
    }
}