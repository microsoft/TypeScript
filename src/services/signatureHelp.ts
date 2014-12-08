///<reference path='services.ts' />

module ts.SignatureHelp {

    // A partially written generic type expression is not guaranteed to have the correct syntax tree. the expression could be parsed as less than/greater than expression or a comma expression
    // or some other combination depending on what the user has typed so far. For the purposes of signature help we need to consider any location after "<" as a possible generic type reference. 
    // To do this, the method will back parse the expression starting at the position required. it will try to parse the current expression as a generic type expression, if it did succeed it 
    // will return the generic identifier that started the expression (e.g. "foo" in "foo<any, |"). It is then up to the caller to ensure that this is a valid generic expression through 
    // looking up the type. The method will also keep track of the parameter index inside the expression.
    //public static isInPartiallyWrittenTypeArgumentList(syntaxTree: TypeScript.SyntaxTree, position: number): any {
    //    var token = Syntax.findTokenOnLeft(syntaxTree.sourceUnit(), position, /*includeSkippedTokens*/ true);

    //    if (token && TypeScript.Syntax.hasAncestorOfKind(token, TypeScript.SyntaxKind.TypeParameterList)) {
    //        // We are in the wrong generic list. bail out
    //        return null;
    //    }

    //    var stack = 0;
    //    var argumentIndex = 0;

    //    whileLoop:
    //    while (token) {
    //        switch (token.kind()) {
    //            case TypeScript.SyntaxKind.LessThanToken:
    //                if (stack === 0) {
    //                    // Found the beginning of the generic argument expression
    //                    var lessThanToken = token;
    //                    token = previousToken(token, /*includeSkippedTokens*/ true);
    //                    if (!token || token.kind() !== TypeScript.SyntaxKind.IdentifierName) {
    //                        break whileLoop;
    //                    }

    //                    // Found the name, return the data
    //                    return {
    //                        genericIdentifer: token,
    //                        lessThanToken: lessThanToken,
    //                        argumentIndex: argumentIndex
    //                    };
    //                }
    //                else if (stack < 0) {
    //                    // Seen one too many less than tokens, bail out
    //                    break whileLoop;
    //                }
    //                else {
    //                    stack--;
    //                }

    //                break;

    //            case TypeScript.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
    //                stack++;

    //            // Intentaion fall through
    //            case TypeScript.SyntaxKind.GreaterThanToken:
    //                stack++;
    //                break;

    //            case TypeScript.SyntaxKind.CommaToken:
    //                if (stack == 0) {
    //                    argumentIndex++;
    //                }

    //                break;

    //            case TypeScript.SyntaxKind.CloseBraceToken:
    //                // This can be object type, skip untill we find the matching open brace token
    //                var unmatchedOpenBraceTokens = 0;

    //                // Skip untill the matching open brace token
    //                token = SignatureInfoHelpers.moveBackUpTillMatchingTokenKind(token, TypeScript.SyntaxKind.CloseBraceToken, TypeScript.SyntaxKind.OpenBraceToken);
    //                if (!token) {
    //                    // No matching token was found. bail out
    //                    break whileLoop;
    //                }

    //                break;

    //            case TypeScript.SyntaxKind.EqualsGreaterThanToken:
    //                // This can be a function type or a constructor type. In either case, we want to skip the function defintion
    //                token = previousToken(token, /*includeSkippedTokens*/ true);

    //                if (token && token.kind() === TypeScript.SyntaxKind.CloseParenToken) {
    //                    // Skip untill the matching open paren token
    //                    token = SignatureInfoHelpers.moveBackUpTillMatchingTokenKind(token, TypeScript.SyntaxKind.CloseParenToken, TypeScript.SyntaxKind.OpenParenToken);

    //                    if (token && token.kind() === TypeScript.SyntaxKind.GreaterThanToken) {
    //                        // Another generic type argument list, skip it\
    //                        token = SignatureInfoHelpers.moveBackUpTillMatchingTokenKind(token, TypeScript.SyntaxKind.GreaterThanToken, TypeScript.SyntaxKind.LessThanToken);
    //                    }

