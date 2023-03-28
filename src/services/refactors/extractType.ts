import {
    addRange,
    addToSeen,
    append,
    ApplicableRefactorInfo,
    cast,
    concatenate,
    createTextRangeFromSpan,
    Debug,
    Diagnostics,
    EmitFlags,
    emptyArray,
    factory,
    findAncestor,
    forEach,
    forEachChild,
    getEffectiveConstraintOfTypeParameter,
    getLineAndCharacterOfPosition,
    getLocaleSpecificMessage,
    getNameFromPropertyName,
    getNewLineOrDefaultFromHost,
    getPrecedingNonSpaceCharacterPosition,
    getRefactorContextSpan,
    getRenameLocation,
    getTokenAtPosition,
    getUniqueName,
    ignoreSourceNewlines,
    isConditionalTypeNode,
    isFunctionLike,
    isIdentifier,
    isInferTypeNode,
    isIntersectionTypeNode,
    isJSDoc,
    isJSDocTypeExpression,
    isParenthesizedTypeNode,
    isSourceFileJS,
    isStatement,
    isThisIdentifier,
    isThisTypeNode,
    isTupleTypeNode,
    isTypeLiteralNode,
    isTypeNode,
    isTypeParameterDeclaration,
    isTypePredicateNode,
    isTypeQueryNode,
    isTypeReferenceNode,
    JSDocTag,
    JSDocTemplateTag,
    Node,
    nodeOverlapsWithStartEnd,
    pushIfUnique,
    rangeContainsStartEnd,
    RefactorContext,
    RefactorEditInfo,
    setEmitFlags,
    setTextRange,
    skipTrivia,
    SourceFile,
    SymbolFlags,
    textChanges,
    TextRange,
    TypeChecker,
    TypeElement,
    TypeNode,
    TypeParameterDeclaration,
} from "../_namespaces/ts";
import {
    isRefactorErrorInfo,
    RefactorErrorInfo,
    registerRefactor,
} from "../_namespaces/ts.refactor";

const refactorName = "Extract type";

const extractToTypeAliasAction = {
    name: "Extract to type alias",
    description: getLocaleSpecificMessage(Diagnostics.Extract_to_type_alias),
    kind: "refactor.extract.type",
};
const extractToInterfaceAction = {
    name: "Extract to interface",
    description: getLocaleSpecificMessage(Diagnostics.Extract_to_interface),
    kind: "refactor.extract.interface",
};
const extractToTypeDefAction = {
    name: "Extract to typedef",
    description: getLocaleSpecificMessage(Diagnostics.Extract_to_typedef),
    kind: "refactor.extract.typedef"
};

