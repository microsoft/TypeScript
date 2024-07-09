const { AST_NODE_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "debug-assert",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            secondArgumentDebugAssertError: `Second argument to 'Debug.assert' should be a string literal`,
            thirdArgumentDebugAssertError: `Third argument to 'Debug.assert' should be a string literal or arrow function`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(node: TSESTree.Node) => boolean} */
        const isArrowFunction = node => node.type === AST_NODE_TYPES.ArrowFunctionExpression;
        /** @type {(node: TSESTree.Node) => boolean} */
        const isStringLiteral = node => (
            (node.type === AST_NODE_TYPES.Literal && typeof node.value === "string") || node.type === AST_NODE_TYPES.TemplateLiteral
        );

        /** @type {(node: TSESTree.MemberExpression) => boolean} */
        const isDebugAssert = node => (
            node.object.type === AST_NODE_TYPES.Identifier
            && node.object.name === "Debug"
            && node.property.type === AST_NODE_TYPES.Identifier
            && node.property.name === "assert"
        );

        /** @type {(node: TSESTree.CallExpression) => void} */
        const checkDebugAssert = node => {
            const args = node.arguments;
            const argsLen = args.length;
            if (!(node.callee.type === AST_NODE_TYPES.MemberExpression && isDebugAssert(node.callee)) || argsLen < 2) {
                return;
            }

            const message1Node = args[1];
            if (message1Node && !isStringLiteral(message1Node)) {
                context.report({ messageId: "secondArgumentDebugAssertError", node: message1Node });
            }

            if (argsLen !== 3) {
                return;
            }

            const message2Node = args[2];
            if (message2Node && (!isStringLiteral(message2Node) && !isArrowFunction(message2Node))) {
                context.report({ messageId: "thirdArgumentDebugAssertError", node: message2Node });
            }
        };

        return {
            CallExpression: checkDebugAssert,
        };
    },
});
