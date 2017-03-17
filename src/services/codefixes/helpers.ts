/* @internal */
namespace ts.codefix {

    export function newNodesToChanges(newNodes: Node[], insertAfter: Node, context: CodeFixContext) {
        const sourceFile = context.sourceFile;
        if (!(newNodes)) {
            throw new Error("newNodesToChanges expects an array");
        }

        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);

        for (const newNode of newNodes) {
            changeTracker.insertNodeAfter(sourceFile, insertAfter, newNode, { suffix: context.newLineCharacter });
        }
        // TODO (aozgaa): concatenate changes into a single change.
        return changeTracker.getChanges();
    }

    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @returns Empty string iff there are no member insertions.
     */
    export function createMissingMemberNodes(classDeclaration: ClassLikeDeclaration, possiblyMissingSymbols: Symbol[], checker: TypeChecker): Node[] {
        const classMembers = classDeclaration.symbol.members;
        const missingMembers = possiblyMissingSymbols.filter(symbol => !classMembers.has(symbol.getName()));

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
        const name = declaration.name ? getSynthesizedDeepClone(declaration.name) as PropertyName : undefined;
        const visibilityModifier = createVisibilityModifier(getModifierFlags(declaration));
        const modifiers = visibilityModifier ? [visibilityModifier] : undefined;
        const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));

        switch (declaration.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const typeNode = checker.createTypeNode(type, enclosingDeclaration);
                const property = createProperty(
                      /*decorators*/undefined
                    , modifiers
                    , name
                    , /*questionToken*/ undefined
                    , typeNode
                    , /*initializer*/ undefined);
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
                if (!(signatures && signatures.length > 0)) {
                    return undefined;
                }

                const optional = !!(symbol.flags & SymbolFlags.Optional);
                if (declarations.length === 1) {
                    Debug.assert(signatures.length === 1);
                    const signature = signatures[0];
                    const signatureParts = checker.createSignatureParts(signature, enclosingDeclaration);
                    return createStubbedMethod(modifiers, name, optional, signatureParts.typeParameters, signatureParts.parameters, signatureParts.type);
                }

                let signatureDeclarations = [];
                for (let i = 0; i < signatures.length; i++) {
                    const signature = signatures[i];
                    const signatureParts = checker.createSignatureParts(signature, enclosingDeclaration);
                    signatureDeclarations.push(createMethod(
                          /*decorators*/ undefined
                        , modifiers
                        , /*asteriskToken*/ undefined
                        , name
                        , optional ? createToken(SyntaxKind.QuestionToken) : undefined
                        , signatureParts.typeParameters
                        , signatureParts.parameters
                        , signatureParts.type
                        , /*body*/undefined));
                }

                if (declarations.length > signatures.length) {
                    let signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration);
                    const signatureParts = checker.createSignatureParts(signature, enclosingDeclaration);
                    signatureDeclarations.push(createStubbedMethod(modifiers, name, optional, signatureParts.typeParameters, signatureParts.parameters, signatureParts.type));
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
    }

    function createMethodImplementingSignatures(signatures: Signature[], name: PropertyName, optional: boolean, modifiers: Modifier[] | undefined): MethodDeclaration {
        Debug.assert(signatures && signatures.length > 0);

        let maxArgsIndex = 0;
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
            someSigHasRestParameter = someSigHasRestParameter || sig.hasRestParameter;
            if (sig.parameters.length >= maxArgsSignature.parameters.length && (!sig.hasRestParameter || maxArgsSignature.hasRestParameter)) {
                maxArgsSignature = sig;
            }
        }
        const maxNonRestArgs = maxArgsSignature.parameters.length - (maxArgsSignature.hasRestParameter ? 1 : 0);
        const maxArgsParameterSymbolNames = signatures[maxArgsIndex].getParameters().map(symbol => symbol.getName());

        const parameters: ParameterDeclaration[] = [];
        for (let i = 0; i < maxNonRestArgs; i++) {
            const anyType = createKeywordTypeNode(SyntaxKind.AnyKeyword);
            const newParameter = createParameter(
                  /*decorators*/ undefined
                , /*modifiers*/ undefined
                , /*dotDotDotToken*/ undefined
                , maxArgsParameterSymbolNames[i]
                , /*questionToken*/ i >= minArgumentCount ? createToken(SyntaxKind.QuestionToken) : undefined
                , anyType
                , /*initializer*/ undefined);
            parameters.push(newParameter);
        }

        if (someSigHasRestParameter) {
            const anyArrayType = createArrayTypeNode(createKeywordTypeNode(SyntaxKind.AnyKeyword));
            const restParameter = createParameter(
                  /*decorators*/ undefined
                , /*modifiers*/ undefined
                , createToken(SyntaxKind.DotDotDotToken)
                , maxArgsParameterSymbolNames[maxNonRestArgs] || "rest"
                , /*questionToken*/ maxNonRestArgs >= minArgumentCount ? createToken(SyntaxKind.QuestionToken) : undefined
                , anyArrayType
                , /*initializer*/ undefined);
            parameters.push(restParameter);
        }

        return createStubbedMethod(
            modifiers
            , name
            , optional
            , /*typeParameters*/undefined
            , parameters
            , /*returnType*/ undefined);
    }

    export function createStubbedMethod(modifiers: Modifier[], name: PropertyName, optional: boolean, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], returnType: TypeNode | undefined) {
        return createMethod(
              /*decorators*/undefined
            , modifiers
            , /*asteriskToken*/undefined
            , name
            , optional ? createToken(SyntaxKind.QuestionToken) : undefined
            , typeParameters
            , parameters
            , returnType
            , createStubbedMethodBody());
    }

    function createStubbedMethodBody() {
        return createBlock(
            [createThrow(
                createNew(
                    createIdentifier('Error')
                    , /*typeArguments*/undefined
                    , [createLiteral('Method not implemented.')]))]
            , /*multiline*/true);
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