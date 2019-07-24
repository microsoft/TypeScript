import { TSESTree } from "@typescript-eslint/experimental-utils";
import { SyntaxKind } from "typescript";
import { getEsTreeNodeToTSNodeMap, createRule } from "./utils";

export = createRule({
    name: "no-double-space",
    meta: {
        docs: {
            description: ``,
            category: "Stylistic Issues",
            recommended: "error",
        },
        messages: {
            noDoubleSpaceError: `Use only one space`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const esTreeNodeToTSNodeMap = getEsTreeNodeToTSNodeMap(context.parserServices);
        const sourceCode = context.getSourceCode();
        const lines = sourceCode.getLines();

        const isLiteral = (node: TSESTree.Node | null) => {
            if (!node) {
                return false;
            }

            const tsNode = esTreeNodeToTSNodeMap.get(node);
            if (!tsNode) {
                return false;
            }

            return [
                SyntaxKind.NoSubstitutionTemplateLiteral,
                SyntaxKind.RegularExpressionLiteral,
                SyntaxKind.TemplateMiddle,
                SyntaxKind.StringLiteral,
                SyntaxKind.TemplateHead,
                SyntaxKind.TemplateTail,
            ].indexOf(tsNode.kind) >= 0;
        };

        const checkDoubleSpace = (node: TSESTree.Node) => {
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
                if (isLiteral(sourceNode)) {
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
