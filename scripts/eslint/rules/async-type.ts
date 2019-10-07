import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/experimental-utils";
import { createRule } from "./utils";

export = createRule({
    name: "async-type",
    meta: {
        docs: {
            description: ``,
            category: "Possible Errors",
            recommended: "error",
        },
        messages: {
            asyncTypeError: `Async functions must have an explicit return type`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const checkAsyncFunction = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression) => {
            if (node.async && !node.returnType) {
                context.report({ messageId: "asyncTypeError", node });
            }
        };

        const checkAsyncMethod = (node: TSESTree.MethodDefinition) => {
            if (node.value.type === AST_NODE_TYPES.FunctionExpression) {
                checkAsyncFunction(node.value);
            }
        };

        return {
            [AST_NODE_TYPES.FunctionDeclaration]: checkAsyncFunction,
            [AST_NODE_TYPES.FunctionExpression]: checkAsyncFunction,
            [AST_NODE_TYPES.ArrowFunctionExpression]: checkAsyncFunction,
            [AST_NODE_TYPES.MethodDefinition]: checkAsyncMethod
        };
    },
});
