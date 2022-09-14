/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
const refactorName = "Convert to template string";
const refactorDescription = ts.getLocaleSpecificMessage(ts.Diagnostics.Convert_to_template_string);

const convertStringAction = {
    name: refactorName,
    description: refactorDescription,
    kind: "refactor.rewrite.string"
};
ts.refactor.registerRefactor(refactorName, {
    kinds: [convertStringAction.kind],
    getEditsForAction: getRefactorEditsToConvertToTemplateString,
    getAvailableActions: getRefactorActionsToConvertToTemplateString
});

function getRefactorActionsToConvertToTemplateString(context: ts.RefactorContext): readonly ts.ApplicableRefactorInfo[] {
    const { file, startPosition } = context;
    const node = getNodeOrParentOfParentheses(file, startPosition);
    const maybeBinary = getParentBinaryExpression(node);
    const refactorInfo: ts.ApplicableRefactorInfo = { name: refactorName, description: refactorDescription, actions: [] };

    if (ts.isBinaryExpression(maybeBinary) && treeToArray(maybeBinary).isValidConcatenation) {
        refactorInfo.actions.push(convertStringAction);
        return [refactorInfo];
    }
    else if (context.preferences.provideRefactorNotApplicableReason) {
        refactorInfo.actions.push({ ...convertStringAction,
            notApplicableReason: ts.getLocaleSpecificMessage(ts.Diagnostics.Can_only_convert_string_concatenation)
        });
        return [refactorInfo];
    }
    return ts.emptyArray;
}

function getNodeOrParentOfParentheses(file: ts.SourceFile, startPosition: number) {
    const node = ts.getTokenAtPosition(file, startPosition);
    const nestedBinary = getParentBinaryExpression(node);
    const isNonStringBinary = !treeToArray(nestedBinary).isValidConcatenation;

    if (
        isNonStringBinary &&
        ts.isParenthesizedExpression(nestedBinary.parent) &&
        ts.isBinaryExpression(nestedBinary.parent.parent)
    ) {
        return nestedBinary.parent.parent;
    }
    return node;
}

function getRefactorEditsToConvertToTemplateString(context: ts.RefactorContext, actionName: string): ts.RefactorEditInfo | undefined {
    const { file, startPosition } = context;
    const node = getNodeOrParentOfParentheses(file, startPosition);

    switch (actionName) {
        case refactorDescription:
            return { edits: getEditsForToTemplateLiteral(context, node) };
        default:
            return ts.Debug.fail("invalid action");
    }
}

function getEditsForToTemplateLiteral(context: ts.RefactorContext, node: ts.Node) {
    const maybeBinary = getParentBinaryExpression(node);
    const file = context.file;

    const templateLiteral = nodesToTemplate(treeToArray(maybeBinary), file);
    const trailingCommentRanges = ts.getTrailingCommentRanges(file.text, maybeBinary.end);

    if (trailingCommentRanges) {
        const lastComment = trailingCommentRanges[trailingCommentRanges.length - 1];
        const trailingRange = { pos: trailingCommentRanges[0].pos, end: lastComment.end };

        // since suppressTrailingTrivia(maybeBinary) does not work, the trailing comment is removed manually
        // otherwise it would have the trailing comment twice
        return ts.textChanges.ChangeTracker.with(context, t => {
            t.deleteRange(file, trailingRange);
            t.replaceNode(file, maybeBinary, templateLiteral);
        });
    }
    else {
        return ts.textChanges.ChangeTracker.with(context, t => t.replaceNode(file, maybeBinary, templateLiteral));
    }
}

function isNotEqualsOperator(node: ts.BinaryExpression) {
    return node.operatorToken.kind !== ts.SyntaxKind.EqualsToken;
}

function getParentBinaryExpression(expr: ts.Node) {
    const container = ts.findAncestor(expr.parent, n => {
        switch (n.kind) {
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
                return false;
            case ts.SyntaxKind.TemplateExpression:
            case ts.SyntaxKind.BinaryExpression:
                return !(ts.isBinaryExpression(n.parent) && isNotEqualsOperator(n.parent));
            default:
                return "quit";
        }
    });

    return (container || expr) as ts.Expression;
}

