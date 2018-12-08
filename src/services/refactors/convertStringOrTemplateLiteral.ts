/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert string concatenation or template literal";
    const toTemplateLiteralActionName = "Convert to template literal";
    const toStringConcatenationActionName = "Convert to string concatenation";

    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_string_concatenation_or_template_literal);
    const toTemplateLiteralDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_template_literal);
    const toStringConcatenationDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_string_concatenation);

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context;
        const node = getNodeOrParentOfBraces(file, startPosition);
        const maybeBinary = getParentBinaryExpression(node);
        const actions: RefactorActionInfo[] = [];

        if ((isBinaryExpression(maybeBinary) || isStringLiteral(maybeBinary)) && isStringConcatenationValid(maybeBinary)) {
            actions.push({ name: toTemplateLiteralActionName, description: toTemplateLiteralDescription });
        }

        if (isTemplateLike(node)) {
            actions.push({ name: toStringConcatenationActionName, description: toStringConcatenationDescription });
        }

        return [{ name: refactorName, description: refactorDescription, actions }];
    }

    function getNodeOrParentOfBraces(file: SourceFile, startPosition: number) {
        const node = getTokenAtPosition(file, startPosition);
        if (isParenthesizedExpression(node.parent) && isBinaryExpression(node.parent.parent)) return node.parent.parent;
        return node;
    }

    function isTemplateLike(node: Node) {
        const isTemplateWithoutSubstitution = isNoSubstitutionTemplateLiteral(node) && isNotTagged(node);
        const isTemplate = (isTemplateHead(node) || isTemplateMiddleOrTemplateTail(node)) && isNotTagged(node.parent);
        const isTemplateFromExpression = isTemplateSpan(node.parent) && isNotTagged(node.parent.parent);
        return isTemplateWithoutSubstitution || isTemplate || isTemplateFromExpression;
    }

    function isNotTagged(templateExpression: Node) {
        return !isTaggedTemplateExpression(templateExpression.parent);
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context;
        const node = getNodeOrParentOfBraces(file, startPosition);

        switch (actionName) {
            case toTemplateLiteralActionName:
                const maybeBinary = getParentBinaryExpression(node);
                const arrayOfNodes = transformTreeToArray(maybeBinary);
                const templateLiteral = nodesToTemplate(arrayOfNodes);
                const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, maybeBinary, templateLiteral));
                return { edits };

            case toStringConcatenationActionName:
                return { edits: getEditsForToStringConcatenation(context, node) };

            default:
                return Debug.fail("invalid action");
        }
    }

    function getEditsForToStringConcatenation(context: RefactorContext, node: Node) {
        if (isTemplateExpression(node.parent) || isTemplateSpan(node.parent)) {
            const templateLiteralExpression = isTemplateSpan(node.parent) ? node.parent.parent : node.parent;
            const { head, templateSpans } = templateLiteralExpression;
            const arrayOfNodes = templateSpans.map(templateSpanToExpressions)
                                              .reduce((accumulator, nextArray) => accumulator.concat(nextArray));

            if (head.text.length !== 0) arrayOfNodes.unshift(createStringLiteral(head.text));

            const binaryExpression = arrayToTree(arrayOfNodes);
            return textChanges.ChangeTracker.with(context, t => t.replaceNode(context.file, templateLiteralExpression, binaryExpression));
        }
        else {
            const templateWithoutSubstitution = node as NoSubstitutionTemplateLiteral;
            const stringLiteral = createStringLiteral(templateWithoutSubstitution.text);
            return textChanges.ChangeTracker.with(context, t => t.replaceNode(context.file, node, stringLiteral));
        }
    }

    function templateSpanToExpressions(templateSpan: TemplateSpan): Expression[] {
        const { expression, literal } = templateSpan;
        const text = literal.text;
        return text.length === 0 ? [expression] : [expression, createStringLiteral(text)];
    }

    function getParentBinaryExpression(expr: Node) {
        while (isBinaryExpression(expr.parent)) {
            expr = expr.parent;
        }
        return expr;
    }

    function arrayToTree(nodes: ReadonlyArray<Expression>, accumulator?: BinaryExpression): BinaryExpression {
        if (nodes.length === 0) return accumulator!;

        if (!accumulator) {
            const left = nodes[0];
            const right = nodes[1];

            const binary = createBinary(left, SyntaxKind.PlusToken, right);
            return arrayToTree(nodes.slice(2), binary);
        }

        const right = nodes[0];
        const binary = createBinary(accumulator, SyntaxKind.PlusToken, right);
        return arrayToTree(nodes.slice(1), binary);
    }

    function isStringConcatenationValid(node: Node): boolean {
        const { containsString, areOperatorsValid } = treeToArray(node);
        return containsString && areOperatorsValid;
    }

    function transformTreeToArray(node: Node): ReadonlyArray<Expression> {
        return treeToArray(node).nodes;
    }

    function treeToArray(node: Node): { nodes: ReadonlyArray<Expression>, containsString: boolean, areOperatorsValid: boolean} {
        if (isBinaryExpression(node)) {
            const { nodes: leftNodes, containsString: leftHasString, areOperatorsValid: leftOperatorValid } = treeToArray(node.left);
            const { nodes: rightNodes, containsString: rightHasString, areOperatorsValid: rightOperatorValid } = treeToArray(node.right);

            if (!leftHasString && !rightHasString) {
                return { nodes: [node], containsString: false, areOperatorsValid: true };
            }

            const nodeOperatorValid = node.operatorToken.kind === SyntaxKind.PlusToken;
            const isPlus = leftOperatorValid && nodeOperatorValid && rightOperatorValid;

            return { nodes: leftNodes.concat(rightNodes), containsString: true, areOperatorsValid: isPlus };
        }

        return { nodes: [node as Expression], containsString: isStringLiteral(node), areOperatorsValid: true };
    }

    function createHead(nodes: ReadonlyArray<Expression>): [number, TemplateHead] {
        let begin = 0;
        const head = createTemplateHead("");

        while (begin < nodes.length && isStringLiteral(nodes[begin])) {
            const next = nodes[begin] as StringLiteral;
            head.text = head.text + next.text;
            begin++;
        }

        head.text = escapeText(head.text);
        return [begin, head];
    }

    function nodesToTemplate(nodes: ReadonlyArray<Expression>) {
        const templateSpans: TemplateSpan[] = [];
        const [begin, head] = createHead(nodes);

        if (begin === nodes.length) {
            return createNoSubstitutionTemplateLiteral(head.text);
        }

        for (let i = begin; i < nodes.length; i++) {
            let current = nodes[i];
            let text = "";

            while (i + 1 < nodes.length && isStringLiteral(nodes[i + 1])) {
                const next = nodes[i + 1] as StringLiteral;
                text = text + next.text;
                i++;
            }

            text = escapeText(text);
            const templatePart = i === nodes.length - 1 ? createTemplateTail(text) : createTemplateMiddle(text);

            if (isParenthesizedExpression(current)) current = current.expression;
            templateSpans.push(createTemplateSpan(current, templatePart));
        }

        return createTemplateExpression(head, templateSpans);
    }

    function escapeText(content: string) {
        return content.replace("`", "\`")
                      .replace("\${", `$\\{`);
    }

}