    //                    if (token && token.kind() === TypeScript.SyntaxKind.NewKeyword) {
    //                        // In case this was a constructor type, skip the new keyword
    //                        token = previousToken(token, /*includeSkippedTokens*/ true);
    //                    }

    //                    if (!token) {
    //                        // No matching token was found. bail out
    //                        break whileLoop;
    //                    }
    //                }
    //                else {
    //                    // This is not a funtion type. exit the main loop
    //                    break whileLoop;
    //                }

    //                break;

    //            case TypeScript.SyntaxKind.IdentifierName:
    //            case TypeScript.SyntaxKind.AnyKeyword:
    //            case TypeScript.SyntaxKind.NumberKeyword:
    //            case TypeScript.SyntaxKind.StringKeyword:
    //            case TypeScript.SyntaxKind.VoidKeyword:
    //            case TypeScript.SyntaxKind.BooleanKeyword:
    //            case TypeScript.SyntaxKind.DotToken:
    //            case TypeScript.SyntaxKind.OpenBracketToken:
    //            case TypeScript.SyntaxKind.CloseBracketToken:
    //                // Valid tokens in a type name. Skip.
    //                break;

    //            default:
    //                break whileLoop;
    //        }

    //        token = previousToken(token, /*includeSkippedTokens*/ true);
    //    }

    //    return null;
    //}

    //private static moveBackUpTillMatchingTokenKind(token: TypeScript.ISyntaxToken, tokenKind: TypeScript.SyntaxKind, matchingTokenKind: TypeScript.SyntaxKind): TypeScript.ISyntaxToken {
    //    if (!token || token.kind() !== tokenKind) {
    //        throw TypeScript.Errors.invalidOperation();
    //    }

    //    // Skip the current token
    //    token = previousToken(token, /*includeSkippedTokens*/ true);

    //    var stack = 0;

    //    while (token) {
    //        if (token.kind() === matchingTokenKind) {
    //            if (stack === 0) {
    //                // Found the matching token, return
    //                return token;
    //            }
    //            else if (stack < 0) {
    //                // tokens overlapped.. bail out.
    //                break;
    //            }
    //            else {
    //                stack--;
    //            }
    //        }
    //        else if (token.kind() === tokenKind) {
    //            stack++;
    //        }

    //        // Move back
    //        token = previousToken(token, /*includeSkippedTokens*/ true);
    //    }

    //    // Did not find matching token
    //    return null;
    //}
    var emptyArray: any[] = [];

    const enum ArgumentListKind {
        TypeArguments,
        CallArguments,
        TaggedTemplateArguments
    }

    interface ArgumentListInfo {
        kind: ArgumentListKind;
        invocation: CallLikeExpression;
        argumentsSpan: TextSpan;
        argumentIndex?: number;
        argumentCount: number;
    }

