/* @internal */
namespace ts.refactor {
const refactorName = "Extract type";

const extractToTypeAliasAction = {
    name: "Extract to type alias",
    description: ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_type_alias),
    kind: "refactor.extract.type",
};
const extractToInterfaceAction = {
    name: "Extract to interface",
    description: ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_interface),
    kind: "refactor.extract.interface",
};
const extractToTypeDefAction = {
    name: "Extract to typedef",
    description: ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_to_typedef),
    kind: "refactor.extract.typedef"
};

ts.refactor.registerRefactor(refactorName, {
    kinds: [
        extractToTypeAliasAction.kind,
        extractToInterfaceAction.kind,
        extractToTypeDefAction.kind
    ],
    getAvailableActions: function getRefactorActionsToExtractType(context): readonly ts.ApplicableRefactorInfo[] {
        const info = getRangeToExtract(context, context.triggerReason === "invoked");
        if (!info) return ts.emptyArray;

        if (!ts.refactor.isRefactorErrorInfo(info)) {
            return [{
                name: refactorName,
                description: ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_type),
                actions: info.isJS ?
                    [extractToTypeDefAction] : ts.append([extractToTypeAliasAction], info.typeElements && extractToInterfaceAction)
            }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: ts.getLocaleSpecificMessage(ts.Diagnostics.Extract_type),
                actions: [
                    { ...extractToTypeDefAction, notApplicableReason: info.error },
                    { ...extractToTypeAliasAction, notApplicableReason: info.error },
                    { ...extractToInterfaceAction, notApplicableReason: info.error },
                ]
            }];
        }

        return ts.emptyArray;
    },
    getEditsForAction: function getRefactorEditsToExtractType(context, actionName): ts.RefactorEditInfo {
        const { file, } = context;
        const info = getRangeToExtract(context);
        ts.Debug.assert(info && !ts.refactor.isRefactorErrorInfo(info), "Expected to find a range to extract");

        const name = ts.getUniqueName("NewType", file);
        const edits = ts.textChanges.ChangeTracker.with(context, changes => {
            switch (actionName) {
                case extractToTypeAliasAction.name:
                    ts.Debug.assert(!info.isJS, "Invalid actionName/JS combo");
                    return doTypeAliasChange(changes, file, name, info);
                case extractToTypeDefAction.name:
                    ts.Debug.assert(info.isJS, "Invalid actionName/JS combo");
                    return doTypedefChange(changes, file, name, info);
                case extractToInterfaceAction.name:
                    ts.Debug.assert(!info.isJS && !!info.typeElements, "Invalid actionName/JS combo");
                    return doInterfaceChange(changes, file, name, info as InterfaceInfo);
                default:
                    ts.Debug.fail("Unexpected action name");
            }
        });

        const renameFilename = file.fileName;
        const renameLocation = ts.getRenameLocation(edits, renameFilename, name, /*preferLastLocation*/ false);
        return { edits, renameFilename, renameLocation };
    }
});

interface TypeAliasInfo {
    isJS: boolean; selection: ts.TypeNode; firstStatement: ts.Statement; typeParameters: readonly ts.TypeParameterDeclaration[]; typeElements?: readonly ts.TypeElement[];
}

interface InterfaceInfo {
    isJS: boolean; selection: ts.TypeNode; firstStatement: ts.Statement; typeParameters: readonly ts.TypeParameterDeclaration[]; typeElements: readonly ts.TypeElement[];
}

type ExtractInfo = TypeAliasInfo | InterfaceInfo;

