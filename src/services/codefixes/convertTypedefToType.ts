import {
    Diagnostics,
    factory,
    forEach,
    getSynthesizedDeepClone,
    getTokenAtPosition,
    hasJSDocNodes,
    InterfaceDeclaration,
    isJSDocTypedefTag,
    isJSDocTypeLiteral,
    JSDocPropertyLikeTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    mapDefined,
    Node,
    PropertySignature,
    some,
    SourceFile,
    SyntaxKind,
    textChanges,
    TypeAliasDeclaration,
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
                    Diagnostics.Convert_typedef_to_TypeScript_type,
                    fixId,
                    Diagnostics.Convert_all_typedef_to_TypeScript_types,
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
    if (isJSDocTypedefTag(node)) {
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
    const typeName = tag.name?.getText();
    if (!typeName) return;

    // For use case @typedef {object}Foo @property{bar}number
    // But object type can be nested, meaning the value in the k/v pair can be object itself
    if (typeExpression.kind === SyntaxKind.JSDocTypeLiteral) {
        return createInterfaceForTypeLiteral(typeName, typeExpression);
    }
    // for use case @typedef {(number|string|undefined)} Foo or @typedef {number|string|undefined} Foo
    // In this case, we reach the leaf node of AST.
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
        /*modifiers*/ undefined,
        typeName,
        /*typeParameters*/ undefined,
        /*heritageClauses*/ undefined,
        propertySignatures,
    );
    return interfaceDeclaration;
}

function createTypeAliasForTypeExpression(
    typeName: string,
    typeExpression: JSDocTypeExpression
): TypeAliasDeclaration | undefined {
    const typeReference = getSynthesizedDeepClone(typeExpression.type);
    if (!typeReference) return;
    const declaration = factory.createTypeAliasDeclaration(
        /*modifiers*/ undefined,
        factory.createIdentifier(typeName),
        /*typeParameters*/ undefined,
        typeReference
    );
    return declaration;
}

function createSignatureFromTypeLiteral(typeLiteral: JSDocTypeLiteral): PropertySignature[] | undefined {
    const propertyTags = typeLiteral.jsDocPropertyTags;
    if (!some(propertyTags)) return;

    const getSignature = (tag: JSDocPropertyLikeTag) => {
        const name = getPropertyName(tag);
        const type = tag.typeExpression?.type;
        const isOptional = tag.isBracketed;
        let typeReference;

        // Recursively handle nested object type
        if (type && isJSDocTypeLiteral(type)) {
            const signatures = createSignatureFromTypeLiteral(type);
            typeReference = factory.createTypeLiteralNode(signatures);
        }
        // Leaf node, where type.kind === SyntaxKind.JSDocTypeExpression
        else if (type) {
            typeReference = getSynthesizedDeepClone(type);
        }

        if (typeReference && name) {
            const questionToken = isOptional ? factory.createToken(SyntaxKind.QuestionToken) : undefined;
            const prop = factory.createPropertySignature(
                /*modifiers*/ undefined,
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

function getPropertyName(tag: JSDocPropertyLikeTag): string | undefined {
    return tag.name.kind === SyntaxKind.Identifier ? tag.name.text : tag.name.right.text;
}

/** @internal */
export function getJSDocTypedefNode(node: Node): JSDocTypedefTag | undefined {
    if (hasJSDocNodes(node)) {
        return forEach(node.jsDoc, (node) => node.tags?.find(isJSDocTypedefTag));
    }
    return undefined;
}