    export function getSignatureHelpItems(sourceFile: SourceFile, position: number, typeInfoResolver: TypeChecker, cancellationToken: CancellationTokenObject): SignatureHelpItems {
        // Decide whether to show signature help
        var startingToken = findTokenOnLeftOfPosition(sourceFile, position);
        if (!startingToken) {
            // We are at the beginning of the file
            return undefined;
        }

        var argumentInfo = getContainingArgumentInfo(startingToken);
        cancellationToken.throwIfCancellationRequested();

        // Semantic filtering of signature help
        if (!argumentInfo) {
            return undefined;
        }

        var call = argumentInfo.invocation;
        var candidates = <Signature[]>[];
        var resolvedSignature = typeInfoResolver.getResolvedSignature(call, candidates);
        cancellationToken.throwIfCancellationRequested();

        if (!candidates.length) {
            return undefined;
        }

        return createSignatureHelpItems(candidates, resolvedSignature, argumentInfo);

        /**
         * Returns relevant information for the argument list and the current argument if we are
         * in the argument of an invocation; returns undefined otherwise.
         */
        function getImmediatelyContainingArgumentInfo(node: Node): ArgumentListInfo {
            if (node.parent.kind === SyntaxKind.CallExpression || node.parent.kind === SyntaxKind.NewExpression) {
                var callExpression = <CallExpression>node.parent;
                // There are 3 cases to handle:
                //   1. The token introduces a list, and should begin a sig help session
                //   2. The token is either not associated with a list, or ends a list, so the session should end
                //   3. The token is buried inside a list, and should give sig help
                //
                // The following are examples of each:
                //
                //    Case 1:
                //          foo<#T, U>(#a, b)    -> The token introduces a list, and should begin a sig help session
                //    Case 2:
                //          fo#o<T, U>#(a, b)#   -> The token is either not associated with a list, or ends a list, so the session should end
                //    Case 3:
                //          foo<T#, U#>(a#, #b#) -> The token is buried inside a list, and should give sig help
                // Find out if 'node' is an argument, a type argument, or neither
                if (node.kind === SyntaxKind.LessThanToken ||
                    node.kind === SyntaxKind.OpenParenToken) {
                    // Find the list that starts right *after* the < or ( token.
                    // If the user has just opened a list, consider this item 0.
                    var list = getChildListThatStartsWithOpenerToken(callExpression, node, sourceFile);
                    var isTypeArgList = callExpression.typeArguments && callExpression.typeArguments.pos === list.pos;
                    Debug.assert(list !== undefined);
                    return {
                        kind: isTypeArgList ? ArgumentListKind.TypeArguments : ArgumentListKind.CallArguments,
                        invocation: callExpression,
                        argumentsSpan: getApplicableSpanForArguments(list),
                        argumentIndex: 0,
                        argumentCount: getCommaBasedArgCount(list)
                    };
                }

                // findListItemInfo can return undefined if we are not in parent's argument list
                // or type argument list. This includes cases where the cursor is:
                //   - To the right of the closing paren, non-substitution template, or template tail.
                //   - Between the type arguments and the arguments (greater than token)
                //   - On the target of the call (parent.func)
                //   - On the 'new' keyword in a 'new' expression
                var listItemInfo = findListItemInfo(node);
                if (listItemInfo) {
                    var list = listItemInfo.list;
                    var isTypeArgList = callExpression.typeArguments && callExpression.typeArguments.pos === list.pos;

                    // The listItemIndex we got back includes commas. Our goal is to return the index of the proper
                    // item (not including commas). Here are some examples:
                    //    1. foo(a, b, c #) -> the listItemIndex is 4, we want to return 2
                    //    2. foo(a, b, # c) -> listItemIndex is 3, we want to return 2
                    //    3. foo(#a) -> listItemIndex is 0, we want to return 0
                    //
                    // In general, we want to subtract the number of commas before the current index.
                    // But if we are on a comma, we also want to pretend we are on the argument *following*
                    // the comma. That amounts to taking the ceiling of half the index.
                    var argumentIndex = (listItemInfo.listItemIndex + 1) >> 1;

                    return {
                        kind: isTypeArgList ? ArgumentListKind.TypeArguments : ArgumentListKind.CallArguments,
                        invocation: callExpression,
                        argumentsSpan: getApplicableSpanForArguments(list),
                        argumentIndex: argumentIndex,
                        argumentCount: getCommaBasedArgCount(list)
                    };
                }
            }
            else if (node.kind === SyntaxKind.NoSubstitutionTemplateLiteral && node.parent.kind === SyntaxKind.TaggedTemplateExpression) {
                // Check if we're actually inside the template;
                // otherwise we'll fall out and return undefined.
                if (isInsideTemplateLiteral(<LiteralExpression>node, position)) {
                    return getArgumentListInfoForTemplate(<TaggedTemplateExpression>node.parent, /*argumentIndex*/ 0);
                }
            }
            else if (node.kind === SyntaxKind.TemplateHead && node.parent.parent.kind === SyntaxKind.TaggedTemplateExpression) {
                var templateExpression = <TemplateExpression>node.parent;
                var tagExpression = <TaggedTemplateExpression>templateExpression.parent;
                Debug.assert(templateExpression.kind === SyntaxKind.TemplateExpression);

                var argumentIndex = isInsideTemplateLiteral(<LiteralExpression>node, position) ? 0 : 1;

                return getArgumentListInfoForTemplate(tagExpression, argumentIndex);
            }
            else if (node.parent.kind === SyntaxKind.TemplateSpan && node.parent.parent.parent.kind === SyntaxKind.TaggedTemplateExpression) {
                var templateSpan = <TemplateSpan>node.parent;
                var templateExpression = <TemplateExpression>templateSpan.parent;
                var tagExpression = <TaggedTemplateExpression>templateExpression.parent;
                Debug.assert(templateExpression.kind === SyntaxKind.TemplateExpression);

                // If we're just after a template tail, don't show signature help.
                if (node.kind === SyntaxKind.TemplateTail && position >= node.getEnd() && !(<LiteralExpression>node).isUnterminated) {
                    return undefined;
                }

                var spanIndex = templateExpression.templateSpans.indexOf(templateSpan);
                var argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node);

                return getArgumentListInfoForTemplate(tagExpression, argumentIndex);
            }
            
            return undefined;
        }

