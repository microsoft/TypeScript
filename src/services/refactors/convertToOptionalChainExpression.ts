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

    type ConvertableExpression = BinaryExpression | PropertyAccessExpression | CallExpression | undefined;

    // @ts-ignore
    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition, program } = context;
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, t, getExpressionToConvert(file, startPosition, program)));
        return { edits, renameFilename: undefined, renameLocation: undefined }
    }

    function isParentBinaryExpression(node: Node): boolean {
        // stop at the LHS binary expression in cases like a && a.b && a.b.c == 1
        return isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken;
    }

    function getPropertyAccessChain(node: BinaryExpression, checker: TypeChecker): PropertyAccessExpression | CallExpression | undefined {
        if (isIdentifier(node.left) && (isPropertyAccessExpression(node.right) || isCallExpression(node.right))) {
            return node.right;
        } else if (isBinaryExpression(node.right) && isPropertyAccessExpression(node.right.left)) {
            return node.right.left;
        } else if (isBinaryExpression(node.right) && isCallExpression(node.right.left)) {
            return <PropertyAccessExpression>node.right.left.expression;
        } else if (isBinaryExpression(node.left) && (isPropertyAccessExpression(node.right) || isCallExpression(node.right))) {
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

    function doChange(sourceFile: SourceFile, changes: textChanges.ChangeTracker, toConvert: ConvertableExpression): void {
        if (toConvert?.kind === SyntaxKind.BinaryExpression) {
            if (isBinaryExpression(toConvert.right)) {
                const rightHandSideExpression = toConvert.right.left;
                // in the case of (a && a.b && a.b.c == 1), a.b.c is in the RHS binary expression.
                if (isPropertyAccessExpression(rightHandSideExpression)) {
                    changes.replaceNode(sourceFile, toConvert, createBinary(convertPropertyAccessToOptionalChain(rightHandSideExpression), toConvert.right.operatorToken, toConvert.right.right));
                } else if (isCallExpression(rightHandSideExpression) && isPropertyAccessExpression(rightHandSideExpression.expression)) {
                    changes.replaceNode(sourceFile, toConvert, createBinary(createCall(convertPropertyAccessToOptionalChain(rightHandSideExpression.expression), rightHandSideExpression.typeArguments, rightHandSideExpression.arguments), toConvert.right.operatorToken, toConvert.right.right));
                }
            } else if (isPropertyAccessExpression(toConvert.right)) {
                changes.replaceNode(sourceFile, toConvert, convertPropertyAccessToOptionalChain(toConvert.right));
            } else if (isCallExpression(toConvert.right) && isPropertyAccessExpression(toConvert.right.expression)) {
                changes.replaceNode(sourceFile, toConvert, createCall(convertPropertyAccessToOptionalChain(toConvert.right.expression), toConvert.right.typeArguments, toConvert.right.arguments));
            }
        }
    }

    function convertPropertyAccessToOptionalChain(toConvert: PropertyAccessExpression): PropertyAccessExpression {
        if (toConvert.expression.kind === SyntaxKind.PropertyAccessExpression) {
            return createPropertyAccessChain(convertPropertyAccessToOptionalChain(<PropertyAccessExpression>toConvert.expression), createToken(SyntaxKind.QuestionDotToken), <Identifier>toConvert.name);
        }
        return createPropertyAccessChain(toConvert.expression, createToken(SyntaxKind.QuestionDotToken), <Identifier>toConvert.name);
    }

    // returns the final property access chain in a binary expression e.g. a && a.b && a.b.c -> a.b.c
    function getExpressionToConvert(file: SourceFile, startPosition: number, program: Program): BinaryExpression | undefined {
        const node = getTokenAtPosition(file, startPosition);
        const parent = <BinaryExpression>findAncestor(node, (node) => { return node.parent && isParentBinaryExpression(node) && !isParentBinaryExpression(node.parent); });

        if (!parent || parent.kind !== SyntaxKind.BinaryExpression) return undefined;

        const checker = program.getTypeChecker();
        return getPropertyAccessChain(parent, checker) ? parent : undefined;
    }
}