/* @internal */
namespace ts.refactor {
    const refactorName = "Extract type";
    const extractToTypeAlias = "Extract to type alias";
    const extractToInterface = "Extract to interface";
    const extractToTypeDef = "Extract to typedef";
    registerRefactor(refactorName, {
        getAvailableActions(context): readonly ApplicableRefactorInfo[] {
            const info = getRangeToExtract(context, context.triggerReason === "invoked");
            if (!info) return emptyArray;

            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_type),
                actions: info.isJS ? [{
                    name: extractToTypeDef, description: getLocaleSpecificMessage(Diagnostics.Extract_to_typedef)
                }] : append([{
                    name: extractToTypeAlias, description: getLocaleSpecificMessage(Diagnostics.Extract_to_type_alias)
                }], info.typeElements && {
                    name: extractToInterface, description: getLocaleSpecificMessage(Diagnostics.Extract_to_interface)
                })
            }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            const { file, } = context;
            const info = Debug.checkDefined(getRangeToExtract(context), "Expected to find a range to extract");

            const name = getUniqueName("NewType", file);
            const edits = textChanges.ChangeTracker.with(context, changes => {
                switch (actionName) {
                    case extractToTypeAlias:
                        Debug.assert(!info.isJS, "Invalid actionName/JS combo");
                        return doTypeAliasChange(changes, file, name, info);
                    case extractToTypeDef:
                        Debug.assert(info.isJS, "Invalid actionName/JS combo");
                        return doTypedefChange(changes, file, name, info);
                    case extractToInterface:
                        Debug.assert(!info.isJS && !!info.typeElements, "Invalid actionName/JS combo");
                        return doInterfaceChange(changes, file, name, info as InterfaceInfo);
                    default:
                        Debug.fail("Unexpected action name");
                }
            });

            const renameFilename = file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
            return { edits, renameFilename, renameLocation };
        }
    });

    interface TypeAliasInfo {
        isJS: boolean; selection: TypeNode; firstStatement: Statement; typeParameters: readonly TypeParameterDeclaration[]; typeElements?: readonly TypeElement[];
    }

    interface InterfaceInfo {
        isJS: boolean; selection: TypeNode; firstStatement: Statement; typeParameters: readonly TypeParameterDeclaration[]; typeElements: readonly TypeElement[];
    }

    type Info = TypeAliasInfo | InterfaceInfo;

    function getRangeToExtract(context: RefactorContext, considerEmptySpans = true): Info | undefined {
        const { file, startPosition } = context;
        const isJS = isSourceFileJS(file);
        const current = getTokenAtPosition(file, startPosition);
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        const cursorRequest = range.pos === range.end && considerEmptySpans;

        const selection = findAncestor(current, (node => node.parent && isTypeNode(node) && !rangeContainsSkipTrivia(range, node.parent, file) &&
            (cursorRequest || nodeOverlapsWithStartEnd(current, file, range.pos, range.end))));
        if (!selection || !isTypeNode(selection)) return undefined;

        const checker = context.program.getTypeChecker();
        const firstStatement = Debug.checkDefined(findAncestor(selection, isStatement), "Should find a statement");
        const typeParameters = collectTypeParameters(checker, selection, firstStatement, file);
        if (!typeParameters) return undefined;

        const typeElements = flattenTypeLiteralNodeReference(checker, selection);
        return { isJS, selection, firstStatement, typeParameters, typeElements };
    }

    function flattenTypeLiteralNodeReference(checker: TypeChecker, node: TypeNode | undefined): readonly TypeElement[] | undefined {
        if (!node) return undefined;
        if (isIntersectionTypeNode(node)) {
            const result: TypeElement[] = [];
            const seen = createMap<true>();
            for (const type of node.types) {
                const flattenedTypeMembers = flattenTypeLiteralNodeReference(checker, type);
                if (!flattenedTypeMembers || !flattenedTypeMembers.every(type => type.name && addToSeen(seen, getNameFromPropertyName(type.name) as string))) {
                    return undefined;
                }

                addRange(result, flattenedTypeMembers);
            }
            return result;
        }
        else if (isParenthesizedTypeNode(node)) {
            return flattenTypeLiteralNodeReference(checker, node.type);
        }
        else if (isTypeLiteralNode(node)) {
            return node.members;
        }
        return undefined;
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

            if (file && isTupleTypeNode(node) && (getLineAndCharacterOfPosition(file, node.pos).line === getLineAndCharacterOfPosition(file, node.end).line)) {
                setEmitFlags(node, EmitFlags.SingleLine);
            }

            return forEachChild(node, visitor);
        }
    }

    function doTypeAliasChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, info: TypeAliasInfo) {
        const { firstStatement, selection, typeParameters } = info;

        const newTypeNode = createTypeAliasDeclaration(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            name,
            typeParameters.map(id => updateTypeParameterDeclaration(id, id.name, id.constraint, /* defaultType */ undefined)),
            selection
        );
        changes.insertNodeBefore(file, firstStatement, ignoreSourceNewlines(newTypeNode), /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id.name, /* typeArguments */ undefined))));
    }

    function doInterfaceChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, info: InterfaceInfo) {
        const { firstStatement, selection, typeParameters, typeElements } = info;

        const newTypeNode = createInterfaceDeclaration(
            /* decorators */ undefined,
            /* modifiers */ undefined,
            name,
            typeParameters,
            /* heritageClauses */ undefined,
            typeElements
        );
        changes.insertNodeBefore(file, firstStatement, ignoreSourceNewlines(newTypeNode), /* blankLineBetween */ true);
        changes.replaceNode(file, selection, createTypeReferenceNode(name, typeParameters.map(id => createTypeReferenceNode(id.name, /* typeArguments */ undefined))));
    }

    function doTypedefChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, info: Info) {
        const { firstStatement, selection, typeParameters } = info;

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
