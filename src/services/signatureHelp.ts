import * as ts from "./_namespaces/ts";

const enum InvocationKind { Call, TypeArgs, Contextual }
interface CallInvocation { readonly kind: InvocationKind.Call; readonly node: ts.CallLikeExpression; }
interface TypeArgsInvocation { readonly kind: InvocationKind.TypeArgs; readonly called: ts.Identifier; }
interface ContextualInvocation {
    readonly kind: InvocationKind.Contextual;
    readonly signature: ts.Signature;
    readonly node: ts.Node; // Just for enclosingDeclaration for printing types
    readonly symbol: ts.Symbol;
}
type Invocation = CallInvocation | TypeArgsInvocation | ContextualInvocation;

interface ArgumentListInfo {
    readonly isTypeParameterList: boolean;
    readonly invocation: Invocation;
    readonly argumentsSpan: ts.TextSpan;
    readonly argumentIndex: number;
    /** argumentCount is the *apparent* number of arguments. */
    readonly argumentCount: number;
}

/** @internal */
export function getSignatureHelpItems(program: ts.Program, sourceFile: ts.SourceFile, position: number, triggerReason: ts.SignatureHelpTriggerReason | undefined, cancellationToken: ts.CancellationToken): ts.SignatureHelpItems | undefined {
    const typeChecker = program.getTypeChecker();

    // Decide whether to show signature help
    const startingToken = ts.findTokenOnLeftOfPosition(sourceFile, position);
    if (!startingToken) {
        // We are at the beginning of the file
        return undefined;
    }

    // Only need to be careful if the user typed a character and signature help wasn't showing.
    const onlyUseSyntacticOwners = !!triggerReason && triggerReason.kind === "characterTyped";

    // Bail out quickly in the middle of a string or comment, don't provide signature help unless the user explicitly requested it.
    if (onlyUseSyntacticOwners && (ts.isInString(sourceFile, position, startingToken) || ts.isInComment(sourceFile, position))) {
        return undefined;
    }

    const isManuallyInvoked = !!triggerReason && triggerReason.kind === "invoked";
    const argumentInfo = getContainingArgumentInfo(startingToken, position, sourceFile, typeChecker, isManuallyInvoked);
    if (!argumentInfo) return undefined;

    cancellationToken.throwIfCancellationRequested();

    // Extra syntactic and semantic filtering of signature help
    const candidateInfo = getCandidateOrTypeInfo(argumentInfo, typeChecker, sourceFile, startingToken, onlyUseSyntacticOwners);
    cancellationToken.throwIfCancellationRequested();

    if (!candidateInfo) {
        // We didn't have any sig help items produced by the TS compiler.  If this is a JS
        // file, then see if we can figure out anything better.
        return ts.isSourceFileJS(sourceFile) ? createJSSignatureHelpItems(argumentInfo, program, cancellationToken) : undefined;
    }

    return typeChecker.runWithCancellationToken(cancellationToken, typeChecker =>
        candidateInfo.kind === CandidateOrTypeKind.Candidate
            ? createSignatureHelpItems(candidateInfo.candidates, candidateInfo.resolvedSignature, argumentInfo, sourceFile, typeChecker)
            : createTypeHelpItems(candidateInfo.symbol, argumentInfo, sourceFile, typeChecker));
}

const enum CandidateOrTypeKind { Candidate, Type }
interface CandidateInfo {
    readonly kind: CandidateOrTypeKind.Candidate;
    readonly candidates: readonly ts.Signature[];
    readonly resolvedSignature: ts.Signature;
}
interface TypeInfo {
    readonly kind: CandidateOrTypeKind.Type;
    readonly symbol: ts.Symbol;
}

function getCandidateOrTypeInfo({ invocation, argumentCount }: ArgumentListInfo, checker: ts.TypeChecker, sourceFile: ts.SourceFile, startingToken: ts.Node, onlyUseSyntacticOwners: boolean): CandidateInfo | TypeInfo | undefined {
    switch (invocation.kind) {
        case InvocationKind.Call: {
            if (onlyUseSyntacticOwners && !isSyntacticOwner(startingToken, invocation.node, sourceFile)) {
                return undefined;
            }
            const candidates: ts.Signature[] = [];
            const resolvedSignature = checker.getResolvedSignatureForSignatureHelp(invocation.node, candidates, argumentCount)!; // TODO: GH#18217
            return candidates.length === 0 ? undefined : { kind: CandidateOrTypeKind.Candidate, candidates, resolvedSignature };
        }
        case InvocationKind.TypeArgs: {
            const { called } = invocation;
            if (onlyUseSyntacticOwners && !containsPrecedingToken(startingToken, sourceFile, ts.isIdentifier(called) ? called.parent : called)) {
                return undefined;
            }
            const candidates = ts.getPossibleGenericSignatures(called, argumentCount, checker);
            if (candidates.length !== 0) return { kind: CandidateOrTypeKind.Candidate, candidates, resolvedSignature: ts.first(candidates) };

            const symbol = checker.getSymbolAtLocation(called);
            return symbol && { kind: CandidateOrTypeKind.Type, symbol };
        }
        case InvocationKind.Contextual:
            return { kind: CandidateOrTypeKind.Candidate, candidates: [invocation.signature], resolvedSignature: invocation.signature };
        default:
            return ts.Debug.assertNever(invocation);
    }
}

