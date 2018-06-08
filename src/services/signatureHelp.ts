/* @internal */
namespace ts.SignatureHelp {
    const enum ArgumentListKind {
        TypeArguments,
        CallArguments,
        TaggedTemplateArguments,
        JSXAttributesArguments
    }

    const enum InvocationKind { Call, TypeArgs }
    type Invocation = { kind: InvocationKind.Call, node: CallLikeExpression } | { kind: InvocationKind.TypeArgs, called: Expression };

    interface ArgumentListInfo {
        kind: ArgumentListKind;
        invocation: Invocation;
        argumentsSpan: TextSpan;
        argumentIndex: number;
        /** argumentCount is the *apparent* number of arguments. */
        argumentCount: number;
    }

    export function getSignatureHelpItems(program: Program, sourceFile: SourceFile, position: number, cancellationToken: CancellationToken): SignatureHelpItems | undefined {
        const typeChecker = program.getTypeChecker();

        // Decide whether to show signature help
        const startingToken = findTokenOnLeftOfPosition(sourceFile, position);
        if (!startingToken) {
            // We are at the beginning of the file
            return undefined;
        }

        const argumentInfo = getContainingArgumentInfo(startingToken, position, sourceFile);
        if (!argumentInfo) return undefined;

        cancellationToken.throwIfCancellationRequested();

        // Semantic filtering of signature help
        const candidateInfo = getCandidateInfo(argumentInfo, typeChecker);
        cancellationToken.throwIfCancellationRequested();

        if (!candidateInfo) {
            // We didn't have any sig help items produced by the TS compiler.  If this is a JS
            // file, then see if we can figure out anything better.
            if (isSourceFileJavaScript(sourceFile)) {
                return createJavaScriptSignatureHelpItems(argumentInfo, program, cancellationToken);
            }
            return undefined;
        }

        return typeChecker.runWithCancellationToken(cancellationToken, typeChecker => createSignatureHelpItems(candidateInfo.candidates, candidateInfo.resolvedSignature, argumentInfo, sourceFile, typeChecker));
    }

    function getCandidateInfo(argumentInfo: ArgumentListInfo, checker: TypeChecker): { readonly candidates: ReadonlyArray<Signature>, readonly resolvedSignature: Signature } | undefined {
        const { invocation } = argumentInfo;
        if (invocation.kind === InvocationKind.Call) {
            const candidates: Signature[] = [];
            const resolvedSignature = checker.getResolvedSignature(invocation.node, candidates, argumentInfo.argumentCount)!; // TODO: GH#18217
            return candidates.length === 0 ? undefined : { candidates, resolvedSignature };
        }
        else {
            const type = checker.getTypeAtLocation(invocation.called)!; // TODO: GH#18217
            const signatures = isNewExpression(invocation.called.parent) ? type.getConstructSignatures() : type.getCallSignatures();
            const candidates = signatures.filter(candidate => !!candidate.typeParameters && candidate.typeParameters.length >= argumentInfo.argumentCount);
            return candidates.length === 0 ? undefined : { candidates, resolvedSignature: first(candidates) };
        }
    }

