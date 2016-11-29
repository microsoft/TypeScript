/* @internal */
namespace ts.codefix {

    /**
     * Finds members of the resolved type that are missing in the class pointed to by class decl
     * and generates source code for the missing members.
     * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
     * @returns undefined iff there is no insertion available.
     */
    export function getMissingMembersInsertion(classDeclaration: ClassLikeDeclaration, possiblyMissingSymbols: Symbol[], checker: TypeChecker, newlineChar: string): string {
        const classMembers = classDeclaration.symbol.members;
        const missingMembers = possiblyMissingSymbols.filter(symbol => !(symbol.getName() in classMembers));

        let insertion = "";

        for (const symbol of missingMembers) {
            insertion = insertion.concat(getInsertionForMemberSymbol(symbol, classDeclaration, checker, newlineChar));
        }
        return insertion.length > 0 ? insertion : undefined;
    }

    function getInsertionForMemberSymbol(symbol: Symbol, enclosingDeclaration: ClassLikeDeclaration, checker: TypeChecker, newlineChar: string): string {
        const name = symbol.getName();
        const type = checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration);
        const declarations = symbol.getDeclarations();
        if (!(declarations && declarations.length)) {
            return "";
        }
        const node = declarations[0];
        const visibility = getVisibilityPrefix(getModifierFlags(node));
        switch (node.kind) {
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
                const typeString = checker.typeToString(type, enclosingDeclaration, TypeFormatFlags.None);
                return `${visibility}${name}: ${typeString};${newlineChar}`;

            case SyntaxKind.MethodSignature:
            case SyntaxKind.MethodDeclaration:
                const signatures = checker.getSignaturesOfType(type, SignatureKind.Call);
                if (!(signatures && signatures.length > 0)) {
                    return "";
                }
                // TODO: (arozga) Deal with multiple signatures.
                const sigString = checker.signatureToString(signatures[0], enclosingDeclaration, TypeFormatFlags.SuppressAnyReturnType, SignatureKind.Call);

                return `${visibility}${name}${sigString}${getMethodBodyStub(newlineChar)}`;
            default:
                return "";
        }
    }

    function getMethodBodyStub(newLineChar: string) {
        return `{${newLineChar}throw new Error('Method not implemented.');${newLineChar}}${newLineChar}`;
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
}