/* @internal */
namespace ts.SymbolDisplay {
const symbolDisplayNodeBuilderFlags = ts.NodeBuilderFlags.OmitParameterModifiers | ts.NodeBuilderFlags.IgnoreErrors | ts.NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;

// TODO(drosen): use contextual SemanticMeaning.
export function getSymbolKind(typeChecker: ts.TypeChecker, symbol: ts.Symbol, location: ts.Node): ts.ScriptElementKind {
    const result = getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location);
    if (result !== ts.ScriptElementKind.unknown) {
        return result;
    }

    const flags = ts.getCombinedLocalAndExportSymbolFlags(symbol);
    if (flags & ts.SymbolFlags.Class) {
        return ts.getDeclarationOfKind(symbol, ts.SyntaxKind.ClassExpression) ?
            ts.ScriptElementKind.localClassElement : ts.ScriptElementKind.classElement;
    }
    if (flags & ts.SymbolFlags.Enum) return ts.ScriptElementKind.enumElement;
    if (flags & ts.SymbolFlags.TypeAlias) return ts.ScriptElementKind.typeElement;
    if (flags & ts.SymbolFlags.Interface) return ts.ScriptElementKind.interfaceElement;
    if (flags & ts.SymbolFlags.TypeParameter) return ts.ScriptElementKind.typeParameterElement;
    if (flags & ts.SymbolFlags.EnumMember) return ts.ScriptElementKind.enumMemberElement;
    if (flags & ts.SymbolFlags.Alias) return ts.ScriptElementKind.alias;
    if (flags & ts.SymbolFlags.Module) return ts.ScriptElementKind.moduleElement;

    return result;
}

function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker: ts.TypeChecker, symbol: ts.Symbol, location: ts.Node): ts.ScriptElementKind {
    const roots = typeChecker.getRootSymbols(symbol);
    // If this is a method from a mapped type, leave as a method so long as it still has a call signature.
    if (roots.length === 1
        && ts.first(roots).flags & ts.SymbolFlags.Method
        // Ensure the mapped version is still a method, as opposed to `{ [K in keyof I]: number }`.
        && typeChecker.getTypeOfSymbolAtLocation(symbol, location).getNonNullableType().getCallSignatures().length !== 0) {
        return ts.ScriptElementKind.memberFunctionElement;
    }

    if (typeChecker.isUndefinedSymbol(symbol)) {
        return ts.ScriptElementKind.variableElement;
    }
    if (typeChecker.isArgumentsSymbol(symbol)) {
        return ts.ScriptElementKind.localVariableElement;
    }
    if (location.kind === ts.SyntaxKind.ThisKeyword && ts.isExpression(location) || ts.isThisInTypeQuery(location)) {
        return ts.ScriptElementKind.parameterElement;
    }
    const flags = ts.getCombinedLocalAndExportSymbolFlags(symbol);
    if (flags & ts.SymbolFlags.Variable) {
        if (ts.isFirstDeclarationOfSymbolParameter(symbol)) {
            return ts.ScriptElementKind.parameterElement;
        }
        else if (symbol.valueDeclaration && ts.isVarConst(symbol.valueDeclaration as ts.VariableDeclaration)) {
            return ts.ScriptElementKind.constElement;
        }
        else if (ts.forEach(symbol.declarations, ts.isLet)) {
            return ts.ScriptElementKind.letElement;
        }
        return isLocalVariableOrFunction(symbol) ? ts.ScriptElementKind.localVariableElement : ts.ScriptElementKind.variableElement;
    }
    if (flags & ts.SymbolFlags.Function) return isLocalVariableOrFunction(symbol) ? ts.ScriptElementKind.localFunctionElement : ts.ScriptElementKind.functionElement;
    // FIXME: getter and setter use the same symbol. And it is rare to use only setter without getter, so in most cases the symbol always has getter flag.
    // So, even when the location is just on the declaration of setter, this function returns getter.
    if (flags & ts.SymbolFlags.GetAccessor) return ts.ScriptElementKind.memberGetAccessorElement;
    if (flags & ts.SymbolFlags.SetAccessor) return ts.ScriptElementKind.memberSetAccessorElement;
    if (flags & ts.SymbolFlags.Method) return ts.ScriptElementKind.memberFunctionElement;
    if (flags & ts.SymbolFlags.Constructor) return ts.ScriptElementKind.constructorImplementationElement;
    if (flags & ts.SymbolFlags.Signature) return ts.ScriptElementKind.indexSignatureElement;

    if (flags & ts.SymbolFlags.Property) {
        if (flags & ts.SymbolFlags.Transient && (symbol as ts.TransientSymbol).checkFlags & ts.CheckFlags.Synthetic) {
            // If union property is result of union of non method (property/accessors/variables), it is labeled as property
            const unionPropertyKind = ts.forEach(typeChecker.getRootSymbols(symbol), rootSymbol => {
                const rootSymbolFlags = rootSymbol.getFlags();
                if (rootSymbolFlags & (ts.SymbolFlags.PropertyOrAccessor | ts.SymbolFlags.Variable)) {
                    return ts.ScriptElementKind.memberVariableElement;
                }
            });
            if (!unionPropertyKind) {
                // If this was union of all methods,
                // make sure it has call signatures before we can label it as method
                const typeOfUnionProperty = typeChecker.getTypeOfSymbolAtLocation(symbol, location);
                if (typeOfUnionProperty.getCallSignatures().length) {
                    return ts.ScriptElementKind.memberFunctionElement;
                }
                return ts.ScriptElementKind.memberVariableElement;
            }
            return unionPropertyKind;
        }

        return ts.ScriptElementKind.memberVariableElement;
    }

    return ts.ScriptElementKind.unknown;
}

