const { AST_NODE_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "no-keywords",
    meta: {
        docs: {
            description: `disallows the use of certain TypeScript keywords as variable or parameter names`,
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

        /** @type {(name: string) => boolean} */
        const isKeyword = name => keywords.includes(name);

        /** @type {(node: TSESTree.Identifier) => void} */
        const report = node => {
            context.report({ messageId: "noKeywordsError", data: { name: node.name }, node });
        };

        /** @type {(node: TSESTree.ObjectPattern) => void} */
        const checkProperties = node => {
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

        /** @type {(node: TSESTree.ArrayPattern) => void} */
        const checkElements = node => {
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

        /** @type {(node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.TSMethodSignature | TSESTree.TSFunctionType) => void} */
        const checkParams = node => {
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
