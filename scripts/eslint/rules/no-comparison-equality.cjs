const { createRule } = require("./utils.cjs");

/** @import { TSESTree } from "@typescript-eslint/utils" */
void 0;

module.exports = createRule({
    name: "no-comparison-equality",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            noCompare: `Do not compare against {{comparison}} directly; compare against zero or Comparison.EqualTo instead.`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        /** @type {(node: TSESTree.MemberExpression & { property: TSESTree.Identifier }) => void} */
        const noCompare = node => {
            if (node.property.name === "EqualTo") return;
            context.report({ messageId: "noCompare", node, data: { comparison: context.sourceCode.getText(node) } });
        };

        const comparisonMemberExpression = "MemberExpression[object.name='Comparison']";

        return {
            [`SwitchCase > ${comparisonMemberExpression}`]: noCompare,
            [`BinaryExpression[operator=/(===?|!==?)/] > ${comparisonMemberExpression}`]: noCompare,
        };
    },
});
