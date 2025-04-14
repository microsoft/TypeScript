const { AST_NODE_TYPES, ESLintUtils } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");
const ts = require("typescript");

/**
 * @import { TSESTree } from "@typescript-eslint/utils"
 * @typedef {TSESTree.CallExpression | TSESTree.NewExpression} CallOrNewExpression
 */
void 0;

const unset = Symbol();
/**
 * @template T
 * @param {() => T} fn
 * @returns {() => T}
 */
function memoize(fn) {
    /** @type {T | unset} */
    let value = unset;
    return () => {
        if (value === unset) {
            value = fn();
        }
        return value;
    };
}

module.exports = createRule({
    name: "argument-trivia",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            argumentTriviaArgumentError: `Tag argument with parameter name`,
            argumentTriviaArgumentSpaceError: `There should be 1 space between an argument and its comment`,
            argumentTriviaArgumentNameError: `Argument name "{{ got }}" does not match expected name "{{ want }}"`,
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
        const isSetOrAssert = name => name.startsWith("set") || name.startsWith("assert");
        /** @type {(node: TSESTree.Node) => boolean} */
        const isTrivia = node => {
            if (node.type === AST_NODE_TYPES.Identifier) {
                return node.name === "undefined";
            }

            if (node.type === AST_NODE_TYPES.Literal) {
                // eslint-disable-next-line no-restricted-syntax
                return node.value === null || node.value === true || node.value === false;
            }

            return false;
        };

        /** @type {(node: CallOrNewExpression) => boolean} */
        const shouldIgnoreCalledExpression = node => {
            if (node.callee && node.callee.type === AST_NODE_TYPES.MemberExpression) {
                const methodName = node.callee.property.type === AST_NODE_TYPES.Identifier
                    ? node.callee.property.name
                    : "";

                if (isSetOrAssert(methodName)) {
                    return true;
                }

                switch (methodName) {
                    case "apply":
                    case "call":
                    case "equal":
                    case "stringify":
                    case "push":
                        return true;
                }

                return false;
            }

            if (node.callee && node.callee.type === AST_NODE_TYPES.Identifier) {
                const functionName = node.callee.name;

                if (isSetOrAssert(functionName)) {
                    return true;
                }

                switch (functionName) {
                    case "contains":
                        return true;
                }

                return false;
            }

            return false;
        };

        /** @type {(node: TSESTree.Node, i: number, getSignature: () => ts.Signature | undefined) => void} */
        const checkArg = (node, i, getSignature) => {
            if (!isTrivia(node)) {
                return;
            }

            const getExpectedName = memoize(() => {
                const signature = getSignature();
                if (signature) {
                    const expectedName = signature.parameters[i]?.escapedName;
                    if (expectedName) {
                        const name = ts.unescapeLeadingUnderscores(expectedName);
                        // If a parameter is unused, we prepend an underscore. Ignore this
                        // so that we can switch between used and unused without modifying code,
                        // requiring that arugments are tagged with the non-underscored name.
                        return name.startsWith("_") ? name.slice(1) : name;
                    }
                }
                return undefined;
            });

            const comments = sourceCode.getCommentsBefore(node);
            /** @type {TSESTree.Comment | undefined} */
            const comment = comments[comments.length - 1];

            if (!comment || comment.type !== "Block") {
                const expectedName = getExpectedName();
                if (expectedName) {
                    context.report({
                        messageId: "argumentTriviaArgumentError",
                        node,
                        fix: fixer => {
                            return fixer.insertTextBefore(node, `/*${expectedName}*/ `);
                        },
                    });
                }
                else {
                    context.report({ messageId: "argumentTriviaArgumentError", node });
                }
                return;
            }

            const argRangeStart = node.range[0];
            const commentRangeEnd = comment.range[1];
            const expectedName = getExpectedName();
            if (expectedName) {
                const got = comment.value;
                if (got !== expectedName) {
                    context.report({
                        messageId: "argumentTriviaArgumentNameError",
                        data: { got, want: expectedName },
                        node: comment,
                        fix: fixer => {
                            return fixer.replaceText(comment, `/*${expectedName}*/`);
                        },
                    });
                    return;
                }
            }

            const hasNewLine = sourceCodeText.slice(commentRangeEnd, argRangeStart).includes("\n");
            if (argRangeStart !== commentRangeEnd + 1 && !hasNewLine) {
                // TODO(jakebailey): range should be whitespace
                context.report({
                    messageId: "argumentTriviaArgumentSpaceError",
                    node,
                    fix: fixer => {
                        return fixer.replaceTextRange([commentRangeEnd, argRangeStart], " ");
                    },
                });
            }
        };

        /** @type {(node: CallOrNewExpression) => void} */
        const checkArgumentTrivia = node => {
            if (shouldIgnoreCalledExpression(node)) {
                return;
            }

            const getSignature = memoize(() => {
                const parserServices = ESLintUtils.getParserServices(context, /*allowWithoutFullTypeInformation*/ true);
                if (parserServices.program) {
                    const checker = parserServices.program.getTypeChecker();
                    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                    return checker.getResolvedSignature(tsNode);
                }
                return undefined;
            });

            for (let i = 0; i < node.arguments.length; i++) {
                const arg = node.arguments[i];
                checkArg(arg, i, getSignature);
            }
        };

        return {
            CallExpression: checkArgumentTrivia,
            NewExpression: checkArgumentTrivia,
        };
    },
});