    function createJavaScriptSignatureHelpItems(argumentInfo: ArgumentListInfo, program: Program, cancellationToken: CancellationToken): SignatureHelpItems | undefined {
        // See if we can find some symbol with the call expression name that has call signatures.
        const expression = getExpressionFromInvocation(argumentInfo.invocation);
        const name = isIdentifier(expression) ? expression : isPropertyAccessExpression(expression) ? expression.name : undefined;
        if (!name || !name.escapedText) {
            return undefined;
        }

        const typeChecker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
            const nameToDeclarations = sourceFile.getNamedDeclarations();
            const declarations = nameToDeclarations.get(name.text);

            if (declarations) {
                for (const declaration of declarations) {
                    const symbol = declaration.symbol;
                    if (symbol) {
                        const type = typeChecker.getTypeOfSymbolAtLocation(symbol, declaration);
                        if (type) {
                            const callSignatures = type.getCallSignatures();
                            if (callSignatures && callSignatures.length) {
                                return typeChecker.runWithCancellationToken(cancellationToken, typeChecker => createSignatureHelpItems(callSignatures, callSignatures[0], argumentInfo, sourceFile, typeChecker));
                            }
                        }
                    }
                }
            }
        }
    }

    export interface ArgumentInfoForCompletions {
        readonly invocation: CallLikeExpression;
        readonly argumentIndex: number;
        readonly argumentCount: number;
    }
    export function getArgumentInfoForCompletions(node: Node, position: number, sourceFile: SourceFile): ArgumentInfoForCompletions | undefined {
        const info = getImmediatelyContainingArgumentInfo(node, position, sourceFile);
        return !info || info.kind === ArgumentListKind.TypeArguments || info.invocation.kind === InvocationKind.TypeArgs ? undefined
            : { invocation: info.invocation.node, argumentCount: info.argumentCount, argumentIndex: info.argumentIndex };
    }

    /**
     * Returns relevant information for the argument list and the current argument if we are
     * in the argument of an invocation; returns undefined otherwise.
     */
    function getImmediatelyContainingArgumentInfo(node: Node, position: number, sourceFile: SourceFile): ArgumentListInfo | undefined {
        const { parent } = node;
        if (isCallOrNewExpression(parent)) {
            const invocation = parent;
            let list: Node | undefined;
            let argumentIndex: number;

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
            if (node.kind === SyntaxKind.LessThanToken || node.kind === SyntaxKind.OpenParenToken) {
                // Find the list that starts right *after* the < or ( token.
                // If the user has just opened a list, consider this item 0.
                list = getChildListThatStartsWithOpenerToken(parent, node, sourceFile);
                Debug.assert(list !== undefined);
                argumentIndex = 0;
            }
            else {
                // findListItemInfo can return undefined if we are not in parent's argument list
                // or type argument list. This includes cases where the cursor is:
                //   - To the right of the closing parenthesis, non-substitution template, or template tail.
                //   - Between the type arguments and the arguments (greater than token)
                //   - On the target of the call (parent.func)
                //   - On the 'new' keyword in a 'new' expression
                list = findContainingList(node);
                if (!list) return undefined;
                argumentIndex = getArgumentIndex(list, node);
            }

            const kind = parent.typeArguments && parent.typeArguments.pos === list.pos ? ArgumentListKind.TypeArguments : ArgumentListKind.CallArguments;
            const argumentCount = getArgumentCount(list);
            if (argumentIndex !== 0) {
                Debug.assertLessThan(argumentIndex, argumentCount);
            }
            const argumentsSpan = getApplicableSpanForArguments(list, sourceFile);
            return { kind, invocation: { kind: InvocationKind.Call, node: invocation }, argumentsSpan, argumentIndex, argumentCount };
        }
        else if (isNoSubstitutionTemplateLiteral(node) && isTaggedTemplateExpression(parent)) {
            // Check if we're actually inside the template;
            // otherwise we'll fall out and return undefined.
            if (isInsideTemplateLiteral(node, position, sourceFile)) {
                return getArgumentListInfoForTemplate(parent, /*argumentIndex*/ 0, sourceFile);
            }
        }
        else if (isTemplateHead(node) && parent.parent.kind === SyntaxKind.TaggedTemplateExpression) {
            const templateExpression = <TemplateExpression>parent;
            const tagExpression = <TaggedTemplateExpression>templateExpression.parent;
            Debug.assert(templateExpression.kind === SyntaxKind.TemplateExpression);

            const argumentIndex = isInsideTemplateLiteral(node, position, sourceFile) ? 0 : 1;

            return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
        }
        else if (isTemplateSpan(parent) && isTaggedTemplateExpression(parent.parent.parent)) {
            const templateSpan = parent;
            const tagExpression = parent.parent.parent;

            // If we're just after a template tail, don't show signature help.
            if (isTemplateTail(node) && !isInsideTemplateLiteral(node, position, sourceFile)) {
                return undefined;
            }

            const spanIndex = templateSpan.parent.templateSpans.indexOf(templateSpan);
            const argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node, position, sourceFile);

            return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
        }
        else if (isJsxOpeningLikeElement(parent)) {
            // Provide a signature help for JSX opening element or JSX self-closing element.
            // This is not guarantee that JSX tag-name is resolved into stateless function component. (that is done in "getSignatureHelpItems")
            // i.e
            //      export function MainButton(props: ButtonProps, context: any): JSX.Element { ... }
            //      <MainButton /*signatureHelp*/
            const attributeSpanStart = parent.attributes.pos;
            const attributeSpanEnd = skipTrivia(sourceFile.text, parent.attributes.end, /*stopAfterLineBreak*/ false);
            return {
                kind: ArgumentListKind.JSXAttributesArguments,
                invocation: { kind: InvocationKind.Call, node: parent },
                argumentsSpan: createTextSpan(attributeSpanStart, attributeSpanEnd - attributeSpanStart),
                argumentIndex: 0,
                argumentCount: 1
            };
        }
        else {
            const typeArgInfo = isPossiblyTypeArgumentPosition(node, sourceFile);
            if (typeArgInfo) {
                const { called, nTypeArguments } = typeArgInfo;
                const invocation: Invocation = { kind: InvocationKind.TypeArgs, called };
                const argumentsSpan = createTextSpanFromBounds(called.getStart(sourceFile), node.end);
                return { kind: ArgumentListKind.TypeArguments, invocation, argumentsSpan, argumentIndex: nTypeArguments, argumentCount: nTypeArguments + 1 };
            }
        }

        return undefined;
    }

    function getArgumentIndex(argumentsList: Node, node: Node) {
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
            if (child.kind !== SyntaxKind.CommaToken) {
                argumentIndex++;
            }
        }

        return argumentIndex;
    }

    function getArgumentCount(argumentsList: Node) {
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

        let argumentCount = countWhere(listChildren, arg => arg.kind !== SyntaxKind.CommaToken);
        if (listChildren.length > 0 && last(listChildren).kind === SyntaxKind.CommaToken) {
            argumentCount++;
        }

        return argumentCount;
    }

    // spanIndex is either the index for a given template span.
    // This does not give appropriate results for a NoSubstitutionTemplateLiteral
    function getArgumentIndexForTemplatePiece(spanIndex: number, node: Node, position: number, sourceFile: SourceFile): number {
        // Because the TemplateStringsArray is the first argument, we have to offset each substitution expression by 1.
        // There are three cases we can encounter:
        //      1. We are precisely in the template literal (argIndex = 0).
        //      2. We are in or to the right of the substitution expression (argIndex = spanIndex + 1).
        //      3. We are directly to the right of the template literal, but because we look for the token on the left,
        //          not enough to put us in the substitution expression; we should consider ourselves part of
        //          the *next* span's expression by offsetting the index (argIndex = (spanIndex + 1) + 1).
        //
        // tslint:disable no-double-space
        // Example: f  `# abcd $#{#  1 + 1#  }# efghi ${ #"#hello"#  }  #  `
        //              ^       ^ ^       ^   ^          ^ ^      ^     ^
        // Case:        1       1 3       2   1          3 2      2     1
        // tslint:enable no-double-space
        Debug.assert(position >= node.getStart(), "Assumed 'position' could not occur before node.");
        if (isTemplateLiteralToken(node)) {
            if (isInsideTemplateLiteral(node, position, sourceFile)) {
                return 0;
            }
            return spanIndex + 2;
        }
        return spanIndex + 1;
    }

    function getArgumentListInfoForTemplate(tagExpression: TaggedTemplateExpression, argumentIndex: number, sourceFile: SourceFile): ArgumentListInfo {
        // argumentCount is either 1 or (numSpans + 1) to account for the template strings array argument.
        const argumentCount = isNoSubstitutionTemplateLiteral(tagExpression.template) ? 1 : tagExpression.template.templateSpans.length + 1;
        if (argumentIndex !== 0) {
            Debug.assertLessThan(argumentIndex, argumentCount);
        }
        return {
            kind: ArgumentListKind.TaggedTemplateArguments,
            invocation: { kind: InvocationKind.Call, node: tagExpression },
            argumentsSpan: getApplicableSpanForTaggedTemplate(tagExpression, sourceFile),
            argumentIndex,
            argumentCount
        };
    }

    function getApplicableSpanForArguments(argumentsList: Node, sourceFile: SourceFile): TextSpan {
        // We use full start and skip trivia on the end because we want to include trivia on
        // both sides. For example,
        //
        //    foo(   /*comment */     a, b, c      /*comment*/     )
        //        |                                               |
        //
        // The applicable span is from the first bar to the second bar (inclusive,
        // but not including parentheses)
        const applicableSpanStart = argumentsList.getFullStart();
        const applicableSpanEnd = skipTrivia(sourceFile.text, argumentsList.getEnd(), /*stopAfterLineBreak*/ false);
        return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
    }

    function getApplicableSpanForTaggedTemplate(taggedTemplate: TaggedTemplateExpression, sourceFile: SourceFile): TextSpan {
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
        if (template.kind === SyntaxKind.TemplateExpression) {
            const lastSpan = last(template.templateSpans);
            if (lastSpan.literal.getFullWidth() === 0) {
                applicableSpanEnd = skipTrivia(sourceFile.text, applicableSpanEnd, /*stopAfterLineBreak*/ false);
            }
        }

        return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
    }

    function getContainingArgumentInfo(node: Node, position: number, sourceFile: SourceFile): ArgumentListInfo | undefined {
        for (let n = node; !isBlock(n) && !isSourceFile(n); n = n.parent) {
            // If the node is not a subspan of its parent, this is a big problem.
            // There have been crashes that might be caused by this violation.
            Debug.assert(rangeContainsRange(n.parent, n), "Not a subspan", () => `Child: ${Debug.showSyntaxKind(n)}, parent: ${Debug.showSyntaxKind(n.parent)}`);
            const argumentInfo = getImmediatelyContainingArgumentInfo(n, position, sourceFile);
            if (argumentInfo) {
                return argumentInfo;
            }
        }
        return undefined;
    }

    function getChildListThatStartsWithOpenerToken(parent: Node, openerToken: Node, sourceFile: SourceFile): Node {
        const children = parent.getChildren(sourceFile);
        const indexOfOpenerToken = children.indexOf(openerToken);
        Debug.assert(indexOfOpenerToken >= 0 && children.length > indexOfOpenerToken + 1);
        return children[indexOfOpenerToken + 1];
    }

    function getExpressionFromInvocation(invocation: Invocation): Expression {
        return invocation.kind === InvocationKind.Call ? getInvokedExpression(invocation.node) : invocation.called;
    }

    const signatureHelpNodeBuilderFlags = NodeBuilderFlags.OmitParameterModifiers | NodeBuilderFlags.IgnoreErrors;
    function createSignatureHelpItems(candidates: ReadonlyArray<Signature>, resolvedSignature: Signature, argumentListInfo: ArgumentListInfo, sourceFile: SourceFile, typeChecker: TypeChecker): SignatureHelpItems {
        const { argumentCount, argumentsSpan: applicableSpan, invocation, argumentIndex } = argumentListInfo;
        const isTypeParameterList = argumentListInfo.kind === ArgumentListKind.TypeArguments;

        const enclosingDeclaration = invocation.kind === InvocationKind.Call ? invocation.node : invocation.called;
        const callTargetSymbol = typeChecker.getSymbolAtLocation(getExpressionFromInvocation(invocation));
        const callTargetDisplayParts = callTargetSymbol && symbolToDisplayParts(typeChecker, callTargetSymbol, /*enclosingDeclaration*/ undefined, /*meaning*/ undefined);
        const printer = createPrinter({ removeComments: true });
        const items = candidates.map<SignatureHelpItem>(candidateSignature => {
            let signatureHelpParameters: SignatureHelpParameter[];
            const prefixDisplayParts: SymbolDisplayPart[] = [];
            const suffixDisplayParts: SymbolDisplayPart[] = [];

            if (callTargetDisplayParts) {
                addRange(prefixDisplayParts, callTargetDisplayParts);
            }

            let isVariadic: boolean;
            if (isTypeParameterList) {
                isVariadic = false; // type parameter lists are not variadic
                prefixDisplayParts.push(punctuationPart(SyntaxKind.LessThanToken));
                const typeParameters = (candidateSignature.target || candidateSignature).typeParameters;
                signatureHelpParameters = typeParameters && typeParameters.length > 0 ? map(typeParameters, createSignatureHelpParameterForTypeParameter) : emptyArray;
                suffixDisplayParts.push(punctuationPart(SyntaxKind.GreaterThanToken));
                const parameterParts = mapToDisplayParts(writer => {
                    const thisParameter = candidateSignature.thisParameter ? [typeChecker.symbolToParameterDeclaration(candidateSignature.thisParameter, enclosingDeclaration, signatureHelpNodeBuilderFlags)!] : [];
                    const params = createNodeArray([...thisParameter, ...candidateSignature.parameters.map(param => typeChecker.symbolToParameterDeclaration(param, enclosingDeclaration, signatureHelpNodeBuilderFlags)!)]);
                    printer.writeList(ListFormat.CallExpressionArguments, params, sourceFile, writer);
                });
                addRange(suffixDisplayParts, parameterParts);
            }
            else {
                isVariadic = candidateSignature.hasRestParameter;
                const typeParameterParts = mapToDisplayParts(writer => {
                    if (candidateSignature.typeParameters && candidateSignature.typeParameters.length) {
                        const args = createNodeArray(candidateSignature.typeParameters.map(p => typeChecker.typeParameterToDeclaration(p, enclosingDeclaration)!));
                        printer.writeList(ListFormat.TypeParameters, args, sourceFile, writer);
                    }
                });
                addRange(prefixDisplayParts, typeParameterParts);
                prefixDisplayParts.push(punctuationPart(SyntaxKind.OpenParenToken));

                signatureHelpParameters = map(candidateSignature.parameters, createSignatureHelpParameterForParameter);
                suffixDisplayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
            }

            const returnTypeParts = mapToDisplayParts(writer => {
                writer.writePunctuation(":");
                writer.writeSpace(" ");
                const predicate = typeChecker.getTypePredicateOfSignature(candidateSignature);
                if (predicate) {
                    typeChecker.writeTypePredicate(predicate, enclosingDeclaration, /*flags*/ undefined, writer);
                }
                else {
                    typeChecker.writeType(typeChecker.getReturnTypeOfSignature(candidateSignature), enclosingDeclaration, /*flags*/ undefined, writer);
                }
            });
            addRange(suffixDisplayParts, returnTypeParts);

            return {
                isVariadic,
                prefixDisplayParts,
                suffixDisplayParts,
                separatorDisplayParts: [punctuationPart(SyntaxKind.CommaToken), spacePart()],
                parameters: signatureHelpParameters,
                documentation: candidateSignature.getDocumentationComment(typeChecker),
                tags: candidateSignature.getJsDocTags()
            };
        });

        if (argumentIndex !== 0) {
            Debug.assertLessThan(argumentIndex, argumentCount);
        }

        const selectedItemIndex = candidates.indexOf(resolvedSignature);
        Debug.assert(selectedItemIndex !== -1); // If candidates is non-empty it should always include bestSignature. We check for an empty candidates before calling this function.

        return { items, applicableSpan, selectedItemIndex, argumentIndex, argumentCount };

        function createSignatureHelpParameterForParameter(parameter: Symbol): SignatureHelpParameter {
            const displayParts = mapToDisplayParts(writer => {
                const param = typeChecker.symbolToParameterDeclaration(parameter, enclosingDeclaration, signatureHelpNodeBuilderFlags)!;
                printer.writeNode(EmitHint.Unspecified, param, sourceFile, writer);
            });

            return {
                name: parameter.name,
                documentation: parameter.getDocumentationComment(typeChecker),
                displayParts,
                isOptional: typeChecker.isOptionalParameter(<ParameterDeclaration>parameter.valueDeclaration)
            };
        }

        function createSignatureHelpParameterForTypeParameter(typeParameter: TypeParameter): SignatureHelpParameter {
            const displayParts = mapToDisplayParts(writer => {
                const param = typeChecker.typeParameterToDeclaration(typeParameter, enclosingDeclaration)!;
                printer.writeNode(EmitHint.Unspecified, param, sourceFile, writer);
            });

            return {
                name: typeParameter.symbol.name,
                documentation: emptyArray,
                displayParts,
                isOptional: false
            };
        }
    }
}
