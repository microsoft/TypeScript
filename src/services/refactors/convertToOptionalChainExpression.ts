/* @internal */
namespace ts.refactor.convertToOptionalChainExpression {
    const refactorName = "Convert to optional chain expression";
    const convertToOptionalChainExpression = "Convert to optional chain expression";

    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, program } = context;
        const convertableExpression = getExpressionToConvert(file, startPosition, program);
        if (!convertableExpression) return emptyArray;
        return [{
            name: refactorName,
            description: convertToOptionalChainExpression,
            actions: [{
                name: refactorName,
                description: convertToOptionalChainExpression
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition, program } = context;
        const checker = program.getTypeChecker();
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, checker, t, getExpressionToConvert(file, startPosition, program), actionName));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }

    type ConvertableExpression = PropertyAccessExpression | CallExpression | undefined;

    // returns the final property access chain in a binary expression e.g. a && a.b && a.b.c -> a.b.c
    function getExpressionToConvert(file: SourceFile, startPosition: number, program: Program): ConvertableExpression {
        const node = getTokenAtPosition(file, startPosition);
        const parent = <BinaryExpression>findAncestor(node, (node) => { return node.parent && isParentBinaryExpression(node) && !isParentBinaryExpression(node.parent); });

        if (!parent || parent.kind !== SyntaxKind.BinaryExpression) return undefined;

        const checker = program.getTypeChecker();
        return getPropertyAccessChain(parent, checker);
    }

    // finds the parent binary expression with && operatorToken
    function isParentBinaryExpression(node: Node): boolean {
        return isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken;
    }

    // Checks the symbol in each operand of a && a.b && a.b.c appears in the next.
    function getPropertyAccessChain(node: BinaryExpression, checker: TypeChecker): PropertyAccessExpression | CallExpression | undefined {
        if (isIdentifier(node.left) && (isPropertyAccessExpression(node.right) || isCallExpression(node.right))) {
            return node.right;
        }
        else if (isBinaryExpression(node.right) && isPropertyAccessExpression(node.right.left)) {
            return node.right.left;
        }
        else if (isBinaryExpression(node.right) && isCallExpression(node.right.left)) {
            return <PropertyAccessExpression>node.right.left.expression;
        }
        else if (isBinaryExpression(node.left) && (isPropertyAccessExpression(node.right) || isCallExpression(node.right))) {
            const previousOperand = getPropertyAccessChain(node.left, checker);
            const previousSymbol = previousOperand ? checker.getSymbolAtLocation(previousOperand) : undefined;
            const currentSymbol = isCallExpression(node.right) && isPropertyAccessExpression(node.right.expression) ?
                checker.getSymbolAtLocation(node.right.expression.expression) : checker.getSymbolAtLocation(node.right.expression);
            if (previousSymbol && previousSymbol === currentSymbol) {
                return node.right;
            }
        }
        return undefined;
    }

    function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: ConvertableExpression, _actionName: string): void {
        if (!toConvert) return;
        if (isCallExpression(toConvert)) {
            doCallExpression(sourceFile, checker, changes, toConvert);
        }
        else if (isPropertyAccessExpression(toConvert)) {
            doPropertyAccessExpression(sourceFile, checker, changes, toConvert);
        }
    }

    function doPropertyAccessExpression(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: PropertyAccessExpression): void {
        let checkNode = <BinaryExpression>findAncestor(toConvert, (node) => { return node.parent && isParentBinaryExpression(node) && !isParentBinaryExpression(node.parent); });
        let startNode: Node = toConvert;
        while (isBinaryExpression(checkNode.left)) {
            if (isPropertyAccessExpression(checkNode.right) && checker.containsMatchingReference(toConvert, checkNode.right)) {
                startNode = checkNode.right;
            }
            checkNode = checkNode.left;
        }
        if (isIdentifier(checkNode.left) && checker.containsMatchingReference(toConvert, checkNode.right)) {
            startNode = checkNode.left;
        }
        changes.replaceNodeRange(sourceFile, startNode, toConvert, convertPropertyAccessToOptionalChain(toConvert));
    }

    function doCallExpression(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, toConvert: CallExpression) {
        if (!toConvert || !isBinaryExpression(toConvert.parent)) return;

        let checkNode = <BinaryExpression>findAncestor(toConvert, (node) => { return node.parent && isParentBinaryExpression(node) && !isParentBinaryExpression(node.parent); });
        let startNode: Node = toConvert;
        while (isBinaryExpression(checkNode.left)) {
            if (isPropertyAccessExpression(checkNode.right) && checker.containsMatchingReference(toConvert, checkNode.right)) {
                startNode = checkNode.right;
            }
            checkNode = checkNode.left;
        }
        if (isIdentifier(checkNode.left) && checker.containsMatchingReference(toConvert.expression, checkNode.right)) {
            startNode = checkNode.left;
        }
        if (isPropertyAccessExpression(toConvert.expression)) {
            changes.replaceNodeRange(sourceFile, startNode, toConvert, createCall(convertPropertyAccessToOptionalChain(toConvert.expression), toConvert.typeArguments, toConvert.arguments));
        }
    }

    function convertPropertyAccessToOptionalChain(toConvert: PropertyAccessExpression): PropertyAccessExpression {
        if (toConvert.expression.kind === SyntaxKind.PropertyAccessExpression) {
            return createPropertyAccessChain(convertPropertyAccessToOptionalChain(<PropertyAccessExpression>toConvert.expression), createToken(SyntaxKind.QuestionDotToken), <Identifier>toConvert.name);
        }
        return createPropertyAccessChain(toConvert.expression, createToken(SyntaxKind.QuestionDotToken), <Identifier>toConvert.name);
    }
}