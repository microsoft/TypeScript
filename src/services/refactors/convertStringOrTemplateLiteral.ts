/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert to template string";
    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_template_string);

    const convertStringAction = {
        name: refactorName,
        description: refactorDescription,
        kind: "refactor.rewrite.string"
    };
    registerRefactor(refactorName, {
        kinds: [convertStringAction.kind],
        getEditsForAction,
        getAvailableActions
    });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, startPosition } = context;
        const node = getNodeOrParentOfParentheses(file, startPosition);
        const maybeBinary = getParentBinaryExpression(node);
        const refactorInfo: ApplicableRefactorInfo = { name: refactorName, description: refactorDescription, actions: [] };

        if (isBinaryExpression(maybeBinary) && treeToArray(maybeBinary).isValidConcatenation) {
            refactorInfo.actions.push(convertStringAction);
            return [refactorInfo];
        }
        else if (context.preferences.provideRefactorNotApplicableReason) {
            refactorInfo.actions.push({ ...convertStringAction,
                notApplicableReason: getLocaleSpecificMessage(Diagnostics.Can_only_convert_string_concatenation)
            });
            return [refactorInfo];
        }
        return emptyArray;
    }

    function getNodeOrParentOfParentheses(file: SourceFile, startPosition: number) {
        const node = getTokenAtPosition(file, startPosition);
        const nestedBinary = getParentBinaryExpression(node);
        const isNonStringBinary = !treeToArray(nestedBinary).isValidConcatenation;

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
        const container = findAncestor(expr.parent, n => {
            switch (n.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                    return false;
                case SyntaxKind.TemplateExpression:
                case SyntaxKind.BinaryExpression:
                    return !(isBinaryExpression(n.parent) && isNotEqualsOperator(n.parent));
                default:
                    return "quit";
            }
        });

        return (container || expr) as Expression;
    }

    function treeToArray(current: Expression) {
        const loop = (current: Node): { nodes: Expression[], operators: Token<BinaryOperator>[], hasString: boolean, validOperators: boolean} => {
            if (!isBinaryExpression(current)) {
                return { nodes: [current as Expression], operators: [], validOperators: true,
                         hasString: isStringLiteral(current) || isNoSubstitutionTemplateLiteral(current) };
            }
            const { nodes, operators, hasString: leftHasString, validOperators: leftOperatorValid } = loop(current.left);

            if (!(leftHasString || isStringLiteral(current.right) || isTemplateExpression(current.right))) {
                return { nodes: [current], operators: [], hasString: false, validOperators: true };
            }

            const currentOperatorValid = current.operatorToken.kind === SyntaxKind.PlusToken;
            const validOperators = leftOperatorValid && currentOperatorValid;

            nodes.push(current.right);
            operators.push(current.operatorToken);

            return { nodes, operators, hasString: true, validOperators };
        };
        const { nodes, operators, validOperators, hasString } = loop(current);
        return { nodes, operators, isValidConcatenation: validOperators && hasString };
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
        const indexes = [];
        let text = "";
        while (index < nodes.length) {
            const node = nodes[index];
            if (isStringLiteralLike(node)) { // includes isNoSubstitutionTemplateLiteral(node)
                text = text + node.text;
                indexes.push(index);
                index++;
            }
            else if (isTemplateExpression(node)) {
                text = text + node.head.text;
                break;
            }
            else {
                break;
            }
        }
        return [index, text, indexes];
    }

    function nodesToTemplate({ nodes, operators }: { nodes: readonly Expression[], operators: Token<BinaryOperator>[] }, file: SourceFile) {
        const copyOperatorComments = copyTrailingOperatorComments(operators, file);
        const copyCommentFromStringLiterals = copyCommentFromMultiNode(nodes, file, copyOperatorComments);
        const [begin, headText, headIndexes] = concatConsecutiveString(0, nodes);

        if (begin === nodes.length) {
            const noSubstitutionTemplateLiteral = factory.createNoSubstitutionTemplateLiteral(headText);
            copyCommentFromStringLiterals(headIndexes, noSubstitutionTemplateLiteral);
            return noSubstitutionTemplateLiteral;
        }

        const templateSpans: TemplateSpan[] = [];
        const templateHead = factory.createTemplateHead(headText);
        copyCommentFromStringLiterals(headIndexes, templateHead);

        for (let i = begin; i < nodes.length; i++) {
            const currentNode = getExpressionFromParenthesesOrExpression(nodes[i]);
            copyOperatorComments(i, currentNode);

            const [newIndex, subsequentText, stringIndexes] = concatConsecutiveString(i + 1, nodes);
            i = newIndex - 1;
            const isLast = i === nodes.length - 1;

            if (isTemplateExpression(currentNode)) {
                const spans = map(currentNode.templateSpans, (span, index) => {
                    copyExpressionComments(span);
                    const nextSpan = currentNode.templateSpans[index + 1];
                    const text = span.literal.text + (nextSpan ? "" : subsequentText);
                    return factory.createTemplateSpan(span.expression, isLast ? factory.createTemplateTail(text) : factory.createTemplateMiddle(text));
                });
                templateSpans.push(...spans);
            }
            else {
                const templatePart = isLast ? factory.createTemplateTail(subsequentText) : factory.createTemplateMiddle(subsequentText);
                copyCommentFromStringLiterals(stringIndexes, templatePart);
                templateSpans.push(factory.createTemplateSpan(currentNode, templatePart));
            }
        }

        return factory.createTemplateExpression(templateHead, templateSpans);
    }

    // to copy comments following the opening & closing parentheses
    // "foo" + ( /* comment */ 5 + 5 ) /* comment */ + "bar"
    function copyExpressionComments(node: ParenthesizedExpression | TemplateSpan) {
        const file = node.getSourceFile();
        copyTrailingComments(node, node.expression, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        copyTrailingAsLeadingComments(node.expression, node.expression, file, SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
    }

    function getExpressionFromParenthesesOrExpression(node: Expression) {
        if (isParenthesizedExpression(node)) {
            copyExpressionComments(node);
            node = node.expression;
        }
        return node;
    }
}
