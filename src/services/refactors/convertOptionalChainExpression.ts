/* @internal */
namespace ts.refactor.convertOptionalChainExpression {
    const refactorName = "Convert optional chain or && expression";
    const convertToOptionalChainExpression = "Convert to optional chain expression";
    // @ts-ignore
    const convertToLogicalAndExpression = "Convert to logical && expression"
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, program } = context;
        const info = getInfo(file, startPosition, program);
        if (!info) return emptyArray;
        return [{
            name: refactorName,
            description: convertToOptionalChainExpression,
            actions: [{
                name: refactorName,
                description: convertToOptionalChainExpression
            }]
        }];
    }

    type Info = BinaryExpression;

    // @ts-ignore
    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition, program } = context;
        const info = getInfo(file, startPosition, program);
        if (!info) return undefined;
    }

    function isParentBinaryExpression(node: Node): boolean {
        return isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken;
    }

    function getFullPropertyAccessChain(node: BinaryExpression, checker: TypeChecker): Node | undefined {
        if (isIdentifier(node.left) && (isPropertyAccessExpression(node.right) || isCallExpression(node.right))) {
            return node.right
        } else if (isBinaryExpression(node.left) && (isPropertyAccessExpression(node.right) || isCallExpression(node.right))) {
            const previousOperand = getFullPropertyAccessChain(node.left, checker);
            const previousSymbol = previousOperand ? checker.getSymbolAtLocation(previousOperand) : undefined;
            const currentSymbol = isCallExpression(node.right) && isPropertyAccessExpression(node.right.expression) ?
                checker.getSymbolAtLocation(node.right.expression.expression) : checker.getSymbolAtLocation(node.right.expression);
            if (previousSymbol && previousSymbol === currentSymbol) {
                return node.right;
            }
        }
        return undefined;
    }

    // @ts-ignore
    function getInfo(file: SourceFile, startPosition: number, program: Program): Info | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const parent = findAncestor(node, (node) => { return node.parent && isParentBinaryExpression(node) && !isParentBinaryExpression(node.parent); });
        const checker = program.getTypeChecker();
        const expression = getFullPropertyAccessChain(parent as BinaryExpression, checker);
        if (!expression) {
            return undefined;
        }
    }
}