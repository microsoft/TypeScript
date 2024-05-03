const { createRule } = require("./utils.cjs");

/** @typedef {import("@typescript-eslint/utils").TSESTree.ImportDeclaration | import("@typescript-eslint/utils").TSESTree.ExportAllDeclaration | import("@typescript-eslint/utils").TSESTree.ExportNamedDeclaration | import("@typescript-eslint/utils").TSESTree.TSImportEqualsDeclaration} ImportOrExport */

module.exports = createRule({
    name: "js-extensions",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            missingJsExtension: `This relative import is missing a '.js' extension`,
        },
        schema: [],
        type: "suggestion",
        fixable: "code",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(node: ImportOrExport) => void} */
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
            else {
                source = node.source;
            }

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
        };
    },
});