function isSyntacticOwner(startingToken: ts.Node, node: ts.CallLikeExpression, sourceFile: ts.SourceFile): boolean {
    if (!ts.isCallOrNewExpression(node)) return false;
    const invocationChildren = node.getChildren(sourceFile);
    switch (startingToken.kind) {
        case ts.SyntaxKind.OpenParenToken:
            return ts.contains(invocationChildren, startingToken);
        case ts.SyntaxKind.CommaToken: {
            const containingList = ts.findContainingList(startingToken);
            return !!containingList && ts.contains(invocationChildren, containingList);
        }
        case ts.SyntaxKind.LessThanToken:
            return containsPrecedingToken(startingToken, sourceFile, node.expression);
        default:
            return false;
    }
}

function createJSSignatureHelpItems(argumentInfo: ArgumentListInfo, program: ts.Program, cancellationToken: ts.CancellationToken): ts.SignatureHelpItems | undefined {
    if (argumentInfo.invocation.kind === InvocationKind.Contextual) return undefined;
    // See if we can find some symbol with the call expression name that has call signatures.
    const expression = getExpressionFromInvocation(argumentInfo.invocation);
    const name = ts.isPropertyAccessExpression(expression) ? expression.name.text : undefined;
    const typeChecker = program.getTypeChecker();
    return name === undefined ? undefined : ts.firstDefined(program.getSourceFiles(), sourceFile =>
        ts.firstDefined(sourceFile.getNamedDeclarations().get(name), declaration => {
            const type = declaration.symbol && typeChecker.getTypeOfSymbolAtLocation(declaration.symbol, declaration);
            const callSignatures = type && type.getCallSignatures();
            if (callSignatures && callSignatures.length) {
                return typeChecker.runWithCancellationToken(
                    cancellationToken,
                    typeChecker => createSignatureHelpItems(
                        callSignatures,
                        callSignatures[0],
                        argumentInfo,
                        sourceFile,
                        typeChecker,
                        /*useFullPrefix*/ true));
            }
        }));
}

function containsPrecedingToken(startingToken: ts.Node, sourceFile: ts.SourceFile, container: ts.Node) {
    const pos = startingToken.getFullStart();
    // There’s a possibility that `startingToken.parent` contains only `startingToken` and
    // missing nodes, none of which are valid to be returned by `findPrecedingToken`. In that
    // case, the preceding token we want is actually higher up the tree—almost definitely the
    // next parent, but theoretically the situation with missing nodes might be happening on
    // multiple nested levels.
    let currentParent: ts.Node | undefined = startingToken.parent;
    while (currentParent) {
        const precedingToken = ts.findPrecedingToken(pos, sourceFile, currentParent, /*excludeJsdoc*/ true);
        if (precedingToken) {
            return ts.rangeContainsRange(container, precedingToken);
        }
        currentParent = currentParent.parent;
    }
    return ts.Debug.fail("Could not find preceding token");
}

/** @internal */
export interface ArgumentInfoForCompletions {
    readonly invocation: ts.CallLikeExpression;
    readonly argumentIndex: number;
    readonly argumentCount: number;
}
/** @internal */
export function getArgumentInfoForCompletions(node: ts.Node, position: number, sourceFile: ts.SourceFile): ArgumentInfoForCompletions | undefined {
    const info = getImmediatelyContainingArgumentInfo(node, position, sourceFile);
    return !info || info.isTypeParameterList || info.invocation.kind !== InvocationKind.Call ? undefined
        : { invocation: info.invocation.node, argumentCount: info.argumentCount, argumentIndex: info.argumentIndex };
}

