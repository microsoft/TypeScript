import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
    name: "no-in-operator",
    meta: {
        docs: {
            description: ``,
            recommended: "error",
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
        const checkInOperator = (node: TSESTree.BinaryExpression) => {
            if (node.operator === IN_OPERATOR) {
                context.report({ messageId: "noInOperatorError", node });
            }
        };

        return {
            BinaryExpression: checkInOperator,
        };
    },
});
