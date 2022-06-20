import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
    name: "no-keywords",
    meta: {
        docs: {
            description: `disallows the use of certain TypeScript keywords as variable or parameter names`,
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

        const isKeyword = (name: string) => keywords.includes(name);

        const report = (node: TSESTree.Identifier) => {
            context.report({ messageId: "noKeywordsError", data: { name: node.name }, node });
        };

        const checkProperties = (node: TSESTree.ObjectPattern): void => {
            node.properties.forEach(property => {
                if (
                    property &&
                    property.type === AST_NODE_TYPES.Property &&
                    property.key.type === AST_NODE_TYPES.Identifier &&
                    isKeyword(property.key.name)
                ) {
                    report(property.key);
                }
            });
        };

        const checkElements = (node: TSESTree.ArrayPattern): void => {
            node.elements.forEach(element => {
                if (
                    element &&
                    element.type === AST_NODE_TYPES.Identifier &&
                    isKeyword(element.name)
                ) {
                    report(element);
                }
            });
        };

        const checkParams = (
            node:
                | TSESTree.ArrowFunctionExpression
                | TSESTree.FunctionDeclaration
                | TSESTree.FunctionExpression
                | TSESTree.TSMethodSignature
                | TSESTree.TSFunctionType
        ): void => {
            if (!node || !node.params || !node.params.length) {
                return;
            }

            node.params.forEach(param => {
                if (
                    param &&
                    param.type === AST_NODE_TYPES.Identifier &&
                    isKeyword(param.name)
                ) {
                    report(param);
                }
            });
        };

        return {
            VariableDeclarator(node) {
                if (node.id.type === AST_NODE_TYPES.ObjectPattern) {
                    checkProperties(node.id);
                }

                if (node.id.type === AST_NODE_TYPES.ArrayPattern) {
                    checkElements(node.id);
                }

                if (
                    node.id.type === AST_NODE_TYPES.Identifier &&
                    isKeyword(node.id.name)
                ) {
                    report(node.id);
                }
            },

            ArrowFunctionExpression: checkParams,
            FunctionDeclaration: checkParams,
            FunctionExpression: checkParams,
            TSMethodSignature: checkParams,
            TSFunctionType: checkParams,
        };
    },
});
