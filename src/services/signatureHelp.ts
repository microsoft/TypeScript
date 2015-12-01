///<reference path='services.ts' />
/* @internal */
namespace ts.SignatureHelp {

    // A partially written generic type expression is not guaranteed to have the correct syntax tree. the expression could be parsed as less than/greater than expression or a comma expression
    // or some other combination depending on what the user has typed so far. For the purposes of signature help we need to consider any location after "<" as a possible generic type reference. 
    // To do this, the method will back parse the expression starting at the position required. it will try to parse the current expression as a generic type expression, if it did succeed it 
    // will return the generic identifier that started the expression (e.g. "foo" in "foo<any, |"). It is then up to the caller to ensure that this is a valid generic expression through 
    // looking up the type. The method will also keep track of the parameter index inside the expression.
    //public static isInPartiallyWrittenTypeArgumentList(syntaxTree: TypeScript.SyntaxTree, position: number): any {
    //    let token = Syntax.findTokenOnLeft(syntaxTree.sourceUnit(), position, /*includeSkippedTokens*/ true);

    //    if (token && TypeScript.Syntax.hasAncestorOfKind(token, TypeScript.SyntaxKind.TypeParameterList)) {
    //        // We are in the wrong generic list. bail out
    //        return null;
    //    }

    //    let stack = 0;
    //    let argumentIndex = 0;

    //    whileLoop:
    //    while (token) {
    //        switch (token.kind()) {
    //            case TypeScript.SyntaxKind.LessThanToken:
    //                if (stack === 0) {
    //                    // Found the beginning of the generic argument expression
    //                    let lessThanToken = token;
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
    //                let unmatchedOpenBraceTokens = 0;

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

    //    let stack = 0;

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
    let emptyArray: any[] = [];

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

