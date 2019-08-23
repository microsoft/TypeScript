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
            Debug.assert(actionName === extractToTypeAlias || actionName === extractToTypeDef, "Unexpected action name");
            const { file } = context;
            const info = Debug.assertDefined(getRangeToExtract(context), "Expected to find a range to extract");
            Debug.assert(actionName === extractToTypeAlias && !info.isJS || actionName === extractToTypeDef && info.isJS, "Invalid actionName/JS combo");

            const name = getUniqueName("NewType", file);
            const edits = textChanges.ChangeTracker.with(context, changes => info.isJS ?
                doTypedefChange(changes, file, name, info.firstStatement, info.selection, info.typeParameters) :
                doTypeAliasChange(changes, file, name, info.firstStatement, info.selection, info.typeParameters));

            const renameFilename = file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
            return { edits, renameFilename, renameLocation };
        }
    });

    interface Info { isJS: boolean; selection: TypeNode; firstStatement: Statement; typeParameters: ReadonlyArray<TypeParameterDeclaration>; }

    function getRangeToExtract(context: RefactorContext): Info | undefined {
        const { file, startPosition } = context;
        const isJS = isSourceFileJS(file);
        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));

        const selection = findAncestor(current, (node => node.parent && rangeContainsSkipTrivia(range, node, file) && !rangeContainsSkipTrivia(range, node.parent, file)));
        if (!selection || !isTypeNode(selection)) return undefined;

        const checker = context.program.getTypeChecker();
        const firstStatement = Debug.assertDefined(isJS ? findAncestor(selection, isStatementAndHasJSDoc) : findAncestor(selection, isStatement), "Should find a statement");
        const typeParameters = collectTypeParameters(checker, selection, firstStatement, file);
        if (!typeParameters) return undefined;

        return { isJS, selection, firstStatement, typeParameters };
    }

    function isStatementAndHasJSDoc(n: Node): n is (Statement & HasJSDoc) {
        return isStatement(n) && hasJSDocNodes(n);
    }

    function rangeContainsSkipTrivia(r1: TextRange, node: Node, file: SourceFile): boolean {
        return rangeContainsStartEnd(r1, skipTrivia(file.text, node.pos), node.end);
    }

    function collectTypeParameters(checker: TypeChecker, selection: TypeNode, statement: Statement, file: SourceFile): TypeParameterDeclaration[] | undefined {
        const result: TypeParameterDeclaration[] = [];
        return visitor(selection) ? undefined : result;

        function visitor(node: Node): true | undefined {
            if (isTypeReferenceNode(node)) {
                if (isIdentifier(node.typeName)) {
                    const symbol = checker.resolveName(node.typeName.text, node.typeName, SymbolFlags.TypeParameter, /* excludeGlobals */ true);
                    if (symbol) {
                        const declaration = cast(first(symbol.declarations), isTypeParameterDeclaration);
                        if (rangeContainsSkipTrivia(statement, declaration, file) && !rangeContainsSkipTrivia(selection, declaration, file)) {
                            result.push(declaration);
                        }
                    }
                }
            }
            else if (isInferTypeNode(node)) {
                const conditionalTypeNode = findAncestor(node, n => isConditionalTypeNode(n) && rangeContainsSkipTrivia(n.extendsType, node, file));
                if (!conditionalTypeNode || !rangeContainsSkipTrivia(selection, conditionalTypeNode, file)) {
                    return true;
                }
            }
            else if ((isTypePredicateNode(node) || isThisTypeNode(node))) {
                const functionLikeNode = findAncestor(node.parent, isFunctionLike);
                if (functionLikeNode && functionLikeNode.type && rangeContainsSkipTrivia(functionLikeNode.type, node, file) && !rangeContainsSkipTrivia(selection, functionLikeNode, file)) {
                    return true;
                }
            }
            else if (isTypeQueryNode(node)) {
                if (isIdentifier(node.exprName)) {
                    const symbol = checker.resolveName(node.exprName.text, node.exprName, SymbolFlags.Value, /* excludeGlobals */ false);
                    if (symbol && rangeContainsSkipTrivia(statement, symbol.valueDeclaration, file) && !rangeContainsSkipTrivia(selection, symbol.valueDeclaration, file)) {
                        return true;
                    }
                }
                else {
                    if (isThisIdentifier(node.exprName.left) && !rangeContainsSkipTrivia(selection, node.parent, file)) {
                        return true;
                    }
                }
            }
            return forEachChild(node, visitor);
        }
    }

    function doTypeAliasChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, firstStatement: Statement, selection: TypeNode, typeParameters: ReadonlyArray<TypeParameterDeclaration>) {
        const newTypeNode = createTypeAliasDeclaration(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            name,
            typeParameters.map(id => updateTypeParameterDeclaration(id, id.name, id.constraint, /* defaultType */ undefined)),
            selection
        );
        changes.insertNodeBefore(file, firstStatement, newTypeNode, /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id.name, /* typeArguments */ undefined))));
    }

    function doTypedefChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, firstStatement: Statement, selection: TypeNode, typeParameters: ReadonlyArray<TypeParameterDeclaration>) {
        const node = <JSDocTypedefTag>createNode(SyntaxKind.JSDocTypedefTag);
        node.tagName = createIdentifier("typedef"); // TODO: jsdoc factory https://github.com/Microsoft/TypeScript/pull/29539
        node.fullName = createIdentifier(name);
        node.name = node.fullName;
        node.typeExpression = createJSDocTypeExpression(selection);

        const templates: JSDocTemplateTag[] = [];
        forEach(typeParameters, typeParameter => {
            const constraint = getEffectiveConstraintOfTypeParameter(typeParameter);

            const template = <JSDocTemplateTag>createNode(SyntaxKind.JSDocTemplateTag);
            template.tagName = createIdentifier("template");
            template.constraint = constraint && cast(constraint, isJSDocTypeExpression);

            const parameter = <TypeParameterDeclaration>createNode(SyntaxKind.TypeParameter);
            parameter.name = typeParameter.name;
            template.typeParameters = createNodeArray([parameter]);

            templates.push(template);
        });

        changes.insertNodeBefore(file, firstStatement, createJSDocComment(/* comment */ undefined, createNodeArray(concatenate<JSDocTag>(templates, [node]))), /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id.name, /* typeArguments */ undefined))));
    }
}
