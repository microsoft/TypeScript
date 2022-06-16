import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
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
        const isNamespaceDeclaration = (node: TSESTree.Node): node is TSESTree.TSModuleDeclaration => node.type === AST_NODE_TYPES.TSModuleDeclaration;

        const checkSourceFile = (node: TSESTree.Program) => {
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