        function getCommaBasedArgCount(argumentsList: Node) {
            // The number of arguments is the number of commas plus one, unless the list
            // is completely empty, in which case there are 0 arguments.
            return argumentsList.getChildCount() === 0
                ? 0
                : 1 + countWhere(argumentsList.getChildren(), arg => arg.kind === SyntaxKind.CommaToken);
        }

        // spanIndex is either the index for a given template span.
        // This does not give appropriate results for a NoSubstitutionTemplateLiteral
        function getArgumentIndexForTemplatePiece(spanIndex: number, node: Node): number {
            // Because the TemplateStringsArray is the first argument, we have to offset each substitution expression by 1.
            // There are three cases we can encounter:
            //      1. We are precisely in the template literal (argIndex = 0).
            //      2. We are in or to the right of the substitution expression (argIndex = spanIndex + 1).
            //      3. We are directly to the right of the template literal, but because we look for the token on the left,
            //          not enough to put us in the substitution expression; we should consider ourselves part of
            //          the *next* span's expression by offsetting the index (argIndex = (spanIndex + 1) + 1).
            //
            // Example: f  `# abcd $#{#  1 + 1#  }# efghi ${ #"#hello"#  }  #  `
            //              ^       ^ ^       ^   ^          ^ ^      ^     ^
            // Case:        1       1 3       2   1          3 2      2     1
            Debug.assert(position >= node.getStart(), "Assumed 'position' could not occur before node.");
            if (isTemplateLiteralKind(node.kind)) {
                if (isInsideTemplateLiteral(<LiteralExpression>node, position)) {
                    return 0;
                }
                return spanIndex + 2;
            }
            return spanIndex + 1;
        }

        function getArgumentListInfoForTemplate(tagExpression: TaggedTemplateExpression, argumentIndex: number): ArgumentListInfo {
            // argumentCount is either 1 or (numSpans + 1) to account for the template strings array argument.
            var argumentCount = tagExpression.template.kind === SyntaxKind.NoSubstitutionTemplateLiteral
                ? 1
                : (<TemplateExpression>tagExpression.template).templateSpans.length + 1;

            return {
                kind: ArgumentListKind.TaggedTemplateArguments,
                invocation: tagExpression,
                argumentsSpan: getApplicableSpanForTaggedTemplate(tagExpression),
                argumentIndex: argumentIndex,
                argumentCount: argumentCount
            };
        }

        function getApplicableSpanForArguments(argumentsList: Node): TextSpan {
            // We use full start and skip trivia on the end because we want to include trivia on
            // both sides. For example,
            //
            //    foo(   /*comment */     a, b, c      /*comment*/     )
            //        |                                               |
            //
            // The applicable span is from the first bar to the second bar (inclusive,
            // but not including parentheses)
            var applicableSpanStart = argumentsList.getFullStart();
            var applicableSpanEnd = skipTrivia(sourceFile.text, argumentsList.getEnd(), /*stopAfterLineBreak*/ false);
            return new TextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
        }

