const { AST_NODE_TYPES, TSESTree } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

const tsNamespaceBarrelRegex = /_namespaces\/ts(?:\.ts|\.js|\.mts|\.mjs|\.cts|\.cjs)?$/;

module.exports = createRule({
    name: "no-ts-debug",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            importDebugError: `ts.Debug should be imported directly from src/compiler/debug.ts`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(node: TSESTree.MemberExpression) => boolean} */
        const isTsDebug = node => (
            node.object.type === AST_NODE_TYPES.Identifier
            && node.object.name === "ts"
            && node.property.type === AST_NODE_TYPES.Identifier
            && node.property.name === "Debug"
        );

        return {
            ImportDeclaration: node => {
                if (node.importKind !== "value" || !tsNamespaceBarrelRegex.test(node.source.value)) {
                    return;
                }

                for (const specifier of node.specifiers) {
                    if (specifier.type !== AST_NODE_TYPES.ImportSpecifier || specifier.importKind !== "value") {
                        continue;
                    }

                    if (specifier.imported.name === "Debug") {
                        context.report({ messageId: "importDebugError", node: specifier });
                    }
                }
            },
            MemberExpression: node => {
                if (isTsDebug(node)) {
                    context.report({ messageId: "importDebugError", node });
                }
            },
        };
    },
});
