/* @internal */
namespace ts.codefix {

    export function newNodesToChanges(newNodes: Node[], insertAfter: Node, context: CodeFixContext) {
        const sourceFile = context.sourceFile;
        if (!(newNodes)) {
            // TODO: make the appropriate value flow through gracefully.
            throw new Error("newNodesToChanges expects an array");
        }

        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);

        for (const newNode of newNodes) {
            changeTracker.insertNodeAfter(sourceFile, insertAfter, newNode, { insertTrailingNewLine: true });
        }
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
        // TODO: get name as identifier or computer property name, etc.
        const name = declaration.name ? declaration.name.getText() : undefined;
        const visibilityModifier = createVisibilityModifier(getModifierFlags(declaration));
        const modifiers = visibilityModifier ? [visibilityModifier] : undefined;
        const type = checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration);

        switch (declaration.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const typeNode = checker.createTypeNode(type);
                // TODO: add modifiers.
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
                if (declarations.length === 1) {
                    Debug.assert(signatures.length === 1);
                    // TODO: suppress any return type
                    // TODO: get parameters working.
                    // TODO: add support for type parameters.
                    const signature = signatures[0];
                    const newTypeParameters = signature.typeParameters && signature.typeParameters.map(checker.createTypeParameterDeclarationFromType);
                    const newParameterNodes = signature.getParameters().map(symbol => createParameterDeclarationFromSymbol(symbol, enclosingDeclaration, checker));
                    
                    const returnType = checker.createTypeNode(checker.getReturnTypeOfSignature(signature));
                    return createStubbedMethod(modifiers, name, newTypeParameters, newParameterNodes, returnType);
                }

                let signatureDeclarations = [];
                for (let i = 0; i < signatures.length; i++) {
                    // const sigString = checker.signatureToString(signatures[i], enclosingDeclaration, TypeFormatFlags.SuppressAnyReturnType, SignatureKind.Call);
                    // TODO: make signatures instead of methods
                    const signature = signatures[i];
                    const newTypeParameters = signature.typeParameters && signature.typeParameters.map(checker.createTypeParameterDeclarationFromType);
                    const newParameterNodes = signature.getParameters().map(symbol => createParameterDeclarationFromSymbol(symbol, enclosingDeclaration, checker));
                    const returnType = checker.createTypeNode(signature.resolvedReturnType);
                    signatureDeclarations.push(createMethod(
                          /*decorators*/ undefined
                        , modifiers
                        , /*asteriskToken*/ undefined
                        , name
                        , newTypeParameters
                        , newParameterNodes
                        , returnType
                        , /*body*/undefined));
                }

                if (declarations.length > signatures.length) {
                    let signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration);
                    const newTypeParameters = signature.typeParameters && signature.typeParameters.map(checker.createTypeParameterDeclarationFromType);
                    const newParameterNodes = signature.getParameters().map(symbol => createParameterDeclarationFromSymbol(symbol, enclosingDeclaration, checker));
                    const returnType = checker.createTypeNode(signature.resolvedReturnType);
                    signatureDeclarations.push(createStubbedMethod(modifiers, name, newTypeParameters, newParameterNodes, returnType));
                }
                else {
                    Debug.assert(declarations.length === signatures.length);
                    const methodImplementingSignatures = createMethodImplementingSignatures(signatures, name, modifiers);
                    signatureDeclarations.push(methodImplementingSignatures);
                }
                return signatureDeclarations;
            default:
                return undefined;
        }
    }

    function createMethodImplementingSignatures(signatures: Signature[], name: string, modifiers: Modifier[] | undefined): MethodDeclaration {
        Debug.assert(signatures && signatures.length > 0);

        let maxNonRestArgs = -1;
        let maxArgsIndex = 0;
        let minArgumentCount = signatures[0].minArgumentCount;
        let hasRestParameter = false;
        for (let i = 0; i < signatures.length; i++) {
            const sig = signatures[i];
            minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
            hasRestParameter = hasRestParameter || sig.hasRestParameter;
            const nonRestLength = sig.parameters.length - (sig.hasRestParameter ? 1 : 0);
            if (nonRestLength >= maxNonRestArgs) {
                maxNonRestArgs = nonRestLength;
                maxArgsIndex = i;
            }
        }
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

        if (hasRestParameter) {
            const anyType = createKeywordTypeNode(SyntaxKind.AnyKeyword);
            const restParameter = createParameter(
                  /*decorators*/ undefined
                , /*modifiers*/ undefined
                , createToken(SyntaxKind.DotDotDotToken)
                , maxArgsParameterSymbolNames[maxNonRestArgs] || "rest"
                , /*questionToken*/ maxNonRestArgs >= minArgumentCount ? createToken(SyntaxKind.QuestionToken) : undefined
                , anyType
                , /*initializer*/ undefined);
            parameters.push(restParameter);
        }

        return createStubbedMethod(
            modifiers
            , name
            , /*typeParameters*/undefined
            , parameters
            , /*returnType*/ undefined);
    }

    export function createStubbedMethod(modifiers: Modifier[], name: string, typeParameters: TypeParameterDeclaration[] | undefined, parameters: ParameterDeclaration[], returnType: TypeNode | undefined) {
        return createMethod(
              /*decorators*/undefined
            , modifiers
            , /*asteriskToken*/undefined
            , name
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

    function createParameterDeclarationFromSymbol(parameterSymbol: Symbol, enclosingDeclaration: ClassLikeDeclaration, checker: TypeChecker) {
        const parameterDeclaration = parameterSymbol.getDeclarations()[0] as ParameterDeclaration;
        const parameterType = checker.getTypeOfSymbolAtLocation(parameterSymbol, enclosingDeclaration);
        const parameterTypeNode = checker.createTypeNode(parameterType);
        // TODO: deep cloning of decorators/any node.
        const parameterNode = createParameter(
            parameterDeclaration.decorators && parameterDeclaration.decorators.map(getSynthesizedDeepClone)
            , parameterDeclaration.modifiers && parameterDeclaration.modifiers.map(getSynthesizedDeepClone)
            , parameterDeclaration.dotDotDotToken && createToken(SyntaxKind.DotDotDotToken)
            , getSynthesizedDeepClone(parameterDeclaration.name)
            , parameterDeclaration.questionToken && createToken(SyntaxKind.QuestionToken)
            , parameterTypeNode
            , /*initializer*/ undefined);
        return parameterNode;
    }

    export function getNameFromIndexInfo(info: IndexInfo) {
        return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : "x"
    }
}