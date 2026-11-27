const { createRule } = require("./utils.cjs");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "js-extensions",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            missingJsExtension: `This relative module reference is missing a TypeScript, JavaScript, or JSON extension`,
        },
        schema: [],
        type: "suggestion",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(
         *      node:
         *          | TSESTree.ImportDeclaration
         *          | TSESTree.ExportAllDeclaration
         *          | TSESTree.ExportNamedDeclaration
         *          | TSESTree.TSImportEqualsDeclaration
         *          | TSESTree.TSModuleDeclaration
         *  ) => void}
         */
        const check = node => {
            let source;
            if (node.type === "TSImportEqualsDeclaration") {
                const moduleReference = node.moduleReference;
                if (
                    moduleReference.type === "TSExternalModuleReference"
                    && moduleReference.expression.type === "Literal"
                    && typeof moduleReference.expression.value === "string"
                ) {
                    source = moduleReference.expression;
                }
            }
            else if (node.type === "TSModuleDeclaration") {
                if (node.kind === "module" && node.id.type === "Literal") {
                    source = node.id;
                }
            }
            else {
                source = node.source;
            }

            if (source?.value.startsWith(".") && !/\.(?:[cm]?[jt]s|json)$/.test(source.value)) {
                context.report({
                    messageId: "missingJsExtension",
                    node: source,
                });
            }
        };

        return {
            ImportDeclaration: check,
            ExportAllDeclaration: check,
            ExportNamedDeclaration: check,
            TSImportEqualsDeclaration: check,
            TSModuleDeclaration: check,
        };
    },
});
