const { createRule } = require("./utils.cjs");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "no-in-operator",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            noInOperatorError: `Don't use the 'in' keyword - use 'hasProperty' to check for key presence instead`,
        },
        schema: [],
        type: "suggestion",
    },
    defaultOptions: [],

    create(context) {
        const IN_OPERATOR = "in";
        /** @type {(node: TSESTree.BinaryExpression) => void} */
        const checkInOperator = node => {
            if (node.operator === IN_OPERATOR) {
                context.report({ messageId: "noInOperatorError", node });
            }
        };

        return {
            BinaryExpression: checkInOperator,
        };
    },
});
