/* @internal */
namespace ts.refactor.convertToOptionalChainExpression {
    const refactorName = "Convert to optional chain expression";
    const convertToOptionalChainExpression = "Convert && chain to optional chain expression";

    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const info = getInfo(context, context.triggerReason === "invoked");
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

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const info = getInfo(context);
        if (!info) return undefined;
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, t, info, actionName));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }

    interface Info {
        fullPropertyAccess: PropertyAccessExpression,
        firstOccurence: Node,
        containingExpression: BinaryExpression
    }

    function getInfo(context: RefactorContext, considerEmptySpans = true): Info | undefined {
        const { file, program } = context;
        const span = getRefactorContextSpan(context);

        if (span.length === 0 && !considerEmptySpans) return undefined;
        const forEmptySpan = span.length === 0 && considerEmptySpans;

        const startToken = getTokenAtPosition(file, span.start);

        const parent = forEmptySpan ? findAncestor(startToken, (node) => { return isExpressionStatement(node) && isBinaryExpression(node.expression); }) : getParentNodeInSpan(startToken, file, span);
        if (!parent) return undefined;

        const binaryExpression = isExpressionStatement(parent) && isBinaryExpression(parent.expression) ? parent.expression : isBinaryExpression(parent) ? parent : undefined;
        if (!binaryExpression) return undefined;

        const start = forEmptySpan ? binaryExpression.pos : startToken.pos;

        const checker = program.getTypeChecker();
        const fullPropertyAccess = getFullPropertyAccessChain(binaryExpression);
        if (!fullPropertyAccess) return undefined;
        if (binaryExpression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken && binaryExpression.operatorToken.pos <= fullPropertyAccess.pos) return undefined;

        // ensure that each sequential operand in range matches the longest acceess chain
        let checkNode = binaryExpression.left;
        let firstOccurence: PropertyAccessExpression | Identifier = fullPropertyAccess;
        while (isBinaryExpression(checkNode) && checkNode.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken && (isPropertyAccessExpression(checkNode.right) || isIdentifier(checkNode.right)) && checkNode.right.pos >= start) {
            if (!checker.containsMatchingReference(fullPropertyAccess, checkNode.right)) {
                return undefined;
            }
            firstOccurence = checkNode.right;
            checkNode = checkNode.left;
        }
        // check final identifier
        if ((isIdentifier(checkNode) || isPropertyAccessExpression(checkNode)) && checker.containsMatchingReference(fullPropertyAccess, checkNode) && checkNode.pos >= start) {
            firstOccurence = checkNode;
        }
        return firstOccurence ? { fullPropertyAccess, firstOccurence, containingExpression:binaryExpression } : undefined;
    }

    function getRightHandSidePropertyAccess(node: BinaryExpression | CallExpression): PropertyAccessExpression | undefined {
        if (isCallExpression(node) && isPropertyAccessExpression(node.expression)) {
            // a && |a.b|();
            return node.expression;
        }
        else if (isBinaryExpression(node)) {
            if (isPropertyAccessExpression(node.left)) {
                // a && |a.b| == 1;
                return node.left;
            }
            else if (isCallExpression(node.left) && isPropertyAccessExpression(node.left.expression)) {
                // a && |a.b|() == 1;
                return node.left.expression;
            }
        }
        return undefined;
    }

    function getFullPropertyAccessChain(node: BinaryExpression): PropertyAccessExpression | undefined {
        return isBinaryExpression(node.right) || isCallExpression(node.right)
            ? getRightHandSidePropertyAccess(node.right) : node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken && isPropertyAccessExpression(node.right) && !isOptionalChain(node.right)
                ? node.right : undefined;
    }

    function convertPropertyAccessToOptionalChain(toConvert: PropertyAccessExpression): PropertyAccessExpression {
        if (isPropertyAccessExpression(toConvert.expression)) {
            return factory.createPropertyAccessChain(convertPropertyAccessToOptionalChain(toConvert.expression), factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
        }
        return factory.createPropertyAccessChain(toConvert.expression, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name);
    }

    function doChange(sourceFile: SourceFile, changes: textChanges.ChangeTracker, info: Info, _actionName: string): void {
        const { fullPropertyAccess, firstOccurence } = info;
        changes.replaceNodeRange(sourceFile, firstOccurence, fullPropertyAccess, convertPropertyAccessToOptionalChain(fullPropertyAccess));
    }
}