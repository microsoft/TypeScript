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
            missingJsExtension: `This relative module reference is missing a '.js' extension`,
        },
        schema: [],
        type: "suggestion",
        fixable: "code",
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

            // This is not 100% accurate; this could point to a nested package, or to a directory
            // containing an index.js file. But we don't have anything like that in our repo,
            // so this check is good enough. Replicate this logic at your own risk.
            if (source?.value.startsWith(".") && !/\.[cm]?js$/.test(source.value)) {
                const quote = source.raw[0];
                context.report({
                    messageId: "missingJsExtension",
                    node: source,
                    fix: fixer => fixer.replaceText(source, `${quote}${source.value}.js${quote}`),
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
