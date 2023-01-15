import {
    Diagnostics,
    factory,
    flatMap,
    getTokenAtPosition,
    HasJSDoc,
    hasJSDocNodes,
    InterfaceDeclaration,
    isInJSDoc,
    isJSDocTypedefTag,
    JSDocPropertyTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    mapDefined,
    Node,
    ParenthesizedTypeNode,
    PropertySignature,
    some,
    SourceFile,
    SyntaxKind,
    textChanges,
    TypeAliasDeclaration,
    TypeNode,
    TypeNodeSyntaxKind,
    UnionTypeNode,
} from "../_namespaces/ts";
import { codeFixAll, createCodeFixAction, registerCodeFix } from "../_namespaces/ts.codefix";

const fixId = "convertTypedefToType";
const errorCodes = [Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type.code];
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
                    Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type,
                    fixId,
                    Diagnostics.JSDoc_typedefs_may_be_converted_to_TypeScript_types
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
    if (!declaration) return;

    const comment = typeDefNode.parent;

    changes.replaceNode(
        sourceFile,
        comment,
        declaration
    );
}

function createDeclaration(tag: JSDocTypedefTag): InterfaceDeclaration | TypeAliasDeclaration | undefined {
    const { typeExpression } = tag;
    if (!typeExpression) return;
    const typeName = tag.name?.getFullText().trim();
    if (!typeName) return;

    // For use case @typedef {object}Foo @property{bar}number
    // But object type can be nested, meaning the value in the k/v pair can be object itself
    if (typeExpression.kind === SyntaxKind.JSDocTypeLiteral) {
        return createInterfaceForTypeLiteral(typeName, typeExpression);
    }
    // for use case @typedef {(number|string|undefined)} Foo or @typedef {number|string|undefined} Foo
    // In this case, we reach the leaf node of AST.
    // Here typeExpression.type is a TypeNode, e.g. a UnionType or a primitive type, such as "number".
    if (typeExpression.kind === SyntaxKind.JSDocTypeExpression) {
        return createTypeAliasForTypeExpression(typeName, typeExpression);
    }
}

function createInterfaceForTypeLiteral(
    typeName: string,
    typeLiteral: JSDocTypeLiteral
): InterfaceDeclaration | undefined {
    const propertySignatures = createSignatureFromTypeLiteral(typeLiteral);
    if (!some(propertySignatures)) return;
    const interfaceDeclaration = factory.createInterfaceDeclaration(
        [],
        typeName,
        [],
        [],
        propertySignatures,
    );
    return interfaceDeclaration;
}

function createTypeAliasForTypeExpression(
    typeName: string,
    typeExpression: JSDocTypeExpression
): TypeAliasDeclaration | undefined {
    const typeReference = createTypeReference(typeExpression.type);
    if (!typeReference) return;
    const declaration = factory.createTypeAliasDeclaration(
        [],
        factory.createIdentifier(typeName),
        [],
        typeReference
    );
    return declaration;
}

function createSignatureFromTypeLiteral(typeLiteral: JSDocTypeLiteral): PropertySignature[] | undefined {
    const propertyTags = typeLiteral.jsDocPropertyTags;
    if (!some(propertyTags)) return;

    const getSignature = (tag: JSDocPropertyTag) => {
        const name = getPropertyName(tag);
        const type = tag.typeExpression?.type;
        const isOptional = tag.isBracketed;
        let typeReference;

        // Recursively handle nested object type
        if (type && type.kind === SyntaxKind.JSDocTypeLiteral) {
            const signatures = createSignatureFromTypeLiteral(type as JSDocTypeLiteral);
            typeReference = factory.createTypeLiteralNode(signatures);
        }
        // Leaf node, where type.kind === SyntaxKind.JSDocTypeExpression
        else if (type) {
            typeReference = createTypeReference(type);
        }

        if (typeReference && name) {
            const questionToken = isOptional ? factory.createToken(SyntaxKind.QuestionToken) : undefined;
            const prop = factory.createPropertySignature(
                [],
                name,
                questionToken,
                typeReference
            );

            return prop;
        }
    };

    const props = mapDefined(propertyTags, getSignature);
    return props;
}

function getPropertyName(tag: JSDocPropertyTag): string | undefined {
    const { name } = tag;
    if (!name) return;

    let propertyName;
    // for "@property {string} parent.child" or "@property {string} parent.child.grandchild" in nested object type
    // We'll get "child" in the first example or "grandchild" in the second example as the prop name
    if (name.kind === SyntaxKind.QualifiedName) {
        propertyName = name.right.getFullText().trim();
    }
    else {
        propertyName = tag.name.getFullText().trim();
    }
    return propertyName;
}

// Create TypeReferenceNode when we reach the leaf node of AST
function createTypeReference(type: TypeNode): TypeNode | undefined {
    let typeReference;
    if (type.kind === SyntaxKind.ParenthesizedType) {
        type = (type as ParenthesizedTypeNode).type;
    }
    // Create TypeReferenceNode for UnionType
    if (type.kind === SyntaxKind.UnionType) {
        const elements = (type as UnionTypeNode).types;
        const nodes = mapDefined(
            elements,
            (element) => {
                const node = transformUnionTypeKeyword(element.kind);
                if (node) {
                    return node;
                }
            }
        );

        if (!nodes) return;
        typeReference = factory.createUnionTypeNode(nodes);
    }
    //Create TypeReferenceNode for primitive types
    else {
        typeReference = transformUnionTypeKeyword(type.kind);
    }
    return typeReference;
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

/** @internal */
export function containsJSDocTypedef(node: Node): node is HasJSDoc {
    return hasJSDocNodes(node) && some(node.jsDoc, node => some(node.tags, tag => isJSDocTypedefTag(tag)));
}

/** @internal */
export function getJSDocTypedefNode(node: HasJSDoc): JSDocTypedefTag {
    const jsDocNodes = node.jsDoc || [];

    return flatMap(jsDocNodes, (node) => {
        const tags = node.tags || [];
        return tags.filter((tag) => isJSDocTypedefTag(tag));
    })[0] as unknown as JSDocTypedefTag;
}

/** @internal */
export function containsTypeDefTag(node: Node): node is JSDocTypedefTag {
    return isInJSDoc(node) && isJSDocTypedefTag(node);
}