function getArgumentOrParameterListInfo(node: ts.Node, position: number, sourceFile: ts.SourceFile): { readonly list: ts.Node, readonly argumentIndex: number, readonly argumentCount: number, readonly argumentsSpan: ts.TextSpan } | undefined {
    const info = getArgumentOrParameterListAndIndex(node, sourceFile);
    if (!info) return undefined;
    const { list, argumentIndex } = info;

    const argumentCount = getArgumentCount(list, /*ignoreTrailingComma*/ ts.isInString(sourceFile, position, node));
    if (argumentIndex !== 0) {
        ts.Debug.assertLessThan(argumentIndex, argumentCount);
    }
    const argumentsSpan = getApplicableSpanForArguments(list, sourceFile);
    return { list, argumentIndex, argumentCount, argumentsSpan };
}
function getArgumentOrParameterListAndIndex(node: ts.Node, sourceFile: ts.SourceFile): { readonly list: ts.Node, readonly argumentIndex: number } | undefined {
    if (node.kind === ts.SyntaxKind.LessThanToken || node.kind === ts.SyntaxKind.OpenParenToken) {
        // Find the list that starts right *after* the < or ( token.
        // If the user has just opened a list, consider this item 0.
        return { list: getChildListThatStartsWithOpenerToken(node.parent, node, sourceFile), argumentIndex: 0 };
    }
    else {
        // findListItemInfo can return undefined if we are not in parent's argument list
        // or type argument list. This includes cases where the cursor is:
        //   - To the right of the closing parenthesis, non-substitution template, or template tail.
        //   - Between the type arguments and the arguments (greater than token)
        //   - On the target of the call (parent.func)
        //   - On the 'new' keyword in a 'new' expression
        const list = ts.findContainingList(node);
        return list && { list, argumentIndex: getArgumentIndex(list, node) };
    }
}

/**
 * Returns relevant information for the argument list and the current argument if we are
 * in the argument of an invocation; returns undefined otherwise.
 */
function getImmediatelyContainingArgumentInfo(node: ts.Node, position: number, sourceFile: ts.SourceFile): ArgumentListInfo | undefined {
    const { parent } = node;
    if (ts.isCallOrNewExpression(parent)) {
        const invocation = parent;

        // There are 3 cases to handle:
        //   1. The token introduces a list, and should begin a signature help session
        //   2. The token is either not associated with a list, or ends a list, so the session should end
        //   3. The token is buried inside a list, and should give signature help
        //
        // The following are examples of each:
        //
        //    Case 1:
        //          foo<#T, U>(#a, b)    -> The token introduces a list, and should begin a signature help session
        //    Case 2:
        //          fo#o<T, U>#(a, b)#   -> The token is either not associated with a list, or ends a list, so the session should end
        //    Case 3:
        //          foo<T#, U#>(a#, #b#) -> The token is buried inside a list, and should give signature help
        // Find out if 'node' is an argument, a type argument, or neither
        const info = getArgumentOrParameterListInfo(node, position, sourceFile);
        if (!info) return undefined;
        const { list, argumentIndex, argumentCount, argumentsSpan } = info;
        const isTypeParameterList = !!parent.typeArguments && parent.typeArguments.pos === list.pos;
        return { isTypeParameterList, invocation: { kind: InvocationKind.Call, node: invocation }, argumentsSpan, argumentIndex, argumentCount };
    }
    else if (ts.isNoSubstitutionTemplateLiteral(node) && ts.isTaggedTemplateExpression(parent)) {
        // Check if we're actually inside the template;
        // otherwise we'll fall out and return undefined.
        if (ts.isInsideTemplateLiteral(node, position, sourceFile)) {
            return getArgumentListInfoForTemplate(parent, /*argumentIndex*/ 0, sourceFile);
        }
        return undefined;
    }
    else if (ts.isTemplateHead(node) && parent.parent.kind === ts.SyntaxKind.TaggedTemplateExpression) {
        const templateExpression = parent as ts.TemplateExpression;
        const tagExpression = templateExpression.parent as ts.TaggedTemplateExpression;
        ts.Debug.assert(templateExpression.kind === ts.SyntaxKind.TemplateExpression);

        const argumentIndex = ts.isInsideTemplateLiteral(node, position, sourceFile) ? 0 : 1;

        return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
    }
    else if (ts.isTemplateSpan(parent) && ts.isTaggedTemplateExpression(parent.parent.parent)) {
        const templateSpan = parent;
        const tagExpression = parent.parent.parent;

        // If we're just after a template tail, don't show signature help.
        if (ts.isTemplateTail(node) && !ts.isInsideTemplateLiteral(node, position, sourceFile)) {
            return undefined;
        }

        const spanIndex = templateSpan.parent.templateSpans.indexOf(templateSpan);
        const argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node, position, sourceFile);

        return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
    }
    else if (ts.isJsxOpeningLikeElement(parent)) {
        // Provide a signature help for JSX opening element or JSX self-closing element.
        // This is not guarantee that JSX tag-name is resolved into stateless function component. (that is done in "getSignatureHelpItems")
        // i.e
        //      export function MainButton(props: ButtonProps, context: any): JSX.Element { ... }
        //      <MainButton /*signatureHelp*/
        const attributeSpanStart = parent.attributes.pos;
        const attributeSpanEnd = ts.skipTrivia(sourceFile.text, parent.attributes.end, /*stopAfterLineBreak*/ false);
        return {
            isTypeParameterList: false,
            invocation: { kind: InvocationKind.Call, node: parent },
            argumentsSpan: ts.createTextSpan(attributeSpanStart, attributeSpanEnd - attributeSpanStart),
            argumentIndex: 0,
            argumentCount: 1
        };
    }
    else {
        const typeArgInfo = ts.getPossibleTypeArgumentsInfo(node, sourceFile);
        if (typeArgInfo) {
            const { called, nTypeArguments } = typeArgInfo;
            const invocation: Invocation = { kind: InvocationKind.TypeArgs, called };
            const argumentsSpan = ts.createTextSpanFromBounds(called.getStart(sourceFile), node.end);
            return { isTypeParameterList: true, invocation, argumentsSpan, argumentIndex: nTypeArguments, argumentCount: nTypeArguments + 1 };
        }
        return undefined;
    }
}

