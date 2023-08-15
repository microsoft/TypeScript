const { TSESTree } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

module.exports = createRule({
    name: "no-type-assertion-whitespace",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            noTypeAssertionWhitespace: `Excess trailing whitespace found around type assertion`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.getSourceCode();
        /** @type {(node: TSESTree.TSTypeAssertion) => void} */
        const checkTypeAssertionWhitespace = (node) => {
            const leftToken = sourceCode.getLastToken(node.typeAnnotation);
            const rightToken = sourceCode.getFirstToken(node.expression);

            if (!leftToken || !rightToken) {
                return;
            }

            if (sourceCode.isSpaceBetweenTokens(leftToken, rightToken)) {
                context.report({
                    messageId: "noTypeAssertionWhitespace",
                    node,
                    loc: { column: leftToken.loc.end.column + 1, line: leftToken.loc.end.line },
                });
            }
        };

        return {
            TSTypeAssertion: checkTypeAssertionWhitespace,
        };
    },
});
