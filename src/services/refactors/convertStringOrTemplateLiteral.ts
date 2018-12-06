/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert string concatenation or template literal";
    const toTemplateLiteralActionName = "Convert to template literal";
    const toStringConcatenationActionName = "Convert to string concatenation";

    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_string_concatenation_or_template_literal);
    const toTemplateLiteralDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_template_literal);
    const toStringConcatenationDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_string_concatenation);

    // TODO let a = 45 + 45 + " ee" + 33;
    // TODO let a = tag `aaa`;

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context;
        const node = getTokenAtPosition(file, startPosition);
        const maybeBinary = getParentBinaryExpression(node); containsString(maybeBinary);
        const actions: RefactorActionInfo[] = [];

        if (!isTemplateLike(node) && (isBinaryExpression(maybeBinary) || isStringLiteral(maybeBinary)) && containsString(maybeBinary)) {
            actions.push({ name: toTemplateLiteralActionName, description: toTemplateLiteralDescription });
        }


        if (isTemplateLike(node)) {
            actions.push({ name: toStringConcatenationActionName, description: toStringConcatenationDescription });
        }

        return [{ name: refactorName, description: refactorDescription, actions }];
    }

    function isTemplateLike(node: Node): boolean {
        return isNoSubstitutionTemplateLiteral(node) || isTemplateHead(node) || isTemplateMiddleOrTemplateTail(node);
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const node = getTokenAtPosition(file, startPosition);

        switch (actionName) {
            case toTemplateLiteralActionName:
                const maybeBinary = getParentBinaryExpression(node);
                const arrayOfNodes = treeToArray(maybeBinary);
                const templateLiteral = nodesToTemplate(arrayOfNodes);

                const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, maybeBinary, templateLiteral));
                return { edits };

            case toStringConcatenationActionName:
                if (isNoSubstitutionTemplateLiteral(node)) {
                    const stringLiteral = createStringLiteral(node.text);

                return { edits: textChanges.ChangeTracker.with(context, t => t.replaceNode(file, node, stringLiteral)) };

                }
                if (isTemplateExpression(node.parent)) {
                    const templateLiteralExpression = node.parent;
                    const nodesArray: Expression[] = [];

                    if (templateLiteralExpression.head.text.length !== 0) nodesArray.push(createStringLiteral(templateLiteralExpression.head.text));

                    templateLiteralExpression.templateSpans.forEach(ts => {
                        nodesArray.push(ts.expression);
                        const str = ts.literal.text;
                        if (str.length !== 0) {
                            nodesArray.push(createStringLiteral(str));
                        }
                    });

                    const binaryExpression = arrayToTree(nodesArray, /* binaryExpression*/ undefined);
                    return { edits: textChanges.ChangeTracker.with(context, t => t.replaceNode(file, templateLiteralExpression, binaryExpression)) };
                }

                break;

            default:
                return Debug.fail("invalid action");
        }
    }

    function getParentBinaryExpression(expr: Node) {
        while (isBinaryExpression(expr.parent)) {
            expr = expr.parent;
        }
        return expr;
    }

    function containsString(node: Node): boolean {
        if (isBinaryExpression(node)) {
            return containsString(node.left) || containsString(node.right);
        }

        if (isStringLiteral(node)) return true;
        return false;
    }

    function arrayToTree(nodes: Expression[], bexpr: BinaryExpression | undefined): BinaryExpression {
        if (nodes.length === 0) return bexpr!;

        if (bexpr === undefined) {
            const left = nodes[0];
            const right = nodes[1];

            const binary = createBinary (left, SyntaxKind.PlusToken, right);
            return arrayToTree(nodes.slice(2), binary);
        }

        const right = nodes[0];
        const binary = createBinary (bexpr, SyntaxKind.PlusToken, right);
        return arrayToTree(nodes.slice(1), binary);
    }

    function treeToArray(node: Node): Node[] {
        if (isBinaryExpression(node)) {
            return treeToArray(node.left).concat(treeToArray(node.right));
        }
        return [node];
    }

    function nodesToTemplate(nodes: Node[]) {
        let begin = 0;

        const head = createTemplateHead("");
        const firstNode = nodes[0];
        const spans: TemplateSpan[] = [];

        if (isStringLiteral(firstNode)) {
            head.text = firstNode.text;
            begin++;

            while (begin < nodes.length && isStringLiteral(nodes[begin])) {

                const next = nodes[begin] as StringLiteral;
                head.text = head.text + next.text;
                begin++;
            }

            head.text = cleanString(head.text);
        }

        if (begin === nodes.length) {
            return createNoSubstitutionTemplateLiteral(head.text);
        }

        for (let i = begin; i < nodes.length; i++) {
            let current = nodes[i];
            let templatePart: TemplateMiddle | TemplateTail;

            if (i + 1 < nodes.length && isStringLiteral(nodes[i + 1])) {
                let next = nodes[i + 1] as StringLiteral;
                let text = next.text;
                i++;

                while (i + 1 < nodes.length && isStringLiteral(nodes[i + 1])) {
                    next = nodes[i + 1] as StringLiteral;
                    text = text + next.text;
                    i++;
                }

                if (isParenthesizedExpression(current)) current = current.expression;
                text = cleanString(text);

                templatePart = i === nodes.length - 1 ? createTemplateTail(text) : createTemplateMiddle(text);
            }
            else {
                templatePart = i === nodes.length - 1 ? createTemplateTail("") : createTemplateMiddle("");
            }

            spans.push(createTemplateSpan(current as Expression, templatePart));
        }

        return createTemplateExpression(head, spans);
    }

    function cleanString(content: string) {
        return content.replace("`", "\`").replace("\${", `$\\{`);
    }

}
