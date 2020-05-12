/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert to template string";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_template_string);

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition } = context;
        const node = getNodeOrParentOfParentheses(file, startPosition);
        const maybeBinary = getParentBinaryExpression(node);
        const refactorInfo: ApplicableRefactorInfo = { name: refactorName, description: refactorDescription, actions: [] };

        if (isBinaryExpression(maybeBinary) && isStringConcatenationValid(maybeBinary)) {
            refactorInfo.actions.push({ name: refactorName, description: refactorDescription });
            return [refactorInfo];
        }
        return emptyArray;
    }

    function getNodeOrParentOfParentheses(file: SourceFile, startPosition: number) {
        const node = getTokenAtPosition(file, startPosition);
        const nestedBinary = getParentBinaryExpression(node);
        const isNonStringBinary = !isStringConcatenationValid(nestedBinary);

        if (
            isNonStringBinary &&
            isParenthesizedExpression(nestedBinary.parent) &&
            isBinaryExpression(nestedBinary.parent.parent)
        ) {
            return nestedBinary.parent.parent;
        }
        return node;
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const node = getNodeOrParentOfParentheses(file, startPosition);

        switch (actionName) {
            case refactorDescription:
                return { edits: getEditsForToTemplateLiteral(context, node) };
            default:
                return Debug.fail("invalid action");
        }
    }

    function getEditsForToTemplateLiteral(context: RefactorContext, node: Node) {
        const maybeBinary = getParentBinaryExpression(node);
        const file = context.file;

        const templateLiteral = nodesToTemplate(treeToArray(maybeBinary), file);
        const trailingCommentRanges = getTrailingCommentRanges(file.text, maybeBinary.end);

        if (trailingCommentRanges) {
            const lastComment = trailingCommentRanges[trailingCommentRanges.length - 1];
            const trailingRange = { pos: trailingCommentRanges[0].pos, end: lastComment.end };

            // since suppressTrailingTrivia(maybeBinary) does not work, the trailing comment is removed manually
            // otherwise it would have the trailing comment twice
            return textChanges.ChangeTracker.with(context, t => {
                t.deleteRange(file, trailingRange);
                t.replaceNode(file, maybeBinary, templateLiteral);
            });
        }
        else {
            return textChanges.ChangeTracker.with(context, t => t.replaceNode(file, maybeBinary, templateLiteral));
        }
    }

    function isNotEqualsOperator(node: BinaryExpression) {
        return node.operatorToken.kind !== SyntaxKind.EqualsToken;
    }

    function getParentBinaryExpression(expr: Node) {
        while (isBinaryExpression(expr.parent) && isNotEqualsOperator(expr.parent)) {
            expr = expr.parent;
        }
        return expr;
    }

    function isStringConcatenationValid(node: Node): boolean {
        const { containsString, areOperatorsValid } = treeToArray(node);
        return containsString && areOperatorsValid;
    }

    function treeToArray(current: Node): { nodes: Expression[], operators: Token<BinaryOperator>[], containsString: boolean, areOperatorsValid: boolean} {
        if (isBinaryExpression(current)) {
            const { nodes, operators, containsString: leftHasString, areOperatorsValid: leftOperatorValid } = treeToArray(current.left);

            if (!leftHasString && !isStringLiteral(current.right)) {
                return { nodes: [current], operators: [], containsString: false, areOperatorsValid: true };
            }

            const currentOperatorValid = current.operatorToken.kind === SyntaxKind.PlusToken;
            const areOperatorsValid = leftOperatorValid && currentOperatorValid;

            nodes.push(current.right);
            operators.push(current.operatorToken);

            return { nodes, operators, containsString: true, areOperatorsValid };
        }

        return { nodes: [current as Expression], operators: [], containsString: isStringLiteral(current), areOperatorsValid: true };
    }

    // to copy comments following the operator
    // "foo" + /* comment */ "bar"
    const copyTrailingOperatorComments = (operators: Token<BinaryOperator>[], file: SourceFile) => (index: number, targetNode: Node) => {
        if (index < operators.length) {
             copyTrailingComments(operators[index], targetNode, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        }
    };

    // to copy comments following the string
    // "foo" /* comment */ + "bar" /* comment */ + "bar2"
    const copyCommentFromMultiNode = (nodes: readonly Expression[], file: SourceFile, copyOperatorComments: (index: number, targetNode: Node) => void) =>
    (indexes: number[], targetNode: Node) => {
        while (indexes.length > 0) {
            const index = indexes.shift()!;
            copyTrailingComments(nodes[index], targetNode, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
            copyOperatorComments(index, targetNode);
        }
    };

    function concatConsecutiveString(index: number, nodes: readonly Expression[]): [number, string, number[]] {
        let text = "";
        const indexes = [];

        while (index < nodes.length && isStringLiteral(nodes[index])) {
            const stringNode = nodes[index] as StringLiteral;
            text = text + stringNode.text;
            indexes.push(index);
            index++;
        }

        return [index, text, indexes];
    }

    function nodesToTemplate({nodes, operators}: {nodes: readonly Expression[], operators: Token<BinaryOperator>[]}, file: SourceFile) {
        const copyOperatorComments = copyTrailingOperatorComments(operators, file);
        const copyCommentFromStringLiterals = copyCommentFromMultiNode(nodes, file, copyOperatorComments);
        const [begin, headText, headIndexes] = concatConsecutiveString(0, nodes);

        if (begin === nodes.length) {
            const noSubstitutionTemplateLiteral = createNoSubstitutionTemplateLiteral(headText);
            copyCommentFromStringLiterals(headIndexes, noSubstitutionTemplateLiteral);
            return noSubstitutionTemplateLiteral;
        }

        const templateSpans: TemplateSpan[] = [];
        const templateHead = createTemplateHead(headText);
        copyCommentFromStringLiterals(headIndexes, templateHead);

        for (let i = begin; i < nodes.length; i++) {
            const currentNode = getExpressionFromParenthesesOrExpression(nodes[i]);
            copyOperatorComments(i, currentNode);

            const [newIndex, subsequentText, stringIndexes] = concatConsecutiveString(i + 1, nodes);
            i = newIndex - 1;

            const templatePart = i === nodes.length - 1 ? createTemplateTail(subsequentText) : createTemplateMiddle(subsequentText);
            copyCommentFromStringLiterals(stringIndexes, templatePart);
            templateSpans.push(createTemplateSpan(currentNode, templatePart));
        }

        return createTemplateExpression(templateHead, templateSpans);
    }

    // to copy comments following the opening & closing parentheses
    // "foo" + ( /* comment */ 5 + 5 ) /* comment */ + "bar"
    function copyCommentsWhenParenthesized(node: ParenthesizedExpression) {
        const file = node.getSourceFile();
        copyTrailingComments(node, node.expression, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        copyTrailingAsLeadingComments(node.expression, node.expression, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
    }

    function getExpressionFromParenthesesOrExpression(node: Expression) {
        if (isParenthesizedExpression(node)) {
            copyCommentsWhenParenthesized(node);
            node = node.expression;
        }
        return node;
    }
}
