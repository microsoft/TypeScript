/* @internal */
namespace ts.refactor.convertToOptionalChainExpression {
    const refactorName = "Convert to optional chain expression";
    const convertToOptionalChainExpression = "Convert && chain to optional chain expression";

    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition, endPosition, program, triggerReason } = context;
        const info = getInfo(file, startPosition, endPosition, program, triggerReason === "invoked");
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
        const { file, startPosition, endPosition, program } = context;
        const info = getInfo(file, startPosition, endPosition, program);
        if (!info) return undefined;
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, t, info, actionName));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }

    interface Info {
        fullPropertyAccess: PropertyAccessExpression,
        firstOccurence: Node,
        containingExpression: BinaryExpression
    }

    function getInfo(file: SourceFile, startPosition: number, endPosition: number | undefined, program: Program, considerEmptySpans = true): Info | undefined {
        if (startPosition === endPosition && !considerEmptySpans) return undefined;
        const forEmptySpan = startPosition === endPosition && considerEmptySpans;
        const startToken = getTokenAtPosition(file, startPosition);
        const endToken = endPosition ? findTokenOnLeftOfPosition(file, endPosition) : startToken;
        const startBinary = findAncestor<BinaryExpression>(startToken, (node): node is BinaryExpression => { return isBinaryExpression(node); });
        const endBinary = endToken !== startToken ? findAncestor<BinaryExpression>(endToken, (node): node is BinaryExpression => { return isBinaryExpression(node); }) : startBinary;

        // a request for an empty span should simply check if the largest containing binary expression is valid
        const parentForEmptySpan = forEmptySpan ? findAncestor(startBinary, (node) => { return node.parent && isBinaryExpression(node) && !isBinaryExpression(node.parent); }): undefined;
        const parent = forEmptySpan
            ? parentForEmptySpan
            : startBinary && endBinary
                ? getParentNodeInSpan(startBinary, file, createTextSpanFromBounds(startBinary.pos, endBinary.end)) : undefined;
        if (!parent || !isBinaryExpression(parent)) return undefined;

        const firstBinaryForEmpty = forEmptySpan ? findAncestor<BinaryExpression>(parent.getFirstToken(), (node): node is BinaryExpression => { return isBinaryExpression(node); }): undefined;
        const startNode = forEmptySpan ? firstBinaryForEmpty : startBinary;
        if (!startNode) return undefined;
        const checker = program.getTypeChecker();

        const fullPropertyAccess = getFullPropertyAccessChain(parent, checker);
        if (!fullPropertyAccess) return undefined;

        // ensure that each sequential operand in range matches the longest acceess chain
        let checkNode = parent.left;
        let firstOccurence: PropertyAccessExpression | Identifier = fullPropertyAccess;
        while (isBinaryExpression(checkNode) && (isPropertyAccessExpression(checkNode.right) || isIdentifier(checkNode.right)) && checkNode.right.pos >= startNode.right.pos) {
            if (!checker.containsMatchingReference(fullPropertyAccess, checkNode.right)) {
                return undefined;
            }
            firstOccurence = checkNode.right;
            checkNode = checkNode.left;
        }
        // check final identifier
        if ((isIdentifier(checkNode) || isPropertyAccessExpression(checkNode)) && checker.containsMatchingReference(fullPropertyAccess, checkNode) && checkNode.pos >= startNode.pos) {
            firstOccurence = checkNode;
        }
        return firstOccurence ? { fullPropertyAccess, firstOccurence, containingExpression:parent } : undefined;
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

    function getFullPropertyAccessChain(node: BinaryExpression, _checker: TypeChecker): PropertyAccessExpression | undefined {
        return isBinaryExpression(node.right) || isCallExpression(node.right)
            ? getRightHandSidePropertyAccess(node.right) : isPropertyAccessExpression(node.right)
                ? node.right : undefined;
    }

    function convertPropertyAccessToOptionalChain(toConvert: PropertyAccessExpression): PropertyAccessExpression {
        if (toConvert.expression.kind === SyntaxKind.PropertyAccessExpression) {
            return factory.createPropertyAccessChain(convertPropertyAccessToOptionalChain(<PropertyAccessExpression>toConvert.expression), factory.createToken(SyntaxKind.QuestionDotToken), <Identifier>toConvert.name);
        }
        return factory.createPropertyAccessChain(toConvert.expression, factory.createToken(SyntaxKind.QuestionDotToken), <Identifier>toConvert.name);
    }

    function doChange(sourceFile: SourceFile, changes: textChanges.ChangeTracker, info: Info, _actionName: string): void {
        const { fullPropertyAccess, firstOccurence } = info;
        changes.replaceNodeRange(sourceFile, firstOccurence, fullPropertyAccess, convertPropertyAccessToOptionalChain(fullPropertyAccess));
    }
}