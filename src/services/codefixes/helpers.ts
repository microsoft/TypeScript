/* @internal */
namespace ts.codefix {
    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @param importAdder If provided, type annotations will use identifier type references instead of ImportTypeNodes, and the missing imports will be added to the importAdder.
     * @returns Empty string iff there are no member insertions.
     */
    export function createMissingMemberNodes(
        classDeclaration: ClassLikeDeclaration,
        possiblyMissingSymbols: readonly Symbol[],
        sourceFile: SourceFile,
        context: TypeConstructionContext,
        preferences: UserPreferences,
        importAdder: ImportAdder | undefined,
        addClassElement: (node: AddNode) => void): void {
        const classMembers = classDeclaration.symbol.members!;
        for (const symbol of possiblyMissingSymbols) {
            if (!classMembers.has(symbol.escapedName)) {
                addNewNodeForMemberSymbol(symbol, classDeclaration, sourceFile, context, preferences, importAdder, addClassElement, /* body */ undefined);
            }
        }
    }

    export function getNoopSymbolTrackerWithResolver(context: TypeConstructionContext): SymbolTracker {
        return {
            trackSymbol: () => false,
            moduleResolverHost: getModuleSpecifierResolverHost(context.program, context.host),
        };
    }

    export interface TypeConstructionContext {
        program: Program;
        host: LanguageServiceHost;
    }

    type AddNode = PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | MethodDeclaration | FunctionExpression | ArrowFunction;

    export const enum PreserveOptionalFlags {
        Method  = 1 << 0,
        Property = 1 << 1,
        All     = Method | Property
    }

