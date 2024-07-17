import {
    CallExpression,
    Debug,
    Expression,
    getSourceTextOfNodeFromSourceFile,
    hasInvalidEscape,
    Identifier,
    isExpression,
    isExternalModule,
    isNoSubstitutionTemplateLiteral,
    NodeFactory,
    NoSubstitutionTemplateLiteral,
    setTextRange,
    SourceFile,
    SyntaxKind,
    TaggedTemplateExpression,
    TemplateHead,
    TemplateLiteralLikeNode,
    TemplateMiddle,
    TemplateTail,
    TokenFlags,
    TransformationContext,
    visitEachChild,
    visitNode,
    Visitor,
} from "../_namespaces/ts.js";

/** @internal */
export enum ProcessLevel {
    LiftRestriction,
    All,
}

/** @internal */
export function processTaggedTemplateExpression(
    context: TransformationContext,
    node: TaggedTemplateExpression,
    visitor: Visitor,
    currentSourceFile: SourceFile,
    recordTaggedTemplateString: (temp: Identifier) => void,
    level: ProcessLevel,
): CallExpression | TaggedTemplateExpression {
    // Visit the tag expression
    const tag = visitNode(node.tag, visitor, isExpression);
    Debug.assert(tag);

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

    const { factory } = context;

    if (isNoSubstitutionTemplateLiteral(template)) {
        cookedStrings.push(createTemplateCooked(factory, template));
        rawStrings.push(getRawLiteral(factory, template, currentSourceFile));
    }
    else {
        cookedStrings.push(createTemplateCooked(factory, template.head));
        rawStrings.push(getRawLiteral(factory, template.head, currentSourceFile));
        for (const templateSpan of template.templateSpans) {
            cookedStrings.push(createTemplateCooked(factory, templateSpan.literal));
            rawStrings.push(getRawLiteral(factory, templateSpan.literal, currentSourceFile));
            templateArguments.push(Debug.checkDefined(visitNode(templateSpan.expression, visitor, isExpression)));
        }
    }

    const helperCall = context.getEmitHelperFactory().createTemplateObjectHelper(
        factory.createArrayLiteralExpression(cookedStrings),
        factory.createArrayLiteralExpression(rawStrings),
    );

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
                helperCall,
            ),
        );
    }
    else {
        templateArguments[0] = helperCall;
    }

    return factory.createCallExpression(tag, /*typeArguments*/ undefined, templateArguments);
}

function createTemplateCooked(factory: NodeFactory, template: TemplateHead | TemplateMiddle | TemplateTail | NoSubstitutionTemplateLiteral) {
    return template.templateFlags! & TokenFlags.IsInvalid ? factory.createVoidZero() : factory.createStringLiteral(template.text);
}

/**
 * Creates an ES5 compatible literal from an ES6 template literal.
 *
 * @param node The ES6 template literal.
 */
function getRawLiteral(factory: NodeFactory, node: TemplateLiteralLikeNode, currentSourceFile: SourceFile) {
    // Find original source text, since we need to emit the raw strings of the tagged template.
    // The raw strings contain the (escaped) strings of what the user wrote.
    // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
    let text = node.rawText;
    if (text === undefined) {
        Debug.assertIsDefined(currentSourceFile, "Template literal node is missing 'rawText' and does not have a source file. Possibly bad transform.");
        text = getSourceTextOfNodeFromSourceFile(currentSourceFile, node);

        // text contains the original source, it will also contain quotes ("`"), dolar signs and braces ("${" and "}"),
        // thus we need to remove those characters.
        // First template piece starts with "`", others with "}"
        // Last template piece ends with "`", others with "${"
        const isLast = node.kind === SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === SyntaxKind.TemplateTail;
        text = text.substring(1, text.length - (isLast ? 1 : 2));
    }

    // Newline normalization:
    // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
    // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
    text = text.replace(/\r\n?/g, "\n");
    return setTextRange(factory.createStringLiteral(text), node);
}
