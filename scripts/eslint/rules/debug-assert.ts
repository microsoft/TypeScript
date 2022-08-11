import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
    name: "debug-assert",
    meta: {
        docs: {
            description: ``,
            recommended: "error",
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
        const isArrowFunction = (node: TSESTree.Node) => node.type === AST_NODE_TYPES.ArrowFunctionExpression;
        const isStringLiteral = (node: TSESTree.Node): boolean => (
            (node.type === AST_NODE_TYPES.Literal && typeof node.value === "string") || node.type === AST_NODE_TYPES.TemplateLiteral
        );

        const isDebugAssert = (node: TSESTree.MemberExpression): boolean => (
            node.object.type === AST_NODE_TYPES.Identifier
                && node.object.name === "Debug"
                && node.property.type === AST_NODE_TYPES.Identifier
                && node.property.name === "assert"
        );

        const checkDebugAssert = (node: TSESTree.CallExpression) => {
            const args = node.arguments;
            const argsLen = args.length;
            if (!(node.callee.type === AST_NODE_TYPES.MemberExpression && isDebugAssert(node.callee)) || argsLen < 2) {
                return;
            }

            const message1Node = args[1];
            if (message1Node && !isStringLiteral(message1Node)) {
                context.report({ messageId: "secondArgumentDebugAssertError", node: message1Node });
            }

            if (argsLen < 3) {
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
