/* @internal */
namespace ts.SymbolDisplay {
    // TODO(drosen): use contextual SemanticMeaning.
    export function getSymbolKind(typeChecker: TypeChecker, symbol: Symbol, location: Node): ScriptElementKind {
        const result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location);
        if (result !== ScriptElementKind.unknown) {
            return result;
        }

        const flags = getCombinedLocalAndExportSymbolFlags(symbol);
        if (flags & SymbolFlags.Class) {
            return getDeclarationOfKind(symbol, SyntaxKind.ClassExpression) ?
                ScriptElementKind.localClassElement : ScriptElementKind.classElement;
        }
        if (flags & SymbolFlags.Enum) return ScriptElementKind.enumElement;
        if (flags & SymbolFlags.TypeAlias) return ScriptElementKind.typeElement;
        if (flags & SymbolFlags.Interface) return ScriptElementKind.interfaceElement;
        if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;

        if (flags & SymbolFlags.TypeParameter) return ScriptElementKind.typeParameterElement;
        if (flags & SymbolFlags.EnumMember) return ScriptElementKind.enumMemberElement;
        if (flags & SymbolFlags.Alias) return ScriptElementKind.alias;
        if (flags & SymbolFlags.Module) return ScriptElementKind.moduleElement;

        return result;
    }

    function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker: TypeChecker, symbol: Symbol, location: Node): ScriptElementKind {
        if (typeChecker.isUndefinedSymbol(symbol)) {
            return ScriptElementKind.variableElement;
        }
        if (typeChecker.isArgumentsSymbol(symbol)) {
            return ScriptElementKind.localVariableElement;
        }
        if (location.kind === SyntaxKind.ThisKeyword && isExpression(location)) {
            return ScriptElementKind.parameterElement;
        }
        const flags = getCombinedLocalAndExportSymbolFlags(symbol);
        if (flags & SymbolFlags.Variable) {
            if (isFirstDeclarationOfSymbolParameter(symbol)) {
                return ScriptElementKind.parameterElement;
            }
            else if (symbol.valueDeclaration && isConst(symbol.valueDeclaration)) {
                return ScriptElementKind.constElement;
            }
            else if (forEach(symbol.declarations, isLet)) {
                return ScriptElementKind.letElement;
            }
            return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
        }
        if (flags & SymbolFlags.Function) return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
        if (flags & SymbolFlags.GetAccessor) return ScriptElementKind.memberGetAccessorElement;
        if (flags & SymbolFlags.SetAccessor) return ScriptElementKind.memberSetAccessorElement;
        if (flags & SymbolFlags.Method) return ScriptElementKind.memberFunctionElement;
        if (flags & SymbolFlags.Constructor) return ScriptElementKind.constructorImplementationElement;

        if (flags & SymbolFlags.Property) {
            if (flags & SymbolFlags.Transient && (<TransientSymbol>symbol).checkFlags & CheckFlags.Synthetic) {
                // If union property is result of union of non method (property/accessors/variables), it is labeled as property
                const unionPropertyKind = forEach(typeChecker.getRootSymbols(symbol), rootSymbol => {
                    const rootSymbolFlags = rootSymbol.getFlags();
                    if (rootSymbolFlags & (SymbolFlags.PropertyOrAccessor | SymbolFlags.Variable)) {
                        return ScriptElementKind.memberVariableElement;
                    }
                    // May be a Function if this was from `typeof N` with `namespace N { function f();. }`.
                    Debug.assert(!!(rootSymbolFlags & (SymbolFlags.Method | SymbolFlags.Function)));
                });
                if (!unionPropertyKind) {
                    // If this was union of all methods,
                    // make sure it has call signatures before we can label it as method
                    const typeOfUnionProperty = typeChecker.getTypeOfSymbolAtLocation(symbol, location);
                    if (typeOfUnionProperty.getCallSignatures().length) {
                        return ScriptElementKind.memberFunctionElement;
                    }
                    return ScriptElementKind.memberVariableElement;
                }
                return unionPropertyKind;
            }
            // If we requested completions after `x.` at the top-level, we may be at a source file location.
            switch (location.parent && location.parent.kind) {
                // If we've typed a character of the attribute name, will be 'JsxAttribute', else will be 'JsxOpeningElement'.
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxElement:
                case SyntaxKind.JsxSelfClosingElement:
                    return location.kind === SyntaxKind.Identifier ? ScriptElementKind.memberVariableElement : ScriptElementKind.jsxAttribute;
                case SyntaxKind.JsxAttribute:
                    return ScriptElementKind.jsxAttribute;
                default:
                    return ScriptElementKind.memberVariableElement;
            }
        }

        return ScriptElementKind.unknown;
    }

    export function getSymbolModifiers(symbol: Symbol): string {
        const nodeModifiers = symbol && symbol.declarations && symbol.declarations.length > 0
            ? getNodeModifiers(symbol.declarations[0])
            : ScriptElementKindModifier.none;

        const symbolModifiers = symbol && symbol.flags & SymbolFlags.Optional ?
            ScriptElementKindModifier.optionalModifier
            : ScriptElementKindModifier.none;
        return nodeModifiers && symbolModifiers ? nodeModifiers + "," + symbolModifiers : nodeModifiers || symbolModifiers;
    }

    interface SymbolDisplayPartsDocumentationAndSymbolKind {
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
        symbolKind: ScriptElementKind;
        tags: JSDocTagInfo[];
    }

    // TODO(drosen): Currently completion entry details passes the SemanticMeaning.All instead of using semanticMeaning of location
    export function getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker: TypeChecker, symbol: Symbol, sourceFile: SourceFile, enclosingDeclaration: Node,
        location: Node, semanticMeaning = getMeaningFromLocation(location), alias?: Symbol): SymbolDisplayPartsDocumentationAndSymbolKind {

        const displayParts: SymbolDisplayPart[] = [];
        let documentation: SymbolDisplayPart[];
        let tags: JSDocTagInfo[];
        const symbolFlags = getCombinedLocalAndExportSymbolFlags(symbol);
        let symbolKind = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location);
        let hasAddedSymbolInfo: boolean;
        const isThisExpression = location.kind === SyntaxKind.ThisKeyword && isExpression(location);
        let type: Type;
        let printer: Printer;
        let documentationFromAlias: SymbolDisplayPart[];

        // Class at constructor site need to be shown as constructor apart from property,method, vars
        if (symbolKind !== ScriptElementKind.unknown || symbolFlags & SymbolFlags.Class || symbolFlags & SymbolFlags.Alias) {
            // If it is accessor they are allowed only if location is at name of the accessor
            if (symbolKind === ScriptElementKind.memberGetAccessorElement || symbolKind === ScriptElementKind.memberSetAccessorElement) {
                symbolKind = ScriptElementKind.memberVariableElement;
            }

            let signature: Signature;
            type = isThisExpression ? typeChecker.getTypeAtLocation(location) : typeChecker.getTypeOfSymbolAtLocation(symbol.exportSymbol || symbol, location);

            if (location.parent && location.parent.kind === SyntaxKind.PropertyAccessExpression) {
                const right = (<PropertyAccessExpression>location.parent).name;
                // Either the location is on the right of a property access, or on the left and the right is missing
                if (right === location || (right && right.getFullWidth() === 0)) {
                    location = location.parent;
                }
            }

            // try get the call/construct signature from the type if it matches
            let callExpressionLike: CallExpression | NewExpression | JsxOpeningLikeElement;
            if (isCallOrNewExpression(location)) {
                callExpressionLike = location;
            }
            else if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
                callExpressionLike = <CallExpression | NewExpression>location.parent;
            }
            else if (location.parent && isJsxOpeningLikeElement(location.parent) && isFunctionLike(symbol.valueDeclaration)) {
                callExpressionLike = location.parent;
            }

            if (callExpressionLike) {
                const candidateSignatures: Signature[] = [];
                signature = typeChecker.getResolvedSignature(callExpressionLike, candidateSignatures);

                const useConstructSignatures = callExpressionLike.kind === SyntaxKind.NewExpression || (isCallExpression(callExpressionLike) && callExpressionLike.expression.kind === SyntaxKind.SuperKeyword);

                const allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();

                if (!contains(allSignatures, signature.target) && !contains(allSignatures, signature)) {
                    // Get the first signature if there is one -- allSignatures may contain
                    // either the original signature or its target, so check for either
                    signature = allSignatures.length ? allSignatures[0] : undefined;
                }

                if (signature) {
                    if (useConstructSignatures && (symbolFlags & SymbolFlags.Class)) {
                        // Constructor
                        symbolKind = ScriptElementKind.constructorImplementationElement;
                        addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                    }
                    else if (symbolFlags & SymbolFlags.Alias) {
                        symbolKind = ScriptElementKind.alias;
                        pushTypePart(symbolKind);
                        displayParts.push(spacePart());
                        if (useConstructSignatures) {
                            displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                            displayParts.push(spacePart());
                        }
                        addFullSymbolName(symbol);
                    }
                    else {
                        addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                    }

                    switch (symbolKind) {
                        case ScriptElementKind.jsxAttribute:
                        case ScriptElementKind.memberVariableElement:
                        case ScriptElementKind.variableElement:
                        case ScriptElementKind.constElement:
                        case ScriptElementKind.letElement:
                        case ScriptElementKind.parameterElement:
                        case ScriptElementKind.localVariableElement:
                            // If it is call or construct signature of lambda's write type name
                            displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                            displayParts.push(spacePart());
                            if (!(getObjectFlags(type) & ObjectFlags.Anonymous) && type.symbol) {
                                addRange(displayParts, symbolToDisplayParts(typeChecker, type.symbol, enclosingDeclaration, /*meaning*/ undefined, SymbolFormatFlags.AllowAnyNodeKind | SymbolFormatFlags.WriteTypeParametersOrArguments));
                                displayParts.push(lineBreakPart());
                            }
                            if (useConstructSignatures) {
                                displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                                displayParts.push(spacePart());
                            }
                            addSignatureDisplayParts(signature, allSignatures, TypeFormatFlags.WriteArrowStyleSignature);
                            break;

                        default:
                            // Just signature
                            addSignatureDisplayParts(signature, allSignatures);
                    }
                    hasAddedSymbolInfo = true;
                }
            }
            else if ((isNameOfFunctionDeclaration(location) && !(symbolFlags & SymbolFlags.Accessor)) || // name of function declaration
                (location.kind === SyntaxKind.ConstructorKeyword && location.parent.kind === SyntaxKind.Constructor)) { // At constructor keyword of constructor declaration
                // get the signature from the declaration and write it
                const functionDeclaration = <FunctionLike>location.parent;
                // Use function declaration to write the signatures only if the symbol corresponding to this declaration
                const locationIsSymbolDeclaration = find(symbol.declarations, declaration =>
                    declaration === (location.kind === SyntaxKind.ConstructorKeyword ? functionDeclaration.parent : functionDeclaration));

                if (locationIsSymbolDeclaration) {
                    const allSignatures = functionDeclaration.kind === SyntaxKind.Constructor ? type.getNonNullableType().getConstructSignatures() : type.getNonNullableType().getCallSignatures();
                    if (!typeChecker.isImplementationOfOverload(functionDeclaration)) {
                        signature = typeChecker.getSignatureFromDeclaration(functionDeclaration);
                    }
                    else {
                        signature = allSignatures[0];
                    }

                    if (functionDeclaration.kind === SyntaxKind.Constructor) {
                        // show (constructor) Type(...) signature
                        symbolKind = ScriptElementKind.constructorImplementationElement;
                        addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                    }
                    else {
                        // (function/method) symbol(..signature)
                        addPrefixForAnyFunctionOrVar(functionDeclaration.kind === SyntaxKind.CallSignature &&
                            !(type.symbol.flags & SymbolFlags.TypeLiteral || type.symbol.flags & SymbolFlags.ObjectLiteral) ? type.symbol : symbol, symbolKind);
                    }

                    addSignatureDisplayParts(signature, allSignatures);
                    hasAddedSymbolInfo = true;
                }
            }
        }
        if (symbolFlags & SymbolFlags.Class && !hasAddedSymbolInfo && !isThisExpression) {
            addAliasPrefixIfNecessary();
            if (getDeclarationOfKind(symbol, SyntaxKind.ClassExpression)) {
                // Special case for class expressions because we would like to indicate that
                // the class name is local to the class body (similar to function expression)
                //      (local class) class <className>
                pushTypePart(ScriptElementKind.localClassElement);
            }
            else {
                // Class declaration has name which is not local.
                displayParts.push(keywordPart(SyntaxKind.ClassKeyword));
            }
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
            writeTypeParametersOfSymbol(symbol, sourceFile);
        }
        if ((symbolFlags & SymbolFlags.Interface) && (semanticMeaning & SemanticMeaning.Type)) {
            prefixNextMeaning();
            displayParts.push(keywordPart(SyntaxKind.InterfaceKeyword));
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
            writeTypeParametersOfSymbol(symbol, sourceFile);
        }
        if (symbolFlags & SymbolFlags.TypeAlias) {
            prefixNextMeaning();
            displayParts.push(keywordPart(SyntaxKind.TypeKeyword));
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
            writeTypeParametersOfSymbol(symbol, sourceFile);
            displayParts.push(spacePart());
            displayParts.push(operatorPart(SyntaxKind.EqualsToken));
            displayParts.push(spacePart());
            addRange(displayParts, typeToDisplayParts(typeChecker, typeChecker.getDeclaredTypeOfSymbol(symbol), enclosingDeclaration, TypeFormatFlags.InTypeAlias));
        }
        if (symbolFlags & SymbolFlags.Enum) {
            prefixNextMeaning();
            if (forEach(symbol.declarations, isConstEnumDeclaration)) {
                displayParts.push(keywordPart(SyntaxKind.ConstKeyword));
                displayParts.push(spacePart());
            }
            displayParts.push(keywordPart(SyntaxKind.EnumKeyword));
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
        }
        if (symbolFlags & SymbolFlags.Module) {
            prefixNextMeaning();
            const declaration = getDeclarationOfKind<ModuleDeclaration>(symbol, SyntaxKind.ModuleDeclaration);
            const isNamespace = declaration && declaration.name && declaration.name.kind === SyntaxKind.Identifier;
            displayParts.push(keywordPart(isNamespace ? SyntaxKind.NamespaceKeyword : SyntaxKind.ModuleKeyword));
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
        }
        if ((symbolFlags & SymbolFlags.TypeParameter) && (semanticMeaning & SemanticMeaning.Type)) {
            prefixNextMeaning();
            displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
            displayParts.push(textPart("type parameter"));
            displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
            if (symbol.parent) {
                // Class/Interface type parameter
                addInPrefix();
                addFullSymbolName(symbol.parent, enclosingDeclaration);
                writeTypeParametersOfSymbol(symbol.parent, enclosingDeclaration);
            }
            else {
                // Method/function type parameter
                const decl = getDeclarationOfKind(symbol, SyntaxKind.TypeParameter);
                Debug.assert(decl !== undefined);
                const declaration = decl.parent;

                if (declaration) {
                    if (isFunctionLikeKind(declaration.kind)) {
                        addInPrefix();
                        const signature = typeChecker.getSignatureFromDeclaration(<SignatureDeclaration>declaration);
                        if (declaration.kind === SyntaxKind.ConstructSignature) {
                            displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                            displayParts.push(spacePart());
                        }
                        else if (declaration.kind !== SyntaxKind.CallSignature && (<SignatureDeclaration>declaration).name) {
                            addFullSymbolName(declaration.symbol);
                        }
                        addRange(displayParts, signatureToDisplayParts(typeChecker, signature, sourceFile, TypeFormatFlags.WriteTypeArgumentsOfSignature));
                    }
                    else if (declaration.kind === SyntaxKind.TypeAliasDeclaration) {
                        // Type alias type parameter
                        // For example
                        //      type list<T> = T[]; // Both T will go through same code path
                        addInPrefix();
                        displayParts.push(keywordPart(SyntaxKind.TypeKeyword));
                        displayParts.push(spacePart());
                        addFullSymbolName(declaration.symbol);
                        writeTypeParametersOfSymbol(declaration.symbol, sourceFile);
                    }
                }
            }
        }
        if (symbolFlags & SymbolFlags.EnumMember) {
            symbolKind = ScriptElementKind.enumMemberElement;
            addPrefixForAnyFunctionOrVar(symbol, "enum member");
            const declaration = symbol.declarations[0];
            if (declaration.kind === SyntaxKind.EnumMember) {
                const constantValue = typeChecker.getConstantValue(<EnumMember>declaration);
                if (constantValue !== undefined) {
                    displayParts.push(spacePart());
                    displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                    displayParts.push(spacePart());
                    displayParts.push(displayPart(getTextOfConstantValue(constantValue),
                        typeof constantValue === "number" ? SymbolDisplayPartKind.numericLiteral : SymbolDisplayPartKind.stringLiteral));
                }
            }
        }
        if (symbolFlags & SymbolFlags.Alias) {
            prefixNextMeaning();
            if (!hasAddedSymbolInfo) {
                const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
                if (resolvedSymbol !== symbol && resolvedSymbol.declarations && resolvedSymbol.declarations.length > 0) {
                    const resolvedNode = resolvedSymbol.declarations[0];
                    const declarationName = getNameOfDeclaration(resolvedNode);
                    if (declarationName) {
                        const isExternalModuleDeclaration =
                            isModuleWithStringLiteralName(resolvedNode) &&
                            hasModifier(resolvedNode, ModifierFlags.Ambient);
                        const shouldUseAliasName = symbol.name !== "default" && !isExternalModuleDeclaration;
                        const resolvedInfo = getSymbolDisplayPartsDocumentationAndSymbolKind(
                            typeChecker,
                            resolvedSymbol,
                            getSourceFileOfNode(resolvedNode),
                            resolvedNode,
                            declarationName,
                            semanticMeaning,
                            shouldUseAliasName ? symbol : resolvedSymbol);
                        displayParts.push(...resolvedInfo.displayParts);
                        displayParts.push(lineBreakPart());
                        documentationFromAlias = resolvedInfo.documentation;
                    }
                }
            }

            switch (symbol.declarations[0].kind) {
                case SyntaxKind.NamespaceExportDeclaration:
                    displayParts.push(keywordPart(SyntaxKind.ExportKeyword));
                    displayParts.push(spacePart());
                    displayParts.push(keywordPart(SyntaxKind.NamespaceKeyword));
                    break;
                case SyntaxKind.ExportAssignment:
                    displayParts.push(keywordPart(SyntaxKind.ExportKeyword));
                    displayParts.push(spacePart());
                    displayParts.push(keywordPart((symbol.declarations[0] as ExportAssignment).isExportEquals ? SyntaxKind.EqualsToken : SyntaxKind.DefaultKeyword));
                    break;
                default:
                    displayParts.push(keywordPart(SyntaxKind.ImportKeyword));
            }
            displayParts.push(spacePart());
            addFullSymbolName(symbol);
            forEach(symbol.declarations, declaration => {
                if (declaration.kind === SyntaxKind.ImportEqualsDeclaration) {
                    const importEqualsDeclaration = <ImportEqualsDeclaration>declaration;
                    if (isExternalModuleImportEqualsDeclaration(importEqualsDeclaration)) {
                        displayParts.push(spacePart());
                        displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                        displayParts.push(spacePart());
                        displayParts.push(keywordPart(SyntaxKind.RequireKeyword));
                        displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                        displayParts.push(displayPart(getTextOfNode(getExternalModuleImportEqualsDeclarationExpression(importEqualsDeclaration)), SymbolDisplayPartKind.stringLiteral));
                        displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                    }
                    else {
                        const internalAliasSymbol = typeChecker.getSymbolAtLocation(importEqualsDeclaration.moduleReference);
                        if (internalAliasSymbol) {
                            displayParts.push(spacePart());
                            displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                            displayParts.push(spacePart());
                            addFullSymbolName(internalAliasSymbol, enclosingDeclaration);
                        }
                    }
                    return true;
                }
            });
        }
        if (!hasAddedSymbolInfo) {
            if (symbolKind !== ScriptElementKind.unknown) {
                if (type) {
                    if (isThisExpression) {
                        prefixNextMeaning();
                        displayParts.push(keywordPart(SyntaxKind.ThisKeyword));
                    }
                    else {
                        addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                    }

                    // For properties, variables and local vars: show the type
                    if (symbolKind === ScriptElementKind.memberVariableElement ||
                        symbolKind === ScriptElementKind.jsxAttribute ||
                        symbolFlags & SymbolFlags.Variable ||
                        symbolKind === ScriptElementKind.localVariableElement ||
                        isThisExpression) {
                        displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                        displayParts.push(spacePart());
                        // If the type is type parameter, format it specially
                        if (type.symbol && type.symbol.flags & SymbolFlags.TypeParameter) {
                            const typeParameterParts = mapToDisplayParts(writer => {
                                const param = typeChecker.typeParameterToDeclaration(type as TypeParameter, enclosingDeclaration);
                                getPrinter().writeNode(EmitHint.Unspecified, param, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration)), writer);
                            });
                            addRange(displayParts, typeParameterParts);
                        }
                        else {
                            addRange(displayParts, typeToDisplayParts(typeChecker, type, enclosingDeclaration));
                        }
                    }
                    else if (symbolFlags & SymbolFlags.Function ||
                        symbolFlags & SymbolFlags.Method ||
                        symbolFlags & SymbolFlags.Constructor ||
                        symbolFlags & SymbolFlags.Signature ||
                        symbolFlags & SymbolFlags.Accessor ||
                        symbolKind === ScriptElementKind.memberFunctionElement) {
                        const allSignatures = type.getNonNullableType().getCallSignatures();
                        if (allSignatures.length) {
                            addSignatureDisplayParts(allSignatures[0], allSignatures);
                        }
                    }
                }
            }
            else {
                symbolKind = getSymbolKind(typeChecker, symbol, location);
            }
        }

        if (!documentation) {
            documentation = symbol.getDocumentationComment(typeChecker);
            tags = symbol.getJsDocTags();
            if (documentation.length === 0 && symbolFlags & SymbolFlags.Property) {
                // For some special property access expressions like `exports.foo = foo` or `module.exports.foo = foo`
                // there documentation comments might be attached to the right hand side symbol of their declarations.
                // The pattern of such special property access is that the parent symbol is the symbol of the file.
                if (symbol.parent && forEach(symbol.parent.declarations, declaration => declaration.kind === SyntaxKind.SourceFile)) {
                    for (const declaration of symbol.declarations) {
                        if (!declaration.parent || declaration.parent.kind !== SyntaxKind.BinaryExpression) {
                            continue;
                        }

                        const rhsSymbol = typeChecker.getSymbolAtLocation((<BinaryExpression>declaration.parent).right);
                        if (!rhsSymbol) {
                            continue;
                        }

                        documentation = rhsSymbol.getDocumentationComment(typeChecker);
                        tags = rhsSymbol.getJsDocTags();
                        if (documentation.length > 0) {
                            break;
                        }
                    }
                }
            }
        }

        if (documentation.length === 0 && documentationFromAlias) {
            documentation = documentationFromAlias;
        }

        return { displayParts, documentation, symbolKind, tags };

        function getPrinter() {
            if (!printer) {
                printer = createPrinter({ removeComments: true });
            }
            return printer;
        }

        function prefixNextMeaning() {
            if (displayParts.length) {
                displayParts.push(lineBreakPart());
            }
            addAliasPrefixIfNecessary();
        }

        function addAliasPrefixIfNecessary() {
            if (alias) {
                pushTypePart(ScriptElementKind.alias);
                displayParts.push(spacePart());
            }
        }

        function addInPrefix() {
            displayParts.push(spacePart());
            displayParts.push(keywordPart(SyntaxKind.InKeyword));
            displayParts.push(spacePart());
        }

        function addFullSymbolName(symbolToDisplay: Symbol, enclosingDeclaration?: Node) {
            if (alias && symbolToDisplay === symbol) {
                symbolToDisplay = alias;
            }
            const fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay, enclosingDeclaration || sourceFile, /*meaning*/ undefined,
                SymbolFormatFlags.WriteTypeParametersOrArguments | SymbolFormatFlags.UseOnlyExternalAliasing | SymbolFormatFlags.AllowAnyNodeKind);
            addRange(displayParts, fullSymbolDisplayParts);
        }

        function addPrefixForAnyFunctionOrVar(symbol: Symbol, symbolKind: string) {
            prefixNextMeaning();
            if (symbolKind) {
                pushTypePart(symbolKind);
                if (symbol && !some(symbol.declarations, d => isArrowFunction(d) || (isFunctionExpression(d) || isClassExpression(d)) && !d.name)) {
                    displayParts.push(spacePart());
                    addFullSymbolName(symbol);
                }
            }
        }

        function pushTypePart(symbolKind: string) {
            switch (symbolKind) {
                case ScriptElementKind.variableElement:
                case ScriptElementKind.functionElement:
                case ScriptElementKind.letElement:
                case ScriptElementKind.constElement:
                case ScriptElementKind.constructorImplementationElement:
                    displayParts.push(textOrKeywordPart(symbolKind));
                    return;
                default:
                    displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                    displayParts.push(textOrKeywordPart(symbolKind));
                    displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                    return;
            }
        }

        function addSignatureDisplayParts(signature: Signature, allSignatures: Signature[], flags?: TypeFormatFlags) {
            addRange(displayParts, signatureToDisplayParts(typeChecker, signature, enclosingDeclaration, flags | TypeFormatFlags.WriteTypeArgumentsOfSignature));
            if (allSignatures.length > 1) {
                displayParts.push(spacePart());
                displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                displayParts.push(operatorPart(SyntaxKind.PlusToken));
                displayParts.push(displayPart((allSignatures.length - 1).toString(), SymbolDisplayPartKind.numericLiteral));
                displayParts.push(spacePart());
                displayParts.push(textPart(allSignatures.length === 2 ? "overload" : "overloads"));
                displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
            }
            documentation = signature.getDocumentationComment(typeChecker);
            tags = signature.getJsDocTags();
        }

        function writeTypeParametersOfSymbol(symbol: Symbol, enclosingDeclaration: Node) {
            const typeParameterParts = mapToDisplayParts(writer => {
                const params = typeChecker.symbolToTypeParameterDeclarations(symbol, enclosingDeclaration);
                getPrinter().writeList(ListFormat.TypeParameters, params, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration)), writer);
            });
            addRange(displayParts, typeParameterParts);
        }
    }

    function isLocalVariableOrFunction(symbol: Symbol) {
        if (symbol.parent) {
            return false; // This is exported symbol
        }

        return forEach(symbol.declarations, declaration => {
            // Function expressions are local
            if (declaration.kind === SyntaxKind.FunctionExpression) {
                return true;
            }

            if (declaration.kind !== SyntaxKind.VariableDeclaration && declaration.kind !== SyntaxKind.FunctionDeclaration) {
                return false;
            }

            // If the parent is not sourceFile or module block it is local variable
            for (let parent = declaration.parent; !isFunctionBlock(parent); parent = parent.parent) {
                // Reached source file or module block
                if (parent.kind === SyntaxKind.SourceFile || parent.kind === SyntaxKind.ModuleBlock) {
                    return false;
                }
            }

            // parent is in function block
            return true;
        });
    }
}
