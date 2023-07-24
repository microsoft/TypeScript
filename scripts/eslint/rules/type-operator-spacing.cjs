const { TSESTree, AST_TOKEN_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

module.exports = createRule({
    name: "type-operator-spacing",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            typeOperatorSpacingError: `The '|' and '&' operators must be surrounded by spaces`,
        },
        schema: [],
        type: "suggestion",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.getSourceCode();
        const tokens = ["|", "&"];
        const text = sourceCode.getText();

        /** @type {(node: TSESTree.TSIntersectionType | TSESTree.TSUnionType) => void} */
        const checkTypeOperatorSpacing = (node) => {
            node.types.forEach(node => {
                const token = sourceCode.getTokenBefore(node);

                if (!!token && token.type === AST_TOKEN_TYPES.Punctuator && tokens.indexOf(token.value) >= 0) {
                    const [start, end] = token.range;

                    if (/\S/.test(text[start - 1]) || /\S/.test(text[end])) {
                        context.report({ messageId: "typeOperatorSpacingError", node: token });
                    }
                }
            });
        };

        return {
            TSIntersectionType: checkTypeOperatorSpacing,
            TSUnionType: checkTypeOperatorSpacing,
        };
    },
});