function treeToArray(current: ts.Expression) {
    const loop = (current: ts.Node): { nodes: ts.Expression[], operators: ts.Token<ts.BinaryOperator>[], hasString: boolean, validOperators: boolean} => {
        if (!ts.isBinaryExpression(current)) {
            return { nodes: [current as ts.Expression], operators: [], validOperators: true,
                     hasString: ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current) };
        }
        const { nodes, operators, hasString: leftHasString, validOperators: leftOperatorValid } = loop(current.left);

        if (!(leftHasString || ts.isStringLiteral(current.right) || ts.isTemplateExpression(current.right))) {
            return { nodes: [current], operators: [], hasString: false, validOperators: true };
        }

        const currentOperatorValid = current.operatorToken.kind === ts.SyntaxKind.PlusToken;
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
const copyTrailingOperatorComments = (operators: ts.Token<ts.BinaryOperator>[], file: ts.SourceFile) => (index: number, targetNode: ts.Node) => {
    if (index < operators.length) {
         ts.copyTrailingComments(operators[index], targetNode, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
    }
};

// to copy comments following the string
// "foo" /* comment */ + "bar" /* comment */ + "bar2"
const copyCommentFromMultiNode = (nodes: readonly ts.Expression[], file: ts.SourceFile, copyOperatorComments: (index: number, targetNode: ts.Node) => void) =>
(indexes: number[], targetNode: ts.Node) => {
    while (indexes.length > 0) {
        const index = indexes.shift()!;
        ts.copyTrailingComments(nodes[index], targetNode, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
        copyOperatorComments(index, targetNode);
    }
};

function escapeRawStringForTemplate(s: string) {
    // Escaping for $s in strings that are to be used in template strings
    // Naive implementation: replace \x by itself and otherwise $ and ` by \$ and \`.
    // But to complicate it a bit, this should work for raw strings too.
    return s.replace(/\\.|[$`]/g, m => m[0] === "\\" ? m : "\\" + m);
    // Finally, a less-backslash-happy version can work too, doing only ${ instead of all $s:
    //     s.replace(/\\.|\${|`/g, m => m[0] === "\\" ? m : "\\" + m);
    // but `\$${foo}` is likely more clear than the more-confusing-but-still-working `$${foo}`.
}

function getRawTextOfTemplate(node: ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail) {
    // in these cases the right side is ${
    const rightShaving = ts.isTemplateHead(node) || ts.isTemplateMiddle(node) ? -2 : -1;
    return ts.getTextOfNode(node).slice(1, rightShaving);
}

function concatConsecutiveString(index: number, nodes: readonly ts.Expression[]): [nextIndex: number, text: string, rawText: string, usedIndexes: number[]] {
    const indexes = [];
    let text = "", rawText = "";
    while (index < nodes.length) {
        const node = nodes[index];
        if (ts.isStringLiteralLike(node)) { // includes isNoSubstitutionTemplateLiteral(node)
            text += node.text;
            rawText += escapeRawStringForTemplate(ts.getTextOfNode(node).slice(1, -1));
            indexes.push(index);
            index++;
        }
        else if (ts.isTemplateExpression(node)) {
            text += node.head.text;
            rawText += getRawTextOfTemplate(node.head);
            break;
        }
        else {
            break;
        }
    }
    return [index, text, rawText, indexes];
}

function nodesToTemplate({ nodes, operators }: { nodes: readonly ts.Expression[], operators: ts.Token<ts.BinaryOperator>[] }, file: ts.SourceFile) {
    const copyOperatorComments = copyTrailingOperatorComments(operators, file);
    const copyCommentFromStringLiterals = copyCommentFromMultiNode(nodes, file, copyOperatorComments);
    const [begin, headText, rawHeadText, headIndexes] = concatConsecutiveString(0, nodes);

    if (begin === nodes.length) {
        const noSubstitutionTemplateLiteral = ts.factory.createNoSubstitutionTemplateLiteral(headText, rawHeadText);
        copyCommentFromStringLiterals(headIndexes, noSubstitutionTemplateLiteral);
        return noSubstitutionTemplateLiteral;
    }

    const templateSpans: ts.TemplateSpan[] = [];
    const templateHead = ts.factory.createTemplateHead(headText, rawHeadText);
    copyCommentFromStringLiterals(headIndexes, templateHead);

    for (let i = begin; i < nodes.length; i++) {
        const currentNode = getExpressionFromParenthesesOrExpression(nodes[i]);
        copyOperatorComments(i, currentNode);

        const [newIndex, subsequentText, rawSubsequentText, stringIndexes] = concatConsecutiveString(i + 1, nodes);
        i = newIndex - 1;
        const isLast = i === nodes.length - 1;

        if (ts.isTemplateExpression(currentNode)) {
            const spans = ts.map(currentNode.templateSpans, (span, index) => {
                copyExpressionComments(span);
                const isLastSpan = index === currentNode.templateSpans.length - 1;
                const text = span.literal.text + (isLastSpan ? subsequentText : "");
                const rawText = getRawTextOfTemplate(span.literal) + (isLastSpan ? rawSubsequentText : "");
                return ts.factory.createTemplateSpan(span.expression, isLast && isLastSpan
                    ? ts.factory.createTemplateTail(text, rawText)
                    : ts.factory.createTemplateMiddle(text, rawText));
            });
            templateSpans.push(...spans);
        }
        else {
            const templatePart = isLast
                ? ts.factory.createTemplateTail(subsequentText, rawSubsequentText)
                : ts.factory.createTemplateMiddle(subsequentText, rawSubsequentText);
            copyCommentFromStringLiterals(stringIndexes, templatePart);
            templateSpans.push(ts.factory.createTemplateSpan(currentNode, templatePart));
        }
    }

    return ts.factory.createTemplateExpression(templateHead, templateSpans);
}

// to copy comments following the opening & closing parentheses
// "foo" + ( /* comment */ 5 + 5 ) /* comment */ + "bar"
function copyExpressionComments(node: ts.ParenthesizedExpression | ts.TemplateSpan) {
    const file = node.getSourceFile();
    ts.copyTrailingComments(node, node.expression, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
    ts.copyTrailingAsLeadingComments(node.expression, node.expression, file, ts.SyntaxKind.MultiLineCommentTrivia, /* hasTrailingNewLine */ false);
}

function getExpressionFromParenthesesOrExpression(node: ts.Expression) {
    if (ts.isParenthesizedExpression(node)) {
        copyExpressionComments(node);
        node = node.expression;
    }
    return node;
}
}
