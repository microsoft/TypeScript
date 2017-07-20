/* @internal */
namespace ts.codefix {

    export function newNodesToChanges(newNodes: Node[], insertAfter: Node, context: CodeFixContext) {
        const sourceFile = context.sourceFile;

        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);

        for (const newNode of newNodes) {
            changeTracker.insertNodeAfter(sourceFile, insertAfter, newNode, { suffix: context.newLineCharacter });
        }

        const changes = changeTracker.getChanges();
        if (!some(changes)) {
            return changes;
        }

        Debug.assert(changes.length === 1);
        const consolidatedChanges: FileTextChanges[] = [{
            fileName: changes[0].fileName,
            textChanges: [{
                span: changes[0].textChanges[0].span,
                newText: changes[0].textChanges.reduce((prev, cur) => prev + cur.newText, "")
            }]

        }];
        return consolidatedChanges;
    }

    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @returns Empty string iff there are no member insertions.
     */
    export function createMissingMemberNodes(classDeclaration: ClassLikeDeclaration, possiblyMissingSymbols: Symbol[], checker: TypeChecker): Node[] {
        const classMembers = classDeclaration.symbol.members;
        const missingMembers = possiblyMissingSymbols.filter(symbol => !classMembers.has(symbol.name));

        let newNodes: Node[] = [];
        for (const symbol of missingMembers) {
            const newNode = createNewNodeForMemberSymbol(symbol, classDeclaration, checker);
            if (newNode) {
                if (Array.isArray(newNode)) {
                    newNodes = newNodes.concat(newNode);
                }
                else {
                    newNodes.push(newNode);
                }
            }
        }
        return newNodes;
    }

    /**
     * @returns Empty string iff there we can't figure out a representation for `symbol` in `enclosingDeclaration`.
     */
    function createNewNodeForMemberSymbol(symbol: Symbol, enclosingDeclaration: ClassLikeDeclaration, checker: TypeChecker): Node[] | Node | undefined {
        const declarations = symbol.getDeclarations();
        if (!(declarations && declarations.length)) {
            return undefined;
        }

        const declaration = declarations[0] as Declaration;
        // Clone name to remove leading trivia.
        const name = getSynthesizedClone(getNameOfDeclaration(declaration)) as PropertyName;
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
                const property = createProperty(
                    /*decorators*/undefined,
                    modifiers,
                    name,
                    optional ? createToken(SyntaxKind.QuestionToken) : undefined,
                    typeNode,
                    /*initializer*/ undefined);
                return property;
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
                    return undefined;
                }

                if (declarations.length === 1) {
                    Debug.assert(signatures.length === 1);
                    const signature = signatures[0];
                    return signatureToMethodDeclaration(signature, enclosingDeclaration, createStubbedMethodBody());
                }

                const signatureDeclarations: MethodDeclaration[] = [];
                for (let i = 0; i < signatures.length; i++) {
                    const signature = signatures[i];
                    const methodDeclaration = signatureToMethodDeclaration(signature, enclosingDeclaration);
                    if (methodDeclaration) {
                        signatureDeclarations.push(methodDeclaration);
                    }
                }

                if (declarations.length > signatures.length) {
                    const signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration);
                    const methodDeclaration = signatureToMethodDeclaration(signature, enclosingDeclaration, createStubbedMethodBody());
                    if (methodDeclaration) {
                        signatureDeclarations.push(methodDeclaration);
                    }
                }
                else {
                    Debug.assert(declarations.length === signatures.length);
                    const methodImplementingSignatures = createMethodImplementingSignatures(signatures, name, optional, modifiers);
                    signatureDeclarations.push(methodImplementingSignatures);
                }
                return signatureDeclarations;
            default:
                return undefined;
        }

        function signatureToMethodDeclaration(signature: Signature, enclosingDeclaration: Node, body?: Block) {
            const signatureDeclaration = <MethodDeclaration>checker.signatureToSignatureDeclaration(signature, SyntaxKind.MethodDeclaration, enclosingDeclaration, NodeBuilderFlags.SuppressAnyReturnType);
            if (signatureDeclaration) {
                signatureDeclaration.decorators = undefined;
                signatureDeclaration.modifiers = modifiers;
                signatureDeclaration.name = name;
                signatureDeclaration.questionToken = optional ? createToken(SyntaxKind.QuestionToken) : undefined;
                signatureDeclaration.body = body;
            }
            return signatureDeclaration;
        }
    }

    export function createMethodFromCallExpression(callExpression: CallExpression, methodName: string, includeTypeScriptSyntax: boolean, makeStatic: boolean): MethodDeclaration {
        const parameters = createDummyParameters(callExpression.arguments.length, /*names*/ undefined, /*minArgumentCount*/ undefined, includeTypeScriptSyntax);

        let typeParameters: TypeParameterDeclaration[];
        if (includeTypeScriptSyntax) {
            const typeArgCount = length(callExpression.typeArguments);
            for (let i = 0; i < typeArgCount; i++) {
                const name = typeArgCount < 8 ? String.fromCharCode(CharacterCodes.T + i) : `T${i}`;
                const typeParameter = createTypeParameterDeclaration(name, /*constraint*/ undefined, /*defaultType*/ undefined);
                (typeParameters ? typeParameters : typeParameters = []).push(typeParameter);
            }
        }

        const newMethod = createMethod(
            /*decorators*/ undefined,
            /*modifiers*/ makeStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
            /*asteriskToken*/ undefined,
            methodName,
            /*questionToken*/ undefined,
            typeParameters,
            parameters,
            /*type*/ includeTypeScriptSyntax ? createKeywordTypeNode(SyntaxKind.AnyKeyword) : undefined,
            createStubbedMethodBody()
        );
        return newMethod;
    }

    function createDummyParameters(argCount: number,  names: string[] | undefined, minArgumentCount: number | undefined, addAnyType: boolean) {
        const parameters: ParameterDeclaration[] = [];
        for (let i = 0; i < argCount; i++) {
            const newParameter = createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                /*name*/ names && names[i] || `arg${i}`,
                /*questionToken*/ minArgumentCount !== undefined && i >= minArgumentCount ? createToken(SyntaxKind.QuestionToken) : undefined,
                /*type*/ addAnyType ? createKeywordTypeNode(SyntaxKind.AnyKeyword) : undefined,
                /*initializer*/ undefined);
            parameters.push(newParameter);
        }

        return parameters;
    }

    function createMethodImplementingSignatures(signatures: ReadonlyArray<Signature>, name: PropertyName, optional: boolean, modifiers: ReadonlyArray<Modifier> | undefined): MethodDeclaration {
        /** This is *a* signature with the maximal number of arguments,
         * such that if there is a "maximal" signature without rest arguments,
         * this is one of them.
         */
        let maxArgsSignature = signatures[0];
        let minArgumentCount = signatures[0].minArgumentCount;
        let someSigHasRestParameter = false;
        for (let i = 0; i < signatures.length; i++) {
            const sig = signatures[i];
            minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
            if (sig.hasRestParameter) {
                someSigHasRestParameter = true;
            }
            if (sig.parameters.length >= maxArgsSignature.parameters.length && (!sig.hasRestParameter || maxArgsSignature.hasRestParameter)) {
                maxArgsSignature = sig;
            }
        }
        const maxNonRestArgs = maxArgsSignature.parameters.length - (maxArgsSignature.hasRestParameter ? 1 : 0);
        const maxArgsParameterSymbolNames = maxArgsSignature.parameters.map(symbol => symbol.getUnescapedName());

        const parameters = createDummyParameters(maxNonRestArgs, maxArgsParameterSymbolNames, minArgumentCount, /*addAnyType*/ true);

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
            /*returnType*/ undefined);
    }

    export function createStubbedMethod(
        modifiers: ReadonlyArray<Modifier>,
        name: PropertyName,
        optional: boolean,
        typeParameters: ReadonlyArray<TypeParameterDeclaration> | undefined,
        parameters: ReadonlyArray<ParameterDeclaration>,
        returnType: TypeNode | undefined) {
        return createMethod(
            /*decorators*/ undefined,
            modifiers,
            /*asteriskToken*/ undefined,
            name,
            optional ? createToken(SyntaxKind.QuestionToken) : undefined,
            typeParameters,
            parameters,
            returnType,
            createStubbedMethodBody());
    }

    function createStubbedMethodBody() {
        return createBlock(
            [createThrow(
                createNew(
                    createIdentifier("Error"),
                    /*typeArguments*/ undefined,
                    [createLiteral("Method not implemented.")]))],
            /*multiline*/ true);
    }

    function createVisibilityModifier(flags: ModifierFlags) {
        if (flags & ModifierFlags.Public) {
            return createToken(SyntaxKind.PublicKeyword);
        }
        else if (flags & ModifierFlags.Protected) {
            return createToken(SyntaxKind.ProtectedKeyword);
        }
        return undefined;
    }
}
