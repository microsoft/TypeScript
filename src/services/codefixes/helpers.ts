/* @internal */
namespace ts.codefix {
    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @returns Empty string iff there are no member insertions.
     */
    export function createMissingMemberNodes(classDeclaration: ClassLikeDeclaration, possiblyMissingSymbols: ReadonlyArray<Symbol>, checker: TypeChecker, preferences: UserPreferences, out: (node: ClassElement) => void): void {
        const classMembers = classDeclaration.symbol.members;
        for (const symbol of possiblyMissingSymbols) {
            if (!classMembers.has(symbol.escapedName)) {
                addNewNodeForMemberSymbol(symbol, classDeclaration, checker, preferences, out);
            }
        }
    }

    /**
     * @returns Empty string iff there we can't figure out a representation for `symbol` in `enclosingDeclaration`.
     */
    function addNewNodeForMemberSymbol(symbol: Symbol, enclosingDeclaration: ClassLikeDeclaration, checker: TypeChecker, preferences: UserPreferences, out: (node: Node) => void): void {
        const declarations = symbol.getDeclarations();
        if (!(declarations && declarations.length)) {
            return undefined;
        }

        const declaration = declarations[0];
        // Clone name to remove leading trivia.
        const name = getSynthesizedDeepClone(getNameOfDeclaration(declaration)) as PropertyName;
        const visibilityModifier = createVisibilityModifier(getModifierFlags(declaration));
        const modifiers = visibilityModifier ? createNodeArray([visibilityModifier]) : undefined;
        const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
        const optional = !!(symbol.flags & SymbolFlags.Optional);

        switch (declaration.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const typeNode = checker.typeToTypeNode(type, enclosingDeclaration);
                out(createProperty(
                    /*decorators*/undefined,
                    modifiers,
                    name,
                    optional ? createToken(SyntaxKind.QuestionToken) : undefined,
                    typeNode,
                    /*initializer*/ undefined));
                break;
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
                    Debug.assert(signatures.length === 1);
                    const signature = signatures[0];
                    outputMethod(signature, modifiers, name, createStubbedMethodBody(preferences));
                    break;
                }

                for (const signature of signatures) {
                    // Need to ensure nodes are fresh each time so they can have different positions.
                    outputMethod(signature, getSynthesizedDeepClones(modifiers), getSynthesizedDeepClone(name));
                }

                if (declarations.length > signatures.length) {
                    const signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration);
                    outputMethod(signature, modifiers, name, createStubbedMethodBody(preferences));
                }
                else {
                    Debug.assert(declarations.length === signatures.length);
                    out(createMethodImplementingSignatures(signatures, name, optional, modifiers, preferences));
                }
                break;
        }

        function outputMethod(signature: Signature, modifiers: NodeArray<Modifier>, name: PropertyName, body?: Block): void {
            const method = signatureToMethodDeclaration(checker, signature, enclosingDeclaration, modifiers, name, optional, body);
            if (method) out(method);
        }
    }

    function signatureToMethodDeclaration(checker: TypeChecker, signature: Signature, enclosingDeclaration: ClassLikeDeclaration, modifiers: NodeArray<Modifier>, name: PropertyName, optional: boolean, body: Block | undefined) {
        const signatureDeclaration = <MethodDeclaration>checker.signatureToSignatureDeclaration(signature, SyntaxKind.MethodDeclaration, enclosingDeclaration, NodeBuilderFlags.SuppressAnyReturnType);
        if (!signatureDeclaration) {
            return undefined;
        }

        signatureDeclaration.decorators = undefined;
        signatureDeclaration.modifiers = modifiers;
        signatureDeclaration.name = name;
        signatureDeclaration.questionToken = optional ? createToken(SyntaxKind.QuestionToken) : undefined;
        signatureDeclaration.body = body;
        return signatureDeclaration;
    }

    function getSynthesizedDeepClones<T extends Node>(nodes: NodeArray<T> | undefined): NodeArray<T> | undefined {
        return nodes && createNodeArray(nodes.map(getSynthesizedDeepClone));
    }

    export function createMethodFromCallExpression(
        { typeArguments, arguments: args }: CallExpression,
        methodName: string,
        inJs: boolean,
        makeStatic: boolean,
        preferences: UserPreferences,
    ): MethodDeclaration {
        return createMethod(
            /*decorators*/ undefined,
            /*modifiers*/ makeStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
            /*asteriskToken*/ undefined,
            methodName,
            /*questionToken*/ undefined,
            /*typeParameters*/ inJs ? undefined : map(typeArguments, (_, i) =>
                createTypeParameterDeclaration(CharacterCodes.T + typeArguments.length - 1 <= CharacterCodes.Z ? String.fromCharCode(CharacterCodes.T + i) : `T${i}`)),
            /*parameters*/ createDummyParameters(args.length, /*names*/ undefined, /*minArgumentCount*/ undefined, inJs),
            /*type*/ inJs ? undefined : createKeywordTypeNode(SyntaxKind.AnyKeyword),
            createStubbedMethodBody(preferences));
    }

    function createDummyParameters(argCount: number, names: string[] | undefined, minArgumentCount: number | undefined, inJs: boolean): ParameterDeclaration[] {
        const parameters: ParameterDeclaration[] = [];
        for (let i = 0; i < argCount; i++) {
            const newParameter = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                /*name*/ names && names[i] || `arg${i}`,
                /*questionToken*/ minArgumentCount !== undefined && i >= minArgumentCount ? createToken(SyntaxKind.QuestionToken) : undefined,
                /*type*/ inJs ? undefined : createKeywordTypeNode(SyntaxKind.AnyKeyword),
                /*initializer*/ undefined);
            parameters.push(newParameter);
        }
        return parameters;
    }

    function createMethodImplementingSignatures(
        signatures: ReadonlyArray<Signature>,
        name: PropertyName,
        optional: boolean,
        modifiers: ReadonlyArray<Modifier> | undefined,
        preferences: UserPreferences,
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
            if (sig.hasRestParameter) {
                someSigHasRestParameter = true;
            }
            if (sig.parameters.length >= maxArgsSignature.parameters.length && (!sig.hasRestParameter || maxArgsSignature.hasRestParameter)) {
                maxArgsSignature = sig;
            }
        }
        const maxNonRestArgs = maxArgsSignature.parameters.length - (maxArgsSignature.hasRestParameter ? 1 : 0);
        const maxArgsParameterSymbolNames = maxArgsSignature.parameters.map(symbol => symbol.name);

        const parameters = createDummyParameters(maxNonRestArgs, maxArgsParameterSymbolNames, minArgumentCount, /*inJs*/ false);

        if (someSigHasRestParameter) {
            const anyArrayType = createArrayTypeNode(createKeywordTypeNode(SyntaxKind.AnyKeyword));
            const restParameter = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createToken(SyntaxKind.DotDotDotToken),
                maxArgsParameterSymbolNames[maxNonRestArgs] || "rest",
                /*questionToken*/ maxNonRestArgs >= minArgumentCount ? createToken(SyntaxKind.QuestionToken) : undefined,
                anyArrayType,
                /*initializer*/ undefined);
            parameters.push(restParameter);
        }

        return createStubbedMethod(
            modifiers,
            name,
            optional,
            /*typeParameters*/ undefined,
            parameters,
            /*returnType*/ undefined,
            preferences);
    }

    function createStubbedMethod(
        modifiers: ReadonlyArray<Modifier>,
        name: PropertyName,
        optional: boolean,
        typeParameters: ReadonlyArray<TypeParameterDeclaration> | undefined,
        parameters: ReadonlyArray<ParameterDeclaration>,
        returnType: TypeNode | undefined,
        preferences: UserPreferences
    ): MethodDeclaration {
        return createMethod(
            /*decorators*/ undefined,
            modifiers,
            /*asteriskToken*/ undefined,
            name,
            optional ? createToken(SyntaxKind.QuestionToken) : undefined,
            typeParameters,
            parameters,
            returnType,
            createStubbedMethodBody(preferences));
    }

    function createStubbedMethodBody(preferences: UserPreferences): Block {
        return createBlock(
            [createThrow(
                createNew(
                    createIdentifier("Error"),
                    /*typeArguments*/ undefined,
                    [createLiteral("Method not implemented.", /*isSingleQuote*/ preferences.quotePreference === "single")]))],
            /*multiline*/ true);
    }

    function createVisibilityModifier(flags: ModifierFlags): Modifier | undefined {
        if (flags & ModifierFlags.Public) {
            return createToken(SyntaxKind.PublicKeyword);
        }
        else if (flags & ModifierFlags.Protected) {
            return createToken(SyntaxKind.ProtectedKeyword);
        }
        return undefined;
    }
}
