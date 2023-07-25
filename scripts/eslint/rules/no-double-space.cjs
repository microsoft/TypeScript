const { TSESTree, AST_NODE_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

module.exports = createRule({
    name: "no-double-space",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            noDoubleSpaceError: `Use only one space`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.getSourceCode();
        const lines = sourceCode.getLines();

        /** @type {(node: TSESTree.Node | null) => boolean} */
        const isStringLiteral = (node) => {
            return !!(node && (
                (node.type === AST_NODE_TYPES.TemplateElement) ||
                (node.type === AST_NODE_TYPES.TemplateLiteral && node.quasis) ||
                (node.type === AST_NODE_TYPES.Literal && typeof node.value === "string")
            ));
        };

        /** @type {(node: TSESTree.Node | null) => boolean} */
        const isRegexLiteral = (node) => {
            return !!(node && node.type === AST_NODE_TYPES.Literal && Object.prototype.hasOwnProperty.call(node, "regex"));
        };

        /** @type {(node: TSESTree.Node) => void} */
        const checkDoubleSpace = (node) => {
            lines.forEach((line, index) => {
                const firstNonSpace = /\S/.exec(line);
                if (!firstNonSpace || line.includes("@param")) {
                    return;
                }

                // Allow common uses of double spaces
                // * To align `=` or `!=` signs
                // * To align comments at the end of lines
                // * To indent inside a comment
                // * To use two spaces after a period
                // * To include aligned `->` in a comment
                const rgx =  /[^/*. ][ ]{2}[^-!/= ]/g;
                rgx.lastIndex = firstNonSpace.index;
                const doubleSpace = rgx.exec(line);

                if (!doubleSpace) {
                    return;
                }

                const locIndex = sourceCode.getIndexFromLoc({ column: doubleSpace.index, line: index + 1 });
                const sourceNode = sourceCode.getNodeByRangeIndex(locIndex);
                if (isStringLiteral(sourceNode) || isRegexLiteral(sourceNode)) {
                    return;
                }

                context.report({ messageId: "noDoubleSpaceError", node, loc: { line: index + 1, column: doubleSpace.index + 1 } });
            });
        };

        return {
            Program: checkDoubleSpace,
        };
    },
});
