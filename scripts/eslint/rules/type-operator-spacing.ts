import { TSESTree, AST_TOKEN_TYPES } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
    name: "type-operator-spacing",
    meta: {
        docs: {
            description: ``,
            recommended: "error",
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

        const checkTypeOperatorSpacing = (node: TSESTree.TSIntersectionType | TSESTree.TSUnionType) => {
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
