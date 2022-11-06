namespace ts.codefix {
    const fixId = "convertTypedefToType";
    const errorCodes = [Diagnostics.Convert_typedef_to_type.code];
    registerCodeFix({
        fixIds: [fixId],
        errorCodes,
        getCodeActions(context) {
            const node = getTokenAtPosition(
                context.sourceFile,
                context.span.start
            );
            if (!node) return;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, node, context.sourceFile));

            if (changes.length > 0) {
                return [
                    createCodeFixAction(
                        fixId,
                        changes,
                        Diagnostics.Convert_typedef_to_type,
                        fixId,
                        Diagnostics.Convert_all_typedefs_to_types
                    ),
                ];
            }
        },
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const node = getTokenAtPosition(diag.file, diag.start);
            if (node) doChange(changes, node, diag.file);
        })
    });

    function doChange(changes: textChanges.ChangeTracker, node: Node, sourceFile: SourceFile) {
        if (containsTypeDefTag(node)) {
            fixSingleTypeDef(changes, node, sourceFile);
        }
    }

    function fixSingleTypeDef(
        changes: textChanges.ChangeTracker,
        typeDefNode: JSDocTypedefTag | undefined,
        sourceFile: SourceFile,
    ) {
        if (!typeDefNode) return;

        const declaration = createDeclaration(typeDefNode);
        if(!declaration) return;

        const comment = typeDefNode.parent;

        changes.replaceNode(
            sourceFile,
            comment,
            declaration
        );
    }

    function createDeclaration(tagNode: JSDocTypedefTag): InterfaceDeclaration | TypeAliasDeclaration | undefined {
        const typeName = tagNode.name?.getFullText().trim();
        const typeExpression = tagNode.typeExpression;
        if (!typeName || !typeExpression) return;

        if (typeExpression.kind === SyntaxKind.JSDocTypeLiteral) {
            return createDeclarationFromTypeLiteral(typeName, typeExpression);
        }
        else if (typeExpression.kind === SyntaxKind.JSDocTypeExpression) {
            return createDeclarationFromTypeExpression(typeName, typeExpression);
        }
    }

    function createDeclarationFromTypeLiteral(typeName: string, typeExpression: JSDocTypeLiteral): InterfaceDeclaration | undefined {
        if (!typeName || !typeExpression) return;
        const propertyTags = typeExpression.jsDocPropertyTags;
        if (!propertyTags) return;

        const propertySignatures = createPropertySignatures(propertyTags as JSDocPropertyTag[]);

        if(!propertySignatures || propertySignatures.length === 0) return;
        const interfaceDeclaration = factory.createInterfaceDeclaration(
            [],
            typeName,
            [],
            [],
            propertySignatures,
        );
        return interfaceDeclaration;
    }

    function createDeclarationFromTypeExpression(typeName: string, typeExpression: JSDocTypeExpression): TypeAliasDeclaration | undefined {
        if (!typeName || !typeExpression) return;

        let type = typeExpression.type;
        if (type.kind === SyntaxKind.ParenthesizedType) {
            type = (type as ParenthesizedTypeNode).type;
        }

        if (type.kind === SyntaxKind.UnionType) {
           return createTypeAliasForUnionType(type as UnionTypeNode, typeName);
        }
    }

    function createPropertySignatures(tags: JSDocPropertyTag[]): PropertySignature[] | undefined{
        const props = tags.reduce((signatures: PropertySignature[], tag: JSDocPropertyTag) => {
            const propertyName = tag.name.getFullText().trim();
            const propertyType = (tag.typeExpression?.type)?.getFullText().trim();
            if(propertyName && propertyType) {
                const prop = factory.createPropertySignature(
                    [],
                    propertyName,
                    // eslint-disable-next-line local/boolean-trivia
                    undefined,
                    factory.createTypeReferenceNode(propertyType)
                );
                return [...signatures, prop];
            }

        }, []);
        return props;
    }

    function createTypeAliasForUnionType(type: UnionTypeNode, typeName: string): TypeAliasDeclaration | undefined {
        const elements = type.types;
            const nodes = elements.reduce((nodeArray, element) => {
                const node = transformUnionTypeKeyword(element.kind);
                if (node) return [...nodeArray, node];
            }, []);
            if (!nodes) return;
            const typeReference = factory.createUnionTypeNode(nodes);
            const unionDeclaration = factory.createTypeAliasDeclaration(
                [],
                factory.createIdentifier(typeName),
                [],
                typeReference
            );
            return unionDeclaration;
    }

    function transformUnionTypeKeyword(keyword: TypeNodeSyntaxKind): TypeNode | undefined {
        switch (keyword) {
            case SyntaxKind.NumberKeyword:
                return factory.createTypeReferenceNode("number");
            case SyntaxKind.StringKeyword:
                return factory.createTypeReferenceNode("string");
            case SyntaxKind.UndefinedKeyword:
                return factory.createTypeReferenceNode("undefined");
            case SyntaxKind.ObjectKeyword:
                return factory.createTypeReferenceNode("object");
            case SyntaxKind.VoidKeyword:
                return factory.createTypeReferenceNode("void");
            default:
                return;
        }
    }

    export function _containsJSDocTypedef(node: Node): node is HasJSDoc {
        if (hasJSDocNodes(node)) {
            const jsDocNodes = node.jsDoc || [];
            return jsDocNodes.some((node) => {
                const tags = node.tags || [];
                return tags.some((tag) => isJSDocTypedefTag(tag));
            });
        }
        return false;
    }

    export function getJSDocTypedefNode(node: HasJSDoc): JSDocTypedefTag {
        const jsDocNodes = node.jsDoc || [];

        return flatMap(jsDocNodes, (node) => {
            const tags = node.tags || [];
            return tags.filter((tag) => isJSDocTypedefTag(tag));
        })[0] as unknown as JSDocTypedefTag;
    }

    export function containsTypeDefTag(node: Node): node is JSDocTypedefTag {
        return isInJSDoc(node) && isJSDocTypedefTag(node);
    }
}