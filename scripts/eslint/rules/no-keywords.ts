import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";
import { createRule } from "./utils";

export = createRule({
    name: "no-keywords",
    meta: {
        docs: {
            description: `disallows the use of certain TypeScript keywords as variable or parameter names`,
            category: "Stylistic Issues",
            recommended: "error",
        },
        messages: {
            noKeywordsError: `{{ name }} clashes with keyword/type`,
        },
        schema: [{
            properties: {
                properties: { type: "boolean" },
                keywords: { type: "boolean" },
            },
            type: "object",
        }],
        type: "suggestion",
    },
    defaultOptions: [],

    create(context) {
        const keywords = [
            "Undefined",
            "undefined",
            "Boolean",
            "boolean",
            "String",
            "string",
            "Number",
            "number",
            "any",
        ];

        const hasKeyword = (name: string) => keywords.includes(name);

        const shouldReport = (node: TSESTree.Identifier) => {
            if (!node || !node.parent || !hasKeyword(node.name)) {
                return false;
            }

            const parent = node.parent;
            if (parent.type === AST_NODE_TYPES.FunctionDeclaration || parent.type === AST_NODE_TYPES.FunctionExpression) {
                return !(parent.id && hasKeyword(parent.id.name));
            }

            if (parent.type === AST_NODE_TYPES.TSMethodSignature && parent.key.type === AST_NODE_TYPES.Identifier) {
                return !(parent.key && hasKeyword(parent.key.name));
            }

            return [
                AST_NODE_TYPES.ArrowFunctionExpression,
                AST_NODE_TYPES.VariableDeclarator,
                AST_NODE_TYPES.TSFunctionType,
            ].includes(node.parent.type);
        };

        const check = (node: TSESTree.Identifier) => {
            if (shouldReport(node)) {
                context.report({ messageId: "noKeywordsError", data: { name: node.name }, node });
            }
        };

        return { Identifier: check };
    },
});
