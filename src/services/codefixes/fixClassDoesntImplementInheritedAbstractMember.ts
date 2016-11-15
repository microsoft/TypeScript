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
                const extendsSymbols = checker.getPropertiesOfType(InstantiatedExtendsType);
                let extendsAbstractSymbolsMap = createMap<Symbol>();
                for (const symbol of extendsSymbols) {
                    extendsAbstractSymbolsMap[symbol.getName()] = symbol;
                }
                extendsAbstractSymbolsMap = filterAbstractAndNonPrivate(extendsAbstractSymbolsMap);

                const insertion = getMissingMembersInsertion(classDecl, extendsAbstractSymbolsMap, checker, context.newLineCharacter);

                if (insertion.length > 0) {
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
        }
    });
}