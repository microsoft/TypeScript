import {
    addRange,
    arrayFrom,
    BinaryExpression,
    CallExpression,
    CheckFlags,
    contains,
    createPrinterWithRemoveComments,
    Debug,
    displayPart,
    EmitHint,
    emptyArray,
    EnumMember,
    ExportAssignment,
    find,
    first,
    firstDefined,
    forEach,
    GetAccessorDeclaration,
    getCombinedLocalAndExportSymbolFlags,
    getDeclarationOfKind,
    getExternalModuleImportEqualsDeclarationExpression,
    getMeaningFromLocation,
    getNameOfDeclaration,
    getNodeModifiers,
    getObjectFlags,
    getParseTreeNode,
    getSourceFileOfNode,
    getTextOfConstantValue,
    getTextOfIdentifierOrLiteral,
    getTextOfNode,
    hasSyntacticModifier,
    idText,
    ImportEqualsDeclaration,
    isArrowFunction,
    isBindingElement,
    isCallExpression,
    isCallExpressionTarget,
    isCallOrNewExpression,
    isClassExpression,
    isConstTypeReference,
    isDeprecatedDeclaration,
    isEnumConst,
    isEnumDeclaration,
    isExpression,
    isExternalModuleImportEqualsDeclaration,
    isFirstDeclarationOfSymbolParameter,
    isFunctionBlock,
    isFunctionExpression,
    isFunctionLike,
    isIdentifier,
    isInExpressionContext,
    isJsxOpeningLikeElement,
    isLet,
    isModuleWithStringLiteralName,
    isNameOfFunctionDeclaration,
    isNewExpressionTarget,
    isObjectBindingPattern,
    isTaggedTemplateExpression,
    isThisInTypeQuery,
    isTransientSymbol,
    isTypeAliasDeclaration,
    isVarAwaitUsing,
    isVarConst,
    isVarUsing,
    JSDocTagInfo,
    JsxOpeningLikeElement,
    keywordPart,
    length,
    lineBreakPart,
    ListFormat,
    mapToDisplayParts,
    ModifierFlags,
    ModuleDeclaration,
    NewExpression,
    Node,
    NodeBuilderFlags,
    ObjectFlags,
    operatorPart,
    PropertyAccessExpression,
    PropertyDeclaration,
    punctuationPart,
    ScriptElementKind,
    ScriptElementKindModifier,
    SemanticMeaning,
    SetAccessorDeclaration,
    Signature,
    SignatureDeclaration,
    SignatureFlags,
    signatureToDisplayParts,
    some,
    SourceFile,
    spacePart,
    Symbol,
    SymbolDisplayPart,
    SymbolDisplayPartKind,
    SymbolFlags,
    SymbolFormatFlags,
    symbolToDisplayParts,
    SyntaxKind,
    TaggedTemplateExpression,
    textOrKeywordPart,
    textPart,
    TransientSymbol,
    Type,
    TypeChecker,
    TypeFormatFlags,
    TypeParameter,
    typeToDisplayParts,
    VariableDeclaration,
    WriterContextOut,
} from "./_namespaces/ts.js";

const symbolDisplayNodeBuilderFlags = NodeBuilderFlags.OmitParameterModifiers | NodeBuilderFlags.IgnoreErrors | NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;

// TODO(drosen): use contextual SemanticMeaning.
/** @internal */
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
    if (flags & SymbolFlags.EnumMember) return ScriptElementKind.enumMemberElement;
    if (flags & SymbolFlags.Alias) return ScriptElementKind.alias;
    if (flags & SymbolFlags.Module) return ScriptElementKind.moduleElement;

    return result;
}

function getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker: TypeChecker, symbol: Symbol, location: Node): ScriptElementKind {
    const roots = typeChecker.getRootSymbols(symbol);
    // If this is a method from a mapped type, leave as a method so long as it still has a call signature.
    if (
        roots.length === 1
        && first(roots).flags & SymbolFlags.Method
        // Ensure the mapped version is still a method, as opposed to `{ [K in keyof I]: number }`.
        && typeChecker.getTypeOfSymbolAtLocation(symbol, location).getNonNullableType().getCallSignatures().length !== 0
    ) {
        return ScriptElementKind.memberFunctionElement;
    }

    if (typeChecker.isUndefinedSymbol(symbol)) {
        return ScriptElementKind.variableElement;
    }
    if (typeChecker.isArgumentsSymbol(symbol)) {
        return ScriptElementKind.localVariableElement;
    }
    if (location.kind === SyntaxKind.ThisKeyword && isExpression(location) || isThisInTypeQuery(location)) {
        return ScriptElementKind.parameterElement;
    }
    const flags = getCombinedLocalAndExportSymbolFlags(symbol);
    if (flags & SymbolFlags.Variable) {
        if (isFirstDeclarationOfSymbolParameter(symbol)) {
            return ScriptElementKind.parameterElement;
        }
        else if (symbol.valueDeclaration && isVarConst(symbol.valueDeclaration as VariableDeclaration)) {
            return ScriptElementKind.constElement;
        }
        else if (symbol.valueDeclaration && isVarUsing(symbol.valueDeclaration as VariableDeclaration)) {
            return ScriptElementKind.variableUsingElement;
        }
        else if (symbol.valueDeclaration && isVarAwaitUsing(symbol.valueDeclaration as VariableDeclaration)) {
            return ScriptElementKind.variableAwaitUsingElement;
        }
        else if (forEach(symbol.declarations, isLet)) {
            return ScriptElementKind.letElement;
        }
        return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
    }
    if (flags & SymbolFlags.Function) return isLocalVariableOrFunction(symbol) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
    // FIXME: getter and setter use the same symbol. And it is rare to use only setter without getter, so in most cases the symbol always has getter flag.
    // So, even when the location is just on the declaration of setter, this function returns getter.
    if (flags & SymbolFlags.GetAccessor) return ScriptElementKind.memberGetAccessorElement;
    if (flags & SymbolFlags.SetAccessor) return ScriptElementKind.memberSetAccessorElement;
    if (flags & SymbolFlags.Method) return ScriptElementKind.memberFunctionElement;
    if (flags & SymbolFlags.Constructor) return ScriptElementKind.constructorImplementationElement;
    if (flags & SymbolFlags.Signature) return ScriptElementKind.indexSignatureElement;

    if (flags & SymbolFlags.Property) {
        if (flags & SymbolFlags.Transient && (symbol as TransientSymbol).links.checkFlags & CheckFlags.Synthetic) {
            // If union property is result of union of non method (property/accessors/variables), it is labeled as property
            const unionPropertyKind = forEach(typeChecker.getRootSymbols(symbol), rootSymbol => {
                const rootSymbolFlags = rootSymbol.getFlags();
                if (rootSymbolFlags & (SymbolFlags.PropertyOrAccessor | SymbolFlags.Variable)) {
                    return ScriptElementKind.memberVariableElement;
                }
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

        return ScriptElementKind.memberVariableElement;
    }

    return ScriptElementKind.unknown;
}

function getNormalizedSymbolModifiers(symbol: Symbol) {
    if (symbol.declarations && symbol.declarations.length) {
        const [declaration, ...declarations] = symbol.declarations;
        // omit deprecated flag if some declarations are not deprecated
        const excludeFlags = length(declarations) && isDeprecatedDeclaration(declaration) && some(declarations, d => !isDeprecatedDeclaration(d))
            ? ModifierFlags.Deprecated
            : ModifierFlags.None;
        const modifiers = getNodeModifiers(declaration, excludeFlags);
        if (modifiers) {
            return modifiers.split(",");
        }
    }
    return [];
}

/** @internal */
export function getSymbolModifiers(typeChecker: TypeChecker, symbol: Symbol): string {
    if (!symbol) {
        return ScriptElementKindModifier.none;
    }

    const modifiers = new Set(getNormalizedSymbolModifiers(symbol));
    if (symbol.flags & SymbolFlags.Alias) {
        const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
        if (resolvedSymbol !== symbol) {
            forEach(getNormalizedSymbolModifiers(resolvedSymbol), modifier => {
                modifiers.add(modifier);
            });
        }
    }
    if (symbol.flags & SymbolFlags.Optional) {
        modifiers.add(ScriptElementKindModifier.optionalModifier);
    }
    return modifiers.size > 0 ? arrayFrom(modifiers.values()).join(",") : ScriptElementKindModifier.none;
}

/** @internal */
export interface SymbolDisplayPartsDocumentationAndSymbolKind {
    displayParts: SymbolDisplayPart[];
    documentation: SymbolDisplayPart[];
    symbolKind: ScriptElementKind;
    tags: JSDocTagInfo[] | undefined;
    canIncreaseVerbosityLevel?: boolean;
}

function getSymbolDisplayPartsDocumentationAndSymbolKindWorker(
    typeChecker: TypeChecker,
    symbol: Symbol,
    sourceFile: SourceFile,
    enclosingDeclaration: Node | undefined,
    location: Node,
    type: Type | undefined,
    semanticMeaning: SemanticMeaning,
    alias?: Symbol,
    verbosityLevel?: number,
): SymbolDisplayPartsDocumentationAndSymbolKind {
    const displayParts: SymbolDisplayPart[] = [];
    let documentation: SymbolDisplayPart[] = [];
    let tags: JSDocTagInfo[] = [];
    const symbolFlags = getCombinedLocalAndExportSymbolFlags(symbol);
    let symbolKind = semanticMeaning & SemanticMeaning.Value ? getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location) : ScriptElementKind.unknown;
    let hasAddedSymbolInfo = false;
    const isThisExpression = location.kind === SyntaxKind.ThisKeyword && isInExpressionContext(location) || isThisInTypeQuery(location);
    let documentationFromAlias: SymbolDisplayPart[] | undefined;
    let tagsFromAlias: JSDocTagInfo[] | undefined;
    let hasMultipleSignatures = false;
    const typeWriterOut: WriterContextOut | undefined = verbosityLevel !== undefined ? { couldUnfoldMore: false } : undefined;

    if (location.kind === SyntaxKind.ThisKeyword && !isThisExpression) {
        return { displayParts: [keywordPart(SyntaxKind.ThisKeyword)], documentation: [], symbolKind: ScriptElementKind.primitiveType, tags: undefined };
    }

    // Class at constructor site need to be shown as constructor apart from property,method, vars
    if (symbolKind !== ScriptElementKind.unknown || symbolFlags & SymbolFlags.Class || symbolFlags & SymbolFlags.Alias) {
        // If symbol is accessor, they are allowed only if location is at declaration identifier of the accessor
        if (symbolKind === ScriptElementKind.memberGetAccessorElement || symbolKind === ScriptElementKind.memberSetAccessorElement) {
            const declaration = find(symbol.declarations as ((GetAccessorDeclaration | SetAccessorDeclaration | PropertyDeclaration)[]), declaration => declaration.name === location);
            if (declaration) {
                switch (declaration.kind) {
                    case SyntaxKind.GetAccessor:
                        symbolKind = ScriptElementKind.memberGetAccessorElement;
                        break;
                    case SyntaxKind.SetAccessor:
                        symbolKind = ScriptElementKind.memberSetAccessorElement;
                        break;
                    case SyntaxKind.PropertyDeclaration:
                        symbolKind = ScriptElementKind.memberAccessorVariableElement;
                        break;
                    default:
                        Debug.assertNever(declaration);
                }
            }
            else {
                symbolKind = ScriptElementKind.memberVariableElement;
            }
        }

        let signature: Signature | undefined;
        type ??= isThisExpression ? typeChecker.getTypeAtLocation(location) : typeChecker.getTypeOfSymbolAtLocation(symbol, location);

        if (location.parent && location.parent.kind === SyntaxKind.PropertyAccessExpression) {
            const right = (location.parent as PropertyAccessExpression).name;
            // Either the location is on the right of a property access, or on the left and the right is missing
            if (right === location || (right && right.getFullWidth() === 0)) {
                location = location.parent;
            }
        }

        // try get the call/construct signature from the type if it matches
        let callExpressionLike: CallExpression | NewExpression | JsxOpeningLikeElement | TaggedTemplateExpression | undefined;
        if (isCallOrNewExpression(location)) {
            callExpressionLike = location;
        }
        else if (isCallExpressionTarget(location) || isNewExpressionTarget(location)) {
            callExpressionLike = location.parent as CallExpression | NewExpression;
        }
        else if (location.parent && (isJsxOpeningLikeElement(location.parent) || isTaggedTemplateExpression(location.parent)) && isFunctionLike(symbol.valueDeclaration)) {
            callExpressionLike = location.parent;
        }

        if (callExpressionLike) {
            signature = typeChecker.getResolvedSignature(callExpressionLike); // TODO: GH#18217

            const useConstructSignatures = callExpressionLike.kind === SyntaxKind.NewExpression || (isCallExpression(callExpressionLike) && callExpressionLike.expression.kind === SyntaxKind.SuperKeyword);

            const allSignatures = useConstructSignatures ? type.getConstructSignatures() : type.getCallSignatures();

            if (signature && !contains(allSignatures, signature.target) && !contains(allSignatures, signature)) {
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
                    pushSymbolKind(symbolKind);
                    displayParts.push(spacePart());
                    if (useConstructSignatures) {
                        if (signature.flags & SignatureFlags.Abstract) {
                            displayParts.push(keywordPart(SyntaxKind.AbstractKeyword));
                            displayParts.push(spacePart());
                        }
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
                            if (signature.flags & SignatureFlags.Abstract) {
                                displayParts.push(keywordPart(SyntaxKind.AbstractKeyword));
                                displayParts.push(spacePart());
                            }
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
                hasMultipleSignatures = allSignatures.length > 1;
            }
        }
        else if (
            (isNameOfFunctionDeclaration(location) && !(symbolFlags & SymbolFlags.Accessor)) || // name of function declaration
            (location.kind === SyntaxKind.ConstructorKeyword && location.parent.kind === SyntaxKind.Constructor)
        ) { // At constructor keyword of constructor declaration
            // get the signature from the declaration and write it
            const functionDeclaration = location.parent as SignatureDeclaration;
            // Use function declaration to write the signatures only if the symbol corresponding to this declaration
            const locationIsSymbolDeclaration = symbol.declarations && find(symbol.declarations, declaration => declaration === (location.kind === SyntaxKind.ConstructorKeyword ? functionDeclaration.parent : functionDeclaration));

            if (locationIsSymbolDeclaration) {
                const allSignatures = functionDeclaration.kind === SyntaxKind.Constructor ? type.getNonNullableType().getConstructSignatures() : type.getNonNullableType().getCallSignatures();
                if (!typeChecker.isImplementationOfOverload(functionDeclaration)) {
                    signature = typeChecker.getSignatureFromDeclaration(functionDeclaration); // TODO: GH#18217
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
                    addPrefixForAnyFunctionOrVar(
                        functionDeclaration.kind === SyntaxKind.CallSignature &&
                            !(type.symbol.flags & SymbolFlags.TypeLiteral || type.symbol.flags & SymbolFlags.ObjectLiteral) ? type.symbol : symbol,
                        symbolKind,
                    );
                }
                if (signature) {
                    addSignatureDisplayParts(signature, allSignatures);
                }
                hasAddedSymbolInfo = true;
                hasMultipleSignatures = allSignatures.length > 1;
            }
        }
    }
    if (symbolFlags & SymbolFlags.Class && !hasAddedSymbolInfo && !isThisExpression) {
        addAliasPrefixIfNecessary();
        if (getDeclarationOfKind(symbol, SyntaxKind.ClassExpression)) {
            // Special case for class expressions because we would like to indicate that
            // the class name is local to the class body (similar to function expression)
            //      (local class) class <className>
            pushSymbolKind(ScriptElementKind.localClassElement);
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
    if ((symbolFlags & SymbolFlags.TypeAlias) && (semanticMeaning & SemanticMeaning.Type)) {
        prefixNextMeaning();
        displayParts.push(keywordPart(SyntaxKind.TypeKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        writeTypeParametersOfSymbol(symbol, sourceFile);
        displayParts.push(spacePart());
        displayParts.push(operatorPart(SyntaxKind.EqualsToken));
        displayParts.push(spacePart());
        addRange(
            displayParts,
            typeToDisplayParts(
                typeChecker,
                location.parent && isConstTypeReference(location.parent) ? typeChecker.getTypeAtLocation(location.parent) : typeChecker.getDeclaredTypeOfSymbol(symbol),
                enclosingDeclaration,
                TypeFormatFlags.InTypeAlias,
                verbosityLevel,
                typeWriterOut,
            ),
        );
    }
    if (symbolFlags & SymbolFlags.Enum) {
        prefixNextMeaning();
        if (some(symbol.declarations, d => isEnumDeclaration(d) && isEnumConst(d))) {
            displayParts.push(keywordPart(SyntaxKind.ConstKeyword));
            displayParts.push(spacePart());
        }
        displayParts.push(keywordPart(SyntaxKind.EnumKeyword));
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
    }
    if (symbolFlags & SymbolFlags.Module && !isThisExpression) {
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
            if (decl === undefined) return Debug.fail();
            const declaration = decl.parent;

            if (declaration) {
                if (isFunctionLike(declaration)) {
                    addInPrefix();
                    const signature = typeChecker.getSignatureFromDeclaration(declaration)!; // TODO: GH#18217
                    if (declaration.kind === SyntaxKind.ConstructSignature) {
                        displayParts.push(keywordPart(SyntaxKind.NewKeyword));
                        displayParts.push(spacePart());
                    }
                    else if (declaration.kind !== SyntaxKind.CallSignature && declaration.name) {
                        addFullSymbolName(declaration.symbol);
                    }
                    addRange(displayParts, signatureToDisplayParts(typeChecker, signature, sourceFile, TypeFormatFlags.WriteTypeArgumentsOfSignature));
                }
                else if (isTypeAliasDeclaration(declaration)) {
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
        const declaration = symbol.declarations?.[0];
        if (declaration?.kind === SyntaxKind.EnumMember) {
            const constantValue = typeChecker.getConstantValue(declaration as EnumMember);
            if (constantValue !== undefined) {
                displayParts.push(spacePart());
                displayParts.push(operatorPart(SyntaxKind.EqualsToken));
                displayParts.push(spacePart());
                displayParts.push(displayPart(getTextOfConstantValue(constantValue), typeof constantValue === "number" ? SymbolDisplayPartKind.numericLiteral : SymbolDisplayPartKind.stringLiteral));
            }
        }
    }
    // don't use symbolFlags since getAliasedSymbol requires the flag on the symbol itself
    if (symbol.flags & SymbolFlags.Alias) {
        prefixNextMeaning();
        if (!hasAddedSymbolInfo || documentation.length === 0 && tags.length === 0) {
            const resolvedSymbol = typeChecker.getAliasedSymbol(symbol);
            if (resolvedSymbol !== symbol && resolvedSymbol.declarations && resolvedSymbol.declarations.length > 0) {
                const resolvedNode = resolvedSymbol.declarations[0];
                const declarationName = getNameOfDeclaration(resolvedNode);
                if (declarationName && !hasAddedSymbolInfo) {
                    const isExternalModuleDeclaration = isModuleWithStringLiteralName(resolvedNode) &&
                        hasSyntacticModifier(resolvedNode, ModifierFlags.Ambient);
                    const shouldUseAliasName = symbol.name !== "default" && !isExternalModuleDeclaration;
                    const resolvedInfo = getSymbolDisplayPartsDocumentationAndSymbolKindWorker(
                        typeChecker,
                        resolvedSymbol,
                        getSourceFileOfNode(resolvedNode),
                        enclosingDeclaration,
                        declarationName,
                        type,
                        semanticMeaning,
                        shouldUseAliasName ? symbol : resolvedSymbol,
                    );
                    displayParts.push(...resolvedInfo.displayParts);
                    displayParts.push(lineBreakPart());
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
                case SyntaxKind.ExportSpecifier:
                    displayParts.push(keywordPart(SyntaxKind.ExportKeyword));
                    break;
                default:
                    displayParts.push(keywordPart(SyntaxKind.ImportKeyword));
            }
        }
        displayParts.push(spacePart());
        addFullSymbolName(symbol);
        forEach(symbol.declarations, declaration => {
            if (declaration.kind === SyntaxKind.ImportEqualsDeclaration) {
                const importEqualsDeclaration = declaration as ImportEqualsDeclaration;
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
                if (
                    symbolKind === ScriptElementKind.memberVariableElement ||
                    symbolKind === ScriptElementKind.memberAccessorVariableElement ||
                    symbolKind === ScriptElementKind.memberGetAccessorElement ||
                    symbolKind === ScriptElementKind.memberSetAccessorElement ||
                    symbolKind === ScriptElementKind.jsxAttribute ||
                    symbolFlags & SymbolFlags.Variable ||
                    symbolKind === ScriptElementKind.localVariableElement ||
                    symbolKind === ScriptElementKind.indexSignatureElement ||
                    symbolKind === ScriptElementKind.variableUsingElement ||
                    symbolKind === ScriptElementKind.variableAwaitUsingElement ||
                    isThisExpression
                ) {
                    displayParts.push(punctuationPart(SyntaxKind.ColonToken));
                    displayParts.push(spacePart());
                    // If the type is type parameter, format it specially
                    if (type.symbol && type.symbol.flags & SymbolFlags.TypeParameter && symbolKind !== ScriptElementKind.indexSignatureElement) {
                        const typeParameterParts = mapToDisplayParts(writer => {
                            const param = typeChecker.typeParameterToDeclaration(
                                type as TypeParameter,
                                enclosingDeclaration,
                                symbolDisplayNodeBuilderFlags,
                                /*internalFlags*/ undefined,
                                /*tracker*/ undefined,
                                verbosityLevel,
                            )!;
                            getPrinter().writeNode(EmitHint.Unspecified, param, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration)), writer);
                        });
                        addRange(displayParts, typeParameterParts);
                    }
                    else {
                        addRange(
                            displayParts,
                            typeToDisplayParts(
                                typeChecker,
                                type,
                                enclosingDeclaration,
                                /*flags*/ undefined,
                                verbosityLevel,
                                typeWriterOut,
                            ),
                        );
                    }
                    if (isTransientSymbol(symbol) && symbol.links.target && isTransientSymbol(symbol.links.target) && symbol.links.target.links.tupleLabelDeclaration) {
                        const labelDecl = symbol.links.target.links.tupleLabelDeclaration;
                        Debug.assertNode(labelDecl.name, isIdentifier);
                        displayParts.push(spacePart());
                        displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                        displayParts.push(textPart(idText(labelDecl.name)));
                        displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                    }
                }
                else if (
                    symbolFlags & SymbolFlags.Function ||
                    symbolFlags & SymbolFlags.Method ||
                    symbolFlags & SymbolFlags.Constructor ||
                    symbolFlags & SymbolFlags.Signature ||
                    symbolFlags & SymbolFlags.Accessor ||
                    symbolKind === ScriptElementKind.memberFunctionElement
                ) {
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

    if (documentation.length === 0 && symbolFlags & SymbolFlags.Property) {
        // For some special property access expressions like `exports.foo = foo` or `module.exports.foo = foo`
        // there documentation comments might be attached to the right hand side symbol of their declarations.
        // The pattern of such special property access is that the parent symbol is the symbol of the file.
        if (symbol.parent && symbol.declarations && forEach(symbol.parent.declarations, declaration => declaration.kind === SyntaxKind.SourceFile)) {
            for (const declaration of symbol.declarations) {
                if (!declaration.parent || declaration.parent.kind !== SyntaxKind.BinaryExpression) {
                    continue;
                }

                const rhsSymbol = typeChecker.getSymbolAtLocation((declaration.parent as BinaryExpression).right);
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

    if (documentation.length === 0 && isIdentifier(location) && symbol.valueDeclaration && isBindingElement(symbol.valueDeclaration)) {
        const declaration = symbol.valueDeclaration;
        const parent = declaration.parent;
        const name = declaration.propertyName || declaration.name;
        if (isIdentifier(name) && isObjectBindingPattern(parent)) {
            const propertyName = getTextOfIdentifierOrLiteral(name);
            const objectType = typeChecker.getTypeAtLocation(parent);
            documentation = firstDefined(objectType.isUnion() ? objectType.types : [objectType], t => {
                const prop = t.getProperty(propertyName);
                return prop ? prop.getDocumentationComment(typeChecker) : undefined;
            }) || emptyArray;
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

    return {
        displayParts,
        documentation,
        symbolKind,
        tags: tags.length === 0 ? undefined : tags,
        canIncreaseVerbosityLevel: typeWriterOut?.couldUnfoldMore,
    };

    function getPrinter() {
        return createPrinterWithRemoveComments();
    }

    function prefixNextMeaning() {
        if (displayParts.length) {
            displayParts.push(lineBreakPart());
        }
        addAliasPrefixIfNecessary();
    }

    function addAliasPrefixIfNecessary() {
        if (alias) {
            pushSymbolKind(ScriptElementKind.alias);
            displayParts.push(spacePart());
        }
    }

    function addInPrefix() {
        displayParts.push(spacePart());
        displayParts.push(keywordPart(SyntaxKind.InKeyword));
        displayParts.push(spacePart());
    }

    function addFullSymbolName(symbolToDisplay: Symbol, enclosingDeclaration?: Node) {
        let indexInfos;

        if (alias && symbolToDisplay === symbol) {
            symbolToDisplay = alias;
        }
        if (symbolKind === ScriptElementKind.indexSignatureElement) {
            indexInfos = typeChecker.getIndexInfosOfIndexSymbol(symbolToDisplay);
        }

        let fullSymbolDisplayParts: SymbolDisplayPart[] = [];
        if (symbolToDisplay.flags & SymbolFlags.Signature && indexInfos) {
            if (symbolToDisplay.parent) {
                fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay.parent);
            }
            fullSymbolDisplayParts.push(punctuationPart(SyntaxKind.OpenBracketToken));
            // Needed to handle more than one type of index
            indexInfos.forEach((info, i) => {
                // Needed to handle template literals
                fullSymbolDisplayParts.push(...typeToDisplayParts(typeChecker, info.keyType));
                if (i !== indexInfos.length - 1) {
                    fullSymbolDisplayParts.push(spacePart());
                    fullSymbolDisplayParts.push(punctuationPart(SyntaxKind.BarToken));
                    fullSymbolDisplayParts.push(spacePart());
                }
            });
            fullSymbolDisplayParts.push(punctuationPart(SyntaxKind.CloseBracketToken));
        }
        else {
            fullSymbolDisplayParts = symbolToDisplayParts(typeChecker, symbolToDisplay, enclosingDeclaration || sourceFile, /*meaning*/ undefined, SymbolFormatFlags.WriteTypeParametersOrArguments | SymbolFormatFlags.UseOnlyExternalAliasing | SymbolFormatFlags.AllowAnyNodeKind);
        }
        addRange(displayParts, fullSymbolDisplayParts);
        if (symbol.flags & SymbolFlags.Optional) {
            displayParts.push(punctuationPart(SyntaxKind.QuestionToken));
        }
    }

    function addPrefixForAnyFunctionOrVar(symbol: Symbol, symbolKind: string) {
        prefixNextMeaning();
        if (symbolKind) {
            pushSymbolKind(symbolKind);
            if (symbol && !some(symbol.declarations, d => isArrowFunction(d) || (isFunctionExpression(d) || isClassExpression(d)) && !d.name)) {
                displayParts.push(spacePart());
                addFullSymbolName(symbol);
            }
        }
    }

    function pushSymbolKind(symbolKind: string) {
        switch (symbolKind) {
            case ScriptElementKind.variableElement:
            case ScriptElementKind.functionElement:
            case ScriptElementKind.letElement:
            case ScriptElementKind.constElement:
            case ScriptElementKind.constructorImplementationElement:
            case ScriptElementKind.variableUsingElement:
            case ScriptElementKind.variableAwaitUsingElement:
                displayParts.push(textOrKeywordPart(symbolKind));
                return;
            default:
                displayParts.push(punctuationPart(SyntaxKind.OpenParenToken));
                displayParts.push(textOrKeywordPart(symbolKind));
                displayParts.push(punctuationPart(SyntaxKind.CloseParenToken));
                return;
        }
    }

    function addSignatureDisplayParts(signature: Signature, allSignatures: readonly Signature[], flags = TypeFormatFlags.None) {
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

        if (allSignatures.length > 1 && documentation.length === 0 && tags.length === 0) {
            documentation = allSignatures[0].getDocumentationComment(typeChecker);
            tags = allSignatures[0].getJsDocTags().filter(tag => tag.name !== "deprecated"); // should only include @deprecated JSDoc tag on the first overload (#49368)
        }
    }

    function writeTypeParametersOfSymbol(symbol: Symbol, enclosingDeclaration: Node | undefined) {
        const typeParameterParts = mapToDisplayParts(writer => {
            const params = typeChecker.symbolToTypeParameterDeclarations(symbol, enclosingDeclaration, symbolDisplayNodeBuilderFlags);
            getPrinter().writeList(ListFormat.TypeParameters, params, getSourceFileOfNode(getParseTreeNode(enclosingDeclaration)), writer);
        });
        addRange(displayParts, typeParameterParts);
    }
}

// TODO(drosen): Currently completion entry details passes the SemanticMeaning.All instead of using semanticMeaning of location
/** @internal */
export function getSymbolDisplayPartsDocumentationAndSymbolKind(
    typeChecker: TypeChecker,
    symbol: Symbol,
    sourceFile: SourceFile,
    enclosingDeclaration: Node | undefined,
    location: Node,
    semanticMeaning: SemanticMeaning = getMeaningFromLocation(location),
    alias?: Symbol,
    verbosityLevel?: number,
): SymbolDisplayPartsDocumentationAndSymbolKind {
    return getSymbolDisplayPartsDocumentationAndSymbolKindWorker(typeChecker, symbol, sourceFile, enclosingDeclaration, location, /*type*/ undefined, semanticMeaning, alias, verbosityLevel);
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