        function getApplicableSpanForTaggedTemplate(taggedTemplate: TaggedTemplateExpression): TextSpan {
            var template = taggedTemplate.template;
            var applicableSpanStart = template.getStart();
            var applicableSpanEnd = template.getEnd();

            // We need to adjust the end position for the case where the template does not have a tail.
            // Otherwise, we will not show signature help past the expression.
            // For example,
            //
            //      `  ${ 1 + 1        foo(10)
            //       |        |
            //
            // This is because a Missing node has no width. However, what we actually want is to include trivia
            // leading up to the next token in case the user is about to type in a TemplateMiddle or TemplateTail.
            if (template.kind === SyntaxKind.TemplateExpression) {
                var lastSpan = lastOrUndefined((<TemplateExpression>template).templateSpans);
                if (lastSpan.literal.getFullWidth() === 0) {
                    applicableSpanEnd = skipTrivia(sourceFile.text, applicableSpanEnd, /*stopAfterLineBreak*/ false);
                }
            }

            return new TextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
        }

        function getContainingArgumentInfo(node: Node): ArgumentListInfo {
            for (var n = node; n.kind !== SyntaxKind.SourceFile; n = n.parent) {
                if (isFunctionBlock(n)) {
                    return undefined;
                }

                // If the node is not a subspan of its parent, this is a big problem.
                // There have been crashes that might be caused by this violation.
                if (n.pos < n.parent.pos || n.end > n.parent.end) {
                    Debug.fail("Node of kind " + n.kind + " is not a subspan of its parent of kind " + n.parent.kind);
                }

                var argumentInfo = getImmediatelyContainingArgumentInfo(n);
                if (argumentInfo) {
                    return argumentInfo;
                }


                // TODO: Handle generic call with incomplete syntax
            }
            return undefined;
        }

        function getChildListThatStartsWithOpenerToken(parent: Node, openerToken: Node, sourceFile: SourceFile): Node {
            var children = parent.getChildren(sourceFile);
            var indexOfOpenerToken = children.indexOf(openerToken);
            Debug.assert(indexOfOpenerToken >= 0 && children.length > indexOfOpenerToken + 1);
            return children[indexOfOpenerToken + 1];
        }

        /**
         * The selectedItemIndex could be negative for several reasons.
         *     1. There are too many arguments for all of the overloads
         *     2. None of the overloads were type compatible
         * The solution here is to try to pick the best overload by picking
         * either the first one that has an appropriate number of parameters,
         * or the one with the most parameters.
         */
        function selectBestInvalidOverloadIndex(candidates: Signature[], argumentCount: number): number {
            var maxParamsSignatureIndex = -1;
            var maxParams = -1;
            for (var i = 0; i < candidates.length; i++) {
                var candidate = candidates[i];

                if (candidate.hasRestParameter || candidate.parameters.length >= argumentCount) {
                    return i;
                }

                if (candidate.parameters.length > maxParams) {
                    maxParams = candidate.parameters.length;
                    maxParamsSignatureIndex = i;
                }
            }

            return maxParamsSignatureIndex;
        }