function getNormalizedSymbolModifiers(symbol: ts.Symbol) {
    if (symbol.declarations && symbol.declarations.length) {
        const [declaration, ...declarations] = symbol.declarations;
        // omit deprecated flag if some declarations are not deprecated
        const excludeFlags = ts.length(declarations) && ts.isDeprecatedDeclaration(declaration) && ts.some(declarations, d => !ts.isDeprecatedDeclaration(d))
            ? ts.ModifierFlags.Deprecated
            : ts.ModifierFlags.None;
        const modifiers = ts.getNodeModifiers(declaration, excludeFlags);
        if (modifiers) {
            return modifiers.split(",");
        }
    }
    return [];
}

export function getSymbolModifiers(typeChecker: ts.TypeChecker, symbol: ts.Symbol): string {
    if (!symbol) {
        return ts.ScriptElementKindModifier.none;
    }

    const modifiers = new ts.Set(getNormalizedSymbolModifiers(symbol));
    if (symbol.flags & ts.SymbolFlags.Alias) {
        const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
        if (resolvedSymbol !== symbol) {
            ts.forEach(getNormalizedSymbolModifiers(resolvedSymbol), modifier => {
                modifiers.add(modifier);
            });
        }
    }
    if (symbol.flags & ts.SymbolFlags.Optional) {
        modifiers.add(ts.ScriptElementKindModifier.optionalModifier);
    }
    return modifiers.size > 0 ? ts.arrayFrom(modifiers.values()).join(",") : ts.ScriptElementKindModifier.none;
}

interface SymbolDisplayPartsDocumentationAndSymbolKind {
    displayParts: ts.SymbolDisplayPart[];
    documentation: ts.SymbolDisplayPart[];
    symbolKind: ts.ScriptElementKind;
    tags: ts.JSDocTagInfo[] | undefined;
}

