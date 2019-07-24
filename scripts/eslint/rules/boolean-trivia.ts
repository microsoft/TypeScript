import { SyntaxKind } from "typescript";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/experimental-utils";
import { getEsTreeNodeToTSNodeMap, createRule } from "./utils";

export = createRule({
    name: "boolean-trivia",
    meta: {
        docs: {
            description: ``,
            category: "Best Practices",
            recommended: "error",
        },
        messages: {
            booleanTriviaArgumentError: `Tag argument with parameter name`,
            booleanTriviaArgumentSpaceError: `There should be 1 space between an argument and its comment`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const esTreeNodeToTSNodeMap = getEsTreeNodeToTSNodeMap(context.parserServices);
        const sourceCode = context.getSourceCode();
        const sourceCodeText = sourceCode.getText();

        const isSetOrAssert = (name: string): boolean => name.startsWith("set") || name.startsWith("assert");
        const isTrivia = (node: TSESTree.Expression): boolean => {
            const tsNode = esTreeNodeToTSNodeMap.get(node);

            if (tsNode.kind === SyntaxKind.Identifier) {
                return tsNode.originalKeywordKind === SyntaxKind.UndefinedKeyword;
            }

            return [SyntaxKind.TrueKeyword, SyntaxKind.FalseKeyword, SyntaxKind.NullKeyword].indexOf(tsNode.kind) >= 0;
        };

        const shouldIgnoreCalledExpression = (node: TSESTree.CallExpression): boolean => {
            if (node.callee && node.callee.type === AST_NODE_TYPES.MemberExpression) {
                const methodName = node.callee.property.type === AST_NODE_TYPES.Identifier
                    ? node.callee.property.name
                    : "";

                if (isSetOrAssert(methodName)) {
                    return true;
                }

                return ["apply", "call", "equal", "fail", "isTrue", "output", "stringify", "push"].indexOf(methodName) >= 0;
            }

            if (node.callee && node.callee.type === AST_NODE_TYPES.Identifier) {
                const functionName = node.callee.name;

                if (isSetOrAssert(functionName)) {
                    return true;
                }

                return [
                    "createImportSpecifier",
                    "createAnonymousType",
                    "createSignature",
                    "createProperty",
                    "resolveName",
                    "contains",
                ].indexOf(functionName) >= 0;
            }

            return false;
        };

        const checkArg = (node: TSESTree.Expression): void => {
            if (!isTrivia(node)) {
                return;
            }

            const comments = sourceCode.getCommentsBefore(node);
            if (!comments || comments.length !== 1 || comments[0].type !== "Block") {
                context.report({ messageId: "booleanTriviaArgumentError", node });
                return;
            }

            const argRangeStart = node.range[0];
            const commentRangeEnd = comments[0].range[1];
            const hasNewLine = sourceCodeText.slice(commentRangeEnd, argRangeStart).indexOf("\n") >= 0;

            if (argRangeStart !== commentRangeEnd + 1 && !hasNewLine) {
                context.report({ messageId: "booleanTriviaArgumentSpaceError", node });
            }
        };

        const checkBooleanTrivia = (node: TSESTree.CallExpression) => {
            if (shouldIgnoreCalledExpression(node)) {
                return;
            }

            for (const arg of node.arguments) {
                checkArg(arg);
            }
        };

        return {
            CallExpression: checkBooleanTrivia,
        };
    },
});
