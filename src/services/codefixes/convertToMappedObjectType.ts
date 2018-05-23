/* @internal */
namespace ts.codefix {
    const fixIdAddMissingTypeof = "fixConvertToMappedObjectType";
    const fixId = fixIdAddMissingTypeof;
    const errorCodes = [Diagnostics.An_index_signature_parameter_type_cannot_be_a_union_type_Consider_using_a_mapped_object_type_instead.code];

    type FixableDeclaration = InterfaceDeclaration | TypeAliasDeclaration;

    interface Info {
        indexSignature: IndexSignatureDeclaration;
        container: FixableDeclaration;
        otherMembers: ReadonlyArray<TypeElement>;
        parameterName: Identifier;
        parameterType: TypeNode;
    }

    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { sourceFile, span } = context;
            const info = getFixableSignatureAtPosition(sourceFile, span.start);
            if (!info) return;
            const { indexSignature, container, otherMembers, parameterName, parameterType } = info;

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, indexSignature, container, otherMembers, parameterName, parameterType));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Convert_0_to_mapped_object_type, idText(container.name)], fixId, [Diagnostics.Convert_0_to_mapped_object_type, idText(container.name)])];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getFixableSignatureAtPosition(diag.file, diag.start);
            if (!info) return;
            const { indexSignature, container, otherMembers, parameterName, parameterType } = info;

            doChange(changes, context.sourceFile, indexSignature, container, otherMembers, parameterName, parameterType);
        })
    });

    function isFixableParameterName(node: Node): boolean {
        return node && node.parent && node.parent.parent && node.parent.parent.parent && !isClassDeclaration(node.parent.parent.parent);
    }

    function getFixableSignatureAtPosition(sourceFile: SourceFile, pos: number): Info | undefined {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        if (!isFixableParameterName(token)) return undefined;

        const indexSignature = <IndexSignatureDeclaration>token.parent.parent;
        const container = isInterfaceDeclaration(indexSignature.parent) ? indexSignature.parent : <TypeAliasDeclaration>indexSignature.parent.parent;
        const members = isInterfaceDeclaration(container) ? container.members : (<TypeLiteralNode>container.type).members;
        const otherMembers = filter(members, member => !isIndexSignatureDeclaration(member));
        const parameter = first(indexSignature.parameters);

        return {
            indexSignature,
            container,
            otherMembers,
            parameterName: <Identifier>parameter.name,
            parameterType: parameter.type!
        };
    }

    function getInterfaceHeritageClauses(declaration: FixableDeclaration): NodeArray<ExpressionWithTypeArguments> | undefined {
        if (!isInterfaceDeclaration(declaration)) return undefined;

        const heritageClause = getHeritageClause(declaration.heritageClauses, SyntaxKind.ExtendsKeyword);
        return heritageClause && heritageClause.types;
    }

    function createTypeAliasFromInterface(indexSignature: IndexSignatureDeclaration, declaration: FixableDeclaration, otherMembers: ReadonlyArray<TypeElement>, parameterName: Identifier, parameterType: TypeNode) {
        const heritageClauses = getInterfaceHeritageClauses(declaration);
        const mappedTypeParameter = createTypeParameterDeclaration(parameterName, parameterType);
        const mappedIntersectionType = createMappedTypeNode(
            hasReadonlyModifier(indexSignature) ? createModifier(SyntaxKind.ReadonlyKeyword) : undefined,
            mappedTypeParameter,
            indexSignature.questionToken,
            indexSignature.type);

        return createTypeAliasDeclaration(
            declaration.decorators,
            declaration.modifiers,
            declaration.name,
            declaration.typeParameters,
            createIntersectionTypeNode(
                concatenate(
                    heritageClauses,
                    append<TypeNode>([mappedIntersectionType], otherMembers.length ? createTypeLiteralNode(otherMembers) : undefined)
                )
            )
        );
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, indexSignature: IndexSignatureDeclaration, declaration: FixableDeclaration, otherMembers: ReadonlyArray<TypeElement>, parameterName: Identifier, parameterType: TypeNode) {
        changes.replaceNode(sourceFile, declaration, createTypeAliasFromInterface(indexSignature, declaration, otherMembers, parameterName, parameterType));
    }
}
