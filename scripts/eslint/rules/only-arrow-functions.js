const { AST_NODE_TYPES, TSESTree } = require("@typescript-eslint/utils");
const { createRule } = require("./utils");

module.exports = createRule({
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
    /** @type {[{ allowNamedFunctions?: boolean; allowDeclarations?: boolean }]} */
    defaultOptions: [{
        allowNamedFunctions: false,
        allowDeclarations: false,
    }],

    create(context, [{ allowNamedFunctions, allowDeclarations }]) {

        /** @type {(node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => boolean} */
        const isThisParameter = (node) => !!node.params.length && !!node.params.find(param => param.type === AST_NODE_TYPES.Identifier && param.name === "this");

        /** @type {(node: TSESTree.Node) => boolean} */
        const isMethodType = (node) => {
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

        /** @type {boolean[]} */
        const stack = [];
        const enterFunction = () => {
            stack.push(false);
        };

        const markThisUsed = () => {
            if (stack.length) {
                stack[stack.length - 1] = true;
            }
        };

        /** @type {(node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) => void} */
        const exitFunction = (node) => {
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
