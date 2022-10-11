const { AST_NODE_TYPES, TSESTree } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

module.exports = createRule({
    name: "one-namespace-per-file",
    meta: {
        docs: {
            description: `Limits each file to having at most one top-level namespace declaration`,
            recommended: "error",
        },
        messages: {
            excessNamespaceError: `All but one of these namespaces should be moved into separate files.`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(node: TSESTree.Node) => node is TSESTree.TSModuleDeclaration} */
        const isNamespaceDeclaration = (node) => node.type === AST_NODE_TYPES.TSModuleDeclaration;

        /** @type {(node: TSESTree.Program) => void} */
        const checkSourceFile = (node) => {
            if (context.getFilename().endsWith(".d.ts")) {
                return;
            }
            const members = node.body;
            const namespaces = members.filter(isNamespaceDeclaration);
            if (namespaces.length <= 1) {
                return;
            }

            namespaces.forEach(n => {
                context.report({
                    messageId: "excessNamespaceError", node: n
                });
            });
        };

        return {
            Program: checkSourceFile,
        };
    },
});
