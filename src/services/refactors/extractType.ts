/* @internal */
namespace ts.refactor {
    const refactorName = "Extract type";
    const extractToTypeAlias = "Extract to type alias";
    const extractToTypeDef = "Extract to typedef";
    registerRefactor(refactorName, {
        getAvailableActions(context): ReadonlyArray<ApplicableRefactorInfo> {
            if (!getRangeToExtract(context)) return emptyArray;
            const isJs = isSourceFileJS(context.file);

            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_type),
                actions: [isJs ? {
                    name: extractToTypeDef, description: getLocaleSpecificMessage(Diagnostics.Extract_to_typedef)
                } : {
                    name: extractToTypeAlias, description: getLocaleSpecificMessage(Diagnostics.Extract_to_type_alias)
                }]
            }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === extractToTypeAlias || actionName === extractToTypeDef);
            const { file } = context;
            const info = Debug.assertDefined(getRangeToExtract(context));
            const isJS = isSourceFileJS(file);

            const name = getUniqueName("NewType", file);
            const edits = textChanges.ChangeTracker.with(context, changes => isJS ? doTypedefChange(changes, file, name, info) : doTypeAliasChange(changes, file, name, info));

            const renameFilename = file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
            return { edits, renameFilename, renameLocation };
        }
    });

    interface Info { selection: TypeNode; firstStatement: Statement | Statement & HasJSDoc; typeParameters: ReadonlyArray<string>; }
    function getRangeToExtract(context: RefactorContext): Info | undefined {
        const { file, startPosition } = context;
        const isJS = isSourceFileJS(file);
        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));

        const selection = findAncestor(current, (node => node.parent && rangeContainsSkipTrivia(range, node, file) && !rangeContainsSkipTrivia(range, node.parent, file)));
        if (!selection || !isTypeNode(selection)) return undefined;

        const firstStatement = Debug.assertDefined((findAncestor(selection, isJS ? isStatementButNotBlockAndHasJSDoc : isStatementButNotBlock)));

        // typeparam tag is not supported yet
        const typeParameters = isJS ? [] : checkAndCollectionTypeArguments(context.program.getTypeChecker(), selection, firstStatement, file);
        if (!typeParameters) return undefined;

        return { selection, firstStatement, typeParameters };
    }

    function isStatementButNotBlock(n: Node): n is Statement {
        return n && isStatement(n) && !isBlock(n);
    }

    function isStatementButNotBlockAndHasJSDoc(n: Node): n is (Statement & HasJSDoc) {
        return isStatementButNotBlock && hasJSDocNodes(n);
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

    function doTypeAliasChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, info: Info) {
        const { firstStatement, selection, typeParameters } = info;
        const newTypeNode = createTypeAliasDeclaration(
            /* decorators */ undefined,
            /* monifiers */ undefined,
            name,
            typeParameters.map(id => createTypeParameterDeclaration(id)),
            selection
        );
        changes.insertNodeBefore(file, firstStatement, newTypeNode, /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id, /* typeArguments */ undefined))));
    }

    function doTypedefChange (changes: textChanges.ChangeTracker, file: SourceFile, name: string, info: Info) {
        const { firstStatement, selection } = info;

        const node = <JSDocTypedefTag>createNode(SyntaxKind.JSDocTypedefTag);
        node.tagName = createIdentifier("typedef"); // TODO: jsdoc factory https://github.com/Microsoft/TypeScript/pull/29539
        node.fullName = createIdentifier(name);
        node.name = node.fullName;
        node.typeExpression = createJSDocTypeExpression(selection);

        changes.insertNodeBefore(file, firstStatement, createJSDocComment(/* comment */ undefined, createNodeArray([node])), /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, /* typeArguments */ undefined));
    }
}
