/**
MIT License

Copyright (c) 2019 TypeScript ESLint and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

// Copied from https://github.com/JoshuaKGoldberg/typescript-eslint/blob/5603522f28eee336a4b9a5ddabb79ce356a53517/packages/eslint-plugin/src/rules/prefer-nullish-coalescing.ts
// with modification to ignore boolean/number/string LHS.

/* eslint-disable @typescript-eslint/naming-convention */
import {
    AST_NODE_TYPES,
    AST_TOKEN_TYPES,
    TSESLint,
    TSESTree,
} from "@typescript-eslint/utils";
import * as util from "./utils";
import * as ts from "typescript";

type Options = [
    {
        ignoreConditionalTests?: boolean;
        ignoreMixedLogicalExpressions?: boolean;
    },
];
type MessageIds =
    | "preferNullishAssignment"
    | "preferNullishLogical"
    | "suggestNullishAssignment"
    | "suggestNullishLogical";

export = util.createRule<Options, MessageIds>({
    name: "prefer-nullish-coalescing",
    meta: {
        type: "suggestion",
        docs: {
            description:
                "Enforce using the nullish coalescing operator instead of logical assignments or chaining",
            recommended: "strict",
            suggestion: true,
            requiresTypeChecking: true,
        },
        hasSuggestions: true,
        messages: {
            preferNullishAssignment:
                "Prefer using nullish coalescing operator (`??=`) instead of a logical assignment (`||=`).",
            preferNullishLogical:
                "Prefer using nullish coalescing operator (`??`) instead of a logical or (`||`).",
            suggestNullishAssignment: "Fix to nullish coalescing assignment (`??=`).",
            suggestNullishLogical: "Fix to nullish coalescing operator (`??`).",
        },
        schema: [
            {
                type: "object",
                properties: {
                    ignoreConditionalTests: {
                        type: "boolean",
                    },
                    ignoreMixedLogicalExpressions: {
                        type: "boolean",
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    defaultOptions: [
        {
            ignoreConditionalTests: true,
            ignoreMixedLogicalExpressions: true,
        },
    ],
    create(context, [{ ignoreConditionalTests, ignoreMixedLogicalExpressions }]) {
        const parserServices = util.getParserServices(context);
        const sourceCode = context.getSourceCode();
        const checker = parserServices.program.getTypeChecker();

        function checkNode(
            node: TSESTree.AssignmentExpression | TSESTree.LogicalExpression,
            reportMessageId: MessageIds,
            suggestionMessageId: MessageIds,
        ): void {
            const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
            const type = checker.getTypeAtLocation(tsNode.left);
            const isNullish = util.isNullableType(type, { allowUndefined: true });
            if (!isNullish) {
                return;
            }

            // util.getTypeFlags but it also adds flags from intersections, so we
            // see `TypeFlags.String` on `string & { __brand: any }`.
            function getTypeFlags(type: ts.Type) {
                let seen: Set<ts.Type> | undefined;
                let flags: ts.TypeFlags = 0;

                getTypeFlagsWorker(type);
                return flags;

                function getTypeFlagsWorker(type: ts.Type) {
                    if (!(type.flags & ts.TypeFlags.UnionOrIntersection)) {
                        flags |= type.flags;
                        return;
                    }

                    if (seen?.has(type)) {
                        return;
                    }

                    (seen ??= new Set()).add(type);

                    for (const t of (type as ts.UnionOrIntersectionType).types) {
                        getTypeFlagsWorker(t);
                    }
                }
            }

            const possiblyFalsy = (ts.TypeFlags.PossiblyFalsy & ~(ts.TypeFlags.Undefined | ts.TypeFlags.Null)) | ts.TypeFlags.TypeVariable; // TODO: use constraint of type variable?
            if (getTypeFlags(type) & possiblyFalsy) {
                return;
            }

            if (ignoreConditionalTests === true && isConditionalTest(node)) {
                return;
            }

            if (
                ignoreMixedLogicalExpressions === true &&
                isMixedLogicalExpression(node)
            ) {
                return;
            }

            const barBarOperator = util.nullThrows(
                sourceCode.getTokenAfter(
                    node.left,
                    token =>
                        token.type === AST_TOKEN_TYPES.Punctuator &&
                        token.value === node.operator,
                ),
                util.NullThrowsReasons.MissingToken("operator", node.type),
            );

            function* fix(
                fixer: TSESLint.RuleFixer,
            ): IterableIterator<TSESLint.RuleFix> {
                if (node.parent && util.isLogicalOrOperator(node.parent)) {
                    // '&&' and '??' operations cannot be mixed without parentheses (e.g. a && b ?? c)
                    if (
                        node.left.type === AST_NODE_TYPES.LogicalExpression &&
                        !util.isLogicalOrOperator(node.left.left)
                    ) {
                        yield fixer.insertTextBefore(node.left.right, "(");
                    }
                    else {
                        yield fixer.insertTextBefore(node.left, "(");
                    }
                    yield fixer.insertTextAfter(node.right, ")");
                }
                yield fixer.replaceText(
                    barBarOperator,
                    node.operator.replace("||", "??"),
                );
            }

            context.report({
                node: barBarOperator,
                messageId: reportMessageId, // 'preferNullish',
                suggest: [
                    {
                        messageId: suggestionMessageId, // 'suggestNullish',
                        fix,
                    },
                ],
            });
        }

        return {
            'AssignmentExpression[operator = "||="]'(
                node: TSESTree.AssignmentExpression,
            ): void {
                checkNode(node, "preferNullishAssignment", "suggestNullishAssignment");
            },
            'LogicalExpression[operator = "||"]'(
                node: TSESTree.LogicalExpression,
            ): void {
                checkNode(node, "preferNullishLogical", "suggestNullishLogical");
            },
        };
    },
});

function isConditionalTest(
    node: TSESTree.AssignmentExpression | TSESTree.LogicalExpression,
): boolean {
    const parents = new Set<TSESTree.Node | null>([node]);
    let current = node.parent;
    while (current) {
        parents.add(current);

        if (
            (current.type === AST_NODE_TYPES.ConditionalExpression ||
                current.type === AST_NODE_TYPES.DoWhileStatement ||
                current.type === AST_NODE_TYPES.IfStatement ||
                current.type === AST_NODE_TYPES.ForStatement ||
                current.type === AST_NODE_TYPES.WhileStatement) &&
            parents.has(current.test)
        ) {
            return true;
        }

        if (
            [
                AST_NODE_TYPES.ArrowFunctionExpression,
                AST_NODE_TYPES.FunctionExpression,
            ].includes(current.type)
        ) {
            /**
             * This is a weird situation like:
             * `if (() => a || b) {}`
             * `if (function () { return a || b }) {}`
             */
            return false;
        }

        current = current.parent;
    }

    return false;
}

function isMixedLogicalExpression(
    node: TSESTree.AssignmentExpression | TSESTree.LogicalExpression,
): boolean {
    const seen = new Set<TSESTree.Node | undefined>();
    const queue = [node.parent, node.left, node.right];
    for (const current of queue) {
        if (seen.has(current)) {
            continue;
        }
        seen.add(current);

        if (current && current.type === AST_NODE_TYPES.LogicalExpression) {
            if (current.operator === "&&") {
                return true;
            }
            else if (current.operator === "||") {
                // check the pieces of the node to catch cases like `a || b || c && d`
                queue.push(current.parent, current.left, current.right);
            }
        }
    }

    return false;
}
