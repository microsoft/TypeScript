/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            if (token.kind === SyntaxKind.Identifier && isClassLike(token.parent)) {
                const classDecl = <ClassDeclaration>token.parent;
                const startPos = classDecl.members.pos;

                const InstantiatedExtendsType = <InterfaceType>checker.getTypeFromTypeReference(getClassExtendsHeritageClauseElement(classDecl));
                // Note that this is ultimately derived from a map indexed by symbol names,
                // so duplicates cannot occur.
                const extendsSymbols = checker.getPropertiesOfType(InstantiatedExtendsType);
                const abstractAndNonPrivateExtendsSymbols = extendsSymbols.filter(symbolPointsToNonPrivateAndAbstractMember);

                const insertion = getMissingMembersInsertion(classDecl, abstractAndNonPrivateExtendsSymbols, checker, context.newLineCharacter);

                if (insertion) {
                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Implement_inherited_abstract_class),
                        changes: [{
                            fileName: sourceFile.fileName,
                            textChanges: [{
                                span: { start: startPos, length: 0 },
                                newText: insertion
                            }]
                        }]
                    }];
                }
            }

            return undefined;

            function symbolPointsToNonPrivateAndAbstractMember(symbol: Symbol): boolean {
                const decls = symbol.getDeclarations();
                Debug.assert(!!(decls && decls.length > 0));
                const flags = getModifierFlags(decls[0]);
                return !(flags & ModifierFlags.Private) && !!(flags & ModifierFlags.Abstract);
            }
        }
    });
}