function getRangeToExtract(context: ts.RefactorContext, considerEmptySpans = true): ExtractInfo | ts.refactor.RefactorErrorInfo | undefined {
    const { file, startPosition } = context;
    const isJS = ts.isSourceFileJS(file);
    const current = ts.getTokenAtPosition(file, startPosition);
    const range = ts.createTextRangeFromSpan(ts.getRefactorContextSpan(context));
    const cursorRequest = range.pos === range.end && considerEmptySpans;

    const selection = ts.findAncestor(current, (node => node.parent && ts.isTypeNode(node) && !rangeContainsSkipTrivia(range, node.parent, file) &&
        (cursorRequest || ts.nodeOverlapsWithStartEnd(current, file, range.pos, range.end))));
    if (!selection || !ts.isTypeNode(selection)) return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.Selection_is_not_a_valid_type_node) };

    const checker = context.program.getTypeChecker();
    const firstStatement = ts.Debug.checkDefined(ts.findAncestor(selection, ts.isStatement), "Should find a statement");
    const typeParameters = collectTypeParameters(checker, selection, firstStatement, file);
    if (!typeParameters) return { error: ts.getLocaleSpecificMessage(ts.Diagnostics.No_type_could_be_extracted_from_this_type_node) };

    const typeElements = flattenTypeLiteralNodeReference(checker, selection);
    return { isJS, selection, firstStatement, typeParameters, typeElements };
}

function flattenTypeLiteralNodeReference(checker: ts.TypeChecker, node: ts.TypeNode | undefined): readonly ts.TypeElement[] | undefined {
    if (!node) return undefined;
    if (ts.isIntersectionTypeNode(node)) {
        const result: ts.TypeElement[] = [];
        const seen = new ts.Map<string, true>();
        for (const type of node.types) {
            const flattenedTypeMembers = flattenTypeLiteralNodeReference(checker, type);
            if (!flattenedTypeMembers || !flattenedTypeMembers.every(type => type.name && ts.addToSeen(seen, ts.getNameFromPropertyName(type.name) as string))) {
                return undefined;
            }

            ts.addRange(result, flattenedTypeMembers);
        }
        return result;
    }
    else if (ts.isParenthesizedTypeNode(node)) {
        return flattenTypeLiteralNodeReference(checker, node.type);
    }
    else if (ts.isTypeLiteralNode(node)) {
        return node.members;
    }
    return undefined;
}

function rangeContainsSkipTrivia(r1: ts.TextRange, node: ts.Node, file: ts.SourceFile): boolean {
    return ts.rangeContainsStartEnd(r1, ts.skipTrivia(file.text, node.pos), node.end);
}

function collectTypeParameters(checker: ts.TypeChecker, selection: ts.TypeNode, statement: ts.Statement, file: ts.SourceFile): ts.TypeParameterDeclaration[] | undefined {
    const result: ts.TypeParameterDeclaration[] = [];
    return visitor(selection) ? undefined : result;

    function visitor(node: ts.Node): true | undefined {
        if (ts.isTypeReferenceNode(node)) {
            if (ts.isIdentifier(node.typeName)) {
                const typeName = node.typeName;
                const symbol = checker.resolveName(typeName.text, typeName, ts.SymbolFlags.TypeParameter, /* excludeGlobals */ true);
                for (const decl of symbol?.declarations || ts.emptyArray) {
                    if (ts.isTypeParameterDeclaration(decl) && decl.getSourceFile() === file) {
                        // skip extraction if the type node is in the range of the type parameter declaration.
                        // function foo<T extends { a?: /**/T }>(): void;
                        if (decl.name.escapedText === typeName.escapedText && rangeContainsSkipTrivia(decl, selection, file)) {
                            return true;
                        }

                        if (rangeContainsSkipTrivia(statement, decl, file) && !rangeContainsSkipTrivia(selection, decl, file)) {
                            ts.pushIfUnique(result, decl);
                            break;
                        }
                    }
                }
            }
        }
        else if (ts.isInferTypeNode(node)) {
            const conditionalTypeNode = ts.findAncestor(node, n => ts.isConditionalTypeNode(n) && rangeContainsSkipTrivia(n.extendsType, node, file));
            if (!conditionalTypeNode || !rangeContainsSkipTrivia(selection, conditionalTypeNode, file)) {
                return true;
            }
        }
        else if ((ts.isTypePredicateNode(node) || ts.isThisTypeNode(node))) {
            const functionLikeNode = ts.findAncestor(node.parent, ts.isFunctionLike);
            if (functionLikeNode && functionLikeNode.type && rangeContainsSkipTrivia(functionLikeNode.type, node, file) && !rangeContainsSkipTrivia(selection, functionLikeNode, file)) {
                return true;
            }
        }
        else if (ts.isTypeQueryNode(node)) {
            if (ts.isIdentifier(node.exprName)) {
                const symbol = checker.resolveName(node.exprName.text, node.exprName, ts.SymbolFlags.Value, /* excludeGlobals */ false);
                if (symbol?.valueDeclaration && rangeContainsSkipTrivia(statement, symbol.valueDeclaration, file) && !rangeContainsSkipTrivia(selection, symbol.valueDeclaration, file)) {
                    return true;
                }
            }
            else {
                if (ts.isThisIdentifier(node.exprName.left) && !rangeContainsSkipTrivia(selection, node.parent, file)) {
                    return true;
                }
            }
        }

        if (file && ts.isTupleTypeNode(node) && (ts.getLineAndCharacterOfPosition(file, node.pos).line === ts.getLineAndCharacterOfPosition(file, node.end).line)) {
            ts.setEmitFlags(node, ts.EmitFlags.SingleLine);
        }

        return ts.forEachChild(node, visitor);
    }
}

