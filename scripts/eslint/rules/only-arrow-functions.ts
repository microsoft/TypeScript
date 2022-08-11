import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "./utils";

type MessageId = "onlyArrowFunctionsError";
type Options = [{
    allowNamedFunctions?: boolean;
    allowDeclarations?: boolean;
}];

export = createRule<Options, MessageId>({
    name: "only-arrow-functions",
    meta: {
        docs: {
            description: `Disallows traditional (non-arrow) function expressions.`,
            recommended: "error",
        },
        messages: {
            onlyArrowFunctionsError: "non-arrow functions are forbidden",
        },
        schema: [{
            additionalProperties: false,
            properties: {
                allowNamedFunctions: { type: "boolean" },
                allowDeclarations: { type: "boolean" },
            },
            type: "object",
        }],
        type: "suggestion",
    },
    defaultOptions: [{
        allowNamedFunctions: false,
        allowDeclarations: false,
    }],

    create(context, [{ allowNamedFunctions, allowDeclarations }]) {

        const isThisParameter = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => (
            node.params.length && !!node.params.find(param => param.type === AST_NODE_TYPES.Identifier && param.name === "this")
        );

        const isMethodType = (node: TSESTree.Node) => {
            const types = [
                AST_NODE_TYPES.MethodDefinition,
                AST_NODE_TYPES.Property,
            ];

            const parent = node.parent;
            if (!parent) {
                return false;
            }

            return node.type === AST_NODE_TYPES.FunctionExpression && types.includes(parent.type);
        };

        const stack: boolean[] = [];
        const enterFunction = () => {
            stack.push(false);
        };

        const markThisUsed = () => {
            if (stack.length) {
                stack[stack.length - 1] = true;
            }
        };

        const exitFunction = (node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => {
            const methodUsesThis = stack.pop();

            if (node.type === AST_NODE_TYPES.FunctionDeclaration && allowDeclarations) {
                return;
            }

            if ((allowNamedFunctions && node.id !== null) || isMethodType(node)) { // eslint-disable-line no-null/no-null
                return;
            }

            if (!(node.generator || methodUsesThis || isThisParameter(node))) {
                context.report({ messageId: "onlyArrowFunctionsError", node });
            }
        };

        return {
            "FunctionDeclaration": enterFunction,
            "FunctionDeclaration:exit": exitFunction,
            "FunctionExpression": enterFunction,
            "FunctionExpression:exit": exitFunction,
            "ThisExpression": markThisUsed,
        };
    },
});
