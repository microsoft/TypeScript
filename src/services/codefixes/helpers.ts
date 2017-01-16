/* @internal */
namespace ts.codefix {

    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @returns Empty string iff there are no member insertions.
     */
    export function getMissingMembersInsertion(classDeclaration: ClassLikeDeclaration, possiblyMissingSymbols: Symbol[], checker: TypeChecker, newlineChar: string): string {
        const classMembers = classDeclaration.symbol.members;
        const missingMembers = possiblyMissingSymbols.filter(symbol => !(symbol.getName() in classMembers));

        let insertion = "";

        for (const symbol of missingMembers) {
            insertion = insertion.concat(getInsertionForMemberSymbol(symbol, classDeclaration, checker, newlineChar));
        }
        return insertion;
    }

    /**
     * @returns Empty string iff there we can't figure out a representation for `symbol` in `enclosingDeclaration`.
     */
    function getInsertionForMemberSymbol(symbol: Symbol, enclosingDeclaration: ClassLikeDeclaration, checker: TypeChecker, newlineChar: string): string {
        // const name = symbol.getName();
        const type = checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration);
        const declarations = symbol.getDeclarations();
        if (!(declarations && declarations.length)) {
            return "";
        }

        const declaration = declarations[0] as Declaration;
        const name = declaration.name ? declaration.name.getText() : undefined;
        const visibility = getVisibilityPrefix(getModifierFlags(declaration));

        switch (declaration.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const typeString = checker.typeToString(type, enclosingDeclaration, TypeFormatFlags.None);
                return `${visibility}${name}: ${typeString};${newlineChar}`;

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
                    return "";
                }
                if (declarations.length === 1) {
                    Debug.assert(signatures.length === 1);
                    const sigString = checker.signatureToString(signatures[0], enclosingDeclaration, TypeFormatFlags.SuppressAnyReturnType, SignatureKind.Call);
                    return `${visibility}${name}${sigString}${getMethodBodyStub(newlineChar)}`;
                }

                let result = "";
                for (let i = 0; i < signatures.length; i++) {
                    const sigString = checker.signatureToString(signatures[i], enclosingDeclaration, TypeFormatFlags.SuppressAnyReturnType, SignatureKind.Call);
                    result += `${visibility}${name}${sigString};${newlineChar}`;
                }

                // If there is a declaration with a body, it is the last declaration,
                // and it isn't caught by `getSignaturesOfType`.
                let bodySig: Signature | undefined = undefined;
                if (declarations.length > signatures.length) {
                    bodySig = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as SignatureDeclaration);
                }
                else {
                    Debug.assert(declarations.length === signatures.length);
                    bodySig = createBodySignatureWithAnyTypes(signatures, enclosingDeclaration, checker);
                }
                const sigString = checker.signatureToString(bodySig, enclosingDeclaration, TypeFormatFlags.SuppressAnyReturnType, SignatureKind.Call);
                result += `${visibility}${name}${sigString}${getMethodBodyStub(newlineChar)}`;

                return result;
            default:
                return "";
        }
    }

    function createBodySignatureWithAnyTypes(signatures: Signature[], enclosingDeclaration: ClassLikeDeclaration, checker: TypeChecker): Signature {
        const newSignatureDeclaration = createNode(SyntaxKind.CallSignature) as SignatureDeclaration;
        newSignatureDeclaration.parent = enclosingDeclaration;
        newSignatureDeclaration.name = signatures[0].getDeclaration().name;

        let maxNonRestArgs = -1;
        let maxArgsIndex = 0;
        let minArgumentCount = signatures[0].minArgumentCount;
        let hasRestParameter = false;
        for (let i = 0; i < signatures.length; i++) {
            const sig = signatures[i];
            minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
            hasRestParameter = hasRestParameter || sig.hasRestParameter;
            const nonRestLength = sig.parameters.length - (sig.hasRestParameter ? 1 : 0);
            if (nonRestLength > maxNonRestArgs) {
                maxNonRestArgs = nonRestLength;
                maxArgsIndex = i;
            }
        }
        const maxArgsParameterSymbolNames = signatures[maxArgsIndex].getParameters().map(symbol => symbol.getName());

        const optionalToken = createToken(SyntaxKind.QuestionToken);

        newSignatureDeclaration.parameters = createNodeArray<ParameterDeclaration>();
        for (let i = 0; i < maxNonRestArgs; i++) {
            const newParameter = createParameterDeclarationWithoutType(i, minArgumentCount, newSignatureDeclaration);
            newSignatureDeclaration.parameters.push(newParameter);
        }

        if (hasRestParameter) {
            const restParameter = createParameterDeclarationWithoutType(maxNonRestArgs, minArgumentCount, newSignatureDeclaration);
            restParameter.dotDotDotToken = createToken(SyntaxKind.DotDotDotToken);
            newSignatureDeclaration.parameters.push(restParameter);
        }

        return checker.getSignatureFromDeclaration(newSignatureDeclaration);

        function createParameterDeclarationWithoutType(index: number, minArgCount: number, enclosingSignatureDeclaration: SignatureDeclaration): ParameterDeclaration {
            const newParameter = createNode(SyntaxKind.Parameter) as ParameterDeclaration;

            newParameter.symbol = new SymbolConstructor(SymbolFlags.FunctionScopedVariable, maxArgsParameterSymbolNames[index] || "rest");
            newParameter.symbol.valueDeclaration = newParameter;
            newParameter.symbol.declarations = [newParameter];
            newParameter.parent = enclosingSignatureDeclaration;
            if (index >= minArgCount) {
                newParameter.questionToken = optionalToken;
            }

            return newParameter;
        }
    }

    function getMethodBodyStub(newLineChar: string) {
        return ` {${newLineChar}throw new Error('Method not implemented.');${newLineChar}}${newLineChar}`;
    }

    function getVisibilityPrefix(flags: ModifierFlags): string {
        if (flags & ModifierFlags.Public) {
            return "public ";
        }
        else if (flags & ModifierFlags.Protected) {
            return "protected ";
        }
        return "";
    }

    const SymbolConstructor = objectAllocator.getSymbolConstructor();
}