function getImmediatelyContainingArgumentOrContextualParameterInfo(node: ts.Node, position: number, sourceFile: ts.SourceFile, checker: ts.TypeChecker): ArgumentListInfo | undefined {
    return tryGetParameterInfo(node, position, sourceFile, checker) || getImmediatelyContainingArgumentInfo(node, position, sourceFile);
}

function getHighestBinary(b: ts.BinaryExpression): ts.BinaryExpression {
    return ts.isBinaryExpression(b.parent) ? getHighestBinary(b.parent) : b;
}

function countBinaryExpressionParameters(b: ts.BinaryExpression): number {
    return ts.isBinaryExpression(b.left) ? countBinaryExpressionParameters(b.left) + 1 : 2;
}

function tryGetParameterInfo(startingToken: ts.Node, position: number, sourceFile: ts.SourceFile, checker: ts.TypeChecker): ArgumentListInfo | undefined {
    const info = getContextualSignatureLocationInfo(startingToken, sourceFile, position, checker);
    if (!info) return undefined;
    const { contextualType, argumentIndex, argumentCount, argumentsSpan } = info;

    // for optional function condition.
    const nonNullableContextualType = contextualType.getNonNullableType();

    const symbol = nonNullableContextualType.symbol;
    if (symbol === undefined) return undefined;

    const signature = ts.lastOrUndefined(nonNullableContextualType.getCallSignatures());
    if (signature === undefined) return undefined;

    const invocation: ContextualInvocation = { kind: InvocationKind.Contextual, signature, node: startingToken, symbol: chooseBetterSymbol(symbol) };
    return { isTypeParameterList: false, invocation, argumentsSpan, argumentIndex, argumentCount };
}

interface ContextualSignatureLocationInfo { readonly contextualType: ts.Type; readonly argumentIndex: number; readonly argumentCount: number; readonly argumentsSpan: ts.TextSpan; }
function getContextualSignatureLocationInfo(startingToken: ts.Node, sourceFile: ts.SourceFile, position: number, checker: ts.TypeChecker): ContextualSignatureLocationInfo | undefined {
    if (startingToken.kind !== ts.SyntaxKind.OpenParenToken && startingToken.kind !== ts.SyntaxKind.CommaToken) return undefined;
    const { parent } = startingToken;
    switch (parent.kind) {
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            const info = getArgumentOrParameterListInfo(startingToken, position, sourceFile);
            if (!info) return undefined;
            const { argumentIndex, argumentCount, argumentsSpan } = info;
            const contextualType = ts.isMethodDeclaration(parent) ? checker.getContextualTypeForObjectLiteralElement(parent) : checker.getContextualType(parent as ts.ParenthesizedExpression | ts.FunctionExpression | ts.ArrowFunction);
            return contextualType && { contextualType, argumentIndex, argumentCount, argumentsSpan };
        case ts.SyntaxKind.BinaryExpression: {
            const highestBinary = getHighestBinary(parent as ts.BinaryExpression);
            const contextualType = checker.getContextualType(highestBinary);
            const argumentIndex = startingToken.kind === ts.SyntaxKind.OpenParenToken ? 0 : countBinaryExpressionParameters(parent as ts.BinaryExpression) - 1;
            const argumentCount = countBinaryExpressionParameters(highestBinary);
            return contextualType && { contextualType, argumentIndex, argumentCount, argumentsSpan: ts.createTextSpanFromNode(parent) };
        }
        default:
            return undefined;
    }
}

// The type of a function type node has a symbol at that node, but it's better to use the symbol for a parameter or type alias.
function chooseBetterSymbol(s: ts.Symbol): ts.Symbol {
    return s.name === ts.InternalSymbolName.Type
        ? ts.firstDefined(s.declarations, d => ts.isFunctionTypeNode(d) ? d.parent.symbol : undefined) || s
        : s;
}