    /**
     * `addClassElement` will not be called if we can't figure out a representation for `symbol` in `enclosingDeclaration`.
     * @param body If defined, this will be the body of the member node passed to `addClassElement`. Otherwise, the body will default to a stub.
     */
    export function addNewNodeForMemberSymbol(
        symbol: Symbol,
        enclosingDeclaration: ClassLikeDeclaration,
        sourceFile: SourceFile,
        context: TypeConstructionContext,
        preferences: UserPreferences,
        importAdder: ImportAdder | undefined,
        addClassElement: (node: AddNode) => void,
        body: Block | undefined,
        preserveOptional = PreserveOptionalFlags.All,
        isAmbient = false,
    ): void {
        const declarations = symbol.getDeclarations();
        if (!(declarations && declarations.length)) {
            return undefined;
        }
        const checker = context.program.getTypeChecker();
        const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
        const declaration = declarations[0];
        const name = getSynthesizedDeepClone(getNameOfDeclaration(declaration), /*includeTrivia*/ false) as PropertyName;
        const visibilityModifier = createVisibilityModifier(getEffectiveModifierFlags(declaration));
        const modifiers = visibilityModifier ? factory.createNodeArray([visibilityModifier]) : undefined;
        const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
        const optional = !!(symbol.flags & SymbolFlags.Optional);
        const ambient = !!(enclosingDeclaration.flags & NodeFlags.Ambient) || isAmbient;
        const quotePreference = getQuotePreference(sourceFile, preferences);

        switch (declaration.kind) {
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const flags = quotePreference === QuotePreference.Single ? NodeBuilderFlags.UseSingleQuotesForStringLiteralType : undefined;
                let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context));
                if (importAdder) {
                    const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
                    if (importableReference) {
                        typeNode = importableReference.typeNode;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
                addClassElement(factory.createPropertyDeclaration(
                    /*decorators*/ undefined,
                    modifiers,
                    name,
                    optional && (preserveOptional & PreserveOptionalFlags.Property) ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                    typeNode,
                    /*initializer*/ undefined));
                break;
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor: {
                let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, /*flags*/ undefined, getNoopSymbolTrackerWithResolver(context));
                const allAccessors = getAllAccessorDeclarations(declarations, declaration as AccessorDeclaration);
                const orderedAccessors = allAccessors.secondAccessor
                    ? [allAccessors.firstAccessor, allAccessors.secondAccessor]
                    : [allAccessors.firstAccessor];
                if (importAdder) {
                    const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
                    if (importableReference) {
                        typeNode = importableReference.typeNode;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
                for (const accessor of orderedAccessors) {
                    if (isGetAccessorDeclaration(accessor)) {
                        addClassElement(factory.createGetAccessorDeclaration(
                            /*decorators*/ undefined,
                            modifiers,
                            name,
                            emptyArray,
                            typeNode,
                            ambient ? undefined : body || createStubbedMethodBody(quotePreference)));
                    }
                    else {
                        Debug.assertNode(accessor, isSetAccessorDeclaration, "The counterpart to a getter should be a setter");
                        const parameter = getSetAccessorValueParameter(accessor);
                        const parameterName = parameter && isIdentifier(parameter.name) ? idText(parameter.name) : undefined;
                        addClassElement(factory.createSetAccessorDeclaration(
                            /*decorators*/ undefined,
                            modifiers,
                            name,
                            createDummyParameters(1, [parameterName], [typeNode], 1, /*inJs*/ false),
                            ambient ? undefined : body || createStubbedMethodBody(quotePreference)));
                    }
                }
                break;
            }
            case SyntaxKind.MethodSignature:
            case SyntaxKind.MethodDeclaration:
                // The signature for the implementation appears as an entry in `signatures` iff
                // there is only one signature.
                // If there are overloads and an implementation signature, it appears as an
                // extra declaration that isn't a signature for `type`.
                // If there is more than one overload but no implementation signature
                // (eg: an abstract method or interface declaration), there is a 1-1
                // correspondence of declarations and signatures.
                const signatures = checker.getSignaturesOfType(type, SignatureKind.Call);
                if (!some(signatures)) {
                    break;
                }

                if (declarations.length === 1) {
                    Debug.assert(signatures.length === 1, "One declaration implies one signature");
                    const signature = signatures[0];
                    outputMethod(quotePreference, signature, modifiers, name, ambient ? undefined : body || createStubbedMethodBody(quotePreference));
                    break;
                }

                for (const signature of signatures) {
                    // Ensure nodes are fresh so they can have different positions when going through formatting.
                    outputMethod(quotePreference, signature, getSynthesizedDeepClones(modifiers, /*includeTrivia*/ false), getSynthesizedDeepClone(name, /*includeTrivia*/ false));
                }

                if (!ambient) {
                    if (declarations.length > signatures.length) {
                        const signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration)!;
                        outputMethod(quotePreference, signature, modifiers, name, body || createStubbedMethodBody(quotePreference));
                    }
                    else {
                        Debug.assert(declarations.length === signatures.length, "Declarations and signatures should match count");
                        addClassElement(createMethodImplementingSignatures(checker, context, enclosingDeclaration, signatures, name, optional && !!(preserveOptional & PreserveOptionalFlags.Method), modifiers, quotePreference, body));
                    }
                }
                break;
        }

        function outputMethod(quotePreference: QuotePreference, signature: Signature, modifiers: NodeArray<Modifier> | undefined, name: PropertyName, body?: Block): void {
            const method = createSignatureDeclarationFromSignature(SyntaxKind.MethodDeclaration, context, quotePreference, signature, body, name, modifiers, optional && !!(preserveOptional & PreserveOptionalFlags.Method), enclosingDeclaration, importAdder);
            if (method) addClassElement(method);
        }
    }

    export function createSignatureDeclarationFromSignature(
        kind: SyntaxKind.MethodDeclaration | SyntaxKind.FunctionExpression | SyntaxKind.ArrowFunction,
        context: TypeConstructionContext,
        quotePreference: QuotePreference,
        signature: Signature,
        body: Block | undefined,
        name: PropertyName | undefined,
        modifiers: NodeArray<Modifier> | undefined,
        optional: boolean | undefined,
        enclosingDeclaration: Node | undefined,
        importAdder: ImportAdder | undefined
     ) {
        const program = context.program;
        const checker = program.getTypeChecker();
        const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
        const flags =
            NodeBuilderFlags.NoTruncation
            | NodeBuilderFlags.SuppressAnyReturnType
            | NodeBuilderFlags.AllowEmptyTuple
            | (quotePreference === QuotePreference.Single ? NodeBuilderFlags.UseSingleQuotesForStringLiteralType : NodeBuilderFlags.None);
        const signatureDeclaration = checker.signatureToSignatureDeclaration(signature, kind, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context)) as ArrowFunction | FunctionExpression | MethodDeclaration;
        if (!signatureDeclaration) {
            return undefined;
        }

