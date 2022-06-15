/*@internal*/
namespace ts {
    export enum ProcessLevel {
        LiftRestriction,
        All
    }

    export function processTaggedTemplateExpression(
        context: TransformationContext,
        node: TaggedTemplateExpression,
        visitor: Visitor,
        currentSourceFile: SourceFile,
        recordTaggedTemplateString: (temp: Identifier) => void,
        level: ProcessLevel) {

        // Visit the tag expression
        const tag = visitNode(node.tag, visitor, isExpression);

        // Build up the template arguments and the raw and cooked strings for the template.
        // We start out with 'undefined' for the first argument and revisit later
        // to avoid walking over the template string twice and shifting all our arguments over after the fact.
        const templateArguments: Expression[] = [undefined!];
        const cookedStrings: Expression[] = [];
        const rawStrings: Expression[] = [];
        const template = node.template;

        if (level === ProcessLevel.LiftRestriction && !hasInvalidEscape(template)) {
            return visitEachChild(node, visitor, context);
        }

        if (isNoSubstitutionTemplateLiteral(template)) {
            cookedStrings.push(createTemplateCooked(template));
            rawStrings.push(getRawLiteral(template, currentSourceFile));
        }
        else {
            cookedStrings.push(createTemplateCooked(template.head));
            rawStrings.push(getRawLiteral(template.head, currentSourceFile));
            for (const templateSpan of template.templateSpans) {
                cookedStrings.push(createTemplateCooked(templateSpan.literal));
                rawStrings.push(getRawLiteral(templateSpan.literal, currentSourceFile));
                templateArguments.push(visitNode(templateSpan.expression, visitor, isExpression));
            }
        }

        const helperCall = context.getEmitHelperFactory().createTemplateObjectHelper(
            factory.createArrayLiteralExpression(cookedStrings),
            factory.createArrayLiteralExpression(rawStrings));

        // Create a variable to cache the template object if we're in a module.
        // Do not do this in the global scope, as any variable we currently generate could conflict with
        // variables from outside of the current compilation. In the future, we can revisit this behavior.
        if (isExternalModule(currentSourceFile)) {
            const tempVar = factory.createUniqueName("templateObject");
            recordTaggedTemplateString(tempVar);
            templateArguments[0] = factory.createLogicalOr(
                tempVar,
                factory.createAssignment(
                    tempVar,
                    helperCall)
            );
        }
        else {
            templateArguments[0] = helperCall;
        }

        return factory.createCallExpression(tag, /*typeArguments*/ undefined, templateArguments);
    }

    function createTemplateCooked(template: TemplateHead | TemplateMiddle | TemplateTail | NoSubstitutionTemplateLiteral) {
        return template.templateFlags ? factory.createVoidZero() : factory.createStringLiteral(template.text);
    }

    /**
     * Creates an ES5 compatible literal from an ES6 template literal.
     *
     * @param node The ES6 template literal.
     */
    function getRawLiteral(node: TemplateLiteralLikeNode, currentSourceFile: SourceFile) {
        const text = getRawTextOfTemplateLiteralLike(node, currentSourceFile);
        return setTextRange(factory.createStringLiteral(text), node);
    }
}
