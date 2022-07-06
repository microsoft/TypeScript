import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
    name: "object-literal-surrounding-space",
    meta: {
        docs: {
            description: ``,
            recommended: "error",
        },
        messages: {
            leadingExcessStringError: `No trailing whitespace found on single-line object literal`,
            leadingStringError: `No leading whitespace found on single-line object literal`,

            trailingExcessStringError: `Excess trailing whitespace found on single-line object literal.`,
            trailingStringError: `No trailing whitespace found on single-line object literal`,
        },
        schema: [],
        type: "suggestion",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.getSourceCode();
        const SPACE_SYMBOL = " ";
        const CLOSE_SYMBOL = "}";
        const OPEN_SYMBOL = "{";

        const manySpaces = (text: string, startIndex: number): boolean => (
            [startIndex, startIndex + 1].every(i => text.charAt(i) === SPACE_SYMBOL)
        );

        const checkObjectLiteralSurroundingSpace = (node: TSESTree.ObjectExpression) => {
            const text = sourceCode.getText(node);
            const startLine = node.loc.start.line;
            const endLine = node.loc.end.line;

            if (!node.properties.length || !text.match(/^{[^\n]+}$/g)) {
                return;
            }

            if (text.charAt(0) === OPEN_SYMBOL) {
                if (text.charAt(1) !== SPACE_SYMBOL) {
                    context.report({ messageId: "leadingStringError", node });
                }

                if (manySpaces(text, 1)) {
                    context.report({ messageId: "leadingExcessStringError", node, loc: { column: node.loc.start.column + 1, line: startLine } });
                }
            }

            if (text.charAt(text.length - 1) === CLOSE_SYMBOL) {
                const index = text.length - 2;
                const endColumn = node.loc.end.column;

                if (text.charAt(index) !== SPACE_SYMBOL) {
                    context.report({ messageId: "trailingStringError", node, loc: { column: endColumn - 1, line: endLine } });
                }

                if (manySpaces(text, index - 1)) {
                    context.report({ messageId: "trailingExcessStringError", node, loc: { column: endColumn - 2, line: endLine } });
                }
            }
        };

        return {
            ObjectExpression: checkObjectLiteralSurroundingSpace,
        };
    },
});
