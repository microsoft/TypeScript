import * as ts from "../_namespaces/ts";

/** @internal */
export enum ProcessLevel {
    LiftRestriction,
    All
}

/** @internal */
export function processTaggedTemplateExpression(
    context: ts.TransformationContext,
    node: ts.TaggedTemplateExpression,
    visitor: ts.Visitor,
    currentSourceFile: ts.SourceFile,
    recordTaggedTemplateString: (temp: ts.Identifier) => void,
    level: ProcessLevel) {

    // Visit the tag expression
    const tag = ts.visitNode(node.tag, visitor, ts.isExpression);

    // Build up the template arguments and the raw and cooked strings for the template.
    // We start out with 'undefined' for the first argument and revisit later
    // to avoid walking over the template string twice and shifting all our arguments over after the fact.
    const templateArguments: ts.Expression[] = [undefined!];
    const cookedStrings: ts.Expression[] = [];
    const rawStrings: ts.Expression[] = [];
    const template = node.template;

    if (level === ProcessLevel.LiftRestriction && !ts.hasInvalidEscape(template)) {
        return ts.visitEachChild(node, visitor, context);
    }

    if (ts.isNoSubstitutionTemplateLiteral(template)) {
        cookedStrings.push(createTemplateCooked(template));
        rawStrings.push(getRawLiteral(template, currentSourceFile));
    }
    else {
        cookedStrings.push(createTemplateCooked(template.head));
        rawStrings.push(getRawLiteral(template.head, currentSourceFile));
        for (const templateSpan of template.templateSpans) {
            cookedStrings.push(createTemplateCooked(templateSpan.literal));
            rawStrings.push(getRawLiteral(templateSpan.literal, currentSourceFile));
            templateArguments.push(ts.visitNode(templateSpan.expression, visitor, ts.isExpression));
        }
    }

    const helperCall = context.getEmitHelperFactory().createTemplateObjectHelper(
        ts.factory.createArrayLiteralExpression(cookedStrings),
        ts.factory.createArrayLiteralExpression(rawStrings));

    // Create a variable to cache the template object if we're in a module.
    // Do not do this in the global scope, as any variable we currently generate could conflict with
    // variables from outside of the current compilation. In the future, we can revisit this behavior.
    if (ts.isExternalModule(currentSourceFile)) {
        const tempVar = ts.factory.createUniqueName("templateObject");
        recordTaggedTemplateString(tempVar);
        templateArguments[0] = ts.factory.createLogicalOr(
            tempVar,
            ts.factory.createAssignment(
                tempVar,
                helperCall)
        );
    }
    else {
        templateArguments[0] = helperCall;
    }

    return ts.factory.createCallExpression(tag, /*typeArguments*/ undefined, templateArguments);
}

function createTemplateCooked(template: ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail | ts.NoSubstitutionTemplateLiteral) {
    return template.templateFlags ? ts.factory.createVoidZero() : ts.factory.createStringLiteral(template.text);
}

/**
 * Creates an ES5 compatible literal from an ES6 template literal.
 *
 * @param node The ES6 template literal.
 */
function getRawLiteral(node: ts.TemplateLiteralLikeNode, currentSourceFile: ts.SourceFile) {
    // Find original source text, since we need to emit the raw strings of the tagged template.
    // The raw strings contain the (escaped) strings of what the user wrote.
    // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
    let text = node.rawText;
    if (text === undefined) {
        ts.Debug.assertIsDefined(currentSourceFile,
                              "Template literal node is missing 'rawText' and does not have a source file. Possibly bad transform.");
        text = ts.getSourceTextOfNodeFromSourceFile(currentSourceFile, node);

        // text contains the original source, it will also contain quotes ("`"), dolar signs and braces ("${" and "}"),
        // thus we need to remove those characters.
        // First template piece starts with "`", others with "}"
        // Last template piece ends with "`", others with "${"
        const isLast = node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === ts.SyntaxKind.TemplateTail;
        text = text.substring(1, text.length - (isLast ? 1 : 2));
    }

    // Newline normalization:
    // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
    // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
    text = text.replace(/\r\n?/g, "\n");
    return ts.setTextRange(ts.factory.createStringLiteral(text), node);
}
