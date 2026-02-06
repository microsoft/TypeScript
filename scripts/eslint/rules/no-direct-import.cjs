const { createRule } = require("./utils.cjs");
const path = require("path");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "no-direct-import",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            noDirectImport: `This import relatively references another project; did you mean to import from a local _namespace module?`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const containingFileName = context.filename;
        const containingDirectory = path.dirname(containingFileName);

        /** @type {(node: TSESTree.ImportDeclaration | TSESTree.TSImportEqualsDeclaration) => void} */
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

            if (!source) return;

            const p = source.value;

            // These appear in place of public API imports.
            if (p.endsWith("../typescript/typescript.js")) return;

            // The below is similar to https://github.com/microsoft/DefinitelyTyped-tools/blob/main/packages/eslint-plugin/src/rules/no-bad-reference.ts

            // Any relative path that goes to the wrong place will contain "..".
            if (!p.includes("..")) return;

            const parts = p.split("/");
            let cwd = containingDirectory;
            for (const part of parts) {
                if (part === "" || part === ".") {
                    continue;
                }
                if (part === "..") {
                    cwd = path.dirname(cwd);
                }
                else {
                    cwd = path.join(cwd, part);
                }

                if (path.basename(cwd) === "src") {
                    context.report({
                        messageId: "noDirectImport",
                        node: source,
                    });
                }
            }
        };

        return {
            ImportDeclaration: check,
            TSImportEqualsDeclaration: check,
        };
    },
});
