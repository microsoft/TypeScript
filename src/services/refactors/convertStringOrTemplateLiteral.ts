/* @internal */
namespace ts.refactor.convertStringOrTemplateLiteral {
    const refactorName = "Convert string concatenation or template literal";
    const toTemplateLiteralActionName = "Convert to template literal";
    // const toStringConcatenationActionName = "Convert to string concatenation";

    const refactorDescription = getLocaleSpecificMessage(Diagnostics.Convert_string_concatenation_or_template_literal);
    const toTemplateLiteralDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_template_literal);
    // const toStringConcatenationDescription = getLocaleSpecificMessage(Diagnostics.Convert_to_string_concatenation);

    registerRefactor(refactorName, { getEditsForAction, getAvailableActions });

    function getAvailableActions(context: RefactorContext): ReadonlyArray<ApplicableRefactorInfo> {
        const { file, startPosition } = context; file; startPosition;
        
        const node = getTokenAtPosition(file, startPosition);
        const maybeBinary = getParentBinaryExpression(node); containsString(maybeBinary);
        if (!(isBinaryExpression(maybeBinary) || isStringLiteral(maybeBinary)) || !containsString(maybeBinary)) return emptyArray;

        // let str = "untouched";
        // if (isBinaryExpression(maybeBinary)) str = maybeBinary.right.getText();
        // if (isStringLiteral(maybeBinary)) str = maybeBinary.getText();

        return [{
            name: refactorName,
            description: refactorDescription,
            actions: [
                    {
                        name: toTemplateLiteralActionName,
                        description: toTemplateLiteralDescription
                    }
            ]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const { file, startPosition } = context; file; startPosition; actionName;
        const node = getTokenAtPosition(file, startPosition);


        switch (actionName) {
            case toTemplateLiteralActionName:
                const maybeBinary = getParentBinaryExpression(node);
                let templateLiteral: TemplateExpression | NoSubstitutionTemplateLiteral;
                if (isStringLiteral(maybeBinary)) {
                    templateLiteral = createNoSubstitutionTemplateLiteral(maybeBinary.text);
                }
                else {
                    const arrayOfNodes = treeToArray(maybeBinary); arrayOfNodes;
                    templateLiteral = nodesToTemplate(arrayOfNodes);
                }

                const edits = textChanges.ChangeTracker.with(context, t => t.replaceNode(file, maybeBinary, templateLiteral));
                return {edits};

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

    function treeToArray(node: Node): Node[] {
        if (isBinaryExpression(node)) {
            return treeToArray(node.left).concat(treeToArray(node.right))
        }
        return [node];
    }

    function nodesToTemplate(nodes: Node[]) {
        let begin = 0;

        const head = createTemplateHead("");
        const firstNode = nodes[0];
        const spans: TemplateSpan[] = [];

        if (isStringLiteral(firstNode)){
            head.text = firstNode.text;
            begin++;

            while(begin < nodes.length && isStringLiteral(nodes[begin])){

                let next = nodes[begin] as StringLiteral;
                head.text = head.text + next.text;
                begin++;
            }
        }

        if(begin === nodes.length){
            return createNoSubstitutionTemplateLiteral(head.text);
        }

        for(let i = begin; i < nodes.length; i++){
            const current = nodes[i];

            if (i+1 < nodes.length && isStringLiteral(nodes[i+1])){
                let next = nodes[i+1] as StringLiteral;
                let text = next.text;
                i++;

                while(i+1 < nodes.length && isStringLiteral(nodes[i+1])){
                    next = nodes[i+1] as StringLiteral;
                    text = text + next.text;
                    i++;
                }

                const templatePart = i === nodes.length-1 ? createTemplateTail(text) : createTemplateMiddle(text);
                spans.push(createTemplateSpan(current as Expression, templatePart));
            }
            else {
                const templatePart = i === nodes.length-1 ? createTemplateTail("") : createTemplateMiddle("");
                spans.push(createTemplateSpan(current as Expression, templatePart));
            }
        }

        return createTemplateExpression(head, spans);
    }

}
