/* @internal */
namespace ts.refactor {
    const refactorName = "Extract type";
    const extractToTypeAlias = "Extract to type alias";
    const extractToTypeDef = "Extract to typedef";
    registerRefactor(refactorName, {
        getAvailableActions(context): ReadonlyArray<ApplicableRefactorInfo> {
            const info = getRangeToExtract(context);
            if (!info) return emptyArray;

            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_type),
                actions: [info.isJS ? {
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
            Debug.assert(actionName === extractToTypeAlias && !info.isJS || actionName === extractToTypeDef && info.isJS);

            const name = getUniqueName("NewType", file);
            const edits = textChanges.ChangeTracker.with(context, changes => info.isJS ?
                doTypedefChange(changes, file, name, info.firstStatement, info.selection) :
                doTypeAliasChange(changes, file, name, info.firstStatement, info.selection, info.typeParameters));

            const renameFilename = file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
            return { edits, renameFilename, renameLocation };
        }
    });

    interface TypeAliasInfo { isJS: false; selection: TypeNode; firstStatement: Statement; typeParameters: ReadonlyArray<string>; }
    interface TypedefInfo { isJS: true; selection: TypeNode; firstStatement: Statement & HasJSDoc; }
    type Info = TypeAliasInfo | TypedefInfo;
    function getRangeToExtract(context: RefactorContext): Info | undefined {
        const { file, startPosition } = context;
        const isJS = isSourceFileJS(file);
        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));

        const selection = findAncestor(current, (node => node.parent && rangeContainsSkipTrivia(range, node, file) && !rangeContainsSkipTrivia(range, node.parent, file)));
        if (!selection || !isTypeNode(selection)) return undefined;

        if (isJS) {
            // typeparam tag is not supported yet
            return {
                isJS,
                selection,
                firstStatement: Debug.assertDefined((findAncestor(selection, isStatementButNotBlockAndHasJSDoc))),
            };
        }
        else {
            const firstStatement = Debug.assertDefined((findAncestor(selection, isStatementButNotBlock)));
            const typeParameters = checkAndCollectionTypeArguments(context.program.getTypeChecker(), selection, firstStatement, file);
            if (!typeParameters) return undefined;

            return { isJS, selection, firstStatement, typeParameters };
        }
    }

    function isStatementButNotBlock(n: Node): n is Statement {
        return n && isStatement(n) && !isBlock(n);
    }

    function isStatementButNotBlockAndHasJSDoc(n: Node): n is (Statement & HasJSDoc) {
        return isStatementButNotBlock(n) && hasJSDocNodes(n);
    }

    function rangeContainsSkipTrivia(r1: TextRange, node: Node, file: SourceFile): boolean {
        return rangeContainsStartEnd(r1, skipTrivia(file.text, node.pos), node.end);
    }

    function checkAndCollectTypeArguments(checker: TypeChecker, selection: TypeNode, statement: Statement, file: SourceFile): string[] | undefined {
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
            else if (isTypePredicateNode(node) && !rangeContainsSkipTrivia(selection, node.parent, file)) {
                hasError = true;
                return;
            }
            else if (isTypeQueryNode(node) && isIdentifier(node.exprName)) {
                const symbol = checker.resolveName(node.exprName.text, node.exprName, SymbolFlags.Value, /* excludeGlobals */ false);
                if (symbol && rangeContainsSkipTrivia(statement, symbol.valueDeclaration, file) && !rangeContainsSkipTrivia(selection, symbol.valueDeclaration, file)) {
                    hasError = true;
                    return;
                }
            }
            forEachChild(node, visitor);
        }
    }

    function doTypeAliasChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, firstStatement: Statement, selection: TypeNode, typeParameters: ReadonlyArray<string>) {
        const newTypeNode = createTypeAliasDeclaration(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            name,
            typeParameters.map(id => createTypeParameterDeclaration(id)),
            selection
        );
        changes.insertNodeBefore(file, firstStatement, newTypeNode, /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id, /* typeArguments */ undefined))));
    }

    function doTypedefChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, firstStatement: HasJSDoc, selection: TypeNode) {
        const node = <JSDocTypedefTag>createNode(SyntaxKind.JSDocTypedefTag);
        node.tagName = createIdentifier("typedef"); // TODO: jsdoc factory https://github.com/Microsoft/TypeScript/pull/29539
        node.fullName = createIdentifier(name);
        node.name = node.fullName;
        node.typeExpression = createJSDocTypeExpression(selection);

        changes.insertNodeBefore(file, firstStatement, createJSDocComment(/* comment */ undefined, createNodeArray([node])), /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, /* typeArguments */ undefined));
    }
}
