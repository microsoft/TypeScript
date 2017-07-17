/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.JSDoc_types_can_only_be_used_inside_documentation_comments.code],
        getCodeActions: getActionsForJSDocTypes
    });

    function getActionsForJSDocTypes(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;
        const node = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);
        const decl = ts.findAncestor(node, n => n.kind === SyntaxKind.VariableDeclaration);
        if (!decl) return;
        const jsdocType = (decl as VariableDeclaration).type;
        let cheesyHacks = false;

        // TODO: Only if get(jsdoctype) !== jsdoctype
        // TODO: Create cheesy hacks to support | null | undefined -- just flip a boolean and rerun with that boolean set

        const trk = textChanges.ChangeTracker.fromCodeFixContext(context);
        trk.replaceNode(sourceFile, jsdocType, getTypeFromJSDocType(jsdocType));
        const changes = [{
            // TODO: This seems like the LEAST SAFE way to get the new text
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_0_to_1), [getTextOfNode(jsdocType), trk.getChanges()[0].textChanges[0].newText]),
            changes: trk.getChanges(),
        }];

        if (cheesyHacks) {
            const trk = textChanges.ChangeTracker.fromCodeFixContext(context);
            trk.replaceNode(sourceFile, jsdocType, getTypeFromJSDocType(jsdocType));
            changes.push({
                // TODO: This seems like the LEAST SAFE way to get the new text
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_0_to_1), [getTextOfNode(jsdocType), trk.getChanges()[0].textChanges[0].newText]),
                changes: trk.getChanges(),
            });
        }
        return changes;

        function getTypeFromJSDocType(type: TypeNode): TypeNode {
            switch (type.kind) {
                case SyntaxKind.JSDocUnknownType:
                case SyntaxKind.JSDocAllType:
                    return createToken(SyntaxKind.AnyKeyword) as TypeNode;
                case SyntaxKind.JSDocVariadicType:
                    return createArrayTypeNode(getTypeFromJSDocType((type as JSDocVariadicType).type));
                case SyntaxKind.JSDocNullableType:
                    if (cheesyHacks) {
                        return createUnionTypeNode([getTypeFromJSDocType((type as JSDocNullableType).type), createNull(), createToken(SyntaxKind.UndefinedKeyword) as TypeNode]);
                    }
                    else {
                        cheesyHacks = true;
                        return createUnionTypeNode([getTypeFromJSDocType((type as JSDocNullableType).type), createNull()]);
                    }
                case SyntaxKind.JSDocNonNullableType:
                    return getTypeFromJSDocType((type as JSDocNullableType).type);
                case SyntaxKind.ArrayType:
                    // TODO: Only create an error if the get(type.type) !== type.type.
                    return createArrayTypeNode(getTypeFromJSDocType((type as ArrayTypeNode).elementType));
                case SyntaxKind.TypeReference:
                    return getTypeReferenceFromJSDocType(type as TypeReferenceNode);
                case SyntaxKind.Identifier:
                    return type;
            }
            // TODO: Need to recur on all relevant nodes. Is a call to visit enough?
            return type;
        }

        function getTypeReferenceFromJSDocType(type: TypeReferenceNode) {
            if (type.typeArguments && type.typeName.jsdocDotPos) {
                return createTypeReferenceNode(type.typeName, map(type.typeArguments, getTypeFromJSDocType));
            }
            return getTypeFromJSDocType(type);
        }
    }
}