// TODO(drosen): Currently completion entry details passes the SemanticMeaning.All instead of using semanticMeaning of location
export function getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker: ts.TypeChecker, symbol: ts.Symbol, sourceFile: ts.SourceFile, enclosingDeclaration: ts.Node | undefined,
    location: ts.Node, semanticMeaning = ts.getMeaningFromLocation(location), alias?: ts.Symbol): SymbolDisplayPartsDocumentationAndSymbolKind {
    const displayParts: ts.SymbolDisplayPart[] = [];
    let documentation: ts.SymbolDisplayPart[] = [];
    let tags: ts.JSDocTagInfo[] = [];
    const symbolFlags = ts.getCombinedLocalAndExportSymbolFlags(symbol);
    let symbolKind = semanticMeaning & ts.SemanticMeaning.Value ? getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location) : ts.ScriptElementKind.unknown;
    let hasAddedSymbolInfo = false;
    const isThisExpression = location.kind === ts.SyntaxKind.ThisKeyword && ts.isInExpressionContext(location) || ts.isThisInTypeQuery(location);
    let type: ts.Type | undefined;
    let printer: ts.Printer;
    let documentationFromAlias: ts.SymbolDisplayPart[] | undefined;
    let tagsFromAlias: ts.JSDocTagInfo[] | undefined;
    let hasMultipleSignatures = false;

    if (location.kind === ts.SyntaxKind.ThisKeyword && !isThisExpression) {
        return { displayParts: [ts.keywordPart(ts.SyntaxKind.ThisKeyword)], documentation: [], symbolKind: ts.ScriptElementKind.primitiveType, tags: undefined };
    }

    // Class at constructor site need to be shown as constructor apart from property,method, vars
    if (symbolKind !== ts.ScriptElementKind.unknown || symbolFlags & ts.SymbolFlags.Class || symbolFlags & ts.SymbolFlags.Alias) {
        // If symbol is accessor, they are allowed only if location is at declaration identifier of the accessor
        if (symbolKind === ts.ScriptElementKind.memberGetAccessorElement || symbolKind === ts.ScriptElementKind.memberSetAccessorElement) {
            const declaration = ts.find(symbol.declarations as ((ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration)[]), declaration => declaration.name === location);
            if (declaration) {
                switch(declaration.kind){
                    case ts.SyntaxKind.GetAccessor:
                        symbolKind = ts.ScriptElementKind.memberGetAccessorElement;
                        break;
                    case ts.SyntaxKind.SetAccessor:
                        symbolKind = ts.ScriptElementKind.memberSetAccessorElement;
                        break;
                    case ts.SyntaxKind.PropertyDeclaration:
                        symbolKind = ts.ScriptElementKind.memberAccessorVariableElement;
                        break;
                    default:
                        ts.Debug.assertNever(declaration);
                    }
            }
            else {
                symbolKind = ts.ScriptElementKind.memberVariableElement;
            }
        }

        let signature: ts.Signature | undefined;
        type = isThisExpression ? typeChecker.getTypeAtLocation(location) : typeChecker.getTypeOfSymbolAtLocation(symbol, location);

        if (location.parent && location.parent.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const right = (location.parent as ts.PropertyAccessExpression).name;
            // Either the location is on the right of a property access, or on the left and the right is missing
            if (right === location || (right && right.getFullWidth() === 0)) {
                location = location.parent;
            }
        }

        // try get the call/construct signature from the type if it matches
        let callExpressionLike: ts.CallExpression | ts.NewExpression | ts.JsxOpeningLikeElement | ts.TaggedTemplateExpression | undefined;
        if (ts.isCallOrNewExpression(location)) {
            callExpressionLike = location;
        }
        else if (ts.isCallExpressionTarget(location) || ts.isNewExpressionTarget(location)) {
            callExpressionLike = location.parent as ts.CallExpression | ts.NewExpression;
        }
        else if (location.parent && (ts.isJsxOpeningLikeElement(location.parent) || ts.isTaggedTemplateExpression(location.parent)) && ts.isFunctionLike(symbol.valueDeclaration)) {
            callExpressionLike = location.parent;
        }

        if (callExpressionLike) {
            signature = typeChecker.getResolvedSignature(callExpressionLike); // TODO: GH#18217

            const useConstructSignatures = callExpressionLike.kind === ts.SyntaxKind.NewExpression || (ts.isCallExpression(callExpressionLike) && callExpressionLike.expression.kind === ts.SyntaxKind.SuperKeyword);

            const allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();

            if (signature && !ts.contains(allSignatures, signature.target) && !ts.contains(allSignatures, signature)) {
                // Get the first signature if there is one -- allSignatures may contain
                // either the original signature or its target, so check for either
                signature = allSignatures.length ? allSignatures[0] : undefined;
            }

            if (signature) {
                if (useConstructSignatures && (symbolFlags & ts.SymbolFlags.Class)) {
                    // Constructor
                    symbolKind = ts.ScriptElementKind.constructorImplementationElement;
                    addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                }
                else if (symbolFlags & ts.SymbolFlags.Alias) {
                    symbolKind = ts.ScriptElementKind.alias;
                    pushSymbolKind(symbolKind);
                    displayParts.push(ts.spacePart());
                    if (useConstructSignatures) {
                        if (signature.flags & ts.SignatureFlags.Abstract) {
                            displayParts.push(ts.keywordPart(ts.SyntaxKind.AbstractKeyword));
                            displayParts.push(ts.spacePart());
                        }
                        displayParts.push(ts.keywordPart(ts.SyntaxKind.NewKeyword));
                        displayParts.push(ts.spacePart());
                    }
                    addFullSymbolName(symbol);
                }
                else {
                    addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                }

                switch (symbolKind) {
                    case ts.ScriptElementKind.jsxAttribute:
                    case ts.ScriptElementKind.memberVariableElement:
                    case ts.ScriptElementKind.variableElement:
                    case ts.ScriptElementKind.constElement:
                    case ts.ScriptElementKind.letElement:
                    case ts.ScriptElementKind.parameterElement:
                    case ts.ScriptElementKind.localVariableElement:
                        // If it is call or construct signature of lambda's write type name
                        displayParts.push(ts.punctuationPart(ts.SyntaxKind.ColonToken));
                        displayParts.push(ts.spacePart());
                        if (!(ts.getObjectFlags(type) & ts.ObjectFlags.Anonymous) && type.symbol) {
                            ts.addRange(displayParts, ts.symbolToDisplayParts(typeChecker, type.symbol, enclosingDeclaration, /*meaning*/ undefined, ts.SymbolFormatFlags.AllowAnyNodeKind | ts.SymbolFormatFlags.WriteTypeParametersOrArguments));
                            displayParts.push(ts.lineBreakPart());
                        }
                        if (useConstructSignatures) {
                            if (signature.flags & ts.SignatureFlags.Abstract) {
                                displayParts.push(ts.keywordPart(ts.SyntaxKind.AbstractKeyword));
                                displayParts.push(ts.spacePart());
                            }
                            displayParts.push(ts.keywordPart(ts.SyntaxKind.NewKeyword));
                            displayParts.push(ts.spacePart());
                        }
                        addSignatureDisplayParts(signature, allSignatures, ts.TypeFormatFlags.WriteArrowStyleSignature);
                        break;

                    default:
                        // Just signature
                        addSignatureDisplayParts(signature, allSignatures);
                }
                hasAddedSymbolInfo = true;
                hasMultipleSignatures = allSignatures.length > 1;
            }
        }
        else if ((ts.isNameOfFunctionDeclaration(location) && !(symbolFlags & ts.SymbolFlags.Accessor)) || // name of function declaration
            (location.kind === ts.SyntaxKind.ConstructorKeyword && location.parent.kind === ts.SyntaxKind.Constructor)) { // At constructor keyword of constructor declaration
            // get the signature from the declaration and write it
            const functionDeclaration = location.parent as ts.SignatureDeclaration;
            // Use function declaration to write the signatures only if the symbol corresponding to this declaration
            const locationIsSymbolDeclaration = symbol.declarations && ts.find(symbol.declarations, declaration =>
                declaration === (location.kind === ts.SyntaxKind.ConstructorKeyword ? functionDeclaration.parent : functionDeclaration));

            if (locationIsSymbolDeclaration) {
                const allSignatures = functionDeclaration.kind === ts.SyntaxKind.Constructor ? type.getNonNullableType().getConstructSignatures() : type.getNonNullableType().getCallSignatures();
                if (!typeChecker.isImplementationOfOverload(functionDeclaration)) {
                    signature = typeChecker.getSignatureFromDeclaration(functionDeclaration); // TODO: GH#18217
                }
                else {
                    signature = allSignatures[0];
                }

                if (functionDeclaration.kind === ts.SyntaxKind.Constructor) {
                    // show (constructor) Type(...) signature
                    symbolKind = ts.ScriptElementKind.constructorImplementationElement;
                    addPrefixForAnyFunctionOrVar(type.symbol, symbolKind);
                }
                else {
                    // (function/method) symbol(..signature)
                    addPrefixForAnyFunctionOrVar(functionDeclaration.kind === ts.SyntaxKind.CallSignature &&
                        !(type.symbol.flags & ts.SymbolFlags.TypeLiteral || type.symbol.flags & ts.SymbolFlags.ObjectLiteral) ? type.symbol : symbol, symbolKind);
                }
                if (signature) {
                    addSignatureDisplayParts(signature, allSignatures);
                }
                hasAddedSymbolInfo = true;
                hasMultipleSignatures = allSignatures.length > 1;
            }
        }
    }
    if (symbolFlags & ts.SymbolFlags.Class && !hasAddedSymbolInfo && !isThisExpression) {
        addAliasPrefixIfNecessary();
        if (ts.getDeclarationOfKind(symbol, ts.SyntaxKind.ClassExpression)) {
            // Special case for class expressions because we would like to indicate that
            // the class name is local to the class body (similar to function expression)
            //      (local class) class <className>
            pushSymbolKind(ts.ScriptElementKind.localClassElement);
        }
        else {
            // Class declaration has name which is not local.
            displayParts.push(ts.keywordPart(ts.SyntaxKind.ClassKeyword));
        }
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
        writeTypeParametersOfSymbol(symbol, sourceFile);
    }
    if ((symbolFlags & ts.SymbolFlags.Interface) && (semanticMeaning & ts.SemanticMeaning.Type)) {
        prefixNextMeaning();
        displayParts.push(ts.keywordPart(ts.SyntaxKind.InterfaceKeyword));
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
        writeTypeParametersOfSymbol(symbol, sourceFile);
    }
    if ((symbolFlags & ts.SymbolFlags.TypeAlias) && (semanticMeaning & ts.SemanticMeaning.Type)) {
        prefixNextMeaning();
        displayParts.push(ts.keywordPart(ts.SyntaxKind.TypeKeyword));
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
        writeTypeParametersOfSymbol(symbol, sourceFile);
        displayParts.push(ts.spacePart());
        displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
        displayParts.push(ts.spacePart());
        ts.addRange(displayParts, ts.typeToDisplayParts(typeChecker, ts.isConstTypeReference(location.parent) ? typeChecker.getTypeAtLocation(location.parent) : typeChecker.getDeclaredTypeOfSymbol(symbol), enclosingDeclaration, ts.TypeFormatFlags.InTypeAlias));
    }
    if (symbolFlags & ts.SymbolFlags.Enum) {
        prefixNextMeaning();
        if (ts.some(symbol.declarations, d => ts.isEnumDeclaration(d) && ts.isEnumConst(d))) {
            displayParts.push(ts.keywordPart(ts.SyntaxKind.ConstKeyword));
            displayParts.push(ts.spacePart());
        }
        displayParts.push(ts.keywordPart(ts.SyntaxKind.EnumKeyword));
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
    }
    if (symbolFlags & ts.SymbolFlags.Module && !isThisExpression) {
        prefixNextMeaning();
        const declaration = ts.getDeclarationOfKind<ts.ModuleDeclaration>(symbol, ts.SyntaxKind.ModuleDeclaration);
        const isNamespace = declaration && declaration.name && declaration.name.kind === ts.SyntaxKind.Identifier;
        displayParts.push(ts.keywordPart(isNamespace ? ts.SyntaxKind.NamespaceKeyword : ts.SyntaxKind.ModuleKeyword));
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
    }
    if ((symbolFlags & ts.SymbolFlags.TypeParameter) && (semanticMeaning & ts.SemanticMeaning.Type)) {
        prefixNextMeaning();
        displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
        displayParts.push(ts.textPart("type parameter"));
        displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
        if (symbol.parent) {
            // Class/Interface type parameter
            addInPrefix();
            addFullSymbolName(symbol.parent, enclosingDeclaration);
            writeTypeParametersOfSymbol(symbol.parent, enclosingDeclaration);
        }
        else {
            // Method/function type parameter
            const decl = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.TypeParameter);
            if (decl === undefined) return ts.Debug.fail();
            const declaration = decl.parent;

            if (declaration) {
                if (ts.isFunctionLikeKind(declaration.kind)) {
                    addInPrefix();
                    const signature = typeChecker.getSignatureFromDeclaration(declaration as ts.SignatureDeclaration)!; // TODO: GH#18217
                    if (declaration.kind === ts.SyntaxKind.ConstructSignature) {
                        displayParts.push(ts.keywordPart(ts.SyntaxKind.NewKeyword));
                        displayParts.push(ts.spacePart());
                    }
                    else if (declaration.kind !== ts.SyntaxKind.CallSignature && (declaration as ts.SignatureDeclaration).name) {
                        addFullSymbolName(declaration.symbol);
                    }
                    ts.addRange(displayParts, ts.signatureToDisplayParts(typeChecker, signature, sourceFile, ts.TypeFormatFlags.WriteTypeArgumentsOfSignature));
                }
                else if (declaration.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                    // Type alias type parameter
                    // For example
                    //      type list<T> = T[]; // Both T will go through same code path
                    addInPrefix();
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.TypeKeyword));
                    displayParts.push(ts.spacePart());
                    addFullSymbolName(declaration.symbol);
                    writeTypeParametersOfSymbol(declaration.symbol, sourceFile);
                }
            }
        }
    }
    if (symbolFlags & ts.SymbolFlags.EnumMember) {
        symbolKind = ts.ScriptElementKind.enumMemberElement;
        addPrefixForAnyFunctionOrVar(symbol, "enum member");
        const declaration = symbol.declarations?.[0];
        if (declaration?.kind === ts.SyntaxKind.EnumMember) {
            const constantValue = typeChecker.getConstantValue(declaration as ts.EnumMember);
            if (constantValue !== undefined) {
                displayParts.push(ts.spacePart());
                displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                displayParts.push(ts.spacePart());
                displayParts.push(ts.displayPart(ts.getTextOfConstantValue(constantValue),
                    typeof constantValue === "number" ? ts.SymbolDisplayPartKind.numericLiteral : ts.SymbolDisplayPartKind.stringLiteral));
            }
        }
    }
    // don't use symbolFlags since getAliasedSymbol requires the flag on the symbol itself
    if (symbol.flags & ts.SymbolFlags.Alias) {
        prefixNextMeaning();
        if (!hasAddedSymbolInfo) {
            const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
            if (resolvedSymbol !== symbol && resolvedSymbol.declarations && resolvedSymbol.declarations.length > 0) {
                const resolvedNode = resolvedSymbol.declarations[0];
                const declarationName = ts.getNameOfDeclaration(resolvedNode);
                if (declarationName) {
                    const isExternalModuleDeclaration =
                        ts.isModuleWithStringLiteralName(resolvedNode) &&
                        ts.hasSyntacticModifier(resolvedNode, ts.ModifierFlags.Ambient);
                    const shouldUseAliasName = symbol.name !== "default" && !isExternalModuleDeclaration;
                    const resolvedInfo = getSymbolDisplayPartsDocumentationAndSymbolKind(
                        typeChecker,
                        resolvedSymbol,
                        ts.getSourceFileOfNode(resolvedNode),
                        resolvedNode,
                        declarationName,
                        semanticMeaning,
                        shouldUseAliasName ? symbol : resolvedSymbol);
                    displayParts.push(...resolvedInfo.displayParts);
                    displayParts.push(ts.lineBreakPart());
                    documentationFromAlias = resolvedInfo.documentation;
                    tagsFromAlias = resolvedInfo.tags;
                }
                else {
                    documentationFromAlias = resolvedSymbol.getContextualDocumentationComment(resolvedNode, typeChecker);
                    tagsFromAlias = resolvedSymbol.getJsDocTags(typeChecker);
                }
            }
        }

        if (symbol.declarations) {
            switch (symbol.declarations[0].kind) {
                case ts.SyntaxKind.NamespaceExportDeclaration:
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.ExportKeyword));
                    displayParts.push(ts.spacePart());
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.NamespaceKeyword));
                    break;
                case ts.SyntaxKind.ExportAssignment:
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.ExportKeyword));
                    displayParts.push(ts.spacePart());
                    displayParts.push(ts.keywordPart((symbol.declarations[0] as ts.ExportAssignment).isExportEquals ? ts.SyntaxKind.EqualsToken : ts.SyntaxKind.DefaultKeyword));
                    break;
                case ts.SyntaxKind.ExportSpecifier:
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.ExportKeyword));
                    break;
                default:
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.ImportKeyword));
            }
        }
        displayParts.push(ts.spacePart());
        addFullSymbolName(symbol);
        ts.forEach(symbol.declarations, declaration => {
            if (declaration.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
                const importEqualsDeclaration = declaration as ts.ImportEqualsDeclaration;
                if (ts.isExternalModuleImportEqualsDeclaration(importEqualsDeclaration)) {
                    displayParts.push(ts.spacePart());
                    displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                    displayParts.push(ts.spacePart());
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.RequireKeyword));
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                    displayParts.push(ts.displayPart(ts.getTextOfNode(ts.getExternalModuleImportEqualsDeclarationExpression(importEqualsDeclaration)), ts.SymbolDisplayPartKind.stringLiteral));
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                }
                else {
                    const internalAliasSymbol = typeChecker.getSymbolAtLocation(importEqualsDeclaration.moduleReference);
                    if (internalAliasSymbol) {
                        displayParts.push(ts.spacePart());
                        displayParts.push(ts.operatorPart(ts.SyntaxKind.EqualsToken));
                        displayParts.push(ts.spacePart());
                        addFullSymbolName(internalAliasSymbol, enclosingDeclaration);
                    }
                }
                return true;
            }
        });
    }
    if (!hasAddedSymbolInfo) {
        if (symbolKind !== ts.ScriptElementKind.unknown) {
            if (type) {
                if (isThisExpression) {
                    prefixNextMeaning();
                    displayParts.push(ts.keywordPart(ts.SyntaxKind.ThisKeyword));
                }
                else {
                    addPrefixForAnyFunctionOrVar(symbol, symbolKind);
                }
                // For properties, variables and local vars: show the type
                if (symbolKind === ts.ScriptElementKind.memberVariableElement ||
                    symbolKind === ts.ScriptElementKind.memberAccessorVariableElement ||
                    symbolKind === ts.ScriptElementKind.memberGetAccessorElement ||
                    symbolKind === ts.ScriptElementKind.memberSetAccessorElement ||
                    symbolKind === ts.ScriptElementKind.jsxAttribute ||
                    symbolFlags & ts.SymbolFlags.Variable ||
                    symbolKind === ts.ScriptElementKind.localVariableElement ||
                    symbolKind === ts.ScriptElementKind.indexSignatureElement ||
                    isThisExpression) {
                    displayParts.push(ts.punctuationPart(ts.SyntaxKind.ColonToken));
                    displayParts.push(ts.spacePart());
                    // If the type is type parameter, format it specially
                    if (type.symbol && type.symbol.flags & ts.SymbolFlags.TypeParameter && symbolKind !== ts.ScriptElementKind.indexSignatureElement) {
                        const typeParameterParts = ts.mapToDisplayParts(writer => {
                            const param = typeChecker.typeParameterToDeclaration(type as ts.TypeParameter, enclosingDeclaration, symbolDisplayNodeBuilderFlags)!;
                            getPrinter().writeNode(ts.EmitHint.Unspecified, param, ts.getSourceFileOfNode(ts.getParseTreeNode(enclosingDeclaration)), writer);
                        });
                        ts.addRange(displayParts, typeParameterParts);
                    }
                    else {
                        ts.addRange(displayParts, ts.typeToDisplayParts(typeChecker, type, enclosingDeclaration));
                    }
                    if ((symbol as ts.TransientSymbol).target && ((symbol as ts.TransientSymbol).target as ts.TransientSymbol).tupleLabelDeclaration) {
                        const labelDecl = ((symbol as ts.TransientSymbol).target as ts.TransientSymbol).tupleLabelDeclaration!;
                        ts.Debug.assertNode(labelDecl.name, ts.isIdentifier);
                        displayParts.push(ts.spacePart());
                        displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                        displayParts.push(ts.textPart(ts.idText(labelDecl.name)));
                        displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                    }
                }
                else if (symbolFlags & ts.SymbolFlags.Function ||
                    symbolFlags & ts.SymbolFlags.Method ||
                    symbolFlags & ts.SymbolFlags.Constructor ||
                    symbolFlags & ts.SymbolFlags.Signature ||
                    symbolFlags & ts.SymbolFlags.Accessor ||
                    symbolKind === ts.ScriptElementKind.memberFunctionElement) {
                    const allSignatures = type.getNonNullableType().getCallSignatures();
                    if (allSignatures.length) {
                        addSignatureDisplayParts(allSignatures[0], allSignatures);
                        hasMultipleSignatures = allSignatures.length > 1;
                    }
                }
            }
        }
        else {
            symbolKind = getSymbolKind(typeChecker, symbol, location);
        }
    }

    if (documentation.length === 0 && !hasMultipleSignatures) {
        documentation = symbol.getContextualDocumentationComment(enclosingDeclaration, typeChecker);
    }

    if (documentation.length === 0 && symbolFlags & ts.SymbolFlags.Property) {
        // For some special property access expressions like `exports.foo = foo` or `module.exports.foo = foo`
        // there documentation comments might be attached to the right hand side symbol of their declarations.
        // The pattern of such special property access is that the parent symbol is the symbol of the file.
        if (symbol.parent && symbol.declarations && ts.forEach(symbol.parent.declarations, declaration => declaration.kind === ts.SyntaxKind.SourceFile)) {
            for (const declaration of symbol.declarations) {
                if (!declaration.parent || declaration.parent.kind !== ts.SyntaxKind.BinaryExpression) {
                    continue;
                }

                const rhsSymbol = typeChecker.getSymbolAtLocation((declaration.parent as ts.BinaryExpression).right);
                if (!rhsSymbol) {
                    continue;
                }

                documentation = rhsSymbol.getDocumentationComment(typeChecker);
                tags = rhsSymbol.getJsDocTags(typeChecker);
                if (documentation.length > 0) {
                    break;
                }
            }
        }
    }

    if (documentation.length === 0 && ts.isIdentifier(location) && symbol.valueDeclaration && ts.isBindingElement(symbol.valueDeclaration)) {
        const declaration = symbol.valueDeclaration;
        const parent = declaration.parent;
        if (ts.isIdentifier(declaration.name) && ts.isObjectBindingPattern(parent)) {
            const name = ts.getTextOfIdentifierOrLiteral(declaration.name);
            const objectType = typeChecker.getTypeAtLocation(parent);
            documentation = ts.firstDefined(objectType.isUnion() ? objectType.types : [objectType], t => {
                const prop = t.getProperty(name);
                return prop ? prop.getDocumentationComment(typeChecker) : undefined;
            }) || ts.emptyArray;
        }
    }

    if (tags.length === 0 && !hasMultipleSignatures) {
        tags = symbol.getContextualJsDocTags(enclosingDeclaration, typeChecker);
    }

    if (documentation.length === 0 && documentationFromAlias) {
        documentation = documentationFromAlias;
    }

    if (tags.length === 0 && tagsFromAlias) {
        tags = tagsFromAlias;
    }

    return { displayParts, documentation, symbolKind, tags: tags.length === 0 ? undefined : tags };

    function getPrinter() {
        if (!printer) {
            printer = ts.createPrinter({ removeComments: true });
        }
        return printer;
    }

    function prefixNextMeaning() {
        if (displayParts.length) {
            displayParts.push(ts.lineBreakPart());
        }
        addAliasPrefixIfNecessary();
    }

    function addAliasPrefixIfNecessary() {
        if (alias) {
            pushSymbolKind(ts.ScriptElementKind.alias);
            displayParts.push(ts.spacePart());
        }
    }

    function addInPrefix() {
        displayParts.push(ts.spacePart());
        displayParts.push(ts.keywordPart(ts.SyntaxKind.InKeyword));
        displayParts.push(ts.spacePart());
    }

    function addFullSymbolName(symbolToDisplay: ts.Symbol, enclosingDeclaration?: ts.Node) {
        let indexInfos;

        if (alias && symbolToDisplay === symbol) {
            symbolToDisplay = alias;
        }
        if (symbolKind === ts.ScriptElementKind.indexSignatureElement) {
            indexInfos = typeChecker.getIndexInfosOfIndexSymbol(symbolToDisplay);
        }

        let fullSymbolDisplayParts: ts.SymbolDisplayPart[] = [];
        if (symbolToDisplay.flags & ts.SymbolFlags.Signature && indexInfos) {
            if (symbolToDisplay.parent) {
                fullSymbolDisplayParts = ts.symbolToDisplayParts(typeChecker, symbolToDisplay.parent);
            }
            fullSymbolDisplayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenBracketToken));
            //Needed to handle more than one type of index
            indexInfos.forEach((info, i) => {
                //Needed to handle template literals
                fullSymbolDisplayParts.push(...ts.typeToDisplayParts(typeChecker, info.keyType));
                if (i !== indexInfos.length - 1) {
                    fullSymbolDisplayParts.push(ts.spacePart());
                    fullSymbolDisplayParts.push(ts.punctuationPart(ts.SyntaxKind.BarToken));
                    fullSymbolDisplayParts.push(ts.spacePart());
                }
            });
            fullSymbolDisplayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseBracketToken));
        }
        else {
            fullSymbolDisplayParts = ts.symbolToDisplayParts(typeChecker, symbolToDisplay, enclosingDeclaration || sourceFile, /*meaning*/ undefined,
                ts.SymbolFormatFlags.WriteTypeParametersOrArguments | ts.SymbolFormatFlags.UseOnlyExternalAliasing | ts.SymbolFormatFlags.AllowAnyNodeKind);
        }
        ts.addRange(displayParts, fullSymbolDisplayParts);
        if (symbol.flags & ts.SymbolFlags.Optional) {
            displayParts.push(ts.punctuationPart(ts.SyntaxKind.QuestionToken));
        }
    }

    function addPrefixForAnyFunctionOrVar(symbol: ts.Symbol, symbolKind: string) {
        prefixNextMeaning();
        if (symbolKind) {
            pushSymbolKind(symbolKind);
            if (symbol && !ts.some(symbol.declarations, d => ts.isArrowFunction(d) || (ts.isFunctionExpression(d) || ts.isClassExpression(d)) && !d.name)) {
                displayParts.push(ts.spacePart());
                addFullSymbolName(symbol);
            }
        }
    }

    function pushSymbolKind(symbolKind: string) {
        switch (symbolKind) {
            case ts.ScriptElementKind.variableElement:
            case ts.ScriptElementKind.functionElement:
            case ts.ScriptElementKind.letElement:
            case ts.ScriptElementKind.constElement:
            case ts.ScriptElementKind.constructorImplementationElement:
                displayParts.push(ts.textOrKeywordPart(symbolKind));
                return;
            default:
                displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
                displayParts.push(ts.textOrKeywordPart(symbolKind));
                displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
                return;
        }
    }

    function addSignatureDisplayParts(signature: ts.Signature, allSignatures: readonly ts.Signature[], flags = ts.TypeFormatFlags.None) {
        ts.addRange(displayParts, ts.signatureToDisplayParts(typeChecker, signature, enclosingDeclaration, flags | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature));
        if (allSignatures.length > 1) {
            displayParts.push(ts.spacePart());
            displayParts.push(ts.punctuationPart(ts.SyntaxKind.OpenParenToken));
            displayParts.push(ts.operatorPart(ts.SyntaxKind.PlusToken));
            displayParts.push(ts.displayPart((allSignatures.length - 1).toString(), ts.SymbolDisplayPartKind.numericLiteral));
            displayParts.push(ts.spacePart());
            displayParts.push(ts.textPart(allSignatures.length === 2 ? "overload" : "overloads"));
            displayParts.push(ts.punctuationPart(ts.SyntaxKind.CloseParenToken));
        }
        documentation = signature.getDocumentationComment(typeChecker);
        tags = signature.getJsDocTags();

        if (allSignatures.length > 1 && documentation.length === 0 && tags.length === 0) {
            documentation = allSignatures[0].getDocumentationComment(typeChecker);
            tags = allSignatures[0].getJsDocTags().filter(tag => tag.name !== "deprecated"); // should only include @deprecated JSDoc tag on the first overload (#49368)
        }

    }

    function writeTypeParametersOfSymbol(symbol: ts.Symbol, enclosingDeclaration: ts.Node | undefined) {
        const typeParameterParts = ts.mapToDisplayParts(writer => {
            const params = typeChecker.symbolToTypeParameterDeclarations(symbol, enclosingDeclaration, symbolDisplayNodeBuilderFlags);
            getPrinter().writeList(ts.ListFormat.TypeParameters, params, ts.getSourceFileOfNode(ts.getParseTreeNode(enclosingDeclaration)), writer);
        });
        ts.addRange(displayParts, typeParameterParts);
    }
}

function isLocalVariableOrFunction(symbol: ts.Symbol) {
    if (symbol.parent) {
        return false; // This is exported symbol
    }

    return ts.forEach(symbol.declarations, declaration => {
        // Function expressions are local
        if (declaration.kind === ts.SyntaxKind.FunctionExpression) {
            return true;
        }

        if (declaration.kind !== ts.SyntaxKind.VariableDeclaration && declaration.kind !== ts.SyntaxKind.FunctionDeclaration) {
            return false;
        }

        // If the parent is not sourceFile or module block it is local variable
        for (let parent = declaration.parent; !ts.isFunctionBlock(parent); parent = parent.parent) {
            // Reached source file or module block
            if (parent.kind === ts.SyntaxKind.SourceFile || parent.kind === ts.SyntaxKind.ModuleBlock) {
                return false;
            }
        }

        // parent is in function block
        return true;
    });
}
}
