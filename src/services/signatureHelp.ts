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

    export function getSignatureHelpItems(sourceFile: SourceFile, position: number, typeInfoResolver: TypeChecker, cancellationToken: CancellationTokenObject): SignatureHelpItems {
        // Decide whether to show signature help
        var startingToken = findTokenOnLeftOfPosition(sourceFile, position);
        if (!startingToken) {
            // We are at the beginning of the file
            return undefined;
        }

        var argumentList = getContainingArgumentList(startingToken);
        cancellationToken.throwIfCancellationRequested();

        // Semantic filtering of signature help
        if (!argumentList) {
            return undefined;
        }

        var call = <CallExpression>argumentList.parent;
        var candidates = <Signature[]>[];
        var resolvedSignature = typeInfoResolver.getResolvedSignature(call, candidates);
        cancellationToken.throwIfCancellationRequested();

        if (!candidates.length) {
            return undefined;
        }

        return createSignatureHelpItems(candidates, resolvedSignature, argumentList);

        /**
         * If node is an argument, returns its index in the argument list.
         * If not, returns -1.
         */
        function getImmediatelyContainingArgumentList(node: Node): Node {
            if (node.parent.kind !== SyntaxKind.CallExpression && node.parent.kind !== SyntaxKind.NewExpression) {
                return undefined;
            }

            // There are 3 cases to handle:
            //   1. The token introduces a list, and should begin a sig help session
            //   2. The token is either not associated with a list, or ends a list, so the session should end
            //   3. The token is buried inside a list, and should give sig help
            //
            // The following are examples of each:
            //
            //    Case 1:
            //          foo<$T, U>($a, b)    -> The token introduces a list, and should begin a sig help session
            //    Case 2:
            //          fo$o<T, U>$(a, b)$   -> The token is either not associated with a list, or ends a list, so the session should end
            //    Case 3:
            //          foo<T$, U$>(a$, $b$) -> The token is buried inside a list, and should give sig help
            var parent = <CallExpression>node.parent;
            // Find out if 'node' is an argument, a type argument, or neither
            if (node.kind === SyntaxKind.LessThanToken || node.kind === SyntaxKind.OpenParenToken) {
                // Find the list that starts right *after* the < or ( token
                var list = getChildListThatStartsWithOpenerToken(parent, node, sourceFile);
                Debug.assert(list);
                return list;
            }

            if (node.kind === SyntaxKind.GreaterThanToken
                || node.kind === SyntaxKind.CloseParenToken
                || node === parent.func) {
                return undefined;
            }

            return findContainingList(node);
        }

        function getContainingArgumentList(node: Node): Node {
            for (var n = node; n.kind !== SyntaxKind.SourceFile; n = n.parent) {
                if (n.kind === SyntaxKind.FunctionBlock) {
                    return undefined;
                }

                var argumentList = getImmediatelyContainingArgumentList(n);
                if (argumentList) {
                    return argumentList;
                }


                // TODO: Handle generic call with incomplete syntax
            }
            return undefined;
        }

        function createSignatureHelpItems(candidates: Signature[], bestSignature: Signature, argumentListOrTypeArgumentList: Node): SignatureHelpItems {
            var items: SignatureHelpItem[] = map(candidates, candidateSignature => {
                var parameters = candidateSignature.parameters;
                var parameterHelpItems: SignatureHelpParameter[] = parameters.length === 0 ? emptyArray : map(parameters, p => {
                    var displayParts: SymbolDisplayPart[] = [];

                    if (candidateSignature.hasRestParameter && parameters[parameters.length - 1] === p) {
                        displayParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.DotDotDotToken), SymbolDisplayPartKind.punctuation, undefined));
                    }

                    displayParts.push(new SymbolDisplayPart(p.name, SymbolDisplayPartKind.parameterName, p));

                    var isOptional = !!(p.valueDeclaration.flags & NodeFlags.QuestionMark);
                    if (isOptional) {
                        displayParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.QuestionToken), SymbolDisplayPartKind.punctuation, undefined));
                    }

                    displayParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.ColonToken), SymbolDisplayPartKind.punctuation, undefined));
                    displayParts.push(new SymbolDisplayPart(" ", SymbolDisplayPartKind.space, undefined));

                    var typeParts = typeInfoResolver.typeToDisplayParts(typeInfoResolver.getTypeOfSymbol(p), argumentListOrTypeArgumentList);
                    displayParts.push.apply(displayParts, typeParts);

                    return {
                        name: p.name,
                        documentation: getSymbolDocumentationDisplayParts(p),
                        displayParts: displayParts,
                        isOptional: isOptional
                    };
                });

                var callTargetNode = (<CallExpression>argumentListOrTypeArgumentList.parent).func;
                var callTargetSymbol = typeInfoResolver.getSymbolInfo(callTargetNode);

                var prefixParts = callTargetSymbol ? typeInfoResolver.symbolToDisplayParts(callTargetSymbol, /*enclosingDeclaration*/ undefined, /*meaning*/ undefined) : [];

                var separatorParts = [
                    new SymbolDisplayPart(tokenToString(SyntaxKind.CommaToken), SymbolDisplayPartKind.punctuation, undefined),
                    new SymbolDisplayPart(" ", SymbolDisplayPartKind.space, undefined)
                ];

                // TODO(jfreeman): Constraints?
                if (candidateSignature.typeParameters && candidateSignature.typeParameters.length) {
                    prefixParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.LessThanToken), SymbolDisplayPartKind.punctuation, undefined));

                    for (var i = 0, n = candidateSignature.typeParameters.length; i < n; i++) {
                        if (i) {
                            prefixParts.push.apply(prefixParts, separatorParts);
                        }

                        var tp = candidateSignature.typeParameters[i].symbol;
                        prefixParts.push(new SymbolDisplayPart(tp.name, SymbolDisplayPartKind.typeParameterName, tp));
                    }

                    prefixParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.GreaterThanToken), SymbolDisplayPartKind.punctuation, undefined));
                }

                prefixParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.OpenParenToken), SymbolDisplayPartKind.punctuation, undefined));

                var suffixParts = [new SymbolDisplayPart(tokenToString(SyntaxKind.CloseParenToken), SymbolDisplayPartKind.punctuation, undefined)];
                suffixParts.push(new SymbolDisplayPart(tokenToString(SyntaxKind.ColonToken), SymbolDisplayPartKind.punctuation, undefined));
                suffixParts.push(new SymbolDisplayPart(" ", SymbolDisplayPartKind.space, undefined));

                var typeParts = typeInfoResolver.typeToDisplayParts(candidateSignature.getReturnType(), argumentListOrTypeArgumentList);
                suffixParts.push.apply(suffixParts, typeParts);
                
                return {
                    isVariadic: candidateSignature.hasRestParameter,
                    prefixDisplayParts: prefixParts,
                    suffixDisplayParts: suffixParts,
                    separatorDisplayParts: separatorParts,
                    parameters: parameterHelpItems,
                    documentation: <SymbolDisplayPart[]>null
                };
            });

            var selectedItemIndex = candidates.indexOf(bestSignature);
            if (selectedItemIndex < 0) {
                selectedItemIndex = 0;
            }

            // We use full start and skip trivia on the end because we want to include trivia on
            // both sides. For example,
            //
            //    foo(   /*comment */     a, b, c      /*comment*/     )
            //        |                                               |
            //
            // The applicable span is from the first bar to the second bar (inclusive,
            // but not including parentheses)
            var applicableSpanStart = argumentListOrTypeArgumentList.getFullStart();
            var applicableSpanEnd = skipTrivia(sourceFile.text, argumentListOrTypeArgumentList.end, /*stopAfterLineBreak*/ false);
            var applicableSpan = new TypeScript.TextSpan(applicableSpanStart, applicableSpanEnd - applicableSpanStart);
            return {
                items: items,
                applicableSpan: applicableSpan,
                selectedItemIndex: selectedItemIndex
            };
        }
    }

    export function getSignatureHelpCurrentArgumentState(sourceFile: SourceFile, position: number, applicableSpanStart: number): SignatureHelpState {
        var tokenPrecedingSpanStart = findPrecedingToken(applicableSpanStart, sourceFile);
        if (!tokenPrecedingSpanStart) {
            return undefined;
        }

        if (tokenPrecedingSpanStart.kind !== SyntaxKind.OpenParenToken && tokenPrecedingSpanStart.kind !== SyntaxKind.LessThanToken) {
            // The span start must have moved backward in the file (for example if the open paren was backspaced)
            return undefined;
        }

        var tokenPrecedingCurrentPosition = findPrecedingToken(position, sourceFile);
        var call = <CallExpression>tokenPrecedingSpanStart.parent;
        Debug.assert(call.kind === SyntaxKind.CallExpression || call.kind === SyntaxKind.NewExpression, "wrong call kind " + SyntaxKind[call.kind]);
        if (tokenPrecedingCurrentPosition.kind === SyntaxKind.CloseParenToken || tokenPrecedingCurrentPosition.kind === SyntaxKind.GreaterThanToken) {
            if (tokenPrecedingCurrentPosition.parent === call) {
                // This call expression is complete. Stop signature help.
                return undefined;
            }
        }

        var argumentListOrTypeArgumentList = getChildListThatStartsWithOpenerToken(call, tokenPrecedingSpanStart, sourceFile);
        // Debug.assert(argumentListOrTypeArgumentList.getChildCount() === 0 || argumentListOrTypeArgumentList.getChildCount() % 2 === 1, "Even number of children");

        // The call might be finished, but incorrectly. Check if we are still within the bounds of the call
        if (position > skipTrivia(sourceFile.text, argumentListOrTypeArgumentList.end, /*stopAfterLineBreak*/ false)) {
            return undefined;
        }

        var numberOfCommas = countWhere(argumentListOrTypeArgumentList.getChildren(), arg => arg.kind === SyntaxKind.CommaToken);
        var argumentCount = numberOfCommas + 1;
        if (argumentCount <= 1) {
            return { argumentIndex: 0, argumentCount: argumentCount };
        }

        var indexOfNodeContainingPosition = findListItemIndexContainingPosition(argumentListOrTypeArgumentList, position);

        // indexOfNodeContainingPosition checks that position is between pos and end of each child, so it is
        // possible that we are to the right of all children. Assume that we are still within
        // the applicable span and that we are typing the last argument
        // Alternatively, we could be in range of one of the arguments, in which case we need to divide
        // by 2 to exclude commas. Use bit shifting in order to take the floor of the division.
        var argumentIndex = indexOfNodeContainingPosition < 0 ? argumentCount - 1 : indexOfNodeContainingPosition >> 1;
        return { argumentIndex: argumentIndex, argumentCount: argumentCount };
    }

    function getChildListThatStartsWithOpenerToken(parent: Node, openerToken: Node, sourceFile: SourceFile): Node {
        var children = parent.getChildren(sourceFile);
        var indexOfOpenerToken = children.indexOf(openerToken);
        return children[indexOfOpenerToken + 1];
    }
}