registerRefactor(refactorName, {
    kinds: [
        extractToTypeAliasAction.kind,
        extractToInterfaceAction.kind,
        extractToTypeDefAction.kind
    ],
    getAvailableActions: function getRefactorActionsToExtractType(context): readonly ApplicableRefactorInfo[] {
        const info = getRangeToExtract(context, context.triggerReason === "invoked");
        if (!info) return emptyArray;

        if (!isRefactorErrorInfo(info)) {
            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_type),
                actions: info.isJS ?
                    [extractToTypeDefAction] : append([extractToTypeAliasAction], info.typeElements && extractToInterfaceAction)
            }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Extract_type),
                actions: [
                    { ...extractToTypeDefAction, notApplicableReason: info.error },
                    { ...extractToTypeAliasAction, notApplicableReason: info.error },
                    { ...extractToInterfaceAction, notApplicableReason: info.error },
                ]
            }];
        }

        return emptyArray;
    },
    getEditsForAction: function getRefactorEditsToExtractType(context, actionName): RefactorEditInfo {
        const { file } = context;
        const info = getRangeToExtract(context);
        Debug.assert(info && !isRefactorErrorInfo(info), "Expected to find a range to extract");

        const name = getUniqueName("NewType", file);
        const edits = textChanges.ChangeTracker.with(context, changes => {
            switch (actionName) {
                case extractToTypeAliasAction.name:
                    Debug.assert(!info.isJS, "Invalid actionName/JS combo");
                    return doTypeAliasChange(changes, file, name, info);
                case extractToTypeDefAction.name:
                    Debug.assert(info.isJS, "Invalid actionName/JS combo");
                    return doTypedefChange(changes, context, file, name, info);
                case extractToInterfaceAction.name:
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
    isJS: boolean; selection: TypeNode; enclosingNode: Node; typeParameters: readonly TypeParameterDeclaration[]; typeElements?: readonly TypeElement[];
}

interface InterfaceInfo {
    isJS: boolean; selection: TypeNode; enclosingNode: Node; typeParameters: readonly TypeParameterDeclaration[]; typeElements: readonly TypeElement[];
}

type ExtractInfo = TypeAliasInfo | InterfaceInfo;

function getRangeToExtract(context: RefactorContext, considerEmptySpans = true): ExtractInfo | RefactorErrorInfo | undefined {
    const { file, startPosition } = context;
    const isJS = isSourceFileJS(file);
    const current = getTokenAtPosition(file, startPosition);
    const range = createTextRangeFromSpan(getRefactorContextSpan(context));
    const cursorRequest = range.pos === range.end && considerEmptySpans;

    const selection = findAncestor(current, (node => node.parent && isTypeNode(node) && !rangeContainsSkipTrivia(range, node.parent, file) &&
        (cursorRequest || nodeOverlapsWithStartEnd(current, file, range.pos, range.end))));
    if (!selection || !isTypeNode(selection)) return { error: getLocaleSpecificMessage(Diagnostics.Selection_is_not_a_valid_type_node) };

    const checker = context.program.getTypeChecker();
    const enclosingNode = getEnclosingNode(selection, isJS);
    if (enclosingNode === undefined) return { error: getLocaleSpecificMessage(Diagnostics.No_type_could_be_extracted_from_this_type_node) };

    const typeParameters = collectTypeParameters(checker, selection, enclosingNode, file);
    if (!typeParameters) return { error: getLocaleSpecificMessage(Diagnostics.No_type_could_be_extracted_from_this_type_node) };

    const typeElements = flattenTypeLiteralNodeReference(checker, selection);
    return { isJS, selection, enclosingNode, typeParameters, typeElements };
}

function flattenTypeLiteralNodeReference(checker: TypeChecker, node: TypeNode | undefined): readonly TypeElement[] | undefined {
    if (!node) return undefined;
    if (isIntersectionTypeNode(node)) {
        const result: TypeElement[] = [];
        const seen = new Map<string, true>();
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

function collectTypeParameters(checker: TypeChecker, selection: TypeNode, enclosingNode: Node, file: SourceFile): TypeParameterDeclaration[] | undefined {
    const result: TypeParameterDeclaration[] = [];
    return visitor(selection) ? undefined : result;

    function visitor(node: Node): true | undefined {
        if (isTypeReferenceNode(node)) {
            if (isIdentifier(node.typeName)) {
                const typeName = node.typeName;
                const symbol = checker.resolveName(typeName.text, typeName, SymbolFlags.TypeParameter, /*excludeGlobals*/ true);
                for (const decl of symbol?.declarations || emptyArray) {
                    if (isTypeParameterDeclaration(decl) && decl.getSourceFile() === file) {
                        // skip extraction if the type node is in the range of the type parameter declaration.
                        // function foo<T extends { a?: /**/T }>(): void;
                        if (decl.name.escapedText === typeName.escapedText && rangeContainsSkipTrivia(decl, selection, file)) {
                            return true;
                        }

                        if (rangeContainsSkipTrivia(enclosingNode, decl, file) && !rangeContainsSkipTrivia(selection, decl, file)) {
                            pushIfUnique(result, decl);
                            break;
                        }
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
                const symbol = checker.resolveName(node.exprName.text, node.exprName, SymbolFlags.Value, /*excludeGlobals*/ false);
                if (symbol?.valueDeclaration && rangeContainsSkipTrivia(enclosingNode, symbol.valueDeclaration, file) && !rangeContainsSkipTrivia(selection, symbol.valueDeclaration, file)) {
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
    const { enclosingNode, selection, typeParameters } = info;

    const newTypeNode = factory.createTypeAliasDeclaration(
        /*modifiers*/ undefined,
        name,
        typeParameters.map(id => factory.updateTypeParameterDeclaration(id, id.modifiers, id.name, id.constraint, /*defaultType*/ undefined)),
        selection
    );
    changes.insertNodeBefore(file, enclosingNode, ignoreSourceNewlines(newTypeNode), /*blankLineBetween*/ true);
    changes.replaceNode(file, selection, factory.createTypeReferenceNode(name, typeParameters.map(id => factory.createTypeReferenceNode(id.name, /*typeArguments*/ undefined))), { leadingTriviaOption: textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: textChanges.TrailingTriviaOption.ExcludeWhitespace });
}

function doInterfaceChange(changes: textChanges.ChangeTracker, file: SourceFile, name: string, info: InterfaceInfo) {
    const { enclosingNode, selection, typeParameters, typeElements } = info;

    const newTypeNode = factory.createInterfaceDeclaration(
        /*modifiers*/ undefined,
        name,
        typeParameters,
        /*heritageClauses*/ undefined,
        typeElements
    );
    setTextRange(newTypeNode, typeElements[0]?.parent);
    changes.insertNodeBefore(file, enclosingNode, ignoreSourceNewlines(newTypeNode), /*blankLineBetween*/ true);
    changes.replaceNode(file, selection, factory.createTypeReferenceNode(name, typeParameters.map(id => factory.createTypeReferenceNode(id.name, /*typeArguments*/ undefined))), { leadingTriviaOption: textChanges.LeadingTriviaOption.Exclude, trailingTriviaOption: textChanges.TrailingTriviaOption.ExcludeWhitespace });
}

function doTypedefChange(changes: textChanges.ChangeTracker, context: RefactorContext, file: SourceFile, name: string, info: ExtractInfo) {
    const { enclosingNode, selection, typeParameters } = info;

    setEmitFlags(selection, EmitFlags.NoComments | EmitFlags.NoNestedComments);

    const node = factory.createJSDocTypedefTag(
        factory.createIdentifier("typedef"),
        factory.createJSDocTypeExpression(selection),
        factory.createIdentifier(name));

    const templates: JSDocTemplateTag[] = [];
    forEach(typeParameters, typeParameter => {
        const constraint = getEffectiveConstraintOfTypeParameter(typeParameter);
        const parameter = factory.createTypeParameterDeclaration(/*modifiers*/ undefined, typeParameter.name);
        const template = factory.createJSDocTemplateTag(
            factory.createIdentifier("template"),
            constraint && cast(constraint, isJSDocTypeExpression),
            [parameter]
        );
        templates.push(template);
    });

    const jsDoc = factory.createJSDocComment(/*comment*/ undefined, factory.createNodeArray(concatenate<JSDocTag>(templates, [node])));
    if (isJSDoc(enclosingNode)) {
        const pos = enclosingNode.getStart(file);
        const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext?.options);
        changes.insertNodeAt(file, enclosingNode.getStart(file), jsDoc, {
            suffix: newLineCharacter + newLineCharacter + file.text.slice(getPrecedingNonSpaceCharacterPosition(file.text, pos - 1), pos)
        });
    }
    else {
        changes.insertNodeBefore(file, enclosingNode, jsDoc, /*blankLineBetween*/ true);
    }
    changes.replaceNode(file, selection, factory.createTypeReferenceNode(name, typeParameters.map(id => factory.createTypeReferenceNode(id.name, /*typeArguments*/ undefined))));
}

function getEnclosingNode(node: Node, isJS: boolean) {
    return findAncestor(node, isStatement) || (isJS ? findAncestor(node, isJSDoc) : undefined);
}