function getArgumentIndex(argumentsList: ts.Node, node: ts.Node) {
    // The list we got back can include commas.  In the presence of errors it may
    // also just have nodes without commas.  For example "Foo(a b c)" will have 3
    // args without commas. We want to find what index we're at.  So we count
    // forward until we hit ourselves, only incrementing the index if it isn't a
    // comma.
    //
    // Note: the subtlety around trailing commas (in getArgumentCount) does not apply
    // here.  That's because we're only walking forward until we hit the node we're
    // on.  In that case, even if we're after the trailing comma, we'll still see
    // that trailing comma in the list, and we'll have generated the appropriate
    // arg index.
    let argumentIndex = 0;
    for (const child of argumentsList.getChildren()) {
        if (child === node) {
            break;
        }
        if (child.kind !== ts.SyntaxKind.CommaToken) {
            argumentIndex++;
        }
    }

    return argumentIndex;
}

function getArgumentCount(argumentsList: ts.Node, ignoreTrailingComma: boolean) {
    // The argument count for a list is normally the number of non-comma children it has.
    // For example, if you have "Foo(a,b)" then there will be three children of the arg
    // list 'a' '<comma>' 'b'.  So, in this case the arg count will be 2.  However, there
    // is a small subtlety.  If you have "Foo(a,)", then the child list will just have
    // 'a' '<comma>'.  So, in the case where the last child is a comma, we increase the
    // arg count by one to compensate.
    //
    // Note: this subtlety only applies to the last comma.  If you had "Foo(a,," then
    // we'll have: 'a' '<comma>' '<missing>'
    // That will give us 2 non-commas.  We then add one for the last comma, giving us an
    // arg count of 3.
    const listChildren = argumentsList.getChildren();

    let argumentCount = ts.countWhere(listChildren, arg => arg.kind !== ts.SyntaxKind.CommaToken);
    if (!ignoreTrailingComma && listChildren.length > 0 && ts.last(listChildren).kind === ts.SyntaxKind.CommaToken) {
        argumentCount++;
    }
    return argumentCount;
}

// spanIndex is either the index for a given template span.
// This does not give appropriate results for a NoSubstitutionTemplateLiteral
function getArgumentIndexForTemplatePiece(spanIndex: number, node: ts.Node, position: number, sourceFile: ts.SourceFile): number {
    // Because the TemplateStringsArray is the first argument, we have to offset each substitution expression by 1.
    // There are three cases we can encounter:
    //      1. We are precisely in the template literal (argIndex = 0).
    //      2. We are in or to the right of the substitution expression (argIndex = spanIndex + 1).
    //      3. We are directly to the right of the template literal, but because we look for the token on the left,
    //          not enough to put us in the substitution expression; we should consider ourselves part of
    //          the *next* span's expression by offsetting the index (argIndex = (spanIndex + 1) + 1).
    //
    /* eslint-disable local/no-double-space */
    // Example: f  `# abcd $#{#  1 + 1#  }# efghi ${ #"#hello"#  }  #  `
    //              ^       ^ ^       ^   ^          ^ ^      ^     ^
    // Case:        1       1 3       2   1          3 2      2     1
    /* eslint-enable local/no-double-space */
    ts.Debug.assert(position >= node.getStart(), "Assumed 'position' could not occur before node.");
    if (ts.isTemplateLiteralToken(node)) {
        if (ts.isInsideTemplateLiteral(node, position, sourceFile)) {
            return 0;
        }
        return spanIndex + 2;
    }
    return spanIndex + 1;
}

function getArgumentListInfoForTemplate(tagExpression: ts.TaggedTemplateExpression, argumentIndex: number, sourceFile: ts.SourceFile): ArgumentListInfo {
    // argumentCount is either 1 or (numSpans + 1) to account for the template strings array argument.
    const argumentCount = ts.isNoSubstitutionTemplateLiteral(tagExpression.template) ? 1 : tagExpression.template.templateSpans.length + 1;
    if (argumentIndex !== 0) {
        ts.Debug.assertLessThan(argumentIndex, argumentCount);
    }
    return {
        isTypeParameterList: false,
        invocation: { kind: InvocationKind.Call, node: tagExpression },
        argumentsSpan: getApplicableSpanForTaggedTemplate(tagExpression, sourceFile),
        argumentIndex,
        argumentCount
    };
}

function getApplicableSpanForArguments(argumentsList: ts.Node, sourceFile: ts.SourceFile): ts.TextSpan {
    // We use full start and skip trivia on the end because we want to include trivia on
    // both sides. For example,
    //
    //    foo(   /*comment */     a, b, c      /*comment*/     )
    //        |                                               |
    //
    // The applicable span is from the first bar to the second bar (inclusive,
    // but not including parentheses)
    const applicableSpanStart = argumentsList.getFullStart();
    const applicableSpanEnd = ts.skipTrivia(sourceFile.text, argumentsList.getEnd(), /*stopAfterLineBreak*/ false);
    return ts.createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
}