        let typeParameters = signatureDeclaration.typeParameters;
        let parameters = signatureDeclaration.parameters;
        let type = signatureDeclaration.type;
        if (importAdder) {
            if (typeParameters) {
                const newTypeParameters = sameMap(typeParameters, typeParameterDecl => {
                    let constraint = typeParameterDecl.constraint;
                    let defaultType = typeParameterDecl.default;
                    if (constraint) {
                        const importableReference = tryGetAutoImportableReferenceFromTypeNode(constraint, scriptTarget);
                        if (importableReference) {
                            constraint = importableReference.typeNode;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    if (defaultType) {
                        const importableReference = tryGetAutoImportableReferenceFromTypeNode(defaultType, scriptTarget);
                        if (importableReference) {
                            defaultType = importableReference.typeNode;
                            importSymbols(importAdder, importableReference.symbols);
                        }
                    }
                    return factory.updateTypeParameterDeclaration(
                        typeParameterDecl,
                        typeParameterDecl.modifiers,
                        typeParameterDecl.name,
                        constraint,
                        defaultType
                    );
                });
                if (typeParameters !== newTypeParameters) {
                    typeParameters = setTextRange(factory.createNodeArray(newTypeParameters, typeParameters.hasTrailingComma), typeParameters);
                }
            }
            const newParameters = sameMap(parameters, parameterDecl => {
                const importableReference = tryGetAutoImportableReferenceFromTypeNode(parameterDecl.type, scriptTarget);
                let type = parameterDecl.type;
                if (importableReference) {
                    type = importableReference.typeNode;
                    importSymbols(importAdder, importableReference.symbols);
                }
                return factory.updateParameterDeclaration(
                    parameterDecl,
                    parameterDecl.decorators,
                    parameterDecl.modifiers,
                    parameterDecl.dotDotDotToken,
                    parameterDecl.name,
                    parameterDecl.questionToken,
                    type,
                    parameterDecl.initializer
                );
            });
            if (parameters !== newParameters) {
                parameters = setTextRange(factory.createNodeArray(newParameters, parameters.hasTrailingComma), parameters);
            }
            if (type) {
                const importableReference = tryGetAutoImportableReferenceFromTypeNode(type, scriptTarget);
                if (importableReference) {
                    type = importableReference.typeNode;
                    importSymbols(importAdder, importableReference.symbols);
                }
            }
        }

        const questionToken = optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined;
        const asteriskToken = signatureDeclaration.asteriskToken;
        if (isFunctionExpression(signatureDeclaration)) {
            return factory.updateFunctionExpression(signatureDeclaration, modifiers, signatureDeclaration.asteriskToken, tryCast(name, isIdentifier), typeParameters, parameters, type, body ?? signatureDeclaration.body);
        }
        if (isArrowFunction(signatureDeclaration)) {
            return factory.updateArrowFunction(signatureDeclaration, modifiers, typeParameters, parameters, type, signatureDeclaration.equalsGreaterThanToken, body ?? signatureDeclaration.body);
        }
        if (isMethodDeclaration(signatureDeclaration)) {
            return factory.updateMethodDeclaration(signatureDeclaration, /* decorators */ undefined, modifiers, asteriskToken, name ?? factory.createIdentifier(""), questionToken, typeParameters, parameters, type, body);
        }
        return undefined;
    }

    export function createSignatureDeclarationFromCallExpression(
        kind: SyntaxKind.MethodDeclaration | SyntaxKind.FunctionDeclaration | SyntaxKind.MethodSignature,
        context: CodeFixContextBase,
        importAdder: ImportAdder,
        call: CallExpression,
        name: Identifier | string,
        modifierFlags: ModifierFlags,
        contextNode: Node
    ) {
        const quotePreference = getQuotePreference(context.sourceFile, context.preferences);
        const scriptTarget = getEmitScriptTarget(context.program.getCompilerOptions());
        const tracker = getNoopSymbolTrackerWithResolver(context);
        const checker = context.program.getTypeChecker();
        const isJs = isInJSFile(contextNode);
        const { typeArguments, arguments: args, parent } = call;

        const contextualType = isJs ? undefined : checker.getContextualType(call);
        const names = map(args, arg =>
            isIdentifier(arg) ? arg.text : isPropertyAccessExpression(arg) && isIdentifier(arg.name) ? arg.name.text : undefined);
        const types = isJs ? [] : map(args, arg =>
            typeToAutoImportableTypeNode(checker, importAdder, checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(arg)), contextNode, scriptTarget, /*flags*/ undefined, tracker));

        const modifiers = modifierFlags
            ? factory.createNodeArray(factory.createModifiersFromModifierFlags(modifierFlags))
            : undefined;
        const asteriskToken = isYieldExpression(parent)
            ? factory.createToken(SyntaxKind.AsteriskToken)
            : undefined;
        const typeParameters = isJs || typeArguments === undefined
            ? undefined
            : map(typeArguments, (_, i) =>
                factory.createTypeParameterDeclaration(/*modifiers*/ undefined, CharacterCodes.T + typeArguments.length - 1 <= CharacterCodes.Z ? String.fromCharCode(CharacterCodes.T + i) : `T${i}`));
        const parameters = createDummyParameters(args.length, names, types, /*minArgumentCount*/ undefined, isJs);
        const type = isJs || contextualType === undefined
            ? undefined
            : checker.typeToTypeNode(contextualType, contextNode, /*flags*/ undefined, tracker);

        switch (kind) {
            case SyntaxKind.MethodDeclaration:
                return factory.createMethodDeclaration(
                    /*decorators*/ undefined,
                    modifiers,
                    asteriskToken,
                    name,
                    /*questionToken*/ undefined,
                    typeParameters,
                    parameters,
                    type,
                    createStubbedMethodBody(quotePreference)
                );
            case SyntaxKind.MethodSignature:
                return factory.createMethodSignature(
                    modifiers,
                    name,
                    /*questionToken*/ undefined,
                    typeParameters,
                    parameters,
                    type
                );
            case SyntaxKind.FunctionDeclaration:
                return factory.createFunctionDeclaration(
                    /*decorators*/ undefined,
                    modifiers,
                    asteriskToken,
                    name,
                    typeParameters,
                    parameters,
                    type,
                    createStubbedBody(Diagnostics.Function_not_implemented.message, quotePreference)
                );
            default:
                Debug.fail("Unexpected kind");
        }
    }