    export function getSignatureHelpItems(program: Program, sourceFile: SourceFile, position: number, cancellationToken: CancellationToken): SignatureHelpItems {
        let typeChecker = program.getTypeChecker();

        // Decide whether to show signature help
        let startingToken = findTokenOnLeftOfPosition(sourceFile, position);
        if (!startingToken) {
            // We are at the beginning of the file
            return undefined;
        }

        let argumentInfo = getContainingArgumentInfo(startingToken);
        cancellationToken.throwIfCancellationRequested();

        // Semantic filtering of signature help
        if (!argumentInfo) {
            return undefined;
        }

        let call = argumentInfo.invocation;
        let candidates = <Signature[]>[];
        let resolvedSignature = typeChecker.getResolvedSignature(call, candidates);
        cancellationToken.throwIfCancellationRequested();

        if (!candidates.length) {
            // We didn't have any sig help items produced by the TS compiler.  If this is a JS 
            // file, then see if we can figure out anything better.
            if (isSourceFileJavaScript(sourceFile)) {
                return createJavaScriptSignatureHelpItems(argumentInfo);
            }

            return undefined;
        }

        return createSignatureHelpItems(candidates, resolvedSignature, argumentInfo);

        function createJavaScriptSignatureHelpItems(argumentInfo: ArgumentListInfo): SignatureHelpItems {
            if (argumentInfo.invocation.kind !== SyntaxKind.CallExpression) {
                return undefined;
            }

            // See if we can find some symbol with the call expression name that has call signatures.
            let callExpression = <CallExpression>argumentInfo.invocation;
            let expression = callExpression.expression;
            let name = expression.kind === SyntaxKind.Identifier
                ? <Identifier> expression
                : expression.kind === SyntaxKind.PropertyAccessExpression
                    ? (<PropertyAccessExpression>expression).name
                    : undefined;

            if (!name || !name.text) {
                return undefined;
            }

            let typeChecker = program.getTypeChecker();
            for (let sourceFile of program.getSourceFiles()) {
                let nameToDeclarations = sourceFile.getNamedDeclarations();
                let declarations = getProperty(nameToDeclarations, name.text);

                if (declarations) {
                    for (let declaration of declarations) {
                        let symbol = declaration.symbol;
                        if (symbol) {
                            let type = typeChecker.getTypeOfSymbolAtLocation(symbol, declaration);
                            if (type) {
                                let callSignatures = type.getCallSignatures();
                                if (callSignatures && callSignatures.length) {
                                    return createSignatureHelpItems(callSignatures, callSignatures[0], argumentInfo);
                                }
                            }
                        }
                    }
                }
            }
        }

        /**
         * Returns relevant information for the argument list and the current argument if we are
         * in the argument of an invocation; returns undefined otherwise.
         */
        function getImmediatelyContainingArgumentInfo(node: Node): ArgumentListInfo {
            if (node.parent.kind === SyntaxKind.CallExpression || node.parent.kind === SyntaxKind.NewExpression) {
                let callExpression = <CallExpression>node.parent;
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
                    let list = getChildListThatStartsWithOpenerToken(callExpression, node, sourceFile);
                    let isTypeArgList = callExpression.typeArguments && callExpression.typeArguments.pos === list.pos;
                    Debug.assert(list !== undefined);
                    return {
                        kind: isTypeArgList ? ArgumentListKind.TypeArguments : ArgumentListKind.CallArguments,
                        invocation: callExpression,
                        argumentsSpan: getApplicableSpanForArguments(list),
                        argumentIndex: 0,
                        argumentCount: getArgumentCount(list)
                    };
                }

                // findListItemInfo can return undefined if we are not in parent's argument list
                // or type argument list. This includes cases where the cursor is:
                //   - To the right of the closing paren, non-substitution template, or template tail.
                //   - Between the type arguments and the arguments (greater than token)
                //   - On the target of the call (parent.func)
                //   - On the 'new' keyword in a 'new' expression
                let listItemInfo = findListItemInfo(node);
                if (listItemInfo) {
                    let list = listItemInfo.list;
                    let isTypeArgList = callExpression.typeArguments && callExpression.typeArguments.pos === list.pos;

                    let argumentIndex = getArgumentIndex(list, node);
                    let argumentCount = getArgumentCount(list);

                    Debug.assert(argumentIndex === 0 || argumentIndex < argumentCount,
                        `argumentCount < argumentIndex, ${argumentCount} < ${argumentIndex}`); 

                    return {
                        kind: isTypeArgList ? ArgumentListKind.TypeArguments : ArgumentListKind.CallArguments,
                        invocation: callExpression,
                        argumentsSpan: getApplicableSpanForArguments(list),
                        argumentIndex: argumentIndex,
                        argumentCount: argumentCount
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
                let templateExpression = <TemplateExpression>node.parent;
                let tagExpression = <TaggedTemplateExpression>templateExpression.parent;
                Debug.assert(templateExpression.kind === SyntaxKind.TemplateExpression);

                let argumentIndex = isInsideTemplateLiteral(<LiteralExpression>node, position) ? 0 : 1;

                return getArgumentListInfoForTemplate(tagExpression, argumentIndex);
            }
            else if (node.parent.kind === SyntaxKind.TemplateSpan && node.parent.parent.parent.kind === SyntaxKind.TaggedTemplateExpression) {
                let templateSpan = <TemplateSpan>node.parent;
                let templateExpression = <TemplateExpression>templateSpan.parent;
                let tagExpression = <TaggedTemplateExpression>templateExpression.parent;
                Debug.assert(templateExpression.kind === SyntaxKind.TemplateExpression);

                // If we're just after a template tail, don't show signature help.
                if (node.kind === SyntaxKind.TemplateTail && !isInsideTemplateLiteral(<LiteralExpression>node, position)) {
                    return undefined;
                }

                let spanIndex = templateExpression.templateSpans.indexOf(templateSpan);
                let argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node);

                return getArgumentListInfoForTemplate(tagExpression, argumentIndex);
            }
            
            return undefined;
        }

        function getArgumentIndex(argumentsList: Node, node: Node) {
            // The list we got back can include commas.  In the presence of errors it may 
            // also just have nodes without commas.  For example "Foo(a b c)" will have 3 
            // args without commas.   We want to find what index we're at.  So we count
            // forward until we hit ourselves, only incrementing the index if it isn't a
            // comma.
            //
            // Note: the subtlety around trailing commas (in getArgumentCount) does not apply
            // here.  That's because we're only walking forward until we hit the node we're
            // on.  In that case, even if we're after the trailing comma, we'll still see
            // that trailing comma in the list, and we'll have generated the appropriate
            // arg index.
            let argumentIndex = 0;
            let listChildren = argumentsList.getChildren();
            for (let child of listChildren) {
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
            // is a small subtlety.  If you have  "Foo(a,)", then the child list will just have
            // 'a' '<comma>'.  So, in the case where the last child is a comma, we increase the
            // arg count by one to compensate.
            //
            // Note: this subtlety only applies to the last comma.  If you had "Foo(a,,"  then 
            // we'll have:  'a' '<comma>' '<missing>' 
            // That will give us 2 non-commas.  We then add one for the last comma, givin us an
            // arg count of 3.
            let listChildren = argumentsList.getChildren();

            let argumentCount = countWhere(listChildren, arg => arg.kind !== SyntaxKind.CommaToken);
            if (listChildren.length > 0 && lastOrUndefined(listChildren).kind === SyntaxKind.CommaToken) {
                argumentCount++;
            }

            return argumentCount;
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
            let argumentCount = tagExpression.template.kind === SyntaxKind.NoSubstitutionTemplateLiteral
                ? 1
                : (<TemplateExpression>tagExpression.template).templateSpans.length + 1;

            Debug.assert(argumentIndex === 0 || argumentIndex < argumentCount, `argumentCount < argumentIndex, ${argumentCount} < ${argumentIndex}`); 

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
            let applicableSpanStart = argumentsList.getFullStart();
            let applicableSpanEnd = skipTrivia(sourceFile.text, argumentsList.getEnd(), /*stopAfterLineBreak*/ false);
            return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
        }

        function getApplicableSpanForTaggedTemplate(taggedTemplate: TaggedTemplateExpression): TextSpan {
            let template = taggedTemplate.template;
            let applicableSpanStart = template.getStart();
            let applicableSpanEnd = template.getEnd();

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
                let lastSpan = lastOrUndefined((<TemplateExpression>template).templateSpans);
                if (lastSpan.literal.getFullWidth() === 0) {
                    applicableSpanEnd = skipTrivia(sourceFile.text, applicableSpanEnd, /*stopAfterLineBreak*/ false);
                }
            }

            return createTextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
        }

        function getContainingArgumentInfo(node: Node): ArgumentListInfo {
            for (let n = node; n.kind !== SyntaxKind.SourceFile; n = n.parent) {
                if (isFunctionBlock(n)) {
                    return undefined;
                }

                // If the node is not a subspan of its parent, this is a big problem.
                // There have been crashes that might be caused by this violation.
                if (n.pos < n.parent.pos || n.end > n.parent.end) {
                    Debug.fail("Node of kind " + n.kind + " is not a subspan of its parent of kind " + n.parent.kind);
                }

                let argumentInfo = getImmediatelyContainingArgumentInfo(n);
                if (argumentInfo) {
                    return argumentInfo;
                }


                // TODO: Handle generic call with incomplete syntax
            }
            return undefined;
        }

        function getChildListThatStartsWithOpenerToken(parent: Node, openerToken: Node, sourceFile: SourceFile): Node {
            let children = parent.getChildren(sourceFile);
            let indexOfOpenerToken = children.indexOf(openerToken);
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
            let maxParamsSignatureIndex = -1;
            let maxParams = -1;
            for (let i = 0; i < candidates.length; i++) {
                let candidate = candidates[i];

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
            let applicableSpan = argumentListInfo.argumentsSpan;
            let isTypeParameterList = argumentListInfo.kind === ArgumentListKind.TypeArguments;

            let invocation = argumentListInfo.invocation;
            let callTarget = getInvokedExpression(invocation)
            let callTargetSymbol = typeChecker.getSymbolAtLocation(callTarget);
            let callTargetDisplayParts = callTargetSymbol && symbolToDisplayParts(typeChecker, callTargetSymbol, /*enclosingDeclaration*/ undefined, /*meaning*/ undefined);
            let items: SignatureHelpItem[] = map(candidates, candidateSignature => {
                let signatureHelpParameters: SignatureHelpParameter[];
                let prefixDisplayParts: SymbolDisplayPart[] = [];
                let suffixDisplayParts: SymbolDisplayPart[] = [];

                if (callTargetDisplayParts) {
                    addRange(prefixDisplayParts, callTargetDisplayParts);
                }

                if (isTypeParameterList) {
                    prefixDisplayParts.push(punctuationPart(SyntaxKind.LessThanToken));
                    let typeParameters = candidateSignature.typeParameters;
                    signatureHelpParameters = typeParameters && typeParameters.length > 0 ? map(typeParameters, createSignatureHelpParameterForTypeParameter) : emptyArray;
                    suffixDisplayParts.push(punctuationPart(SyntaxKind.GreaterThanToken));
                    let parameterParts = mapToDisplayParts(writer =>
                        typeChecker.getSymbolDisplayBuilder().buildDisplayForParametersAndDelimiters(candidateSignature.parameters, writer, invocation));
                    addRange(suffixDisplayParts, parameterParts);
                }
                else {
                    let typeParameterParts = mapToDisplayParts(writer =>
                        typeChecker.getSymbolDisplayBuilder().buildDisplayForTypeParametersAndDelimiters(candidateSignature.typeParameters, writer, invocation));
                    addRange(prefixDisplayParts, typeParameterParts);
                    prefixDisplayParts.push(punctuationPart(SyntaxKind.OpenParenToken));

                    let parameters = candidateSignature.parameters;
                    signatureHelpParameters = parameters.length > 0 ? map(parameters, createSignatureHelpParameterForParameter) : emptyArray;
                    suffixDisplayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                }

                let returnTypeParts = mapToDisplayParts(writer =>
                    typeChecker.getSymbolDisplayBuilder().buildReturnTypeDisplay(candidateSignature, writer, invocation));
                addRange(suffixDisplayParts, returnTypeParts);
                
                return {
                    isVariadic: candidateSignature.hasRestParameter,
                    prefixDisplayParts,
                    suffixDisplayParts,
                    separatorDisplayParts: [punctuationPart(SyntaxKind.CommaToken), spacePart()],
                    parameters: signatureHelpParameters,
                    documentation: candidateSignature.getDocumentationComment()
                };
            });

            let argumentIndex = argumentListInfo.argumentIndex;

            // argumentCount is the *apparent* number of arguments.
            let argumentCount = argumentListInfo.argumentCount;

            let selectedItemIndex = candidates.indexOf(bestSignature);
            if (selectedItemIndex < 0) {
                selectedItemIndex = selectBestInvalidOverloadIndex(candidates, argumentCount);
            }

            Debug.assert(argumentIndex === 0 || argumentIndex < argumentCount, `argumentCount < argumentIndex, ${argumentCount} < ${argumentIndex}`); 

            return {
                items,
                applicableSpan,
                selectedItemIndex,
                argumentIndex,
                argumentCount
            };

            function createSignatureHelpParameterForParameter(parameter: Symbol): SignatureHelpParameter {
                let displayParts = mapToDisplayParts(writer =>
                    typeChecker.getSymbolDisplayBuilder().buildParameterDisplay(parameter, writer, invocation));

                return {
                    name: parameter.name,
                    documentation: parameter.getDocumentationComment(),
                    displayParts,
                    isOptional: typeChecker.isOptionalParameter(<ParameterDeclaration>parameter.valueDeclaration)
                };
            }

            function createSignatureHelpParameterForTypeParameter(typeParameter: TypeParameter): SignatureHelpParameter {
                let displayParts = mapToDisplayParts(writer =>
                    typeChecker.getSymbolDisplayBuilder().buildTypeParameterDisplay(typeParameter, writer, invocation));

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