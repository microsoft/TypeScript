const { TSESTree, ESLintUtils } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");
const ts = require("typescript");

/**
 * @param {ts.Identifier} node
 */
function isBareIdentifier(node) {
    if (ts.isPropertyAccessExpression(node.parent)) {
        return node.parent.expression === node;
    }

    if (ts.isQualifiedName(node.parent)) {
        return node.parent.left === node;
    }

    // TODO(jakebailey): surely I'm missing something here.
    // Also, how does eslint deal with type space versus value space? Or does it not?

    return true;
}

module.exports = createRule({
    name: "mark-jsdoc-types-used",
    meta: {
        docs: {
            description: ``,
        },
        messages: {},
        schema: [],
        type: "problem",
        fixable: "whitespace",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(node: TSESTree.Node) => void} */
        const checkProgram = (node) => {
            const parserServices = ESLintUtils.getParserServices(context, /*allowWithoutFullTypeInformation*/ true);
            const ast = parserServices.esTreeNodeToTSNodeMap.get(node);

            // TODO(jakebailey): I almost guarantee this is overzealous and wrong in some way.

            /**
             * @param {ts.Node} node
             */
            function markIdentifiersUsed(node) {
                if (ts.isIdentifier(node) && isBareIdentifier(node)) {
                    context.markVariableAsUsed(node.text);
                    return;
                }
                ts.forEachChild(node, markIdentifiersUsed);
            }

            /**
             * @param {ts.Node} node
             */
            function visit(node) {
                const jsDoc = ts.getJSDocTags(node);
                for (const tag of jsDoc) {
                    if (ts.isJSDocTypeTag(tag)) {
                        markIdentifiersUsed(tag.typeExpression);
                    }
                    else if (ts.isJSDocTypedefTag(tag) || ts.isJSDocPropertyLikeTag(tag) || ts.isJSDocReturnTag(tag) || ts.isJSDocThrowsTag(tag)) {
                        if (tag.typeExpression) {
                            markIdentifiersUsed(tag.typeExpression);
                        }
                    }
                    else if (ts.isJSDocTemplateTag(tag)) {
                        if (tag.constraint) {
                            markIdentifiersUsed(tag.constraint);
                        }
                        // tag.typeParameters?
                    }
                    else if (ts.isJSDocEnumTag(tag)) {
                        markIdentifiersUsed(tag.typeExpression);
                    }
                    else if (ts.isJSDocUnknownTag(tag)) {
                        // Ignore.
                        // TODO(jakebailey): Something's wrong here, though, becuase we're getting @parameter tags as unknown. See new code in parser.
                    }
                    else if (ts.isJSDocOverrideTag(tag) || ts.isJSDocDeprecatedTag(tag)) {
                        // Ignore.
                    }
                    else if (ts.isJSDocSeeTag(tag)) {
                        markIdentifiersUsed(tag.tagName);
                    }
                    else {
                        throw new Error(`Unexpected node kind: ${ts.SyntaxKind[tag.kind]} ${tag.getText()}}`);
                    }
                }
                ts.forEachChild(node, visit);
            }

            visit(ast);
        };

        return {
            Program: checkProgram,
        };
    },
});