function getApplicableSpanForTaggedTemplate(taggedTemplate: ts.TaggedTemplateExpression, sourceFile: ts.SourceFile): ts.TextSpan {
    const template = taggedTemplate.template;
    const applicableSpanStart = template.getStart();
    let applicableSpanEnd = template.getEnd();

    // We need to adjust the end position for the case where the template does not have a tail.
    // Otherwise, we will not show signature help past the expression.
    // For example,
    //
    //      ` ${ 1 + 1 foo(10)
    //       |       |
    // This is because a Missing node has no width. However, what we actually want is to include trivia
    // leading up to the next token in case the user is about to type in a TemplateMiddle or TemplateTail.
    if (template.kind === ts.SyntaxKind.TemplateExpression) {
        const lastSpan = ts.last(template.templateSpans);
        if (lastSpan.literal.getFullWidth() === 0) {
            applicableSpanEnd = ts.skipTrivia(sourceFile.text, applicableSpanEnd, /*stopAfterLineBreak*/ false);
        }
    }

    return ts.createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
}

function getContainingArgumentInfo(node: ts.Node, position: number, sourceFile: ts.SourceFile, checker: ts.TypeChecker, isManuallyInvoked: boolean): ArgumentListInfo | undefined {
    for (let n = node; !ts.isSourceFile(n) && (isManuallyInvoked || !ts.isBlock(n)); n = n.parent) {
        // If the node is not a subspan of its parent, this is a big problem.
        // There have been crashes that might be caused by this violation.
        ts.Debug.assert(ts.rangeContainsRange(n.parent, n), "Not a subspan", () => `Child: ${ts.Debug.formatSyntaxKind(n.kind)}, parent: ${ts.Debug.formatSyntaxKind(n.parent.kind)}`);
        const argumentInfo = getImmediatelyContainingArgumentOrContextualParameterInfo(n, position, sourceFile, checker);
        if (argumentInfo) {
            return argumentInfo;
        }
    }
    return undefined;
}

function getChildListThatStartsWithOpenerToken(parent: ts.Node, openerToken: ts.Node, sourceFile: ts.SourceFile): ts.Node {
    const children = parent.getChildren(sourceFile);
    const indexOfOpenerToken = children.indexOf(openerToken);
    ts.Debug.assert(indexOfOpenerToken >= 0 && children.length > indexOfOpenerToken + 1);
    return children[indexOfOpenerToken + 1];
}

function getExpressionFromInvocation(invocation: CallInvocation | TypeArgsInvocation): ts.Expression {
    return invocation.kind === InvocationKind.Call ? ts.getInvokedExpression(invocation.node) : invocation.called;
}

function getEnclosingDeclarationFromInvocation(invocation: Invocation): ts.Node {
    return invocation.kind === InvocationKind.Call ? invocation.node : invocation.kind === InvocationKind.TypeArgs ? invocation.called : invocation.node;
}

const signatureHelpNodeBuilderFlags = ts.NodeBuilderFlags.OmitParameterModifiers | ts.NodeBuilderFlags.IgnoreErrors | ts.NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;
function createSignatureHelpItems(
    candidates: readonly ts.Signature[],
    resolvedSignature: ts.Signature,
    { isTypeParameterList, argumentCount, argumentsSpan: applicableSpan, invocation, argumentIndex }: ArgumentListInfo,
    sourceFile: ts.SourceFile,
    typeChecker: ts.TypeChecker,
    useFullPrefix?: boolean,
): ts.SignatureHelpItems {
    const enclosingDeclaration = getEnclosingDeclarationFromInvocation(invocation);
    const callTargetSymbol = invocation.kind === InvocationKind.Contextual ? invocation.symbol : (typeChecker.getSymbolAtLocation(getExpressionFromInvocation(invocation)) || useFullPrefix && resolvedSignature.declaration?.symbol);
    const callTargetDisplayParts = callTargetSymbol ? ts.symbolToDisplayParts(typeChecker, callTargetSymbol, useFullPrefix ? sourceFile : undefined, /*meaning*/ undefined) : ts.emptyArray;
    const items = ts.map(candidates, candidateSignature => getSignatureHelpItem(candidateSignature, callTargetDisplayParts, isTypeParameterList, typeChecker, enclosingDeclaration, sourceFile));

    if (argumentIndex !== 0) {
        ts.Debug.assertLessThan(argumentIndex, argumentCount);
    }
    let selectedItemIndex = 0;
    let itemsSeen = 0;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (candidates[i] === resolvedSignature) {
            selectedItemIndex = itemsSeen;
            if (item.length > 1) {
                // check to see if any items in the list better match than the first one, as the checker isn't filtering the nested lists
                // (those come from tuple parameter expansion)
                let count = 0;
                for (const i of item) {
                    if (i.isVariadic || i.parameters.length >= argumentCount) {
                        selectedItemIndex = itemsSeen + count;
                        break;
                    }
                    count++;
                }
            }
        }
        itemsSeen += item.length;
    }

    ts.Debug.assert(selectedItemIndex !== -1); // If candidates is non-empty it should always include bestSignature. We check for an empty candidates before calling this function.
    const help = { items: ts.flatMapToMutable(items, ts.identity), applicableSpan, selectedItemIndex, argumentIndex, argumentCount };
    const selected = help.items[selectedItemIndex];
    if (selected.isVariadic) {
        const firstRest = ts.findIndex(selected.parameters, p => !!p.isRest);
        if (-1 < firstRest && firstRest < selected.parameters.length - 1) {
            // We don't have any code to get this correct; instead, don't highlight a current parameter AT ALL
            help.argumentIndex = selected.parameters.length;
        }
        else {
            help.argumentIndex = Math.min(help.argumentIndex, selected.parameters.length - 1);
        }
    }
    return help;
}

