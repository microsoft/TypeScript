import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "./utils";

export = createRule({
    name: "boolean-trivia",
    meta: {
        docs: {
            description: ``,
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
        const sourceCode = context.getSourceCode();
        const sourceCodeText = sourceCode.getText();

        const isSetOrAssert = (name: string): boolean => name.startsWith("set") || name.startsWith("assert");
        const isTrivia = (node: TSESTree.Node): boolean => {
            if (node.type === AST_NODE_TYPES.Identifier) {
                return node.name === "undefined";
            }

            if (node.type === AST_NODE_TYPES.Literal) {
                // eslint-disable-next-line no-null/no-null
                return node.value === null || node.value === true || node.value === false;
            }

            return false;
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

        const checkArg = (node: TSESTree.Node): void => {
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