    export function typeToAutoImportableTypeNode(checker: TypeChecker, importAdder: ImportAdder, type: Type, contextNode: Node | undefined, scriptTarget: ScriptTarget, flags?: NodeBuilderFlags, tracker?: SymbolTracker): TypeNode | undefined {
        let typeNode = checker.typeToTypeNode(type, contextNode, flags, tracker);
        if (typeNode && isImportTypeNode(typeNode)) {
            const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
            if (importableReference) {
                importSymbols(importAdder, importableReference.symbols);
                typeNode = importableReference.typeNode;
            }
        }
        // Ensure nodes are fresh so they can have different positions when going through formatting.
        return getSynthesizedDeepClone(typeNode);
    }

    function createDummyParameters(argCount: number, names: (string | undefined)[] | undefined, types: (TypeNode | undefined)[] | undefined, minArgumentCount: number | undefined, inJs: boolean): ParameterDeclaration[] {
        const parameters: ParameterDeclaration[] = [];
        for (let i = 0; i < argCount; i++) {
            const newParameter = factory.createParameterDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                /*name*/ names && names[i] || `arg${i}`,
                /*questionToken*/ minArgumentCount !== undefined && i >= minArgumentCount ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                /*type*/ inJs ? undefined : types && types[i] || factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword),
                /*initializer*/ undefined);
            parameters.push(newParameter);
        }
        return parameters;
    }

    function createMethodImplementingSignatures(
        checker: TypeChecker,
        context: TypeConstructionContext,
        enclosingDeclaration: ClassLikeDeclaration,
        signatures: readonly Signature[],
        name: PropertyName,
        optional: boolean,
        modifiers: readonly Modifier[] | undefined,
        quotePreference: QuotePreference,
        body: Block | undefined,
    ): MethodDeclaration {
        /** This is *a* signature with the maximal number of arguments,
         * such that if there is a "maximal" signature without rest arguments,
         * this is one of them.
         */
        let maxArgsSignature = signatures[0];
        let minArgumentCount = signatures[0].minArgumentCount;
        let someSigHasRestParameter = false;
        for (const sig of signatures) {
            minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
            if (signatureHasRestParameter(sig)) {
                someSigHasRestParameter = true;
            }
            if (sig.parameters.length >= maxArgsSignature.parameters.length && (!signatureHasRestParameter(sig) || signatureHasRestParameter(maxArgsSignature))) {
                maxArgsSignature = sig;
            }
        }
        const maxNonRestArgs = maxArgsSignature.parameters.length - (signatureHasRestParameter(maxArgsSignature) ? 1 : 0);
        const maxArgsParameterSymbolNames = maxArgsSignature.parameters.map(symbol => symbol.name);
        const parameters = createDummyParameters(maxNonRestArgs, maxArgsParameterSymbolNames, /* types */ undefined, minArgumentCount, /*inJs*/ false);

        if (someSigHasRestParameter) {
            const restParameter = factory.createParameterDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                factory.createToken(SyntaxKind.DotDotDotToken),
                maxArgsParameterSymbolNames[maxNonRestArgs] || "rest",
                /*questionToken*/ maxNonRestArgs >= minArgumentCount ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                factory.createArrayTypeNode(factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword)),
                /*initializer*/ undefined);
            parameters.push(restParameter);
        }

        return createStubbedMethod(
            modifiers,
            name,
            optional,
            /*typeParameters*/ undefined,
            parameters,
            getReturnTypeFromSignatures(signatures, checker, context, enclosingDeclaration),
            quotePreference,
            body);
    }

    function getReturnTypeFromSignatures(signatures: readonly Signature[], checker: TypeChecker, context: TypeConstructionContext, enclosingDeclaration: ClassLikeDeclaration): TypeNode | undefined {
        if (length(signatures)) {
            const type = checker.getUnionType(map(signatures, checker.getReturnTypeOfSignature));
            return checker.typeToTypeNode(type, enclosingDeclaration, /*flags*/ undefined, getNoopSymbolTrackerWithResolver(context));
        }
    }

    function createStubbedMethod(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        optional: boolean,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        returnType: TypeNode | undefined,
        quotePreference: QuotePreference,
        body: Block | undefined
    ): MethodDeclaration {
        return factory.createMethodDeclaration(
            /*decorators*/ undefined,
            modifiers,
            /*asteriskToken*/ undefined,
            name,
            optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
            typeParameters,
            parameters,
            returnType,
            body || createStubbedMethodBody(quotePreference));
    }

    function createStubbedMethodBody(quotePreference: QuotePreference) {
        return createStubbedBody(Diagnostics.Method_not_implemented.message, quotePreference);
    }

    export function createStubbedBody(text: string, quotePreference: QuotePreference): Block {
        return factory.createBlock(
            [factory.createThrowStatement(
                factory.createNewExpression(
                    factory.createIdentifier("Error"),
                    /*typeArguments*/ undefined,
                    // TODO Handle auto quote preference.
                    [factory.createStringLiteral(text, /*isSingleQuote*/ quotePreference === QuotePreference.Single)]))],
            /*multiline*/ true);
    }

    function createVisibilityModifier(flags: ModifierFlags): Modifier | undefined {
        if (flags & ModifierFlags.Public) {
            return factory.createToken(SyntaxKind.PublicKeyword);
        }
        else if (flags & ModifierFlags.Protected) {
            return factory.createToken(SyntaxKind.ProtectedKeyword);
        }
        return undefined;
    }

    export function setJsonCompilerOptionValues(
        changeTracker: textChanges.ChangeTracker,
        configFile: TsConfigSourceFile,
        options: [string, Expression][]
    ) {
        const tsconfigObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
        if (!tsconfigObjectLiteral) return undefined;

        const compilerOptionsProperty = findJsonProperty(tsconfigObjectLiteral, "compilerOptions");
        if (compilerOptionsProperty === undefined) {
            changeTracker.insertNodeAtObjectStart(configFile, tsconfigObjectLiteral, createJsonPropertyAssignment(
                "compilerOptions",
                factory.createObjectLiteralExpression(options.map(([optionName, optionValue]) => createJsonPropertyAssignment(optionName, optionValue)), /*multiLine*/ true)));
            return;
        }

        const compilerOptions = compilerOptionsProperty.initializer;
        if (!isObjectLiteralExpression(compilerOptions)) {
            return;
        }

        for (const [optionName, optionValue] of options) {
            const optionProperty = findJsonProperty(compilerOptions, optionName);
            if (optionProperty === undefined) {
                changeTracker.insertNodeAtObjectStart(configFile, compilerOptions, createJsonPropertyAssignment(optionName, optionValue));
            }
            else {
                changeTracker.replaceNode(configFile, optionProperty.initializer, optionValue);
            }
        }
    }

    export function setJsonCompilerOptionValue(
        changeTracker: textChanges.ChangeTracker,
        configFile: TsConfigSourceFile,
        optionName: string,
        optionValue: Expression,
    ) {
        setJsonCompilerOptionValues(changeTracker, configFile, [[optionName, optionValue]]);
    }

    export function createJsonPropertyAssignment(name: string, initializer: Expression) {
        return factory.createPropertyAssignment(factory.createStringLiteral(name), initializer);
    }

    export function findJsonProperty(obj: ObjectLiteralExpression, name: string): PropertyAssignment | undefined {
        return find(obj.properties, (p): p is PropertyAssignment => isPropertyAssignment(p) && !!p.name && isStringLiteral(p.name) && p.name.text === name);
    }

    /**
     * Given a type node containing 'import("./a").SomeType<import("./b").OtherType<...>>',
     * returns an equivalent type reference node with any nested ImportTypeNodes also replaced
     * with type references, and a list of symbols that must be imported to use the type reference.
     */
    export function tryGetAutoImportableReferenceFromTypeNode(importTypeNode: TypeNode | undefined, scriptTarget: ScriptTarget) {
        let symbols: Symbol[] | undefined;
        const typeNode = visitNode(importTypeNode, visit);
        if (symbols && typeNode) {
            return { typeNode, symbols };
        }

        function visit(node: TypeNode): TypeNode;
        function visit(node: Node): Node {
            if (isLiteralImportTypeNode(node) && node.qualifier) {
                // Symbol for the left-most thing after the dot
                const firstIdentifier = getFirstIdentifier(node.qualifier);
                const name = getNameForExportedSymbol(firstIdentifier.symbol, scriptTarget);
                const qualifier = name !== firstIdentifier.text
                    ? replaceFirstIdentifierOfEntityName(node.qualifier, factory.createIdentifier(name))
                    : node.qualifier;

                symbols = append(symbols, firstIdentifier.symbol);
                const typeArguments = node.typeArguments?.map(visit);
                return factory.createTypeReferenceNode(qualifier, typeArguments);
            }
            return visitEachChild(node, visit, nullTransformationContext);
        }
    }

    function replaceFirstIdentifierOfEntityName(name: EntityName, newIdentifier: Identifier): EntityName {
        if (name.kind === SyntaxKind.Identifier) {
            return newIdentifier;
        }
        return factory.createQualifiedName(replaceFirstIdentifierOfEntityName(name.left, newIdentifier), name.right);
    }

    export function importSymbols(importAdder: ImportAdder, symbols: readonly Symbol[]) {
        symbols.forEach(s => importAdder.addImportFromExportedSymbol(s, /*isValidTypeOnlyUseSite*/ true));
    }
}