function createTypeHelpItems(
    symbol: ts.Symbol,
    { argumentCount, argumentsSpan: applicableSpan, invocation, argumentIndex }: ArgumentListInfo,
    sourceFile: ts.SourceFile,
    checker: ts.TypeChecker
): ts.SignatureHelpItems | undefined {
    const typeParameters = checker.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
    if (!typeParameters) return undefined;
    const items = [getTypeHelpItem(symbol, typeParameters, checker, getEnclosingDeclarationFromInvocation(invocation), sourceFile)];
    return { items, applicableSpan, selectedItemIndex: 0, argumentIndex, argumentCount };
}

function getTypeHelpItem(symbol: ts.Symbol, typeParameters: readonly ts.TypeParameter[], checker: ts.TypeChecker, enclosingDeclaration: ts.Node, sourceFile: ts.SourceFile): ts.SignatureHelpItem {
    const typeSymbolDisplay = ts.symbolToDisplayParts(checker, symbol);

    const printer = ts.createPrinter({ removeComments: true });
    const parameters = typeParameters.map(t => createSignatureHelpParameterForTypeParameter(t, checker, enclosingDeclaration, sourceFile, printer));

    const documentation = symbol.getDocumentationComment(checker);
    const tags = symbol.getJsDocTags(checker);
    const prefixDisplayParts = [...typeSymbolDisplay, ts.punctuationPart(ts.SyntaxKind.LessThanToken)];
    return { isVariadic: false, prefixDisplayParts, suffixDisplayParts: [ts.punctuationPart(ts.SyntaxKind.GreaterThanToken)], separatorDisplayParts, parameters, documentation, tags };
}

const separatorDisplayParts: ts.SymbolDisplayPart[] = [ts.punctuationPart(ts.SyntaxKind.CommaToken), ts.spacePart()];

function getSignatureHelpItem(candidateSignature: ts.Signature, callTargetDisplayParts: readonly ts.SymbolDisplayPart[], isTypeParameterList: boolean, checker: ts.TypeChecker, enclosingDeclaration: ts.Node, sourceFile: ts.SourceFile): ts.SignatureHelpItem[] {
    const infos = (isTypeParameterList ? itemInfoForTypeParameters : itemInfoForParameters)(candidateSignature, checker, enclosingDeclaration, sourceFile);
    return ts.map(infos, ({ isVariadic, parameters, prefix, suffix }) => {
        const prefixDisplayParts = [...callTargetDisplayParts, ...prefix];
        const suffixDisplayParts = [...suffix, ...returnTypeToDisplayParts(candidateSignature, enclosingDeclaration, checker)];
        const documentation = candidateSignature.getDocumentationComment(checker);
        const tags = candidateSignature.getJsDocTags();
        return { isVariadic, prefixDisplayParts, suffixDisplayParts, separatorDisplayParts, parameters, documentation, tags };
    });
}

function returnTypeToDisplayParts(candidateSignature: ts.Signature, enclosingDeclaration: ts.Node, checker: ts.TypeChecker): readonly ts.SymbolDisplayPart[] {
    return ts.mapToDisplayParts(writer => {
        writer.writePunctuation(":");
        writer.writeSpace(" ");
        const predicate = checker.getTypePredicateOfSignature(candidateSignature);
        if (predicate) {
            checker.writeTypePredicate(predicate, enclosingDeclaration, /*flags*/ undefined, writer);
        }
        else {
            checker.writeType(checker.getReturnTypeOfSignature(candidateSignature), enclosingDeclaration, /*flags*/ undefined, writer);
        }
    });
}

interface SignatureHelpItemInfo { readonly isVariadic: boolean; readonly parameters: ts.SignatureHelpParameter[]; readonly prefix: readonly ts.SymbolDisplayPart[]; readonly suffix: readonly ts.SymbolDisplayPart[]; }

