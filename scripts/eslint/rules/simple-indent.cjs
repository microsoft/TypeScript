const { TSESTree } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

module.exports = createRule({
    name: "simple-indent",
    meta: {
        docs: {
            description: "Enforce consistent indentation",
        },
        messages: {
            simpleIndentError: "4 space indentation expected",
        },
        fixable: "whitespace",
        schema: [],
        type: "layout",
    },
    defaultOptions: [],
    create(context) {
        const TAB_SIZE = 4;
        const TAB_REGEX = /\t/g;
        const sourceCode = context.getSourceCode();
        const linebreaks = sourceCode.getText().match(/\r\n|[\r\n\u2028\u2029]/gu);

        /** @type {(node: TSESTree.Program) => void} */
        const checkIndent = (node) => {
            const lines = sourceCode.getLines();
            const linesLen = lines.length;

            let totalLen = 0;
            for (let i = 0; i < linesLen; i++) {
                const lineNumber = i + 1;
                const line = lines[i];
                const linebreaksLen = linebreaks && linebreaks[i] ? linebreaks[i].length : 1;
                const lineLen = line.length + linebreaksLen;
                const matches = /\S/.exec(line);

                if (matches && matches.index) {
                    const indentEnd = matches.index;
                    const whitespace = line.slice(0, indentEnd);

                    if (!TAB_REGEX.test(whitespace)) {
                        totalLen += lineLen;
                        continue;
                    }

                    context.report({
                        messageId: "simpleIndentError",
                        node,
                        loc: { column: indentEnd, line: lineNumber },
                        fix(fixer) {
                            const rangeStart = totalLen;
                            const rangeEnd = rangeStart + indentEnd;

                            return fixer
                                .replaceTextRange([rangeStart, rangeEnd], whitespace.replace(TAB_REGEX, " ".repeat(TAB_SIZE)));
                        }
                    });
                }

                totalLen += lineLen;
            }
        };

        return {
            Program: checkIndent,
        };
    },
});
