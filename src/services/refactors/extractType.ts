/* @internal */
namespace ts.refactor {
    const refactorName = "Extract type";
    registerRefactor(refactorName, {
        getAvailableActions(context): ReadonlyArray<ApplicableRefactorInfo> {
            if (!getRangeToExtract(context)) return emptyArray;
            const description = getLocaleSpecificMessage(Diagnostics.Extract_type);
            return [{ name: refactorName, description, actions: [{ name: refactorName, description }] }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === refactorName);
            const { file } = context;
            const { selection, firstStatement, typeParameters } = Debug.assertDefined(getRangeToExtract(context));

            const name = getUniqueName("NewType", file);
            const newTypeNode = generateTypeAlias(name, selection, typeParameters);
            const edits = textChanges.ChangeTracker.with(context, changes => {
                changes.insertNodeBefore(file, firstStatement, newTypeNode, /* blankLineBetween */ true);
                changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id, /* typeArguments */ undefined))));
            });

            const renameFilename = file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
            return { edits, renameFilename, renameLocation };
        }
    });

    interface Info { selection: TypeNode; firstStatement: Statement; typeParameters: ReadonlyArray<string>; }
    function getRangeToExtract(context: RefactorContext): Info | undefined {
        const { file, startPosition } = context;
        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        const selection = findAncestor(current, (node => node.parent && rangeContainsSkipTrivia(range, node, file) && !rangeContainsSkipTrivia(range, node.parent, file)));
        if (!selection || isInJSFile(selection) || !isTypeNode(selection)) return undefined;
        const firstStatement = Debug.assertDefined((findAncestor(selection, n => isStatement(n) && !isBlock(n)))) as Statement;
        const typeParameters = checkAndCollectionTypeArguments(context.program.getTypeChecker(), selection, firstStatement, file);
        if (!typeParameters) return undefined;

        return { selection, firstStatement, typeParameters };
    }

    function rangeContainsSkipTrivia(r1: TextRange, node: Node, file: SourceFile): boolean {
        return rangeContainsStartEnd(r1, skipTrivia(file.text, node.pos), node.end);
    }

    function checkAndCollectionTypeArguments(checker: TypeChecker, selection: TypeNode, statement: Statement, file: SourceFile): string[] | undefined {
        let hasError = false;
        const result: string[] = [];
        visitor(selection);
        return hasError ? undefined : result;

        function visitor(node: Node) {
            if (isTypeReferenceNode(node)) {
                if (isIdentifier(node.typeName)) {
                    const symbol = checker.resolveName(node.typeName.text, node.typeName, SymbolFlags.TypeParameter, /* excludeGlobals */ true);
                    if (symbol) {
                        const declaration = first(symbol.declarations);
                        if (rangeContainsSkipTrivia(statement, declaration, file) && !rangeContainsSkipTrivia(selection, declaration, file)) {
                            result.push(node.typeName.text);
                        }
                    }
                }
            }
            else if (isInferTypeNode(node)) {
                const conditionalTypeNode = findAncestor(node, isConditionalTypeNode);
                if (!conditionalTypeNode || !rangeContainsSkipTrivia(selection, conditionalTypeNode, file)) {
                    hasError = true;
                    return;
                }
            }
            forEachChild(node, visitor);
        }
    }

    function generateTypeAlias(name: string, typeNode: TypeNode, typeParameters: ReadonlyArray<string>) {
        return createTypeAliasDeclaration(
            /* decorators */ undefined,
            /* monifiers */ undefined,
            name,
            typeParameters.map(id => createTypeParameterDeclaration(id)),
            typeNode
        );
    }
}