function doTypeAliasChange(changes: ts.textChanges.ChangeTracker, file: ts.SourceFile, name: string, info: TypeAliasInfo) {
    const { firstStatement, selection, typeParameters } = info;

    const newTypeNode = ts.factory.createTypeAliasDeclaration(
        /* modifiers */ undefined,
        name,
        typeParameters.map(id => ts.factory.updateTypeParameterDeclaration(id, id.modifiers, id.name, id.constraint, /* defaultType */ undefined)),
        selection
    );
    changes.insertNodeBefore(file, firstStatement, ts.ignoreSourceNewlines(newTypeNode), /* blankLineBetween */ true);
    changes.replaceNode(file, selection, ts.factory.createTypeReferenceNode(name, typeParameters.map(id => ts.factory.createTypeReferenceNode(id.name, /* typeArguments */ undefined))), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.ExcludeWhitespace });
}

function doInterfaceChange(changes: ts.textChanges.ChangeTracker, file: ts.SourceFile, name: string, info: InterfaceInfo) {
    const { firstStatement, selection, typeParameters, typeElements } = info;

    const newTypeNode = ts.factory.createInterfaceDeclaration(
        /* modifiers */ undefined,
        name,
        typeParameters,
        /* heritageClauses */ undefined,
        typeElements
    );
    ts.setTextRange(newTypeNode, typeElements[0]?.parent);
    changes.insertNodeBefore(file, firstStatement, ts.ignoreSourceNewlines(newTypeNode), /* blankLineBetween */ true);
    changes.replaceNode(file, selection, ts.factory.createTypeReferenceNode(name, typeParameters.map(id => ts.factory.createTypeReferenceNode(id.name, /* typeArguments */ undefined))), { leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: ts.textChanges.TrailingTriviaOption.ExcludeWhitespace });
}

function doTypedefChange(changes: ts.textChanges.ChangeTracker, file: ts.SourceFile, name: string, info: ExtractInfo) {
    const { firstStatement, selection, typeParameters } = info;

    ts.setEmitFlags(selection, ts.EmitFlags.NoComments | ts.EmitFlags.NoNestedComments);

    const node = ts.factory.createJSDocTypedefTag(
        ts.factory.createIdentifier("typedef"),
        ts.factory.createJSDocTypeExpression(selection),
        ts.factory.createIdentifier(name));

    const templates: ts.JSDocTemplateTag[] = [];
    ts.forEach(typeParameters, typeParameter => {
        const constraint = ts.getEffectiveConstraintOfTypeParameter(typeParameter);
        const parameter = ts.factory.createTypeParameterDeclaration(/*modifiers*/ undefined, typeParameter.name);
        const template = ts.factory.createJSDocTemplateTag(
            ts.factory.createIdentifier("template"),
            constraint && ts.cast(constraint, ts.isJSDocTypeExpression),
            [parameter]
        );
        templates.push(template);
    });

    changes.insertNodeBefore(file, firstStatement, ts.factory.createJSDocComment(/* comment */ undefined, ts.factory.createNodeArray(ts.concatenate<ts.JSDocTag>(templates, [node]))), /* blankLineBetween */ true);
    changes.replaceNode(file, selection, ts.factory.createTypeReferenceNode(name, typeParameters.map(id => ts.factory.createTypeReferenceNode(id.name, /* typeArguments */ undefined))));
}
}