function itemInfoForTypeParameters(candidateSignature: ts.Signature, checker: ts.TypeChecker, enclosingDeclaration: ts.Node, sourceFile: ts.SourceFile): SignatureHelpItemInfo[] {
    const typeParameters = (candidateSignature.target || candidateSignature).typeParameters;
    const printer = ts.createPrinter({ removeComments: true });
    const parameters = (typeParameters || ts.emptyArray).map(t => createSignatureHelpParameterForTypeParameter(t, checker, enclosingDeclaration, sourceFile, printer));
    const thisParameter = candidateSignature.thisParameter ? [checker.symbolToParameterDeclaration(candidateSignature.thisParameter, enclosingDeclaration, signatureHelpNodeBuilderFlags)!] : [];

    return checker.getExpandedParameters(candidateSignature).map(paramList => {
        const params = ts.factory.createNodeArray([...thisParameter, ...ts.map(paramList, param => checker.symbolToParameterDeclaration(param, enclosingDeclaration, signatureHelpNodeBuilderFlags)!)]);
        const parameterParts = ts.mapToDisplayParts(writer => {
            printer.writeList(ts.ListFormat.CallExpressionArguments, params, sourceFile, writer);
        });
        return { isVariadic: false, parameters, prefix: [ts.punctuationPart(ts.SyntaxKind.LessThanToken)], suffix: [ts.punctuationPart(ts.SyntaxKind.GreaterThanToken), ...parameterParts] };
    });
}

function itemInfoForParameters(candidateSignature: ts.Signature, checker: ts.TypeChecker, enclosingDeclaration: ts.Node, sourceFile: ts.SourceFile): SignatureHelpItemInfo[] {
    const printer = ts.createPrinter({ removeComments: true });
    const typeParameterParts = ts.mapToDisplayParts(writer => {
        if (candidateSignature.typeParameters && candidateSignature.typeParameters.length) {
            const args = ts.factory.createNodeArray(candidateSignature.typeParameters.map(p => checker.typeParameterToDeclaration(p, enclosingDeclaration, signatureHelpNodeBuilderFlags)!));
            printer.writeList(ts.ListFormat.TypeParameters, args, sourceFile, writer);
        }
    });
    const lists = checker.getExpandedParameters(candidateSignature);
    const isVariadic: (parameterList: readonly ts.Symbol[]) => boolean =
        !checker.hasEffectiveRestParameter(candidateSignature) ? _ => false
        : lists.length === 1 ? _ => true
        : pList => !!(pList.length && (pList[pList.length - 1] as ts.TransientSymbol).checkFlags & ts.CheckFlags.RestParameter);
    return lists.map(parameterList => ({
        isVariadic: isVariadic(parameterList),
        parameters: parameterList.map(p => createSignatureHelpParameterForParameter(p, checker, enclosingDeclaration, sourceFile, printer)),
        prefix: [...typeParameterParts, ts.punctuationPart(ts.SyntaxKind.OpenParenToken)],
        suffix: [ts.punctuationPart(ts.SyntaxKind.CloseParenToken)]
    }));
}

function createSignatureHelpParameterForParameter(parameter: ts.Symbol, checker: ts.TypeChecker, enclosingDeclaration: ts.Node, sourceFile: ts.SourceFile, printer: ts.Printer): ts.SignatureHelpParameter {
    const displayParts = ts.mapToDisplayParts(writer => {
        const param = checker.symbolToParameterDeclaration(parameter, enclosingDeclaration, signatureHelpNodeBuilderFlags)!;
        printer.writeNode(ts.EmitHint.Unspecified, param, sourceFile, writer);
    });
    const isOptional = checker.isOptionalParameter(parameter.valueDeclaration as ts.ParameterDeclaration);
    const isRest = !!((parameter as ts.TransientSymbol).checkFlags & ts.CheckFlags.RestParameter);
    return { name: parameter.name, documentation: parameter.getDocumentationComment(checker), displayParts, isOptional, isRest };
}

function createSignatureHelpParameterForTypeParameter(typeParameter: ts.TypeParameter, checker: ts.TypeChecker, enclosingDeclaration: ts.Node, sourceFile: ts.SourceFile, printer: ts.Printer): ts.SignatureHelpParameter {
    const displayParts = ts.mapToDisplayParts(writer => {
        const param = checker.typeParameterToDeclaration(typeParameter, enclosingDeclaration, signatureHelpNodeBuilderFlags)!;
        printer.writeNode(ts.EmitHint.Unspecified, param, sourceFile, writer);
    });
    return { name: typeParameter.symbol.name, documentation: typeParameter.symbol.getDocumentationComment(checker), displayParts, isOptional: false, isRest: false };
}
