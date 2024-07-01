const { createRule } = require("./utils.cjs");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "jsdoc-format",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            internalCommentInNonJSDocError: `@internal should not appear in non-JSDoc comment for declaration.`,
            internalCommentNotLastError: `@internal should only appear in final JSDoc comment for declaration.`,
            multipleJSDocError: `Declaration has multiple JSDoc comments.`,
            internalCommentOnParameterProperty: `@internal cannot appear on a JSDoc comment; use a declared property and an assignment in the constructor instead.`,
            internalCommentOnUnexported: `@internal should not appear on an unexported declaration.`,
            internalCommentOnPrivate: `@internal should not appear on a private declaration.`,
        },
        schema: [],
        type: "problem",
        fixable: "whitespace",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.getSourceCode();
        const atInternal = "@internal";
        const jsdocStart = "/**";

        /** @type {Map<TSESTree.Node, boolean>} */
        const isExportedCache = new Map();

        /** @type {(node: TSESTree.Node) => boolean} */
        function isExported(node) {
            const exported = isExportedCache.get(node);
            if (exported !== undefined) {
                return exported;
            }

            /** @type {TSESTree.Node | undefined} */
            let current = node;
            while (current) {
                // https://github.com/typescript-eslint/typescript-eslint/blob/e44a1a280f08f9fd0d29f74e5c3e73b7b64a9606/packages/eslint-plugin/src/util/collectUnusedVariables.ts#L440
                if (current.type.startsWith("Export")) {
                    isExportedCache.set(node, true);
                    return true;
                }
                isExportedCache.set(current, false);
                current = current.parent;
            }

            return false;
        }

        /** @type {(text: string) => boolean} */
        function isJSDocText(text) {
            return text.startsWith(jsdocStart);
        }

        /** @type {(c: TSESTree.Comment, indexInComment: number) => TSESTree.SourceLocation} */
        const getAtInternalLoc = (c, indexInComment) => {
            return {
                start: context.sourceCode.getLocFromIndex(c.range[0] + indexInComment),
                end: context.sourceCode.getLocFromIndex(c.range[0] + indexInComment + atInternal.length),
            };
        };

        /** @type {(c: TSESTree.Comment) => TSESTree.SourceLocation} */
        const getJSDocStartLoc = c => {
            return {
                start: c.loc.start,
                end: {
                    line: c.loc.start.line,
                    column: c.loc.start.column + jsdocStart.length,
                },
            };
        };

        /** @type {(node: TSESTree.Node) => void} */
        const checkDeclaration = node => {
            const blockComments = sourceCode.getCommentsBefore(node).filter(c => c.type === "Block");
            if (blockComments.length === 0) {
                return;
            }

            const last = blockComments.length - 1;
            let seenJSDoc = false;
            for (let i = 0; i < blockComments.length; i++) {
                const c = blockComments[i];
                const rawComment = sourceCode.getText(c);

                const isJSDoc = isJSDocText(rawComment);
                if (isJSDoc && seenJSDoc) {
                    context.report({ messageId: "multipleJSDocError", node: c, loc: getJSDocStartLoc(c) });
                }
                seenJSDoc = seenJSDoc || isJSDoc;

                const indexInComment = rawComment.indexOf(atInternal);
                if (indexInComment === -1) {
                    continue;
                }

                if (!isJSDoc) {
                    context.report({ messageId: "internalCommentInNonJSDocError", node: c, loc: getAtInternalLoc(c, indexInComment) });
                }
                else if (node.type === "TSParameterProperty") {
                    context.report({ messageId: "internalCommentOnParameterProperty", node: c, loc: getAtInternalLoc(c, indexInComment) });
                }
                else if (!isExported(node)) {
                    context.report({ messageId: "internalCommentOnUnexported", node: c, loc: getAtInternalLoc(c, indexInComment) });
                }
                // eslint-disable-next-line local/no-in-operator
                else if ("accessibility" in node && node.accessibility === "private") {
                    context.report({ messageId: "internalCommentOnPrivate", node: c, loc: getAtInternalLoc(c, indexInComment) });
                }
                else if (i !== last) {
                    context.report({ messageId: "internalCommentNotLastError", node: c, loc: getAtInternalLoc(c, indexInComment) });
                }
            }
        };

        return {
            ClassDeclaration: checkDeclaration,
            FunctionDeclaration: checkDeclaration,
            TSEnumDeclaration: checkDeclaration,
            TSModuleDeclaration: checkDeclaration,
            VariableDeclaration: checkDeclaration,
            TSInterfaceDeclaration: checkDeclaration,
            TSTypeAliasDeclaration: checkDeclaration,
            TSCallSignatureDeclaration: checkDeclaration,
            ExportAllDeclaration: checkDeclaration,
            ExportNamedDeclaration: checkDeclaration,
            TSImportEqualsDeclaration: checkDeclaration,
            TSNamespaceExportDeclaration: checkDeclaration,
            TSConstructSignatureDeclaration: checkDeclaration,
            ExportDefaultDeclaration: checkDeclaration,
            TSPropertySignature: checkDeclaration,
            TSIndexSignature: checkDeclaration,
            TSMethodSignature: checkDeclaration,
            TSParameterProperty: checkDeclaration,
            PropertyDefinition: checkDeclaration,
            MethodDefinition: checkDeclaration,
        };
    },
});