        function createSignatureHelpItems(candidates: Signature[], bestSignature: Signature, argumentListInfo: ArgumentListInfo): SignatureHelpItems {
            var applicableSpan = argumentListInfo.argumentsSpan;
            var isTypeParameterList = argumentListInfo.kind === ArgumentListKind.TypeArguments;

            var invocation = argumentListInfo.invocation;
            var callTarget = getInvokedExpression(invocation)
            var callTargetSymbol = typeInfoResolver.getSymbolAtLocation(callTarget);
            var callTargetDisplayParts = callTargetSymbol && symbolToDisplayParts(typeInfoResolver, callTargetSymbol, /*enclosingDeclaration*/ undefined, /*meaning*/ undefined);
            var items: SignatureHelpItem[] = map(candidates, candidateSignature => {
                var signatureHelpParameters: SignatureHelpParameter[];
                var prefixDisplayParts: SymbolDisplayPart[] = [];
                var suffixDisplayParts: SymbolDisplayPart[] = [];

                if (callTargetDisplayParts) {
                    prefixDisplayParts.push.apply(prefixDisplayParts, callTargetDisplayParts);
                }

                if (isTypeParameterList) {
                    prefixDisplayParts.push(punctuationPart(SyntaxKind.LessThanToken));
                    var typeParameters = candidateSignature.typeParameters;
                    signatureHelpParameters = typeParameters && typeParameters.length > 0 ? map(typeParameters, createSignatureHelpParameterForTypeParameter) : emptyArray;
                    suffixDisplayParts.push(punctuationPart(SyntaxKind.GreaterThanToken));
                    var parameterParts = mapToDisplayParts(writer =>
                        typeInfoResolver.getSymbolDisplayBuilder().buildDisplayForParametersAndDelimiters(candidateSignature.parameters, writer, invocation));
                    suffixDisplayParts.push.apply(suffixDisplayParts, parameterParts);
                }
                else {
                    var typeParameterParts = mapToDisplayParts(writer =>
                        typeInfoResolver.getSymbolDisplayBuilder().buildDisplayForTypeParametersAndDelimiters(candidateSignature.typeParameters, writer, invocation));
                    prefixDisplayParts.push.apply(prefixDisplayParts, typeParameterParts);
                    prefixDisplayParts.push(punctuationPart(SyntaxKind.OpenParenToken));

                    var parameters = candidateSignature.parameters;
                    signatureHelpParameters = parameters.length > 0 ? map(parameters, createSignatureHelpParameterForParameter) : emptyArray;
                    suffixDisplayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                }

                var returnTypeParts = mapToDisplayParts(writer =>
                    typeInfoResolver.getSymbolDisplayBuilder().buildReturnTypeDisplay(candidateSignature, writer, invocation));
                suffixDisplayParts.push.apply(suffixDisplayParts, returnTypeParts);
                
                return {
                    isVariadic: candidateSignature.hasRestParameter,
                    prefixDisplayParts,
                    suffixDisplayParts,
                    separatorDisplayParts: [punctuationPart(SyntaxKind.CommaToken), spacePart()],
                    parameters: signatureHelpParameters,
                    documentation: candidateSignature.getDocumentationComment()
                };
            });

            var argumentIndex = argumentListInfo.argumentIndex;

            // argumentCount is the *apparent* number of arguments.
            var argumentCount = argumentListInfo.argumentCount;

            var selectedItemIndex = candidates.indexOf(bestSignature);
            if (selectedItemIndex < 0) {
                selectedItemIndex = selectBestInvalidOverloadIndex(candidates, argumentCount);
            }

            return {
                items,
                applicableSpan,
                selectedItemIndex,
                argumentIndex,
                argumentCount
            };

            function createSignatureHelpParameterForParameter(parameter: Symbol): SignatureHelpParameter {
                var displayParts = mapToDisplayParts(writer =>
                    typeInfoResolver.getSymbolDisplayBuilder().buildParameterDisplay(parameter, writer, invocation));

                var isOptional = hasQuestionToken(parameter.valueDeclaration);

                return {
                    name: parameter.name,
                    documentation: parameter.getDocumentationComment(),
                    displayParts,
                    isOptional
                };
            }

            function createSignatureHelpParameterForTypeParameter(typeParameter: TypeParameter): SignatureHelpParameter {
                var displayParts = mapToDisplayParts(writer =>
                    typeInfoResolver.getSymbolDisplayBuilder().buildTypeParameterDisplay(typeParameter, writer, invocation));

                return {
                    name: typeParameter.symbol.name,
                    documentation: emptyArray,
                    displayParts,
                    isOptional: false
                };
            }
        }
    }
}