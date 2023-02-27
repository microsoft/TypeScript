const { AST_NODE_TYPES, TSESTree, ESLintUtils } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");
const ts = require("typescript");

module.exports = createRule({
    name: "parameter-trivia",
    meta: {
        docs: {
            description: ``,
            recommended: "error",
        },
        messages: {
            parameterTriviaArgumentError: `Tag argument with parameter name`,
            parameterTriviaArgumentSpaceError: `There should be 1 space between an argument and its comment`,
            parameterTriviaArgumentNameError: `Argument name "{{ got }}" does not match expected name "{{ want }}"`,
        },
        schema: [],
        type: "problem",
        fixable: "code",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.getSourceCode();
        const sourceCodeText = sourceCode.getText();

        /** @type {(name: string) => boolean} */
        const isSetOrAssert = (name) => name.startsWith("set") || name.startsWith("assert");
        /** @type {(node: TSESTree.Node) => boolean} */
        const isTrivia = (node) => {
            if (node.type === AST_NODE_TYPES.Identifier) {
                return node.name === "undefined";
            }

            if (node.type === AST_NODE_TYPES.Literal) {
                // eslint-disable-next-line no-null/no-null
                return node.value === null || node.value === true || node.value === false;
            }

            return false;
        };

        /** @type {(node: TSESTree.CallExpression | TSESTree.NewExpression) => boolean} */
        const shouldIgnoreCalledExpression = (node) => {
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

                return ["contains"].indexOf(functionName) >= 0;
            }

            return false;
        };


        /** @type {(node: TSESTree.Node, i: number, getSignature: () => ts.Signature | undefined) => void} */
        const checkArg = (node, i, getSignature) => {
            if (!isTrivia(node)) {
                return;
            }

            const comments = sourceCode.getCommentsBefore(node);
            if (!comments || comments.length === 0) {
                // TODO(jakebailey): quick fix
                context.report({ messageId: "parameterTriviaArgumentError", node });
                return;
            }

            const comment = comments[comments.length - 1];
            if (comment.type !== "Block") {
                // TODO(jakebailey): quick fix
                context.report({ messageId: "parameterTriviaArgumentError", node });
                return;
            }

            const argRangeStart = node.range[0];
            const commentRangeEnd = comment.range[1];
            const signature = getSignature();
            if (signature) {
                const expectedName = signature.parameters[i]?.escapedName;
                if (expectedName) {
                    const got = comment.value.trim();
                    const want = ts.unescapeLeadingUnderscores(expectedName);
                    if (got !== want) {
                        context.report({
                            messageId: "parameterTriviaArgumentNameError",
                            data: { got, want },
                            node: comment,
                            fix: (fixer) => {
                                return fixer.replaceText(comment, `/*${expectedName}*/`);
                            },
                        });
                        return;
                    }
                }
            }

            // TODO(jakebailey): check last.value[0] === "*" and error/quickfix

            const hasNewLine = sourceCodeText.slice(commentRangeEnd, argRangeStart).indexOf("\n") >= 0;
            if (argRangeStart !== commentRangeEnd + 1 && !hasNewLine) {
                // TODO(jakebailey): range should be whitespace
                context.report({
                    messageId: "parameterTriviaArgumentSpaceError",
                    node,
                    fix: (fixer) => {
                        return fixer.replaceTextRange([commentRangeEnd, argRangeStart], " ");
                    }
                });
            }
        };

        /** @type {(node: TSESTree.CallExpression | TSESTree.NewExpression) => void} */
        const checkparameterTrivia = (node) => {
            if (shouldIgnoreCalledExpression(node)) {
                return;
            }

            /** @type {ts.Signature | undefined} */
            let signature;
            const getSignature = () => {
                if (signature) {
                    return signature;
                }

                if (context.parserServices?.hasFullTypeInformation) {
                    const parserServices = ESLintUtils.getParserServices(context);
                    const checker = parserServices.program.getTypeChecker();
                    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                    return signature = checker.getResolvedSignature(tsNode);
                }

                return undefined;
            };

            for (let i = 0; i < node.arguments.length; i++) {
                const arg = node.arguments[i];
                checkArg(arg, i, getSignature);
            }
        };

        return {
            CallExpression: checkparameterTrivia,
            NewExpression: checkparameterTrivia,
        };
    },
});
