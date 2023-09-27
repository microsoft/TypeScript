const { AST_NODE_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

const tsNamespaceBarrelRegex = /_namespaces\/ts(?:\.ts|\.js|\.mts|\.mjs|\.cts|\.cjs)?$/;

/**
 * @type {Array<{ name: string; path: string; }>}
 */
const modules = [
    {
        name: "Debug",
        path: "compiler/debug",
    },
];

module.exports = createRule({
    name: "prefer-direct-import",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            importError: `{{ name }} should be imported directly from {{ path }}`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        return {
            ImportDeclaration: node => {
                if (node.importKind !== "value" || !tsNamespaceBarrelRegex.test(node.source.value)) return;

                for (const specifier of node.specifiers) {
                    if (specifier.type !== AST_NODE_TYPES.ImportSpecifier || specifier.importKind !== "value") continue;

                    for (const mod of modules) {
                        if (specifier.imported.name !== mod.name) continue;

                        context.report({
                            messageId: "importError",
                            data: { name: mod.name, path: mod.path },
                            node: specifier,
                        });
                    }
                }
            },
            MemberExpression: node => {
                if (node.object.type !== AST_NODE_TYPES.Identifier || node.object.name !== "ts") return;

                for (const mod of modules) {
                    if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== mod.name) continue;

                    context.report({
                        messageId: "importError",
                        data: { name: mod.name, path: mod.path },
                        node,
                    });
                }
            },
        };
    },
});
