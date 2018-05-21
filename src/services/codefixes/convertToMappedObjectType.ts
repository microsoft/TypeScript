/* @internal */
namespace ts.codefix {
    const fixIdAddMissingTypeof = "fixConvertToMappedObjectType";
    const fixId = fixIdAddMissingTypeof;
    const errorCodes = [Diagnostics.An_index_signature_parameter_type_cannot_be_a_union_type_Consider_using_a_mapped_object_type_instead.code];

    interface Info {
        indexSignature: IndexSignatureDeclaration;
        container: InterfaceDeclaration;
    }

    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span } = context;
            const info = getConvertibleSignatureAtPosition(sourceFile, span.start);
            if (!info) return;
            const { indexSignature, container } = info;

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, indexSignature, container));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Convert_0_to_mapped_object_type, ""], fixId, [Diagnostics.Convert_0_to_mapped_object_type, ""])];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getConvertibleSignatureAtPosition(diag.file, diag.start);
            if (!info) return;
            const { indexSignature, container } = info;

            doChange(changes, context.sourceFile, indexSignature, container);
        })
    });

    function isIndexSignatureParameterName(node: Node): node is Identifier {
        return node && node.parent && node.parent.parent && node.parent.parent.parent &&
            isIdentifier(node) && isParameter(node.parent) && isIndexSignatureDeclaration(node.parent.parent) && isInterfaceDeclaration(node.parent.parent.parent);
    }

    function getConvertibleSignatureAtPosition(sourceFile: SourceFile, pos: number): Info | undefined {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        if (!isIndexSignatureParameterName(token)) return undefined;

        const indexSignature = <IndexSignatureDeclaration>token.parent.parent;
        const container = <InterfaceDeclaration>indexSignature.parent;

        return {
            indexSignature,
            container
        };
    }

    function createTypeAliasFromInterface(indexSignature: IndexSignatureDeclaration, declaration: InterfaceDeclaration) {
        const otherMembersType = createTypeLiteralNode(filter(declaration.members, member => !isIndexSignatureDeclaration(member)));
        const parameter = first(indexSignature.parameters);
        const mappedObjectType = createMappedTypeNode(
            hasReadonlyModifier(indexSignature) ? createModifier(SyntaxKind.ReadonlyKeyword) : undefined,
            createTypeParameterDeclaration(
                <Identifier>parameter.name,
                parameter.type
            ),
            indexSignature.questionToken,
            indexSignature.type
        );

        return createTypeAliasDeclaration(
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.typeParameters,
            createIntersectionTypeNode([mappedObjectType, otherMembersType])
        );
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, indexSignature: IndexSignatureDeclaration, declaration: InterfaceDeclaration) {
        const newTypeDeclaration = createTypeAliasFromInterface(indexSignature, declaration);
        changes.replaceNode(sourceFile, declaration, newTypeDeclaration);
    }
}
