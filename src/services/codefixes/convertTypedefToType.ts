import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    flatMap,
    getNewLineOrDefaultFromHost,
    getSynthesizedDeepClone,
    getTokenAtPosition,
    hasJSDocNodes,
    InterfaceDeclaration,
    isJSDocTypedefTag,
    isJSDocTypeLiteral,
    JSDoc,
    JSDocPropertyLikeTag,
    JSDocTag,
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
} from "../_namespaces/ts.js";

const fixId = "convertTypedefToType";
const errorCodes = [Diagnostics.JSDoc_typedef_may_be_converted_to_TypeScript_type.code];
registerCodeFix({
    fixIds: [fixId],
    errorCodes,
    getCodeActions(context) {
        const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);
        const node = getTokenAtPosition(
            context.sourceFile,
            context.span.start,
        );
        if (!node) return;

        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, node, context.sourceFile, newLineCharacter));

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
    getAllCodeActions: context =>
        codeFixAll(
            context,
            errorCodes,
            (changes, diag) => {
                const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);
                const node = getTokenAtPosition(diag.file, diag.start);
                const fixAll = true;
                if (node) doChange(changes, node, diag.file, newLineCharacter, fixAll);
            },
        ),
});

function doChange(
    changes: textChanges.ChangeTracker,
    node: Node,
    sourceFile: SourceFile,
    newLine: string,
    fixAll = false,
) {
    if (!isJSDocTypedefTag(node)) return;

    const declaration = createDeclaration(node);
    if (!declaration) return;

    const commentNode = node.parent;

    const { leftSibling, rightSibling } = getLeftAndRightSiblings(node);

    let pos = commentNode.getStart();
    let prefix = "";

    // the first @typedef is the comment block with a text comment above
    if (!leftSibling && commentNode.comment) {
        pos = findEndOfTextBetween(commentNode, commentNode.getStart(), node.getStart());
        prefix = `${newLine} */${newLine}`;
    }

    if (leftSibling) {
        if (fixAll && isJSDocTypedefTag(leftSibling)) {
            // Don't need to keep empty comment clock between created interfaces
            pos = node.getStart();
            prefix = "";
        }
        else {
            pos = findEndOfTextBetween(commentNode, leftSibling.getStart(), node.getStart());
            prefix = `${newLine} */${newLine}`;
        }
    }

    let end = commentNode.getEnd();
    let suffix = "";

    if (rightSibling) {
        if (fixAll && isJSDocTypedefTag(rightSibling)) {
            // Don't need to keep empty comment clock between created interfaces
            end = rightSibling.getStart();
            suffix = `${newLine}${newLine}`;
        }
        else {
            end = rightSibling.getStart();
            suffix = `${newLine}/**${newLine} * `;
        }
    }

    changes.replaceRange(sourceFile, { pos, end }, declaration, { prefix, suffix });
}

function getLeftAndRightSiblings(typedefNode: JSDocTypedefTag): { leftSibling?: Node; rightSibling?: Node; } {
    const commentNode = typedefNode.parent;
    const maxChildIndex = commentNode.getChildCount() - 1;

    const currentNodeIndex = commentNode.getChildren().findIndex(
        n => n.getStart() === typedefNode.getStart() && n.getEnd() === typedefNode.getEnd(),
    );

    const leftSibling = currentNodeIndex > 0 ? commentNode.getChildAt(currentNodeIndex - 1) : undefined;
    const rightSibling = currentNodeIndex < maxChildIndex ? commentNode.getChildAt(currentNodeIndex + 1) : undefined;

    return { leftSibling, rightSibling };
}

/**
 * Finds the index of the last meaningful symbol (except empty spaces, * and /) in the comment
 * between start and end positions
 */
function findEndOfTextBetween(jsDocComment: JSDoc, from: number, to: number): number {
    const comment = jsDocComment.getText().substring(from - jsDocComment.getStart(), to - jsDocComment.getStart());

    for (let i = comment.length; i > 0; i--) {
        if (!/[*/\s]/.test(comment.substring(i - 1, i))) {
            return from + i;
        }
    }

    return to;
}

function createDeclaration(tag: JSDocTypedefTag): InterfaceDeclaration | TypeAliasDeclaration | undefined {
    const { typeExpression } = tag;
    if (!typeExpression) return;
    const typeName = tag.name?.getText();
    if (!typeName) return;

    // For use case @typedef {object}Foo @property{bar}number
    // But object type can be nested, meaning the value in the k/v pair can be the object itself
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
    typeLiteral: JSDocTypeLiteral,
): InterfaceDeclaration | undefined {
    const propertySignatures = createSignatureFromTypeLiteral(typeLiteral);
    if (!some(propertySignatures)) return;

    return factory.createInterfaceDeclaration(
        /*modifiers*/ undefined,
        typeName,
        /*typeParameters*/ undefined,
        /*heritageClauses*/ undefined,
        propertySignatures,
    );
}

function createTypeAliasForTypeExpression(
    typeName: string,
    typeExpression: JSDocTypeExpression,
): TypeAliasDeclaration | undefined {
    const typeReference = getSynthesizedDeepClone(typeExpression.type);
    if (!typeReference) return;

    return factory.createTypeAliasDeclaration(
        /*modifiers*/ undefined,
        factory.createIdentifier(typeName),
        /*typeParameters*/ undefined,
        typeReference,
    );
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

            return factory.createPropertySignature(
                /*modifiers*/ undefined,
                name,
                questionToken,
                typeReference,
            );
        }
    };

    return mapDefined(propertyTags, getSignature);
}

function getPropertyName(tag: JSDocPropertyLikeTag): string | undefined {
    return tag.name.kind === SyntaxKind.Identifier ? tag.name.text : tag.name.right.text;
}

/** @internal */
export function getJSDocTypedefNodes(node: Node): readonly JSDocTag[] {
    if (hasJSDocNodes(node)) {
        return flatMap(node.jsDoc, doc => doc.tags?.filter(tag => isJSDocTypedefTag(tag)));
    }

    return [];
}
